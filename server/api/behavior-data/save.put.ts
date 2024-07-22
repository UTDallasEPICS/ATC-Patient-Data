export default defineEventHandler(async (event) => {
  const { 
    behaviorID, 
    sessionID, 
    data, 
    type, 
    doSubmit, 
  } = await readBody(event);

  // check if session is submitted
  const session = await event.context.prisma.session.findUnique({
    where: {
      id: Number(sessionID),
    },
    select: {
      submitted: true,
    }
  });

  if (session.submitted) {
    return {
      statusCode: 201,
      body: "Session locked by submit",
    };
  }
  else {
    let convertedData;

    if (type == "COUNT" || type == "TRIAL") {
      convertedData = String(data);
      return {};
    } 
    else {
      convertedData = data.join(",");
    }

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
          id: behaviorData.id,
        },
        data: {
          data: convertedData,
        },
      });
    } else {
      await event.context.prisma.behaviorData.create({
        data: {
          sessionId: Number(sessionID),
          behaviorId: Number(behaviorID),
          data: convertedData,
        },
      });
    }
  }

  if (JSON.parse(doSubmit.toLowerCase())) {
    await event.context.prisma.session.update({
      where: {
        id: sessionID,
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
