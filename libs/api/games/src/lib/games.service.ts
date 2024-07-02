import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { Games } from '@gaming-platform/api/shared/database/entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Games) private readonly gameRepository: Repository<Games>
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Games> {
    const game = this.gameRepository.create(createGameDto);
    return await this.gameRepository.save(game);
  }

  async findAll(): Promise<Games[]> {
    return await this.gameRepository.find();
  }

  async findOne(id: string): Promise<Games> {
    const game = await this.gameRepository.findOne({ where: { id } });
    if (!game) {
      throw new NotFoundException(`Game not found`);
    }
    return game;
  }

  async remove(id: number): Promise<void> {
    const result = await this.gameRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Game not found`);
    }
  }
}
