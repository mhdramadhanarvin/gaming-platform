import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RefreshAccessTokenDto {
  @ApiProperty({ default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." })
  @IsNotEmpty()
  refresh_token: string;
}
