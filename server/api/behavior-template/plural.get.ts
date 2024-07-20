export default defineEventHandler(async (event) => {
  const { searchTerm, searchArchived } = getQuery(event);
  const res = await event.context.prisma.behaviorTemplate.findMany({
    where: {
      archive: searchArchived === "true" ? true : false,
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
  });

  return {
    statusCode: 200,
    body: res ? res : [],
  };
});
