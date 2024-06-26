import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { refreshTokenConfig } from "@gaming-platform/api/plugins";
import { UsersService } from "@gaming-platform/api/users";
import { LoginDto } from "./dto/login.dto";
import { RefreshAccessTokenDto } from "./dto/refresh-access-token.dto";
import { LoginResponse } from "./interface/login-response.interface";
import { RefreshToken } from "@gaming-platform/api/shared/database/entity";
import { Repository } from "typeorm";
import { User } from "@gaming-platform/api/shared/database/entity";
import { SignUpDto } from "./dto/signup.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(RefreshToken) private readonly refreshTokenRepository:
      Repository<RefreshToken>,
  ) { }

  async register(signUp: SignUpDto): Promise<User> {
    const user = await this.usersService.create(signUp);
    delete user.password;

    return user;
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;

    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException("Wrong email or password");
    }

    const access_token = await this.createAccessToken(user);
    const refresh_token = await this.createRefreshToken(user);

    return { access_token, refresh_token } as LoginResponse;
  }

  async refreshAccessToken(
    refreshTokenDto: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    const { refresh_token } = refreshTokenDto;
    const payload = await this.decodeToken(refresh_token);

    const refreshToken = await this.refreshTokenRepository.findOne({
      where: {
        id: payload.jid,
      },
      relations: {
        user: true,
      },
    });

    if (!refreshToken || refreshToken.isRevoked) {
      throw new UnauthorizedException("Access token is not found");
    }

    const access_token = await this.createAccessToken(refreshToken.user);

    return { access_token };
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException("Refresh token is expired");
      } else {
        throw new InternalServerErrorException("Failed to decode token");
      }
    }
  }
  //
  async createAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
    };

    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }
  //
  async createRefreshToken(user: User): Promise<string> {
    const refreshToken = new RefreshToken();

    refreshToken.user = user;
    refreshToken.isRevoked = false;

    const expiredAt = new Date();
    expiredAt.setTime(expiredAt.getTime() + +refreshTokenConfig.expiresIn);
    refreshToken.expiredAt = expiredAt;

    const saveRefreshToken = await this.refreshTokenRepository.save(
      refreshToken,
    );

    const payload = {
      jid: saveRefreshToken.id,
    };
    const refresh_token = await this.jwtService.signAsync(
      payload,
      refreshTokenConfig,
    );
    return refresh_token;
  }
  //
  async revokeRefreshToken(refresh_token: string): Promise<void> {
    const payload = await this.decodeToken(refresh_token);
    const refreshToken = await this.refreshTokenRepository.findOneBy({
      id: payload.jid,
    });

    if (!refreshToken) {
      throw new NotFoundException("Refresh token is not found");
    }

    refreshToken.isRevoked = true;
    await refreshToken.save();
  }
}
