export default defineEventHandler(async (event) => {
  const { userId, searchTerm, searchSubmitted } = getQuery(event);

  const user = await event.context.prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    include: {
      StudentProfile: true,
    },
  });

  const res = await event.context.prisma.session.findMany({
    where: {
      studentId: user.StudentProfile.id,
      submitted: searchSubmitted === "true" ? true : false,
      /* createdAt: {
        contains: searchTerm,
      } */
    },
    include: {
      Employee: {
        include:{
          User: true,
        },
      },
    }
  });

  return {
    statusCode: 200,
    body: res ? res : [],
  };
});
