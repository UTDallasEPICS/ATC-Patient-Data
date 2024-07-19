export default defineEventHandler(async (event) => {
  const {
    title,
    desc,
    type,
    studentId,
    makeIntoTemplateToo = false,
  } = await readBody(event);

  const studentProfile = await event.context.prisma.user.findUnique({
    where: {
      id: studentId,
    },
    include: {
      StudentProfile: true,
    },
  });

  const res = await event.context.prisma.behavior.create({
    data: {
      title,
      desc,
      type: type.id,
      studentId: studentProfile.StudentProfile.id,
    },
  });

  if (makeIntoTemplateToo) {
    const resTemplate = await event.context.prisma.behaviorTemplate.create({
      data: {
        title,
        desc,
        type: type.id,
      },
    });
    await event.context.prisma.behavior.update({
      where: {
        id: res.id,
      },
      data: {
        behaviorTempId: resTemplate.id,
      },
    });
  }

  return {
    statusCode: 200,
    body: res ? res : [],
  };
});
