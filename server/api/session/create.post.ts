export default defineEventHandler(async (event) => {
  const { studentId, employeeId } = await readBody(event);

  const studentProfile = await event.context.prisma.studentProfile.findUnique({
    where: {
      userId: Number(studentId),
    },
  });

  const employeeProfile = await event.context.prisma.employeeProfile.findUnique(
    {
      where: {
        userId: Number(employeeId),
      },
    }
  );

  const res = await event.context.prisma.session.create({
    data: {
      studentId: studentProfile.id,
      employeeId: employeeProfile.id,
      note: "",
    },
  });

  return {
    statusCode: 200,
    body: res,
  };
});
