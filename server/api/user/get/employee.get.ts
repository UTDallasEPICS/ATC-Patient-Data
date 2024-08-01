export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const res = await event.context.prisma.user.findUnique({
    where: {
      id: Number(id),
      EmployeeProfile: {
        isNot: null,
      },
    },
    include: {
      EmployeeProfile: true,
    },
  });

  return {
    statusCode: 200,
    body: res,
  };
});
