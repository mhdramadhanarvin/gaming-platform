import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { User } from "@gaming-platform/api/shared/database/entity";
import { UsersService } from "./users.service";
import { JwtGuard } from "@gaming-platform/api/plugins";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@ApiBearerAuth()
@Controller("users")
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(":id")
  @ApiOperation({ summary: "Get User By ID" })
  @ApiOkResponse({
    description: "Response for Status OK",
    type: User,
  })
  findOne(@Param("id") id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }
}
