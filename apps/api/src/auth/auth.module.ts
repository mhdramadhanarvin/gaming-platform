import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "../config/jwt.config";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RefreshToken } from "./entity/refresh-token.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule.register(jwtConfig),
    UsersModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule { }
