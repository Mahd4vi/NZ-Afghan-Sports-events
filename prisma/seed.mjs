// Seed a demo login. Run with: npm run db:seed
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const email = "admin@nzafghansports.nz";
const password = "ChangeMe123!";

const password_hash = await bcrypt.hash(password, 12);

const user = await prisma.user.upsert({
  where: { email },
  update: {},
  create: { email, name: "NZASE Admin", password: password_hash },
});

console.log("✓ Seeded user:", user.email);
console.log("  Password:", password);

await prisma.$disconnect();
