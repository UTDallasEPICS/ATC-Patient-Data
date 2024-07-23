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
      firstName: "Hishita",
      lastName: "Shah",
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
  const student1Profile = await prisma.studentProfile.create({
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
  const student2Profile = await prisma.studentProfile.create({
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
  const student3Profile = await prisma.studentProfile.create({
    data: {
      userId: student3.id,
      dob: new Date("1999-01-01"),
      assignedEmployeeId: admin1Profile.id,
    },
  });

  const behaviorTemplate1 = await prisma.behaviorTemplate.create({
    data: {
      title: "Behavior Template 1",
      desc: "Behavior Template 1 Description",
      type: "TRIAL",
    },
  });

  const behaviorTemplate2 = await prisma.behaviorTemplate.create({
    data: {
      title: "Behavior Template 2",
      desc: "Behavior Template 2 Description",
      type: "TRIAL",
    },
  });

  const behavior1 = await prisma.behavior.create({
    data: {
      title: "Behavior 1",
      desc: "Behavior 1 Description",
      studentId: student1Profile.id,
      type: "TRIAL",
      behaviorTempId: behaviorTemplate1.id,
    },
  });

  const behavior2 = await prisma.behavior.create({
    data: {
      title: "Behavior 2",
      desc: "Behavior 2 Description",
      studentId: student1Profile.id,
      type: "TRIAL",
      behaviorTempId: behaviorTemplate1.id,
    },
  });

  const behavior3 = await prisma.behavior.create({
    data: {
      title: "Behavior 3",
      desc: "Behavior 3 Description",
      studentId: student1Profile.id,
      type: "TRIAL_ARRAY",
      arrayCount: 5,
      behaviorTempId: behaviorTemplate1.id,
    },
  });

  const behavior4 = await prisma.behavior.create({
    data: {
      title: "Behavior 4",
      desc: "Behavior 4 Description",
      studentId: student2Profile.id,
      type: "TRIAL",
      behaviorTempId: behaviorTemplate2.id,
    },
  });

  const behavior5 = await prisma.behavior.create({
    data: {
      title: "Behavior 5",
      desc: "Behavior 5 Description",
      studentId: student2Profile.id,
      type: "TRIAL",
      behaviorTempId: behaviorTemplate2.id,
    },
  });

  const behavior6 = await prisma.behavior.create({
    data: {
      title: "Behavior 6",
      desc: "Behavior 6 Description",
      studentId: student2Profile.id,
      type: "COUNT_ARRAY",
      arrayCount: 5,
      behaviorTempId: behaviorTemplate2.id,
    },
  });

  const behavior7 = await prisma.behavior.create({
    data: {
      title: "Behavior 7",
      desc: "Behavior 7 Description",
      studentId: student3Profile.id,
      type: "TRIAL",
    },
  });

  const behavior8 = await prisma.behavior.create({
    data: {
      title: "Behavior 8",
      desc: "Behavior 8 Description",
      studentId: student3Profile.id,
      type: "TRIAL",
    },
  });

  const behavior9 = await prisma.behavior.create({
    data: {
      title: "Behavior 9",
      desc: "Behavior 9 Description",
      studentId: student3Profile.id,
      type: "TRIAL",
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
