import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { DatabaseService } from '@gaming-platform/api/shared/database';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: environment.database.host,
        port: parseInt(environment.database.port),
        username: environment.database.username,
        password: environment.database.password,
        database: environment.database.dbname,
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class TypeOrmConfig {}
