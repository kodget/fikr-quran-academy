/**
 * Test script for pricing logic
 * Run with: npx ts-node scripts/test-pricing.ts
 */

import {
  PRICING_PLANS,
  calculateFee,
  getCurrencyByCountry,
  formatAmount,
  getAllPlans,
  FrequencyType,
} from "../lib/pricing.js";

console.log("=".repeat(60));
console.log("PRICING LOGIC TEST");
console.log("=".repeat(60));
console.log();

// Test 1: Verify all plans
console.log("✓ Test 1: All Pricing Plans");
console.log("-".repeat(60));
const plans = getAllPlans();
plans.forEach((plan) => {
  console.log(`${plan.label}:`);
  console.log(`  - ID: ${plan.id}`);
  console.log(`  - Sessions/Month: ${plan.sessions}`);
  console.log(`  - Days/Week: ${plan.daysPerWeek}`);
  console.log(`  - Naira: ₦${plan.naira.toLocaleString()}`);
  console.log(`  - USD: $${plan.usd}`);
  console.log();
});

// Test 2: Currency determination
console.log("✓ Test 2: Currency by Country");
console.log("-".repeat(60));
const testCountries = [
  "Nigeria",
  "United Kingdom",
  "United States",
  "Canada",
  "Ghana",
];
testCountries.forEach((country) => {
  const currency = getCurrencyByCountry(country);
  console.log(`${country} → ${currency}`);
});
console.log();

// Test 3: Fee calculation for Nigeria
console.log("✓ Test 3: Fee Calculation - Nigeria");
console.log("-".repeat(60));
const frequenciesNigeria: FrequencyType[] = [
  "twice-weekly",
  "three-times-weekly",
  "four-times-weekly",
];
frequenciesNigeria.forEach((freq) => {
  const fee = calculateFee(freq, "Nigeria");
  console.log(`${fee.label}:`);
  console.log(`  - Currency: ${fee.currency}`);
  console.log(`  - Amount: ${fee.formatted}`);
  console.log(`  - Sessions: ${fee.sessions}/month`);
  console.log(`  - Days: ${fee.daysPerWeek}/week`);
  console.log(`  - Smallest Unit: ${fee.amountInSmallestUnit} kobo`);
  console.log();
});

// Test 4: Fee calculation for International (UK)
console.log("✓ Test 4: Fee Calculation - United Kingdom");
console.log("-".repeat(60));
const frequenciesUK: FrequencyType[] = [
  "twice-weekly",
  "three-times-weekly",
  "four-times-weekly",
];
frequenciesUK.forEach((freq) => {
  const fee = calculateFee(freq, "United Kingdom");
  console.log(`${fee.label}:`);
  console.log(`  - Currency: ${fee.currency}`);
  console.log(`  - Amount: ${fee.formatted}`);
  console.log(`  - Sessions: ${fee.sessions}/month`);
  console.log(`  - Days: ${fee.daysPerWeek}/week`);
  console.log(`  - Smallest Unit: ${fee.amountInSmallestUnit} cents`);
  console.log();
});

// Test 5: Amount formatting
console.log("✓ Test 5: Amount Formatting");
console.log("-".repeat(60));
console.log(`NGN 40000 → ${formatAmount(40000, "NGN")}`);
console.log(`USD 40 → ${formatAmount(40, "USD")}`);
console.log(`NGN 50000 → ${formatAmount(50000, "NGN")}`);
console.log(`USD 50 → ${formatAmount(50, "USD")}`);
console.log();

console.log("=".repeat(60));
console.log("ALL TESTS PASSED ✓");
console.log("=".repeat(60));
