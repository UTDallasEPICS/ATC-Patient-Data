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
    studentFirst,
    studentLast,
    employeeId, // get the employeeId of currently signed in user
    employeeRole,
    searchArchive,
  } = getQuery(event);

  let whereClause;

  // makes either first or last name input optional by changing where clause
  if (!studentFirst && !studentLast) {
    return {
      message: 'Error, no name data',
    };
  }

  if(String(employeeRole) == 'Admin') {
    if (!studentFirst) {
      // get the student with the search last name
      whereClause = {
        lastName: { startsWith:String(studentLast), mode: 'insensitive',},
        NOT: { StudentProfile: null },
        archive: JSON.parse(String(searchArchive)),
      }; 
    }
    else if (!studentLast) {
      // get the student with the search first name
      whereClause = {
        firstName: { startsWith: String(studentFirst), mode: 'insensitive',},
        NOT: { StudentProfile: null },
        archive: JSON.parse(String(searchArchive)),
      }; 
    }
    else{
      // get the student with the search first+last name
      whereClause = {
        firstName: { startsWith: String(studentFirst), mode: 'insensitive',},
        lastName: { startsWith: String(studentLast), mode: 'insensitive',},
        NOT: { StudentProfile: null },
        archive: JSON.parse(String(searchArchive)),
      }; 
    }
  }
  else{ 
    if (!studentFirst) {
      // get the student with the search last name, if they are assigned to the employee
      whereClause = {
        lastName: { startsWith:String(studentLast), mode: 'insensitive',},
        StudentProfile: { assignedEmployeeId: Number(employeeId) },  // use current employee's id to restrict results to students they should have access to
        archive: JSON.parse(String(searchArchive)),
      }; 
    }
    else if (!studentLast) {
      // get the student with the search first name, if they are assigned to the employee
      whereClause = {
        firstName: { startsWith: String(studentFirst), mode: 'insensitive',},
        StudentProfile: { assignedEmployeeId: Number(employeeId) },  // use current employee's id to restrict results to students they should have access to
        archive: JSON.parse(String(searchArchive)),
      }; 
    }
    else{
      // get the student with the search first+last name, if they are assigned to the employee
      whereClause = {
        firstName: { startsWith: String(studentFirst), mode: 'insensitive',},
        lastName: { startsWith: String(studentLast), mode: 'insensitive',},
        StudentProfile: { assignedEmployeeId: Number(employeeId) },  // use current employee's id to restrict results to students they should have access to
        archive: JSON.parse(String(searchArchive)),
      }; 
    }
  }
  
  
  const user = await prisma.user.findMany({
    where: whereClause,
    include: {
      StudentProfile: true,
    },
    orderBy: {
      id: 'asc'
    },
  });

  if (!user) {
    return {
      message: `No user found`,
    };
  }

  return user; // returns a list of users with the search name

});
