import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const {
    id,
    email,
    firstName,
    lastName,
    phoneNumber,
    profileType,
    role,
    dob,
    assignedEmployeeId,
  } = await readBody(event);

  if (!id) {
    return {
      message: "User ID is required",
    };
  }

  const userId = Number(id);

  if (isNaN(userId)) {
    return {
      message: "Valid user ID is required",
    };
  }

  // Fetch the existing user with profiles
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      archive: false,
    },
    include: {
      StudentProfile: true,
      EmployeeProfile: true,
    },
  });

  if (!user) {
    return {
      message: `User with ID ${userId} not found`,
    };
  }

  let updatedUser;

  // Update logic based on profileType
  if (profileType === "employee") {
    // Update or create EmployeeProfile
    updatedUser = await prisma.$transaction(async (p) => {
      const updatedUser = await p.user.update({
        where: {
          id: userId,
        },
        data: {
          email,
          firstName,
          lastName,
          phoneNumber,
        },
      });

      if (user.EmployeeProfile) {
        // Update existing EmployeeProfile
        await p.employeeProfile.update({
          where: {
            id: user.EmployeeProfile.id,
          },
          data: {
            role,
          },
        });
      } else {
        // Create new EmployeeProfile
        await p.employeeProfile.create({
          data: {
            role,
            userId: userId,
          },
        });
      }

      // // Delete StudentProfile if exists
      // if (user.StudentProfile) {
      //   await p.studentProfile.delete({
      //     where: {
      //       id: user.StudentProfile.id,
      //     },
      //   });
      // }

      return updatedUser;
    });
  } else if (profileType === "student") {
    // Update or create StudentProfile
    updatedUser = await prisma.$transaction(async (p) => {
      const updatedUser = await p.user.update({
        where: {
          id: userId,
        },
        data: {
          email,
          firstName,
          lastName,
          phoneNumber,
        },
      });

      if (user.StudentProfile) {
        // Update existing StudentProfile
        await p.studentProfile.update({
          where: {
            id: user.StudentProfile.id,
          },
          data: {
            dob,
            assignedEmployeeId: Number(assignedEmployeeId),
          },
        });
      } else {
        // Create new StudentProfile
        await p.studentProfile.create({
          data: {
            dob,
            userId: userId,
            assignedEmployeeId: Number(assignedEmployeeId),
          },
        });
      }

      // // Delete EmployeeProfile if exists
      // if (user.EmployeeProfile) {
      //   await p.employeeProfile.delete({
      //     where: {
      //       id: user.EmployeeProfile.id,
      //     },
      //   });
      // }

      return updatedUser;
    });
  } else {
    return {
      message: "Invalid profileType",
    };
  }

  return updatedUser;
});
