import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entity/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RefreshToken extends BaseEntity {
  @ApiProperty({ default: "b091a6e9-47b1-48a0-ab8f-9a6e50549046" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ default: true })
  @Column()
  isRevoked: boolean;

  @ApiProperty({ default: new Date})
  @Column()
  expiredAt: Date;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;

  @ApiProperty({ example: "2024-06-17T04:59:30.743Z" })
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty({ example: "2024-06-17T04:59:30.743Z" })
  @UpdateDateColumn()
  updatedAt: string;

}
