import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsUnique } from '@gaming-platform/api/shared/validations';

export class SignUpDto {
  @ApiProperty({ default: 'user' })
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'test@example.com' })
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @IsUnique({ tableName: 'Users', column: 'email' })
  email: string;

  @ApiProperty({ example: 'password' })
  @IsDefined()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
