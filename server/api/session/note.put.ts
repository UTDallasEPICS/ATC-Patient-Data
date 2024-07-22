// Updating notes in a session

export default defineEventHandler(async (event) => {
    const { sessionId, noteData } = await readBody(event);
    
    // Catch an error incase the session is not found
    if (!sessionId) { return createError({ statusCode: 201, statusMessage: "Session not found"}); }
    
    // updating session notes 
    const updatedSession = await event.context.prisma.Session.update({
        where: {
            id: Number(sessionId),
        },
        data: {
            note: noteData,
        },
    });

    return {
      statusCode: 200,
      body: updatedSession,
    };
  });
  