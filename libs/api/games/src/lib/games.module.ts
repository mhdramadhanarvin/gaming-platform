import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Games } from "@gaming-platform/api/shared/database/entity";
import { GamesService } from "./games.service";
import { GamesController } from "./games.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Games])],
  providers: [GamesService],
  controllers: [GamesController],
  exports: [GamesService],
})
export class GamesModule { }
