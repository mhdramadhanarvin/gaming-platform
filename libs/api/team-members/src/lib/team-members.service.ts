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

  getRepository() {
    return this.teamMemberRepository;
  }

  async create(
    createTeamMemberDto: CreateTeamMemberDto,
    user: Users
  ): Promise<TeamMembers> {
    const teamMember = await this.createLogic(createTeamMemberDto, user);
    return await this.teamMemberRepository.save(teamMember);
  }

  async createLogic(
    createTeamMemberDto: CreateTeamMemberDto,
    user: Users,
    trx?: EntityManager
  ): Promise<TeamMembers> {
    const { game_id, account_game_id, team_id } = createTeamMemberDto;
    const game = await this.gamesService.findOne(game_id);
    const accountGame = await this.accountGamesService.findOne(
      account_game_id,
      user
    );

    const teamRepository = trx
      ? trx.getRepository(Teams)
      : this.teamsService.getRepository();
    const team = await teamRepository.findOne({
      where: { id: team_id },
      relations: { game: true },
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    if (team.game.id !== accountGame.game.id) {
      throw new BadRequestException('Account game not match');
    }

    const checkTeamMember = await this.teamMemberRepository.count({
      where: { accountGame: { id: account_game_id } },
    });

    if (checkTeamMember > 0) {
      throw new BadRequestException('Already have team');
    }

    const teamMember = new TeamMembers();
    teamMember.accountGame = accountGame;
    teamMember.team = team;
    teamMember.is_leader = createTeamMemberDto.is_leader;
    teamMember.type = createTeamMemberDto.type;

    return teamMember;
  }

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
}
