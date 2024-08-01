import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const { 
    firstName, 
    lastName, 
    email, 
    phoneNumber, 
    role, 
    archive 
  } = await readBody(event);

  const user = await event.context.prisma.$transaction(
    async (p: PrismaClient) => {
      const updatedUser = await p.user.update({
        where: {
            id: Number(id),
        },
        data: {
          firstName,
          lastName,
          email,
          phoneNumber: String(phoneNumber),
          archive,
        },
      });

      const employeeProfile = await p.employeeProfile.update({
        where: {
            userId: Number(id),
        },
        data: {
          role: role,
        },
      });

      return { ...updatedUser, employeeProfile };
    }
  );

  return {
    statusCode: 201,
    body: user,
  };
});
