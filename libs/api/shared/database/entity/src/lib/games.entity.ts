import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AccountGames } from './account-games.entity';
import { Teams } from './teams.entity';

@Entity()
export class Games extends BaseEntity {
  @ApiProperty({ default: 'b091a6e9-47b1-48a0-ab8f-9a6e50549046' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Game Name' })
  @Column()
  game_name: string;

  @ApiProperty({ example: 'thumbnail.jpg' })
  @Column()
  thumbnail: string;

  @ApiProperty({ example: 4 })
  @Column()
  max_player: number;

  @OneToMany(() => AccountGames, (accountGames) => accountGames.game)
  accountGames: AccountGames[];

  @OneToMany(() => Teams, (teams) => teams.game)
  teams: Teams[];

  @ApiProperty({ example: '2024-06-17T04:59:30.743Z' })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({ example: '2024-06-17T04:59:30.743Z' })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
