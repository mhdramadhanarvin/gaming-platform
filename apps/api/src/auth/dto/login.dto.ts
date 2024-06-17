import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @ApiProperty({ default: "test@example.com" })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: "password" })
  @IsNotEmpty()
  password: string;
}
