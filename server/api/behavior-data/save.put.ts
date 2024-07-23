export default defineEventHandler(async (event) => {
  const { behaviorID, sessionID, data, doSubmit } = await readBody(event);

  // check if session is submitted
  const session = await event.context.prisma.session.findMany({
    where: {
      id: sessionID,
    },
    select: {
      submitted: true,
    },
  });

  if (session.submitted) {
    return {
      statusCode: 201,
      body: "Session locked by submit",
    };
  } else {
    // check if the behavior data exists
    const behaviorData = await event.context.prisma.behaviorData.findFirst({
      where: {
        sessionId: Number(sessionID),
        behaviorId: Number(behaviorID),
      },
    });

    if (behaviorData) {
      await event.context.prisma.behaviorData.update({
        where: {
          id: Number(behaviorData.id),
        },
        data: {
          data: data,
        },
      });
    } else {
      await event.context.prisma.behaviorData.create({
        data: {
          sessionId: Number(sessionID),
          behaviorId: Number(behaviorID),
          data: data,
        },
      });
    }
  }

  if (doSubmit === "true") {
    await event.context.prisma.session.update({
      where: {
        id: Number(sessionID),
      },
      data: {
        submitted: true,
      },
    });
  }

  return {
    statusCode: 200,
    body: "Data saved",
  };
});
