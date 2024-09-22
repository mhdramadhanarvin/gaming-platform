import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teams } from '@gaming-platform/api/shared/database/entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { GamesModule } from '@gaming-platform/api/games';
import { TeamMembersModule } from '@gaming-platform/api/team-members';
import { AccountGamesModule } from '@gaming-platform/api/account-games';
import { DatabaseModule } from '@gaming-platform/api/shared/database';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teams]),
    DatabaseModule,
    GamesModule,
    AccountGamesModule,
    forwardRef(() => TeamMembersModule),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
