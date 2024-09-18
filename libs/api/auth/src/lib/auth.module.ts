import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@gaming-platform/api/plugins';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  RefreshToken,
  Users,
} from '@gaming-platform/api/shared/database/entity';
import { UsersModule } from '@gaming-platform/api/users';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, RefreshToken]),
    JwtModule.register(jwtConfig),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
