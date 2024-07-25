import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teams } from '@gaming-platform/api/shared/database/entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { GamesModule } from '@gaming-platform/api/games';

@Module({
  imports: [TypeOrmModule.forFeature([Teams]), GamesModule],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
