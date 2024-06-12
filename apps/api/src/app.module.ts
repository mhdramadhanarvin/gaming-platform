import { Module } from '@nestjs/common';
// import { TodosModule } from './todos/todos.module';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
// import { TypeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AppsModule } from './apps/apps.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    // TypeOrmConfig,
    AppsModule,
    // UsersModule,
    // AuthModule
  ],
})
export class AppModule {}
