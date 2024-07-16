export default defineEventHandler(async (event) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth,
    assignedEmployee,
  } = await readBody(event);

  const user = await event.context.prisma.$transaction(async (p) => {
    const newUser = await p.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber: String(phoneNumber),
      },
    });

    const convertedDateOfBirth = new Date(dateOfBirth);

    const studentProfile = await p.studentProfile.create({
      data: {
        dob: convertedDateOfBirth,
        assignedEmployeeId: assignedEmployee.id,
        userId: newUser.id,
      },
    });

    return { ...newUser, studentProfile };
  });

  return {
    statusCode: 201,
    body: user,
  };
});
