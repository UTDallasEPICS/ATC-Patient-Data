// Updating notes in a session

export default defineEventHandler(async (event) => {
  const { sessionId, note } = await readBody(event);

  // Catch an error incase the session is not found
  if (!sessionId) {
    return createError({ statusCode: 201, statusMessage: "Session not found" });
  }

  // updating session notes
  const updatedSession = await event.context.prisma.session.update({
    where: {
      id: Number(sessionId),
    },
    data: {
      note: note,
    },
  });

  return {
    statusCode: 200,
    body: updatedSession,
  };
});
