import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import * as bcrypt from "bcrypt";
import { RefreshToken } from "src/auth/entity/refresh-token.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ default: "b091a6e9-47b1-48a0-ab8f-9a6e50549046" })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ default: "user" })
  @Column()
  name: string;

  @ApiProperty({ example: "test@example.com" })
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  salt: string;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    eager: true,
  })
  refreshTokens: RefreshToken[];

  @ApiProperty({ example: "2024-06-17T04:59:30.743Z" })
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty({ example: "2024-06-17T04:59:30.743Z" })
  @UpdateDateColumn()
  updatedAt: string;

  //
  // @OneToMany(() => Todo, (todo) => todo.user)
  // todos: Todo[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
