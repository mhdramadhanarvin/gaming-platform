import { PartialType } from '@nestjs/swagger';
import { CreateAccountGameDto } from './create-account-games.dto';

export class UpdateAccountGameDto extends PartialType(CreateAccountGameDto) {}
