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

  @Entity()
  export class AccountGames extends BaseEntity {
    @ApiProperty({ default: 'b091a6e9-47b1-48a0-ab8f-9a6e50549046' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'user-id' })
    @ManyToOne(() => Users, (user) => user.accountGames)
    user: Users;

    @ApiProperty({ example: 'game_id' })
    @ManyToOne(() => Games, (game) => game.accountGames)
    game: Games;

    @ApiProperty({ example: 4 })
    @Column()
    nickname_player: string;

    @ApiProperty({ example: 'id_player'})
    @Column()
    id_player:string;

    @ApiProperty({ example: '2024-06-17T04:59:30.743Z' })
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @ApiProperty({ example: '2024-06-17T04:59:30.743Z' })
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
  }

