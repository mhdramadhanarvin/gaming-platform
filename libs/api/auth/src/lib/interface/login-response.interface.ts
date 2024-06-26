import { ApiProperty } from "@nestjs/swagger";

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export class LoginResponseClass implements LoginResponse{
  @ApiProperty({ default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." })
  access_token: string;

  @ApiProperty({ default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." })
  refresh_token: string;
}
