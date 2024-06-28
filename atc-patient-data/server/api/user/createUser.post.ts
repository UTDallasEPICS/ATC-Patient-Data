import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    profileType,
    role,
    dob,
    assignedEmployeeId,
  } = await readBody(event);

  let errors = [];
  let createdUser;

  if (!email) errors.push("Email is required");
  if (!firstName) errors.push("First name is required");
  if (!lastName) errors.push("Last name is required");
  if (!phoneNumber) errors.push("Phone number is required");

  if (profileType === "employee") {
    if (!role) errors.push("Role is required for employees");
    else {
      createdUser = prisma.$transaction(async (p) => {
        const newUser = await p.user.create({
          data: {
            email,
            firstName,
            lastName,
            phoneNumber,
          },
        });
        const newEmployee = await p.employeeProfile.create({
          data: {
            role,
            userId: newUser.id,
          },
        });
        return newEmployee;
      });
    }
  } else if (profileType === "student") {
    if (!dob) {
      errors.push("Date of birth is required for students");
    }
    if (!assignedEmployeeId) {
      errors.push("Assigned employee ID is required for students");
    }

    if (errors.length === 0) {
      createdUser = prisma.$transaction(async (p) => {
        const newUser = await prisma.user.create({
          data: {
            email,
            firstName,
            lastName,
            phoneNumber,
          },
        });
        const newStudent = await prisma.studentProfile.create({
          data: {
            dob,
            userId: newUser.id,
            assignedEmployeeId: parseInt(assignedEmployeeId),
          },
        });
        return newStudent;
      });
    }
  } else {
    errors.push("Invalid profileType");
  }

  if (errors.length > 0) {
    return {
      message: "Validation errors",
      errors,
    };
  }

  return createdUser;
});
