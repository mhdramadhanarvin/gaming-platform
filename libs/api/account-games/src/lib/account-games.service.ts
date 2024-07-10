import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountGameDto } from "./dto/create-account-games.dto";
import {
  AccountGames,
  Users,
} from "@gaming-platform/api/shared/database/entity";
import { GamesService } from "@gaming-platform/api/games";
import { UpdateAccountGameDto } from "./dto/update-account-games.dto";

@Injectable()
export class AccountGamesService {
  constructor(
    private readonly gamesService: GamesService,
    @InjectRepository(AccountGames) private readonly accountGameRepository:
      Repository<AccountGames>,
  ) { }

  async create(
    createAccountGameDto: CreateAccountGameDto,
    user: Users,
  ): Promise<AccountGames> {
    const { id_player, nickname_player, game_id } = createAccountGameDto;

    const game = await this.gamesService.findOne(game_id);

    const accountGame = new AccountGames();
    accountGame.nickname_player = nickname_player;
    accountGame.id_player = id_player;
    accountGame.user = user;
    accountGame.game = game;

    return await this.accountGameRepository.save(accountGame);
  }

  async findAll(user: Users): Promise<AccountGames[]> {
    return await this.accountGameRepository.find({
      where: { user: { id: user.id } },
      relations: ["game"],
      select: {
        id: true,
        nickname_player: true,
        id_player: true,
        created_at: true,
        updated_at: true,
        game: {
          id: true,
          game_name: true,
        },
      },
    });
  }

  async findOne(
    id: string,
    user: Users,
  ): Promise<AccountGames> {
    const game = await this.accountGameRepository.findOne({
      where: {
        id,
        user: {
          id: user.id
        }
      },
      relations: {
        game: true
      }
    });
    if (!game) {
      throw new NotFoundException(`Account game not found`);
    }
    return game;
  }

  async update(
    id: string,
    updateAccountGameDto: UpdateAccountGameDto,
    user: Users,
  ): Promise<AccountGames> {

    const existingUsers = await this.findOne(id, user);
    const userData = this.accountGameRepository.merge(
      existingUsers,
      updateAccountGameDto,
    );

    // TODO : add validation the team related hasn't joined on going tournament
    return await this.accountGameRepository.save(
      userData,
    );
  }

  async remove(
    id: string,
    user: Users,
  ): Promise<void> {
    await this.findOne(id, user);

    // TODO : add validation if connected to team member
    await this.accountGameRepository.delete(id);
  }
}
