import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  TeamMembers,
  TeamMemberType,
  Teams,
  Users,
} from '@gaming-platform/api/shared/database/entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDro } from './dto/update-team.dto';
import { GamesService } from '@gaming-platform/api/games';
import { TeamMembersService } from '@gaming-platform/api/team-members';
import { AccountGamesService } from '@gaming-platform/api/account-games';
import { DatabaseService } from '@gaming-platform/api/shared/database';

@Injectable()
export class TeamsService {
  constructor(
    private readonly gamesService: GamesService,
    private readonly accountGamesService: AccountGamesService,
    @Inject(forwardRef(() => TeamMembersService))
    private readonly teamMembersService: TeamMembersService,
    private readonly databaseService: DatabaseService,
    @InjectRepository(Teams) private readonly teamRepository: Repository<Teams>
  ) {}

  async create(createTeamDto: CreateTeamDto, user: Users): Promise<Teams> {
    try {
      return await this.databaseService.runInTransaction(async (trx) => {
        const { game_id, account_game_id } = createTeamDto;

        const game = await this.gamesService.findOne(game_id);
        const accountGame = await this.accountGamesService.findOne(
          account_game_id,
          user
        );

        const hasTeam = await this.teamMembersService.hasTeam(game, user);
        if (hasTeam) throw new BadRequestException('Alread has team');

        const team = await trx.manager.getRepository(Teams).save({
          ...createTeamDto,
          game,
          account_game_id: accountGame,
        });

        await trx.manager.getRepository(TeamMembers).save({
          team,
          accountGame,
          game,
          user,
          is_leader: true,
          type: TeamMemberType.CORE,
        });

        return team;
      });
    } catch (e: any) {
      throw e;
    }
  }

  async findAll(): Promise<Teams[]> {
    return await this.teamRepository.find();
  }

  async findAllMe(user: Users): Promise<Teams[]> {
    return await this.teamRepository.find({
      relations: {
        teamMembers: {
          accountGame: true,
        },
      },
      where: {
        teamMembers: {
          user: {
            id: user.id,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Teams> {
    const team = await this.teamRepository.findOne({
      relations: {
        teamMembers: {
          accountGame: true,
        },
      },
      where: { id },
    });
    if (!team) {
      throw new NotFoundException(`Team not found`);
    }
    return team;
  }

  async update(
    id: string,
    updateTeamDto: UpdateTeamDro,
    user: Users
  ): Promise<Teams> {
    const existingTeam = await this.findOne(id);
    const teamData = this.teamRepository.merge(existingTeam, updateTeamDto);

    // TODO : add validation the team related hasn't joined on going tournament
    return await this.teamRepository.save(teamData);
  }

  async remove(id: string): Promise<void> {
    //const result = await this.teamRepository.delete(id);
    //if (result.affected === 0) {
    //  throw new NotFoundException(`Team not found`);
    //}
  }
}
