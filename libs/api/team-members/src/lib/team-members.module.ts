import { TeamMembers } from "@gaming-platform/api/shared/database/entity";
import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeamMembersService } from "./team-members.service";
import { GamesModule } from "@gaming-platform/api/games";
import { AccountGamesModule } from "@gaming-platform/api/account-games";
import { TeamsModule } from "@gaming-platform/api/teams";

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamMembers]),
    AccountGamesModule,
    GamesModule,
    forwardRef(() => TeamsModule),
  ],
  controllers: [],
  providers: [TeamMembersService],
  exports: [TeamMembersService],
})
export class TeamMembersModule { }
