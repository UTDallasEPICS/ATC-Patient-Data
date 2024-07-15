import {
  PrismaClient,
} from "@prisma/client";
const prisma = new PrismaClient();
import type {
  User,
  StudentProfile,
  Behavior,
  Session,
  BehaviorData,
} from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { 
    studentId,
  } = getQuery(event);

  if (!studentId) {
    return {
      message: 'Error, no id data',
    };
  }

  const whereClause = {
    id: Number(studentId),
    NOT: { StudentProfile: null }, // use current employee's id to restrict results to students they should have access to
  }; 

  const includeClause = {
    StudentProfile: {
      include: {
        Behaviors: true,
        Sessions: {
          include: { 
            Data: true,
          }
        }
      }
    }
  }
  
  const user = await prisma.user.findUnique({
    where: whereClause,
    include: includeClause,
  });

  if (!user) {
    return {
      message: 'No user found',
    };
  }

  return user;

});
