export default defineEventHandler(async (event) => {
  const { userId, searchTerm, searchArchived } = getQuery(event);
  let res = await event.context.prisma.user.findUnique({
    where: {
      id: Number(userId),
      archive: searchArchived === "true" ? true : false,
      // StudentProfile: {
      //   Sessions: {
      //     some: {
      //       createdAt: {
      //         contains: searchTerm,
      //         mode: "insensitive",
      //       },
      //     },
      //   },
      // },
    },
    include: {
      StudentProfile: {
        include: {
          Sessions: {
            include: {
              Student: {
                include: {
                  User: true,
                },
              },
              Employee: {
                include: {
                  User: true,
                },
              },
            },
          },
        },
      },
    },
  });

  res = res && res.StudentProfile.Sessions ? res.StudentProfile.Sessions : [];

  return {
    statusCode: 200,
    body: res ? res : [],
  };
});
