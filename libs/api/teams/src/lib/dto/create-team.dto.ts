import { TeamType } from "@gaming-platform/api/shared/database/entity";
import { IsUnique } from "@gaming-platform/api/shared/validations";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { randomUUID } from "crypto";

export class CreateTeamDto {
  @ApiProperty({ default: "Team Name" })
  @IsNotEmpty()
  @IsString()
  @IsUnique({ tableName: 'Teams', column: 'team_name' })
  team_name: string;

  @ApiProperty({ default: "logo.jpg" })
  @IsNotEmpty()
  @IsString()
  logo: string;

  @ApiProperty({ default: randomUUID })
  @IsNotEmpty()
  @IsString()
  game_id: string;

  @ApiProperty({ default: randomUUID })
  @IsNotEmpty()
  @IsString()
  account_game_id: string;

  @ApiProperty({ default: TeamType.PUBLIC })
  @IsNotEmpty()
  @IsEnum(TeamType)
  type: TeamType;
}
