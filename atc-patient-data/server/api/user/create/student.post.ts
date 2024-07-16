export default defineEventHandler(async (event) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth,
    assignedEmployee,
  } = await readBody(event);

  const user = await event.context.prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      phoneNumber: String(phoneNumber),
    },
  });

  const convertedDateOfBirth = new Date(dateOfBirth);

  const studentProfile = await event.context.prisma.studentProfile.create({
    data: {
      dob: convertedDateOfBirth,
      assignedEmployeeId: assignedEmployee.id,
      userId: user.id,
    },
  });

  return {
    statusCode: 201,
    body: studentProfile,
  };
});
