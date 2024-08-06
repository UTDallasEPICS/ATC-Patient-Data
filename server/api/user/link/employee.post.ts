export default defineEventHandler(async (event) => {
    const { 
        email, 
        role 
    } = await readBody(event);

    const user = await event.context.prisma.user.findUnique({
        where: {
        email: email,
        }
    });

    const employeeProfile = await event.context.prisma.employeeProfile.create({
    data: {
        role: role,
        userId: user.id,
    },
    });


  return {
    statusCode: 201,
    body: { ...user, employeeProfile },
  };
});
