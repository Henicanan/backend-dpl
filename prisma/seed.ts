import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = ['admin', 'moderator', 'student'];

  for (const roleName of roles) {
    const roleExists = await prisma.role.findUnique({
      where: { name: roleName },
    });

    if (!roleExists) {
      await prisma.role.create({
        data: { name: roleName },
      });
      console.log(`Role ${roleName} created.`);
    } else {
      console.log(`Role ${roleName} already exists.`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
