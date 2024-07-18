import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import type {
  User,
  StudentProfile,
  Behavior,
  Session,
  BehaviorData,
} from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  if (!id) {
    return {
      message: "Error, no id data",
    };
  }

  const whereClause = {
    id: Number(id),
    NOT: { StudentProfile: null }, // use current employee's id to restrict results to students they should have access to
  };

  const includeClause = {
    StudentProfile: {
      include: {
        Behaviors: true,
        Sessions: {
          include: {
            Data: true,
          },
        },
      },
    },
  };

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
      NOT: { StudentProfile: null }, // use current employee's id to restrict results to students they should have access to
    },
    include: {
      StudentProfile: {
        include: {
          AssignedEmployee: {
            include: {
              User: true,
            },
          },
          Behaviors: true,
          Sessions: {
            include: {
              Data: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return {
      message: "No user found",
    };
  }

  return user;
});
