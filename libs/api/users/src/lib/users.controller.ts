import {
  Controller,
  Get,
  Param,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Users } from '@gaming-platform/api/shared/database/entity';
import { UsersService } from './users.service';
import { JwtGuard } from '@gaming-platform/api/plugins';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from '@gaming-platform/api/decorators';
import { UUIDValidationPipe } from '@gaming-platform/api/shared/validations';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get User By ID' })
  @ApiOkResponse({
    description: 'Response for Status OK',
    type: Users,
  })
  findOne(
    @GetUser() user: Users,
    @Param('id', UUIDValidationPipe) id: string
  ): Promise<Users | null> {
    if (user.id !== id) throw new UnauthorizedException();

    return this.usersService.findOne(id);
  }
}
