export default defineEventHandler(async (event) => {
  const { sessionId } = getQuery(event);

  // const user = await event.context.prisma.user.findUnique({
  //   where: {
  //     id: Number(userId),
  //   },
  //   include: {
  //     StudentProfile: true,
  //   },
  // });

  // let res = await event.context.prisma.user.findUnique({
  //   where: {
  //     id: Number(userId),
  //     archive: false,
  //     // StudentProfile: {
  //     //   Sessions: {
  //     //     some: {
  //     //       createdAt: {
  //     //         contains: searchTerm,
  //     //         mode: "insensitive",
  //     //       },
  //     //     },
  //     //   },
  //     // },
  //   },
  //   include: {
  //     StudentProfile: {
  //       include: {
  //         Sessions: {
  //           include: {
  //             Student: {
  //               include: {
  //                 User: true,
  //               },
  //             },
  //             Employee: {
  //               include: {
  //                 User: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  // res = res && res.StudentProfile.Sessions ? res.StudentProfile.Sessions : [];

  const res = await event.context.prisma.session.findUnique({
    where: {
      id: Number(sessionId),
    },
  });

  return {
    statusCode: 200,
    // body: res ? res : [],
    body: res,
  };
});
