import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const bob = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      password: "pass",
    },
  });

  const project = await prisma.project.create({
    data: {
      name: "First project",
      userId: bob.id,
    },
  });

  const task = await prisma.task.create({
    data: {
      name: "First task",
      projectId: project.id,
    },
  });

  console.log({ bob, project, task });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
