import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Teams, Users } from '@gaming-platform/api/shared/database/entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from '@gaming-platform/api/decorators';
import { JwtGuard } from '@gaming-platform/api/plugins';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UUIDValidationPipe } from '@gaming-platform/api/shared/validations';
import { UpdateTeamDro } from './dto/update-team.dto';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamService: TeamsService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Team' })
  @ApiCreatedResponse({
    description: 'Response for Status OK',
    type: Teams,
  })
  create(
    @GetUser() user: Users,
    @Body() createTeamDto: CreateTeamDto
  ): Promise<Teams> {
    return this.teamService.create(createTeamDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get Teams' })
  @ApiOkResponse({
    description: 'Response for Status OK',
    type: [Teams],
  })
  findAll(@GetUser() user: Users): Promise<Teams[]> {
    return this.teamService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Team By ID' })
  @ApiOkResponse({
    description: 'Response for Status OK',
    type: Teams,
  })
  findOne(@Param('id') id: string): Promise<Teams> {
    return this.teamService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Team' })
  @ApiOkResponse({
    description: 'Response for Status OK',
  })
  async update(
    @GetUser() user: Users,
    @Param('id', UUIDValidationPipe) id: string,
    @Body() updateTeamDto: UpdateTeamDro
  ) {
    return await this.teamService.update(id, updateTeamDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Team' })
  @ApiOkResponse({
    description: 'Response for Status OK',
  })
  remove(
    @GetUser() user: Users,
    @Param('id', UUIDValidationPipe) id: string
  ): Promise<void> {
    return this.teamService.remove(id);
  }
}
