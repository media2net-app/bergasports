import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const USERS = [
  {
    email: "chiel@media2net.nl",
    name: "Chiel",
    role: "ADMIN"
  },
  {
    email: "ingmar@bergasports.com",
    name: "Ingmar",
    role: "MANAGER"
  }
];

const PASSWORD_PLAIN = "D4shb0ard2025!";

async function main() {
  const passwordHash = await hash(PASSWORD_PLAIN, 12);

  for (const user of USERS) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        role: user.role,
        passwordHash
      },
      create: {
        email: user.email,
        name: user.name,
        role: user.role,
        passwordHash
      }
    });
  }

  console.log(`Seeded ${USERS.length} users with updated password.`);
}

main()
  .catch((error) => {
    console.error("Failed to seed users", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
