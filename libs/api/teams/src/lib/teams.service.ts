import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import {
  TeamMembers,
  TeamMemberType,
  Teams,
  Users,
} from "@gaming-platform/api/shared/database/entity";
import { CreateTeamDto } from "./dto/create-team.dto";
import { UpdateTeamDro } from "./dto/update-team.dto";
import { GamesService } from "@gaming-platform/api/games";
import { TeamMembersService } from "@gaming-platform/api/team-members";
import { CreateTeamMemberDto } from "libs/api/team-members/src/lib/dto/create-team-member.dto";

@Injectable()
export class TeamsService {
  constructor(
    private readonly gamesService: GamesService,
    @Inject(
      forwardRef(() => TeamMembersService),
    ) private readonly teamMembersService: TeamMembersService,
    private dataSource: DataSource,
    @InjectRepository(Teams) private readonly teamRepository: Repository<Teams>,
  ) { }

  getRepository() {
    return this.teamRepository;
  }

  async create(
    createTeamDto: CreateTeamDto,
    user: Users,
  ): Promise<Teams> {
    try {
      return await this.dataSource.transaction(async (trx) => {
        const { game_id, account_game_id } = createTeamDto;
        const game = await this.gamesService.findOne(game_id);

        const team = await trx.withRepository(this.teamRepository).save({
          ...createTeamDto,
          game,
        });

        const teamMember = new CreateTeamMemberDto();
        teamMember.team_id = team.id;
        teamMember.account_game_id = account_game_id;
        teamMember.game_id = game_id;
        teamMember.is_leader = true;
        teamMember.type = TeamMemberType.CORE;

        const teamMemberEntity = await this.teamMembersService.createLogic(
          teamMember,
          user,
          trx,
        );

        await trx.getRepository(TeamMembers).save(teamMemberEntity);
        return team;
      });
    } catch (e: any) {
      throw e;
    }
  }

  async findAll(): Promise<Teams[]> {
    return await this.teamRepository.find();
  }

  async findOne(id: string): Promise<Teams> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException(`Team not found`);
    }
    return team;
  }

  async update(
    id: string,
    updateTeamDto: UpdateTeamDro,
    user: Users,
  ): Promise<Teams> {
    const existingTeam = await this.findOne(id);
    const teamData = this.teamRepository.merge(
      existingTeam,
      updateTeamDto,
    );

    // TODO : add validation the team related hasn't joined on going tournament
    return await this.teamRepository.save(
      teamData,
    );
  }

  async remove(id: string): Promise<void> {
    const result = await this.teamRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Team not found`);
    }
  }
}
