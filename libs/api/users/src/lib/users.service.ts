import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '@gaming-platform/api/shared/database/entity';
import { maskedUser } from '@gaming-platform/api/decorators';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>
  ) {}

  async create(data: Partial<Users>): Promise<Users> {
    const user = this.usersRepository.create(data);
    const insertedUser = await this.usersRepository.save(user);
    return maskedUser(insertedUser);
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<Users | null> {
    const data = await this.usersRepository.findOneBy({ id });

    return data;
  }

  async validateUser(email: string, password: string): Promise<Users | null> {
    const user = await this.usersRepository.findOneBy({ email });

    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
