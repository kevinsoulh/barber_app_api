import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

type User = {
  name: string;
  email: string;
  password: string;
  api_token: string;
};

async function seed() {
  await Promise.all(
    getUsers().map((user) => {
      return db.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          api_token: '',
        },
      });
    })
  );

  const user = await db.user.findFirst({
    where: {
      name: "John Doe",
    },
  });
}

function getUsers(): Array<User> {
  return [
    {
      name: "Jonh",
      email: "jonhdoe@gmail.com",
      password: "123",
      api_token: '',
    },
    {
      name: "Jane",
      email: "janedoe@gmail.com",
      password: "123",
      api_token: '',
    },
  ];
}

seed()
.catch((error) => console.error('Error seeding data:', error))
.finally(async () => {
    await db.$disconnect();
});
