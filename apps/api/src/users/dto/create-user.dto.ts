import { Optional } from "@nestjs/common";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { IsUnique } from "src/shared/is-unique";

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUnique({ tableName: "User", column: "email" })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
