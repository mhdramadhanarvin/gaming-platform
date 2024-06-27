import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountGameDto } from './dto/create-account-games.dto';
import { AccountGames } from '@gaming-platform/api/shared/database/entity';

@Injectable()
export class AccountGamesService {
  constructor(
    @InjectRepository(AccountGames) private readonly gameRepository: Repository<AccountGames>
  ) {}

  async create(CreateAccountGameDto: CreateAccountGameDto): Promise<AccountGames> {
    const game = this.gameRepository.create(CreateAccountGameDto);
    return await this.gameRepository.save(game);
  }

  async findAll(): Promise<AccountGames[]> {
    return await this.gameRepository.find();
  }

  async findOne(id: string): Promise<AccountGames> {
    const game = await this.gameRepository.findOne({ where: { id } });
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    return game;
  }

  async remove(id: number): Promise<void> {
    const result = await this.gameRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
  }
}
