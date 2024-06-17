import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { IsUnique } from "src/shared/is-unique";

export class CreateUserDto {
  @ApiProperty({ default: "user" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "test@example.com" })
  @IsNotEmpty()
  @IsEmail()
  @IsUnique({ tableName: "User", column: "email" })
  email: string;

  @ApiProperty({ example: "password" })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
