export default defineEventHandler(async (event) => {
  const { searchTerm, searchGraduated, id } = getQuery(event);
  const res = await event.context.prisma.behavior.findMany({
    where: {
      archive: false,
      graduated: searchGraduated === "true" ? true : false,
      Student: {
        userId: Number(id),
      },
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
