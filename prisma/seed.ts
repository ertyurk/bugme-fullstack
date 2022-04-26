import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await db.users.create({
    data: {
      email: "me@ertyurk.com",
      // this is a hashed version of "twixrox"
      name: 'mehmet',
      is_active: true,
      hashedPassword:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });
}

seed();