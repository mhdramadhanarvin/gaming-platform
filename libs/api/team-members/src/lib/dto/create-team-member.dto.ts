import { TeamMemberType } from "@gaming-platform/api/shared/database/entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { randomUUID } from "crypto";

export class CreateTeamMemberDto {
  @ApiProperty({ default: randomUUID })
  @IsNotEmpty()
  @IsString()
  game_id: string;

  @ApiProperty({ default: randomUUID })
  @IsNotEmpty()
  @IsString()
  account_game_id: string;

  @ApiProperty({ default: randomUUID })
  @IsNotEmpty()
  @IsString()
  team_id: string;

  @ApiProperty({ default: true})
  @IsNotEmpty()
  @IsBoolean()
  is_leader: boolean;

  @ApiProperty({ default: TeamMemberType.CORE })
  @IsNotEmpty()
  @IsEnum(TeamMemberType)
  type: TeamMemberType;
}
