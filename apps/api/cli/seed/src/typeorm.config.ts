import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { environment } from "./environments/environment";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "mysql",
        host: environment.database.host,
        port: parseInt(environment.database.port),
        username: environment.database.username,
        password: environment.database.password,
        database: environment.database.dbname,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class TypeOrmConfig { }
