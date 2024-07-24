export default defineEventHandler(async (event) => {
    const { id, sessionAt } = getQuery(event);

    const user = await event.context.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        StudentProfile: true,
      },
    });

    // get behaviors created before the session was
    const res = await event.context.prisma.behavior.findMany({
      where: {
        archive: false,
        studentId: user.StudentProfile.id,
        createdAt: { lt: new Date(String(sessionAt)) }, // behavior creation less than session
      },
      include: {
        Student: {
          include: {
            User: true,
          },
        },
      },
    });

    return {
      statusCode: 200,
      body: res,
    };
  });
  