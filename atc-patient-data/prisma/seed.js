import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// async function main() {
//   const alice = await prisma.user.upsert({
//     where: { email: 'alice@prisma.io' },
//     update: {},
//     create: {
//       email: 'alice@prisma.io',
//       name: 'Alice',
//       posts: {
//         create: {
//           title: 'Check out Prisma with Next.js',
//           content: 'https://www.prisma.io/nextjs',
//           published: true,
//         },
//       },
//     },
//   })
//   const bob = await prisma.user.upsert({
//     where: { email: 'bob@prisma.io' },
//     update: {},
//     create: {
//       email: 'bob@prisma.io',
//       name: 'Bob',
//       posts: {
//         create: [
//           {
//             title: 'Follow Prisma on Twitter',
//             content: 'https://twitter.com/prisma',
//             published: true,
//           },
//           {
//             title: 'Follow Nexus on Twitter',
//             content: 'https://twitter.com/nexusgql',
//             published: true,
//           },
//         ],
//       },
//     },
//   })
//   console.log({ alice, bob })
// }

async function main() {
  const admin1 = await prisma.user.create({
    data: {
      email: "tushar1@gmail.com",
      firstName: "Tushar1",
      lastName: "Wani",
      phoneNumber: "1234567890",
    },
  });
  await prisma.employeeProfile.create({
    data: {
      userId: admin1.id,
      role: "ADMIN",
    },
  });

  const student1 = await prisma.user.create({
    data: {
      email: "student1@gmail.com",
      firstName: "Stu1",
      lastName: "dent",
    },
  });
  await prisma.studentProfile.create({
    data: {
      userId: student1.id,
      dob: new Date("1999-01-01"),
      assignedEmployeeId: admin1.id,
    },
  });

  const student2 = await prisma.user.create({
    data: {
      email: "student2@gmail.com",
      firstName: "Stu2",
      lastName: "dent",
    },
  });
  await prisma.studentProfile.create({
    data: {
      userId: student2.id,
      dob: new Date("1999-01-01"),
      assignedEmployeeId: admin1.id,
    },
  });

  const student3 = await prisma.user.create({
    data: {
      email: "student3@gmail.com",
      firstName: "Stu3",
      lastName: "dent",
    },
  });
  await prisma.studentProfile.create({
    data: {
      userId: student3.id,
      dob: new Date("1999-01-01"),
      assignedEmployeeId: admin1.id,
    },
  });
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
