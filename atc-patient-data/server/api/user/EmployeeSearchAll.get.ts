import {
  PrismaClient,
} from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { 
    searchArchive,
  } = getQuery(event);

  const whereClause = {
    NOT: { EmployeeProfile: null },
    archive: JSON.parse(String(searchArchive)),
  }; 

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
