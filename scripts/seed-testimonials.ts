/**
 * Seed Testimonials Script
 * Populates the database with initial testimonials from the homepage
 * 
 * Usage:
 *   npx ts-node scripts/seed-testimonials.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const testimonials = [
  {
    name: "Aisha Mahmoud",
    role: "Parent",
    country: "Nigeria",
    text: "Fikr Quran Academy transformed my daughter's relationship with the Qur'an. Within 3 months she went from struggling to confidently reciting entire surahs. The teachers are patient, knowledgeable, and truly invested in each child.",
    rating: 5,
    published: true,
    order: 1,
  },
  {
    name: "Yusuf Al-Hassan",
    role: "Adult Learner",
    country: "United Kingdom",
    text: "As an adult learner who always felt behind, Fikr gave me structured Tajweed lessons that fit around my work schedule. The 1-on-1 format means I can go at my own pace without any pressure.",
    rating: 5,
    published: true,
    order: 2,
  },
  {
    name: "Fatima Okonkwo",
    role: "Parent of two",
    country: "Canada",
    text: "Both my children attend different programmes. The academy's structure is excellent — each class has clear goals and I receive weekly progress reports. It feels like a proper school, just online.",
    rating: 5,
    published: true,
    order: 3,
  },
  {
    name: "Ibrahim Sule",
    role: "Hifz Student",
    country: "Ghana",
    text: "I have been in the Hifz programme for 8 months. The revision system keeps everything fresh in my memory. My teacher remembers every verse I struggle with and we focus there every session.",
    rating: 5,
    published: true,
    order: 4,
  },
  {
    name: "Khadijah Umar",
    role: "Parent",
    country: "Nigeria",
    text: "The free assessment before enrolment was brilliant — they placed my son in exactly the right level. He has not missed a single class in four months. That says everything about how much he enjoys it.",
    rating: 5,
    published: true,
    order: 5,
  },
];

async function seedTestimonials() {
  try {
    console.log("🌱 Seeding testimonials...\n");

    // Check if testimonials already exist
    const existingCount = await prisma.testimonial.count();
    
    if (existingCount > 0) {
      console.log(`⚠️  Database already has ${existingCount} testimonials.`);
      console.log("Do you want to:");
      console.log("  1. Skip seeding (keep existing testimonials)");
      console.log("  2. Add new testimonials anyway");
      console.log("  3. Clear all and reseed");
      console.log("\nTo clear and reseed, run: npx ts-node scripts/seed-testimonials.ts --clear\n");
      return;
    }

    let seeded = 0;
    for (const testimonial of testimonials) {
      await prisma.testimonial.create({
        data: testimonial,
      });
      seeded++;
      console.log(`✅ Added: ${testimonial.name} (${testimonial.country})`);
    }

    console.log(`\n🎉 Successfully seeded ${seeded} testimonials!`);
    console.log(`\nYou can now manage them at: http://localhost:3000/admin/testimonials`);
  } catch (error) {
    console.error("\n❌ Error seeding testimonials:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Handle --clear flag
async function clearAndSeed() {
  try {
    console.log("🗑️  Clearing existing testimonials...\n");
    const deleted = await prisma.testimonial.deleteMany({});
    console.log(`Deleted ${deleted.count} existing testimonials.\n`);
    
    await seedTestimonials();
  } catch (error) {
    console.error("\n❌ Error clearing testimonials:", error);
    process.exit(1);
  }
}

// Check for --clear flag
const clearFlag = process.argv.includes("--clear");
if (clearFlag) {
  clearAndSeed();
} else {
  seedTestimonials();
}
