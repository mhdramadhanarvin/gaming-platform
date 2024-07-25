import { PartialType } from "@nestjs/swagger";
import { CreateTeamMemberDto } from "./create-team-member.dto";

export class UpdateTeamMemberDro extends PartialType(CreateTeamMemberDto) { }
