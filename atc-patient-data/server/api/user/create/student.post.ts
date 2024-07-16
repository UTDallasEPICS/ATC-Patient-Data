import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth,
    assignedEmployee,
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

      const convertedDateOfBirth = new Date(dateOfBirth);

      const employeeProfileId =
        await event.context.prisma.employeeProfile.findFirst({
          where: {
            userId: Number(assignedEmployee.id),
          },
          select: {
            id: true,
          },
        });

      const studentProfile = await p.studentProfile.create({
        data: {
          dob: convertedDateOfBirth,
          assignedEmployeeId: employeeProfileId.id,
          userId: newUser.id,
        },
      });

      return { ...newUser, studentProfile };
    }
  );

  return {
    statusCode: 201,
    body: user,
  };
});
