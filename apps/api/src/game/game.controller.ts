import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
  } from "@nestjs/common";
  import { CreateGameDto } from "./dto/create-game.dto";
  import { Game } from "./entity/game.entity";
  import { GameService } from "./game.service";
  import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
  
  @ApiTags("Games")
  @Controller("games")
  export class GameController {
    constructor(private readonly gameService: GameService) {}
  
    @Post()
    @ApiOperation({ summary: "Create Game" })
    @ApiCreatedResponse({
      description: "Response for Status OK",
      type: Game,
    })
    create(@Body() createGameDto: CreateGameDto): Promise<Game> {
      return this.gameService.create(createGameDto);
    }
  
    @Get()
    @ApiOperation({ summary: "Get Games" })
    @ApiOkResponse({
      description: "Response for Status OK",
      type: [Game],
    })
    findAll(): Promise<Game[]> {
      return this.gameService.findAll();
    }
  
    @Get(":id")
    @ApiOperation({ summary: "Get Game By ID" })
    @ApiOkResponse({
      description: "Response for Status OK",
      type: Game,
    })
    findOne(@Param("id") id: string): Promise<Game> {
      return this.gameService.findOne(id);
    }
  
    @Delete(":id")
    @ApiOperation({ summary: "Delete Game" })
    @ApiOkResponse({
      description: "Response for Status OK",
    })
    remove(@Param("id") id: number): Promise<void> {
      return this.gameService.remove(id);
    }
  }
  