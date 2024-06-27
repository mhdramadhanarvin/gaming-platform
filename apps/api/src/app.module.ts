import { Module } from '@nestjs/common';
import { TypeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IsUniqueConstraint } from '@gaming-platform/api/shared/validations';
import { UsersModule } from '@gaming-platform/api/users';
import { AuthModule } from '@gaming-platform/api/auth';
import { GamesModule } from '@gaming-platform/api/games';
import { AccountGamesModule } from '@gaming-platform/api/account_games';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmConfig,
    UsersModule,
    AuthModule,
    GamesModule,
    AccountGamesModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
