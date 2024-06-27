import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountGames } from '@gaming-platform/api/shared/database/entity';
import { AccountGamesService } from './account-games.service';
import { AccountGamesController } from './account-games.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountGames])],
  providers: [AccountGamesService],
  controllers: [AccountGamesController],
  exports: [AccountGamesService],
})
export class AccountGamesModule {}
