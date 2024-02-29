import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const taz = await prisma.user.create({
    data: {
      first_name: 'Taz',
      last_name: 'Taz',
      email: 'taz@monowarestudios.com',
      phone_number: 'asd',
      EmployeeProfile: {
        create: {
          Role: 'Admin'
        }
      }
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
