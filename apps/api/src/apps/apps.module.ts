import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { TodoRepository } from './repository/todo.repository';
import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';

@Module({
  // imports: [TypeOrmModule.forFeature([TodoRepository])],
  controllers: [AppsController],
  providers: [AppsService]
})
export class AppsModule {}
