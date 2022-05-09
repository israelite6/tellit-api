import { PrismaClient } from '@prisma/client';
import { seedForums } from './seed/functions/forum';
import { seedQuestions } from './seed/functions/questions';
import { seedSpaces } from './seed/functions/spaces';
import { seedUsers } from './seed/functions/users';

const prisma = new PrismaClient();

async function main() {
  // seedForums();
  // seedUsers();
  // seedSpaces();
  seedQuestions();
  // const alice = await prisma.forum.upsert({
  //   where: { email: 'alice@prisma.io' },
  //   update: {},
  //   create: {
  //     email: 'alice@prisma.io',
  //     name: 'Alice',
  //     posts: {
  //       create: {
  //         title: 'Check out Prisma with Next.js',
  //         content: 'https://www.prisma.io/nextjs',
  //         published: true,
  //       },
  //     },
  //   },
  // });

  // const bob = await prisma.user.upsert({
  //   where: { email: 'bob@prisma.io' },
  //   update: {},
  //   create: {
  //     email: 'bob@prisma.io',
  //     name: 'Bob',
  //     posts: {
  //       create: [
  //         {
  //           title: 'Follow Prisma on Twitter',
  //           content: 'https://twitter.com/prisma',
  //           published: true,
  //         },
  //         {
  //           title: 'Follow Nexus on Twitter',
  //           content: 'https://twitter.com/nexusgql',
  //           published: true,
  //         },
  //       ],
  //     },
  //   },
  // });
  // console.log({ alice, bob });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
