import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountGames } from '@gaming-platform/api/shared/database/entity';
import { GamesModule } from '@gaming-platform/api/games';
import { AccountGamesService } from './account-games.service';
import { AccountGamesController } from './account-games.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountGames]), GamesModule],
  providers: [AccountGamesService],
  controllers: [AccountGamesController],
  exports: [AccountGamesService],
})
export class AccountGamesModule {}
