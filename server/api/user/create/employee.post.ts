import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
  } = await readBody(event);

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
