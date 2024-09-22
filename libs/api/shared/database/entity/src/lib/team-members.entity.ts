import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from './users.entity';
import { Games } from './games.entity';
import { AccountGames } from './account-games.entity';
import { Teams } from './teams.entity';

export enum TeamMemberType {
  CORE = 'core',
  RESERVE = 'reserve',
}

@Entity()
export class TeamMembers extends BaseEntity {
  @ApiProperty({ default: 'b091a6e9-47b1-48a0-ab8f-9a6e50549046' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user_id' })
  @ManyToOne(() => Users, (user) => user.teamMembers)
  user: Users;

  @ApiProperty({ example: 'game_id' })
  @ManyToOne(() => Games, (game) => game.accountGames)
  game: Games;

  @ApiProperty({ example: 'identity_id' })
  @ManyToOne(() => AccountGames, (accountGame) => accountGame.teamMembers)
  accountGame: AccountGames;

  @ApiProperty({ example: 'team_id' })
  @ManyToOne(() => Teams, (team) => team.teamMembers)
  team: Teams;

  @ApiProperty({ example: true })
  @Column()
  is_leader: boolean;

  @ApiProperty({ example: TeamMemberType.CORE, enum: TeamMemberType })
  @Column({
    type: 'enum',
    enum: TeamMemberType,
    default: TeamMemberType.CORE,
  })
  type: TeamMemberType;

  @ApiProperty({ example: '2024-06-17T04:59:30.743Z' })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({ example: '2024-06-17T04:59:30.743Z' })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
