export default defineEventHandler(async (event) => {
  // console.log("event", event);
  const { searchTerm, searchArchived } = getQuery(event);
  console.log("searchTerm", searchTerm);
  const res = await event.context.prisma.user.findMany({
    where: {
      archive: searchArchived === "true" ? true : false,
      EmployeeProfile: {
        isNot: null,
      },
      OR: [
        {
          firstName: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      EmployeeProfile: true
    },
  });

  console.log(res);

  return {
    statusCode: 200,
    body: res,
  };
});
