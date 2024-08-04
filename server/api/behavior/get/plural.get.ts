export default defineEventHandler(async (event) => {
  const { searchTerm, searchArchived, searchGraduated, id } = getQuery(event);

  const user = await event.context.prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      StudentProfile: true,
    },
  });

  const res = await event.context.prisma.behavior.findMany({
    where: {
      archive: searchArchived === "true" ? true : false,
      graduated: searchGraduated === "true" ? { not: null } : null,
      // Student: {
      //   userId: Number(id),
      // },
      studentId: user.StudentProfile.id,
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          desc: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      Student: {
        include: {
          User: true,
        },
      },
    },
  });

  //filter res based on id
  // const filteredRes = res.filter((behavior) => behavior.Student.User.id === id);

  // return {
  //   statusCode: 200,
  //   body: filteredRes,
  // };

  return {
    statusCode: 200,
    body: res,
  };
});
