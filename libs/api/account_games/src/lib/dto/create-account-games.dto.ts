import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountGameDto {
  @ApiProperty({ default: 'user_id' })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({ default: 'name_player' })
  @IsNotEmpty()
  @IsString()
  name_player: string;

  @ApiProperty({ default: 'nickname_player' })
  @IsNotEmpty()
  @IsString()
  nickname_player: string;

  @ApiProperty({ default: 'Game' })
  @IsNotEmpty()
  @IsString()
  game_id: string;

  @ApiProperty({ default: "id_player" })
  @IsNotEmpty()
  @IsString()
  id_player: string;
}
