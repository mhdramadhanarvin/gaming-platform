import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { RefreshToken } from './refresh-token.entity';
import { AccountGames } from './account-games.entity';
import { TeamMembers } from './team-members.entity';

@Entity()
export class Users extends BaseEntity {
  @ApiProperty({ default: 'b091a6e9-47b1-48a0-ab8f-9a6e50549046' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ default: 'user' })
  @Column()
  name: string;

  @ApiProperty({ example: 'test@example.com' })
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  // @Column({ nullable: true })
  // salt: string;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => AccountGames, (accountGames) => accountGames.user)
  accountGames: AccountGames[];

  @OneToMany(() => TeamMembers, (teamMembers) => teamMembers.user)
  teamMembers: TeamMembers[];

  @ApiProperty({ example: '2024-06-17T04:59:30.743Z' })
  @CreateDateColumn()
  created_at: string;

  @ApiProperty({ example: '2024-06-17T04:59:30.743Z' })
  @UpdateDateColumn()
  updated_at: string;

  //
  // @OneToMany(() => Todo, (todo) => todo.user)
  // todos: Todo[];
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    if (!/^\$2[abxy]?\$\d+\$/.test(this.password)) {
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
