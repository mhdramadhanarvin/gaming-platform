import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  
  @Entity()
  export class AccountGames extends BaseEntity {
    @ApiProperty({ default: 'b091a6e9-47b1-48a0-ab8f-9a6e50549046' })
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ApiProperty({ example: 'user-id' })
    @Column()
    user_id: string;
  
    @ApiProperty({ example: 'game_id' })
    @Column()
    game_id: string;
  
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
  