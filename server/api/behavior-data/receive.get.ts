export default defineEventHandler(async (event) => {
  const { behaviorID, sessionID } = getQuery(event);
  let res;
  if (behaviorID && sessionID) {
    res = await event.context.prisma.behaviorData.findMany({
      where: {
        AND: {
          sessionId: Number(sessionID),
          behaviorId: Number(behaviorID),
        },
      },
    });
  } else if (sessionID && !behaviorID) {
    res = await event.context.prisma.behaviorData.findMany({
      where: {
        sessionId: Number(sessionID),
      },
    });
  }

  return {
    statusCode: 200,
    body: res,
  };
});
