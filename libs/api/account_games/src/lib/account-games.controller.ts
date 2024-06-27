import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateAccountGameDto } from './dto/create-account-games.dto';
import { AccountGames } from '@gaming-platform/api/shared/database/entity';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AccountGamesService } from './account-games.service';

@ApiTags('Account-Games')
@Controller('account-games')
export class AccountGamesController {
  constructor(private readonly gameService: AccountGamesService) {}

  @Post()
  @ApiOperation({ summary: 'Create Game' })
  @ApiCreatedResponse({
    description: 'Response for Status OK',
    type: AccountGames,
  })
  create(@Body() CreateAccountGameDto: CreateAccountGameDto): Promise<AccountGames> {
    return this.gameService.create(CreateAccountGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get Games' })
  @ApiOkResponse({
    description: 'Response for Status OK',
    type: [AccountGames],
  })
  findAll(): Promise<AccountGames[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Game By ID' })
  @ApiOkResponse({
    description: 'Response for Status OK',
    type: AccountGames,
  })
  findOne(@Param('id') id: string): Promise<AccountGames> {
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
