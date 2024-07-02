import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateAccountGameDto {
  @ApiProperty({ default: 'nickname_player' })
  @IsNotEmpty()
  @IsString()
  nickname_player: string;

  @ApiProperty({ default: "id_player" })
  @IsNotEmpty()
  @IsString()
  id_player: string;

  @ApiProperty({ default: randomUUID,  })
  @IsNotEmpty()
  @IsString()
  game_id: string;
}
