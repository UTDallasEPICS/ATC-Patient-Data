export default defineEventHandler(async (event) => {
  const { userId, searchStart, searchEnd, searchSubmitted } = getQuery(event);

  const user = await event.context.prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    include: {
      StudentProfile: true,
    },
  });

  const startDay = new Date(searchStart);
  let endDay = new Date(searchEnd);
  endDay = new Date(endDay.valueOf() + 86400000); // add a day to the end day, so that date is included in the search

  const res = await event.context.prisma.session.findMany({
    where: {
      studentId: user.StudentProfile.id,
      submitted: searchSubmitted === "true" ? true : false,
      AND: [
        {
          createdAt: searchStart ? {gte: startDay} : {lt: new Date()}, //no session should exist that is in the future, but if that is an issue, this is the cause
        },
        {
          createdAt: searchEnd ? {lt: endDay} : {lt: new Date()}, // ^
        }
      ]
    },
    include: {
      Employee: {
        include:{
          User: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  

  return {
    statusCode: 200,
    body: res ? res : [],
  };
});
