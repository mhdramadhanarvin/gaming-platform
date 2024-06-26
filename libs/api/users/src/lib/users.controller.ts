import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "@gaming-platform/api/shared/database/entity";
import { UsersService } from "./users.service";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: "Create User" })
  @ApiCreatedResponse({
    description: "Response for Status OK",
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Get Users" })
  @ApiOkResponse({
    description: "Response for Status OK",
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get User By ID" })
  @ApiOkResponse({
    description: "Response for Status OK",
    type: User,
  })
  findOne(@Param("id") id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete User" })
  @ApiOkResponse({
    description: "Response for Status OK",
  })
  remove(@Param("id") id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
