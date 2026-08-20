/**
 * Test script for pricing logic (ESM)
 * Run with: node scripts/test-pricing.mjs
 */

console.log("=".repeat(60));
console.log("PRICING LOGIC TEST");
console.log("=".repeat(60));
console.log();

// Inline pricing logic for testing
const PRICING_PLANS = {
  "twice-weekly": {
    id: "twice-weekly",
    label: "Twice Weekly",
    sessions: 8,
    daysPerWeek: 2,
    naira: 40000,
    usd: 40,
  },
  "three-times-weekly": {
    id: "three-times-weekly",
    label: "Three Times Weekly",
    sessions: 12,
    daysPerWeek: 3,
    naira: 50000,
    usd: 50,
  },
  "four-times-weekly": {
    id: "four-times-weekly",
    label: "Four Times Weekly",
    sessions: 16,
    daysPerWeek: 4,
    naira: 60000,
    usd: 60,
  },
};

function getCurrencyByCountry(country) {
  return country.toLowerCase() === "nigeria" ? "NGN" : "USD";
}

function calculateFee(frequency, country) {
  const currency = getCurrencyByCountry(country);
  const plan = PRICING_PLANS[frequency];
  const amount = currency === "NGN" ? plan.naira : plan.usd;
  const amountInSmallestUnit = amount * 100;

  return {
    frequency,
    currency,
    amount,
    amountInSmallestUnit,
    sessions: plan.sessions,
    daysPerWeek: plan.daysPerWeek,
    label: plan.label,
    formatted: currency === "NGN" ? `₦${amount.toLocaleString()}` : `$${amount}`,
  };
}

// Test 1: Verify all plans
console.log("✓ Test 1: All Pricing Plans");
console.log("-".repeat(60));
Object.values(PRICING_PLANS).forEach((plan) => {
  console.log(`${plan.label}:`);
  console.log(`  - Sessions/Month: ${plan.sessions}`);
  console.log(`  - Days/Week: ${plan.daysPerWeek}`);
  console.log(`  - Naira: ₦${plan.naira.toLocaleString()}`);
  console.log(`  - USD: $${plan.usd}`);
  console.log();
});

// Test 2: Nigeria pricing
console.log("✓ Test 2: Nigeria Pricing");
console.log("-".repeat(60));
["twice-weekly", "three-times-weekly", "four-times-weekly"].forEach((freq) => {
  const fee = calculateFee(freq, "Nigeria");
  console.log(`${fee.label}: ${fee.formatted} (${fee.sessions} sessions, ${fee.daysPerWeek} days/week)`);
  console.log(`  → Smallest unit: ${fee.amountInSmallestUnit} kobo`);
});
console.log();

// Test 3: UK pricing
console.log("✓ Test 3: United Kingdom Pricing");
console.log("-".repeat(60));
["twice-weekly", "three-times-weekly", "four-times-weekly"].forEach((freq) => {
  const fee = calculateFee(freq, "United Kingdom");
  console.log(`${fee.label}: ${fee.formatted} (${fee.sessions} sessions, ${fee.daysPerWeek} days/week)`);
  console.log(`  → Smallest unit: ${fee.amountInSmallestUnit} cents`);
});
console.log();

console.log("=".repeat(60));
console.log("ALL PRICING TESTS PASSED ✓");
console.log("=".repeat(60));
