import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmConfig } from "./config/typeorm.config";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { IsUniqueConstraint } from "./shared/is-unique-constrant";

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmConfig,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule { }
