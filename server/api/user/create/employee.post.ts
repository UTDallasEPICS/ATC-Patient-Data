import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { firstName, lastName, email, phoneNumber, role } = await readBody(
    event
  );

  const emailCheck = await event.context.prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      EmployeeProfile: true,
    }
  });

  if(emailCheck) {
    if (firstName == emailCheck.firstName && lastName == emailCheck.lastName && !emailCheck.EmployeeProfile){
      return {
        statusCode: 203,
        message: "POSSIBLE EMAIL IN USE",
      };
    }
    else {
      return {
        statusCode: 202,
        message: "EMAIL IN USE",
      };
    }
  }

  const user = await event.context.prisma.$transaction(
    async (p: PrismaClient) => {
      const newUser = await p.user.create({
        data: {
          firstName,
          lastName,
          email,
          phoneNumber: String(phoneNumber),
        },
      });

      const employeeProfile = await p.employeeProfile.create({
        data: {
          role: role,
          userId: newUser.id,
        },
      });

      return { ...newUser, employeeProfile };
    }
  );

  return {
    statusCode: 201,
    body: user,
  };
});
