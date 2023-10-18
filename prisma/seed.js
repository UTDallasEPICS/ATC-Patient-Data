// run this script with the following command:
// npx prisma db seed

const { PrismaClient } = require("@prisma/client");
const { behaviors } = require("./seed-data.json");
const prisma = new PrismaClient();

async function main() {
  await Promise.all(behaviors.map(b => {
    return prisma.behavior.upsert({
      where: { id: b.id },
      update: {
        name: b.name,
        description: b.description,
        datatype: b.datatype,
        trialsPerEntry: b.trialsPerEntry,
        entries: b.entries,
        tags: b.tags
      },
      create: {
        name: b.name,
        description: b.description,
        datatype: b.datatype,
        trialsPerEntry: b.trialsPerEntry,
        entries: b.entries,
        tags: b.tags
      },
    });
  }));

  // Add other data as required
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
