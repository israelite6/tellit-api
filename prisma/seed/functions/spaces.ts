import { PrismaClient } from '@prisma/client';
import spaces from '../data/spaces';

const prisma = new PrismaClient();

export const seedSpaces = () => {
  spaces.forEach(async ({ id, title, description, created_at: createdAt }) => {
    await prisma.space.upsert({
      where: { id },
      update: {},
      create: {
        id,
        title,
        description,
        createdAt,
      },
    });
  });
};
