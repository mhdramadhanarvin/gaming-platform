import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entity/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;

    const user = new User();
    const salt = await bcrypt.genSalt(10);

    user.name = name;
    user.email = email;
    user.salt = salt;
    user.password = await bcrypt.hash(password, salt);

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findOnByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });

    if (user && (await user.validatePassword(password))) {
      return user
    }

    return null;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
