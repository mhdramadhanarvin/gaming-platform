import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from './environments/environment';
import {
  AccountGames,
  Games,
  RefreshToken,
  TeamMembers,
  Teams,
  Users,
} from '@gaming-platform/api/shared/database/entity';

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
        autoLoadEntities: true,
        entities: [
          Users,
          RefreshToken,
          Games,
          AccountGames,
          Teams,
          TeamMembers,
        ],
      }),
    }),
  ],
})
export class TypeOrmConfig {}
