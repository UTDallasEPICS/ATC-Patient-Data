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
        OR: [
          {
            graduated: { gte: new Date(String(sessionAt)) }, // behavior gratudated at session or after session
          },
          {
            graduated: null,
          }
        ]
      },
      include: {
        Student: {
          include: {
            User: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    return {
      statusCode: 200,
      body: res,
    };
  });
  