import {
  PrismaClient,
} from "@prisma/client";
const prisma = new PrismaClient();
import type {
  User,
  StudentProfile,
} from "@prisma/client";

interface userWithProfiles extends User {
  StudentProfile: StudentProfile | null;
}

export default defineEventHandler(async (event) => {
  const { 
    employeeId, // get the employeeId of currently signed in user
  } = getQuery(event);

  // search for user.id
  const whereClause = {
    // restrict with current employee's id
    StudentProfile: { assignedEmployeeId: Number(employeeId) },
    archive: false,
  }; 
  
  const user = await prisma.user.findMany({
    where: whereClause,
    include: {
      StudentProfile: true,
    },
    orderBy: [
      {
        firstName: 'asc'
      },
      {
        lastName: 'asc'
      },
      {
        id: 'asc'
      }
    ],
  });

  if (!user) {
    return {
      message: 'Finished, no user found',
    };
  }

  return user; // returns a single user

});
