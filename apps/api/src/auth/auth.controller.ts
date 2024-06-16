import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RefreshAccessTokenDto } from "./dto/refresh-access-token.dto";
import { LoginResponse } from "./interface/login-response.interface";
import { JwtGuard } from "src/config/jwt-guard.config";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post("refresh-token")
  async refreshToken(
    @Body() refreshTokenDto: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    return this.authService.refreshAccessToken(refreshTokenDto);
  }

  @Patch("/:refreshToken/revoke")
  @UseGuards(JwtGuard)
  async revokeRefreshToken(
    @Param("refreshToken") refreshToken: string,
  ): Promise<void> {
    return this.authService.revokeRefreshToken(refreshToken);
  }
}
