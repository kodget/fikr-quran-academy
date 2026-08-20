/**
 * Utility script to generate password hash for admin user
 * Run with: npx ts-node scripts/hash-password.ts your-password-here
 */

import * as bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npx ts-node scripts/hash-password.ts <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("\nPassword hash generated successfully!");
console.log("\nAdd this to your .env file:");
console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
console.log("");
