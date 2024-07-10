/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { DataSource } from 'typeorm'
import { NestFactory } from '@nestjs/core'
import { seedData } from './seed';
import { TypeOrmConfig } from './typeorm.config';

async function runSeed() {
  const app = await NestFactory.create(TypeOrmConfig);
  const dataSource = app.get(DataSource);
  await seedData(dataSource);
  await app.close();
}

runSeed();
