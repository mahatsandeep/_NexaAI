import bcrypt from "bcryptjs";

import { prisma } from "../src/lib/prisma";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@m2-ai.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user already exists: ${email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { name: "Admin", email, password: hashedPassword, role: "ADMIN" },
  });

  console.log(`Created admin user: ${email} (password: ${password}) — change this after first login.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
