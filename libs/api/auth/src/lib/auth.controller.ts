import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import {
  LoginResponse,
  LoginResponseClass,
} from './interface/login-response.interface';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshTokenResponseDTO } from './dto/refresh-token-response.dto';
import { JwtGuard } from '@gaming-platform/api/plugins';
import { Users } from '@gaming-platform/api/shared/database/entity';
import { SignUpDto } from './dto/signup.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({
    description: 'Response for Status OK',
    type: LoginResponseClass,
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiOkResponse({
    description: 'Response for Status OK',
    type: Users,
  })
  @HttpCode(HttpStatus.CREATED)
  register(@Body() signUp: SignUpDto): Promise<Users> {
    return this.authService.register(signUp);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh Token' })
  @ApiOkResponse({
    description: 'Response for Status OK',
    type: RefreshTokenResponseDTO,
  })
  async refreshToken(
    @Body() refreshTokenDto: RefreshAccessTokenDto
  ): Promise<{ access_token: string }> {
    return this.authService.refreshAccessToken(refreshTokenDto);
  }

  @Patch('/:refreshToken/revoke')
  @ApiOperation({ summary: 'Revoke Refresh Token' })
  @ApiOkResponse({
    description: 'Response for Status OK',
  })
  @UseGuards(JwtGuard)
  async revokeRefreshToken(
    @Param('refreshToken') refreshToken: string
  ): Promise<void> {
    return this.authService.revokeRefreshToken(refreshToken);
  }
}
