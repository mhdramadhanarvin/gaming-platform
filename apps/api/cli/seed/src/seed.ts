import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";

export async function seedData(dataSource: DataSource): Promise<void> {
  await dataSource.manager.transaction(async (manager: any) => {
    const seedUser = manager
      .createQueryBuilder()
      .insert()
      .into("users")
      .values({
        id: randomUUID(),
        name: "User",
        email: "test@example.com",
        password: await bcrypt.hash(
          "password",
          await bcrypt.genSalt(),
        ),
      })
      .execute();

    const seedGame = manager
      .createQueryBuilder()
      .insert()
      .into("games")
      .values({
        id: randomUUID(),
        game_name: faker.person.fullName(),
        thumbnail: faker.image.url(),
        max_player: faker.number.int({ min: 1, max: 10 }),
      })
      .execute();

    const getUser = await manager
      .createQueryBuilder()
      .select("id")
      .from("users")
      .execute();

    const getGame = await manager
      .createQueryBuilder()
      .select("id")
      .from("games")
      .execute();

    const seedAccountGame = manager
      .createQueryBuilder()
      .insert()
      .into("account_games")
      .values({
        id: randomUUID(),
        userId: getUser[0].id,
        gameId: getGame[0].id,
        nickname_player: faker.person.fullName(),
        id_player: faker.person.fullName(),
      })
      .execute();
  });
}
