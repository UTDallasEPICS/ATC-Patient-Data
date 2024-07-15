import {
  PrismaClient,
} from "@prisma/client";
const prisma = new PrismaClient();
import type {
  User,
  EmployeeProfile,
} from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { 
    employeeFirst,
    employeeLast,
    searchArchive,
  } = getQuery(event);

  let whereClause;

  // makes either first or last name input optional by changing where clause
  if (!employeeFirst && !employeeLast) {
    return {
      message: 'Error, no name data',
    };
  }

  if (!employeeFirst) {
    // get the student with the search last name, if they are assigned to the employee
    whereClause = {
      lastName: { startsWith:String(employeeLast), mode: 'insensitive',},
      NOT: { EmployeeProfile: null },
      archive: JSON.parse(String(searchArchive)),
    }; 
  }
  else if (!employeeLast) {
    // get the student with the search first name, if they are assigned to the employee
    whereClause = {
      firstName: { startsWith: String(employeeFirst), mode: 'insensitive',},
      NOT: { EmployeeProfile: null },
      archive: JSON.parse(String(searchArchive)),
    }; 
  }
  else{
    // get the student with the search first+last name, if they are assigned to the employee
    whereClause = {
      firstName: { startsWith: String(employeeFirst), mode: 'insensitive',},
      lastName: { startsWith: String(employeeLast), mode: 'insensitive',},
      NOT: { EmployeeProfile: null },
      archive: JSON.parse(String(searchArchive)),
    }; 
  }
  
  
  const user = await prisma.user.findMany({
    where: whereClause,
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
