import {
  PrismaClient,
  User,
  StudentProfile,
  EmployeeProfile,
} from "@prisma/client";
const prisma = new PrismaClient();

interface userWithProfiles extends User {
  StudentProfile: StudentProfile | null;
  EmployeeProfile: EmployeeProfile | null;
}

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  if (!id) {
    return {
      message: "User ID is required",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
      archive: false,
    },
    include: {
      StudentProfile: true,
      EmployeeProfile: true,
    },
  });

  if (!user) {
    return {
      message: `No user found`,
    };
  }

  //cleanUser omits either student or employee profiles if they are empty
  const cleanUser: Partial<userWithProfiles> = { ...user };
  if (!user.EmployeeProfile) delete cleanUser.EmployeeProfile;
  if (!user.StudentProfile) delete cleanUser.StudentProfile;

  return cleanUser;
});
