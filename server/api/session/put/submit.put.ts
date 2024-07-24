export default defineEventHandler(async (event) => {
  const { sessionID } = await readBody(event);

  await event.context.prisma.session.update({
    where: {
      id: Number(sessionID),
    },
    data: {
      submitted: true,
    },
  });

  return {
    statusCode: 200,
    body: "Session submitted",
  };
});
