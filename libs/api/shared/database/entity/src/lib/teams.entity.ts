import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Games } from './games.entity';
import { TeamMembers } from './team-members.entity';

export enum TeamType {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

@Entity()
export class Teams extends BaseEntity {
  @ApiProperty({ default: 'b091a6e9-47b1-48a0-ab8f-9a6e50549046' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Team Name' })
  @Column({ unique: true })
  team_name: string;

  @ApiProperty({ example: 'thumbnail.jpg' })
  @Column()
  logo: string;

  @ApiProperty({ example: TeamType.PUBLIC, enum: TeamType })
  @Column({
    type: 'enum',
    enum: TeamType,
    default: TeamType.PUBLIC,
  })
  type: TeamType;

  @ApiProperty({ example: 'game_id' })
  @ManyToOne(() => Games, (game) => game.teams)
  game: Games;

  @OneToMany(() => TeamMembers, (teamMembers) => teamMembers.team)
  teamMembers: TeamMembers[];

  @ApiProperty({ example: '2024-06-17T04:59:30.743Z' })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({ example: '2024-06-17T04:59:30.743Z' })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
