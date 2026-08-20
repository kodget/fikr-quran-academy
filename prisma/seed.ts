/**
 * Prisma Seed Script
 * Automatically seeds the database with initial data
 */

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Get admin credentials from environment variables
  const adminEmail = process.env.ADMIN_EMAIL || "admin@fikrquranacademy.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "changeme123";
  const adminName = process.env.ADMIN_NAME || "Admin User";

  // Hash the password
  console.log("🔐 Hashing admin password...");
  const passwordHash = bcrypt.hashSync(adminPassword, 10);

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail.toLowerCase().trim() },
  });

  if (existingAdmin) {
    console.log("👤 Admin already exists, updating password...");
    await prisma.admin.update({
      where: { email: adminEmail.toLowerCase().trim() },
      data: {
        passwordHash,
        name: adminName,
        updatedAt: new Date(),
      },
    });
    console.log(`✅ Admin updated: ${adminEmail}`);
  } else {
    console.log("👤 Creating admin user...");
    await prisma.admin.create({
      data: {
        email: adminEmail.toLowerCase().trim(),
        passwordHash,
        name: adminName,
      },
    });
    console.log(`✅ Admin created: ${adminEmail}`);
  }

  console.log("🌱 Seed completed successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
