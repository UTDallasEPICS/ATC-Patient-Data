import { start } from "repl";

export default defineEventHandler(async (event) => {
  const { userId, searchTerm, searchSubmitted } = getQuery(event);

  const user = await event.context.prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    include: {
      StudentProfile: true,
    },
  });

  const startOfDay = new Date(searchTerm);
  let endOfDay = new Date(startOfDay.valueOf() + 86400000);

  let res;

  if(searchTerm){
    res = await event.context.prisma.session.findMany({
      where: {
        studentId: user.StudentProfile.id,
        submitted: searchSubmitted === "true" ? true : false,
        AND: [
          {
            createdAt: {gte: startOfDay},
          },
          {
            createdAt: {lt: endOfDay},
          }
        ]
      },
      include: {
        Employee: {
          include:{
            User: true,
          },
        },
      }
    });
  }
  else {
    res = await event.context.prisma.session.findMany({
      where: {
        studentId: user.StudentProfile.id,
        submitted: searchSubmitted === "true" ? true : false,
      },
      include: {
        Employee: {
          include:{
            User: true,
          },
        },
      }
    });
  }
  

  return {
    statusCode: 200,
    body: res ? res : [],
  };
});
