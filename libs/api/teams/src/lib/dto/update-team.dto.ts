import { PartialType } from '@nestjs/swagger';
import { CreateTeamDto } from './create-team.dto';

export class UpdateTeamDro extends PartialType(CreateTeamDto) {}
