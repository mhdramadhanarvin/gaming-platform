import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ default: 'Game Name' })
  @IsNotEmpty()
  @IsString()
  game_name: string;

  @ApiProperty({ default: 'thumbnail.jpg' })
  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @ApiProperty({ default: 4 })
  @IsNotEmpty()
  @IsInt()
  max_player: number;
}
