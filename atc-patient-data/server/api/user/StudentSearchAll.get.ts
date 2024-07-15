import {
  PrismaClient,
} from "@prisma/client";
const prisma = new PrismaClient();
import type {
  User,
  StudentProfile,
} from "@prisma/client";
import { bool } from "prop-types";

interface userWithProfiles extends User {
  StudentProfile: StudentProfile | null;
}

export default defineEventHandler(async (event) => {
  const { 
    employeeId, // get the employeeId of currently signed in user
    employeeRole,
    searchArchive,
  } = getQuery(event);

  let whereClause;

  if(String(employeeRole) == 'Admin') {
    whereClause = {
      NOT: { StudentProfile: null },
      archive: JSON.parse(String(searchArchive)),
    }; 
  }
  else{
    // search for user.id
    whereClause = {
      StudentProfile: { assignedEmployeeId: Number(employeeId) },
      archive: JSON.parse(String(searchArchive)),
    }; 
  }

  const user = await prisma.user.findMany({
    where: whereClause,
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
