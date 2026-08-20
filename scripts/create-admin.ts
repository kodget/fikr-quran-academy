/**
 * Create Admin User Script
 * Creates or updates an admin user in the database
 * 
 * Usage:
 *   npx ts-node scripts/create-admin.ts <email> <password> <name>
 * 
 * Example:
 *   npx ts-node scripts/create-admin.ts admin@fikrquranacademy.com MySecurePass123 "Admin User"
 */

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createAdmin() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4];

  if (!email || !password || !name) {
    console.error("❌ Usage: npx ts-node scripts/create-admin.ts <email> <password> <name>");
    console.error('   Example: npx ts-node scripts/create-admin.ts admin@example.com MyPass123 "Admin User"');
    process.exit(1);
  }

  try {
    // Hash password
    console.log("🔐 Hashing password...");
    const passwordHash = bcrypt.hashSync(password, 10);

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingAdmin) {
      // Update existing admin
      console.log("👤 Admin already exists. Updating...");
      const updatedAdmin = await prisma.admin.update({
        where: { email: email.toLowerCase().trim() },
        data: {
          passwordHash,
          name,
          updatedAt: new Date(),
        },
      });

      console.log("\n✅ Admin updated successfully!");
      console.log(`   ID: ${updatedAdmin.id}`);
      console.log(`   Email: ${updatedAdmin.email}`);
      console.log(`   Name: ${updatedAdmin.name}`);
    } else {
      // Create new admin
      console.log("👤 Creating new admin...");
      const newAdmin = await prisma.admin.create({
        data: {
          email: email.toLowerCase().trim(),
          passwordHash,
          name,
        },
      });

      console.log("\n✅ Admin created successfully!");
      console.log(`   ID: ${newAdmin.id}`);
      console.log(`   Email: ${newAdmin.email}`);
      console.log(`   Name: ${newAdmin.name}`);
    }

    console.log("\n🔑 You can now login at: http://localhost:3000/admin/login");
    console.log(`   Email: ${email}`);
    console.log(`   Password: [the password you provided]`);
  } catch (error) {
    console.error("\n❌ Error creating admin:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
