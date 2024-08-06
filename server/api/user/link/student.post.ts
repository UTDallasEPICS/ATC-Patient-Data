export default defineEventHandler(async (event) => {
    const {
        email,
        dateOfBirth,
        assignedEmployee,
    } = await readBody(event);

    const user = await event.context.prisma.user.findUnique({
        where: {
        email: email,
        }
    });

    const convertedDateOfBirth = new Date(dateOfBirth);

    const employeeProfileId =
    await event.context.prisma.employeeProfile.findFirst({
        where: {
        userId: Number(assignedEmployee.id),
        },
        select: {
        id: true,
        },
    });

    const studentProfile = await event.context.prisma.studentProfile.create({
    data: {
        dob: convertedDateOfBirth,
        assignedEmployeeId: employeeProfileId.id,
        userId: user.id,
    },
    });

    return {
        statusCode: 201,
        body: { ...user, studentProfile },
    };
});
