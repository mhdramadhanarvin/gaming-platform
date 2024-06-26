import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Games } from '@gaming-platform/api/shared/database/entity';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GamesService } from './games.service';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Create Game' })
  @ApiCreatedResponse({
    description: 'Response for Status OK',
    type: Games,
  })
  create(@Body() createGameDto: CreateGameDto): Promise<Games> {
    return this.gameService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get Games' })
  @ApiOkResponse({
    description: 'Response for Status OK',
    type: [Games],
  })
  findAll(): Promise<Games[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Game By ID' })
  @ApiOkResponse({
    description: 'Response for Status OK',
    type: Games,
  })
  findOne(@Param('id') id: string): Promise<Games> {
    return this.gameService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Game' })
  @ApiOkResponse({
    description: 'Response for Status OK',
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.gameService.remove(id);
  }
}
