import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  AccountGames,
  Games,
  TeamMemberType,
  TeamMembers,
  TeamType,
  Teams,
  Users,
} from '@gaming-platform/api/shared/database/entity';

export function randomChoice<T>(xs: T[]): T {
  return xs[Math.floor(Math.random() * xs.length)];
}

export async function seedData(dataSource: DataSource): Promise<void> {
  const manager = dataSource.manager;

  console.log('Start Seed Data Users...');
  const seedUser = await manager
    .createQueryBuilder()
    .insert()
    .into(Users)
    .values({
      name: 'User',
      email: 'test@example.com',
      password: await bcrypt.hash('password', await bcrypt.genSalt()),
    })
    .execute();
  console.log('Done Seed Data Users...');

  console.log('Start Seed Data Game...');
  const seedGame = await manager
    .createQueryBuilder()
    .insert()
    .into(Games)
    .values({
      game_name: faker.person.fullName(),
      thumbnail: faker.image.url(),
      max_player: faker.number.int({ min: 1, max: 10 }),
    })
    .execute();
  console.log('Done Seed Data Game...');

  console.log('Start Seed Data Account Game...');
  const seedAccountGame = await manager
    .createQueryBuilder()
    .insert()
    .into(AccountGames)
    .values({
      user: seedUser.identifiers[0],
      game: seedGame.identifiers[0],
      nickname_player: faker.person.fullName(),
      id_player: faker.person.fullName(),
    })
    .execute();
  console.log('Done Seed Data Account Game...');

  console.log('Start Seed Data Team...');
  const seedTeam = await manager
    .createQueryBuilder()
    .insert()
    .into(Teams)
    .values({
      team_name: faker.person.fullName(),
      logo: faker.image.avatar(),
      type: randomChoice([TeamType.PUBLIC, TeamType.PRIVATE]),
      game: seedGame.identifiers[0],
    })
    .execute();
  console.log('Done Seed Data Team...');

  console.log('Start Seed Data Team Member...');
  const seedTeamMember = await manager
    .createQueryBuilder()
    .insert()
    .into(TeamMembers)
    .values({
      is_leader: true,
      type: randomChoice([TeamMemberType.CORE, TeamMemberType.RESERVE]),
      team: seedTeam.identifiers[0],
      user: seedUser.identifiers[0],
      accountGame: seedAccountGame.identifiers[0],
      game: seedGame.identifiers[0],
    })
    .execute();
  console.log('Done Seed Data Team Member...');
}
