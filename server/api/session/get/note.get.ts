export default defineEventHandler(async (event) => {
  const { sessionId } = getQuery(event);

  // Catch an error incase the session is not found
  if (!sessionId) {
    return createError({ statusCode: 201, statusMessage: "Session not found" });
  }

  // updating session notes
  const session = await event.context.prisma.session.findMany({
    where: {
      id: Number(sessionId),
    },
  });

  console.log(session);

  return {
    statusCode: 200,
    body: { note: session[0].note },
  };
});
