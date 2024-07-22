import { PrismaClient } from "@prisma/client/extension";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { behaviorID, sessionID, data, type } = await readBody(event);
  /*let convertedData;

  if (type == "COUNT" || "TRIAL") {
    convertedData = String(data);
  } else if (type == "COUNTARRAY" || "TRIALARRAY") {
    convertedData = "";
    for (let i = 0; i < data.length; i++) {
      convertedData = convertedData + String(data[i]) + ",";
    }
  }

  const behaviorData = await event.context.prisma.behaviorData.findUnique({
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
  }*/

  return {
    statusCode: 200,
  };
});
