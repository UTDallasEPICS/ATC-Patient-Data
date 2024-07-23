export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const res = await event.context.prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  return {
    statusCode: 200,
    body: res,
  };
});
