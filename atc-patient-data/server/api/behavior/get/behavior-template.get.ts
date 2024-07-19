import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { behaviorID } = getQuery(event);

  //Query includes no behaviorID parameter
  if (!behaviorID) {
    return {
      message: "Behavior ID is needed",
    };
  }

  //Fetches template information from database
  const behaviorTemplate = await prisma.behaviorTemplate.findUnique({
    where: {
      id: Number(behaviorID),
      archive: false,
    },
    select: {
      id: true,
      title: true,
      desc: true,
      type: true,
    },
  });

  //BehaviorID entered doesn't exist
  if (!behaviorTemplate) {
    return {
      message: "Behavior template not found",
    };
  }
  return behaviorTemplate;
});
