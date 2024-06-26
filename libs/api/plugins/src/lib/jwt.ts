import { AuthGuard } from "@nestjs/passport";
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import { Injectable } from "@nestjs/common";

export const jwtConfig: JwtModuleOptions = {
    secret: 'secretwoii',
    signOptions: {
        expiresIn: 60
    }
}

export const refreshTokenConfig: JwtSignOptions = {
  expiresIn: 3600 * 24
};

@Injectable()
export class JwtGuard extends AuthGuard('jwt') { }
