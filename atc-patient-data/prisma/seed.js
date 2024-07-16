import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const admin1 = await prisma.user.create({
    data: {
      email: "tushar1@gmail.com",
      firstName: "Tushar1",
      lastName: "Wani",
      phoneNumber: "1234567890",
    },
  });
  const admin1Profile = await prisma.employeeProfile.create({
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
      assignedEmployeeId: admin1Profile.id,
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
      assignedEmployeeId: admin1Profile.id,
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
      assignedEmployeeId: admin1Profile.id,
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