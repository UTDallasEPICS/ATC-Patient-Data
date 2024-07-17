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

  const admin2 = await prisma.user.create({
    data: {
      email: "ahsuna.bajracharya@gmail.com",
      firstName: "Anusha",
      lastName: "Bajracharya",
      phoneNumber: "1234567890",
    },
  });
  const admin2Profile = await prisma.employeeProfile.create({
    data: {
      userId: admin2.id,
      role: "ADMIN",
    },
  });
  const admin3 = await prisma.user.create({
    data: {
      email: "hishita.shah@gmail.com",
      firstName: "hishita",
      lastName: "shah",
      phoneNumber: "123456789",
    },
  });
  const admin3Profile = await prisma.employeeProfile.create({
    data: {
      userId: admin3.id,
      role: "ADMIN",
    },
  });

  const admin4 = await prisma.user.create({
    data: {
      email: "emoryjgrubbs@gmail.com",
      firstName: "Emory",
      lastName: "Grubbs",
      phoneNumber: "1231231234",
    },
  });
  const admin4Profile = await prisma.employeeProfile.create({
    data: {
      userId: admin4.id,
      role: "ADMIN",
    },
  });

  const admin5 = await prisma.user.create({
    data: {
      email: "axc210010@utdallas.edu",
      firstName: "Adrian",
      lastName: "Cortes",
      phoneNumber: "0123456789",
    },
  });
  const admin5Profile = await prisma.employeeProfile.create({
    data: {
      userId: admin5.id,
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
