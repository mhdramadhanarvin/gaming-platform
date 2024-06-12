import { Injectable } from "@nestjs/common";

// import { InjectRepository } from '@nestjs/typeorm';
// import { v4 as uuidv4 } from 'uuid';
// import { CreateTodoDto } from './dto/create-todo.dto';
// import { FilterTodoDto } from './dto/filter-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';
// import { TodoRepository } from './repository/todo.repository';
// import { Todo } from './entity/todo.entity';
// import { title } from 'process';
// import { User } from 'src/users/entity/user.entity';

@Injectable()
export class AppsService {
  // constructor(
  //   @InjectRepository(TodoRepository)
  //   private readonly todoRepository: TodoRepository
  // ) { }

  getApps() {
    return {
      message: "Welcome to Gaming Platform",
      time: new Date().getTime(),
    };
  }
}
