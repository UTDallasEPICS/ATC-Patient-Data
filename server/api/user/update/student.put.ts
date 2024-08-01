import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { id } = await getQuery(event);
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth,
    assignedEmployee,
    archive,
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

      const studentProfile = await p.studentProfile.update({
        where: {
            userId: Number(id),
        },
        data: {
          dob: convertedDateOfBirth,
          assignedEmployeeId: employeeProfileId.id,
        },
      });

      return { ...updatedUser, studentProfile };
    }
  );

  return {
    statusCode: 201,
    body: user,
  };
});
