export default defineEventHandler(async (event) => {
  const { behaviorID, sessionID, data, type, submitted } = await readBody(
    event
  );
  const session = await event.context.prisma.session.findUnique({
    where: {
      id: Number(sessionID),
    },
  });

  if (!session.submitted) {
    let convertedData;

    if (type == "COUNT" || type == "TRIAL") {
      convertedData = String(data);
      return {};
      /*return {
        statusCode: 400,
      };*/
    } else if (type == "COUNTARRAY" || type == "TRIALARRAY") {
      convertedData = "";
      for (let i = 0; i < data.length; i++) {
        convertedData = convertedData + String(data[i]) + ",";
      }

      /*return {
        body: convertedData,
        statusCode: 300,
      };*/
    }

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

  if (Boolean(submitted)) {
    await event.context.prisma.session.update({
      where: {
        id: sessionID,
      },
      data: {
        submitted: true,
      },
    });
  }

  /*return {
    body: submitted,
    statusCode: 300,
  };*/
  return {
    statusCode: 200,
  };
});
