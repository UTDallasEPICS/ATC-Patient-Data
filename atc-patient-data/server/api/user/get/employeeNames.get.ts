import { User } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const employees: User[] = await event.context.prisma.user.findMany({
    where: {
      archive: false,
      EmployeeProfile: {
        isNot: null,
      },
    },
    select: {
      // userId: true,
      id: true,
      firstName: true,
      lastName: true,
    },
  });
  console.log(employees);
  return employees.map((employee) => ({
    id: employee.id,
    name: employee.firstName + " " + employee.lastName,
  }));
});
