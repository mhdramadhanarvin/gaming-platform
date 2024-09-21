import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  Games,
  TeamMembers,
  Teams,
  Users,
} from '@gaming-platform/api/shared/database/entity';
import { GamesService } from '@gaming-platform/api/games';
import { AccountGamesService } from '@gaming-platform/api/account-games';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDro } from './dto/update-team-member.dto';
import { TeamsService } from '@gaming-platform/api/teams';

@Injectable()
export class TeamMembersService {
  constructor(
    @Inject(forwardRef(() => TeamsService))
    private readonly teamsService: TeamsService,
    private readonly gamesService: GamesService,
    private readonly accountGamesService: AccountGamesService,
    @InjectRepository(TeamMembers)
    private readonly teamMemberRepository: Repository<TeamMembers>
  ) {}

  async findAll(): Promise<TeamMembers[]> {
    return await this.teamMemberRepository.find();
  }

  async findOne(id: string): Promise<TeamMembers> {
    const team = await this.teamMemberRepository.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException(`Team not found`);
    }
    return team;
  }

  async update(
    id: string,
    updateTeamMemberDto: UpdateTeamMemberDro,
    user: Users
  ): Promise<TeamMembers> {
    const existingTeam = await this.findOne(id);
    const teamData = this.teamMemberRepository.merge(
      existingTeam,
      updateTeamMemberDto
    );

    // TODO : add validation the team related hasn't joined on going tournament
    return await this.teamMemberRepository.save(teamData);
  }

  async remove(id: string): Promise<void> {
    const result = await this.teamMemberRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Team not found`);
    }
  }

  async hasTeam(game: Games, user: Users): Promise<boolean> {
    const count = await this.teamMemberRepository.count({
      where: {
        game: {
          id: game.id,
        },
        user: {
          id: user.id,
        },
      },
    });

    return count > 0 ? true : false;
  }

  async teamHasFull(team: Teams): Promise<boolean> {
    const totalMember = await this.teamMemberRepository.count({
      where: {
        team: {
          id: team.id,
        },
      },
    });

    return totalMember >= team.game.max_player;
  }
}
