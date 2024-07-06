import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const client = new PrismaClient();

async function seed() {
  await client.user.createMany({
    data: Array.from({ length: 100000 }, () => ({
      email: faker.internet.email(),
      name: faker.person.fullName(),
    })),
  });

  await Promise.all([
    client.post.createMany({
      data: Array.from({ length: 1000000 }, () => ({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        authorId: Math.floor(Math.random() * 100000) + 1,
        published: faker.datatype.boolean(),
      })),
    }),
  ]);
}

seed()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
