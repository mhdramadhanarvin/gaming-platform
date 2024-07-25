import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Teams, Users } from "@gaming-platform/api/shared/database/entity";
import { CreateTeamDto } from "./dto/create-team.dto";
import { UpdateTeamDro } from "./dto/update-team.dto";
import { GamesService } from "@gaming-platform/api/games";

@Injectable()
export class TeamsService {
  constructor(
    private readonly gamesService: GamesService,
    @InjectRepository(Teams) private readonly teamRepository: Repository<Teams>,
  ) { }

  async create(createTeamDto: CreateTeamDto): Promise<Teams> {
    const { team_name, logo, game_id, type } = createTeamDto;
    const game = await this.gamesService.findOne(game_id);

    const team = new Teams();
    team.team_name = team_name;
    team.logo = logo;
    team.game = game;
    team.type = type;

    return await this.teamRepository.save(team);
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
