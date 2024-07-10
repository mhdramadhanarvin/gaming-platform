import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreateAccountGameDto } from "./dto/create-account-games.dto";
import {
  AccountGames,
  Users,
} from "@gaming-platform/api/shared/database/entity";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccountGamesService } from "./account-games.service";
import { GetUser } from "@gaming-platform/api/decorators";
import { JwtGuard } from "@gaming-platform/api/plugins";
import { UUIDValidationPipe } from "@gaming-platform/api/shared/validations";
import { UpdateAccountGameDto } from "./dto/update-account-games.dto";

@ApiTags("Account Games")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("account-games")
export class AccountGamesController {
  constructor(private readonly gameService: AccountGamesService) { }

  @Post()
  @ApiOperation({ summary: "Create Account Game" })
  @ApiCreatedResponse({
    description: "Response for Status OK",
    type: AccountGames,
  })
  create(
    @GetUser() user: Users,
    @Body() CreateAccountGameDto: CreateAccountGameDto,
  ): Promise<AccountGames> {
    return this.gameService.create(CreateAccountGameDto, user);
  }

  @Get()
  @ApiOperation({ summary: "Get Games" })
  @ApiOkResponse({
    description: "Response for Status OK",
    type: [AccountGames],
  })
  findAll(@GetUser() user: Users): Promise<AccountGames[]> {
    return this.gameService.findAll(user);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Game By ID" })
  @ApiOkResponse({
    description: "Response for Status OK",
    type: AccountGames,
  })
  findOne(
    @GetUser() user: Users,
    @Param("id", UUIDValidationPipe) id: string,
  ): Promise<AccountGames> {
    return this.gameService.findOne(id, user);
  }

  @Patch(":id")
  async update(
    @GetUser() user: Users,
    @Param("id", UUIDValidationPipe) id: string,
    @Body() UpdateAccountGameDto: UpdateAccountGameDto,
  ) {
    return await this.gameService.update(
      id,
      UpdateAccountGameDto,
      user,
    );
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Game" })
  @ApiOkResponse({
    description: "Response for Status OK",
  })
  remove(
    @GetUser() user: Users,
    @Param("id", UUIDValidationPipe) id: string,
  ): Promise<void> {
    return this.gameService.remove(id, user);
  }
}
