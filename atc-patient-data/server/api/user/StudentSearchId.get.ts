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
    studentId,
    employeeId, // get the employeeId of currently signed in user
    employeeRole,
    searchArchive,
  } = getQuery(event);

  if (!studentId) {
    return {
      message: 'Error, no id data',
    };
  }

  let whereClause;

  if(String(employeeRole) == 'Admin') {
    // get the student with the search id
    whereClause = {
      id: Number(studentId),
      NOT: { StudentProfile: null },
      archive: JSON.parse(String(searchArchive)),
    }; 
  }
  else{
    // get the student with the search id, if they are assigned to the employee
    whereClause = {
      id: Number(studentId),
      StudentProfile: { assignedEmployeeId: Number(employeeId) }, // use current employee's id to restrict results to students they should have access to
      archive: JSON.parse(String(searchArchive)),
    }; 
  }
  
  const user = await prisma.user.findUnique({
    where: whereClause,
    include: {
      StudentProfile: true,
    },
  });

  if (!user) {
    return {
      message: 'No user found',
    };
  }

  return user; // returns a single user

});
