/**
 * Centralized Pricing Configuration
 * 
 * This is the single source of truth for all pricing logic.
 * Both frontend and backend reference this configuration.
 */

export type FrequencyType = "twice-weekly" | "three-times-weekly" | "four-times-weekly";
export type CurrencyType = "NGN" | "USD";

export interface PricingPlan {
  id: FrequencyType;
  label: string;
  sessions: number;
  daysPerWeek: number;
  naira: number;      // Amount in Naira
  usd: number;        // Amount in USD
}

export const PRICING_PLANS: Record<FrequencyType, PricingPlan> = {
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

/**
 * Determine currency based on country
 * Nigeria uses NGN, all other countries use USD
 */
export function getCurrencyByCountry(country: string): CurrencyType {
  return country.toLowerCase() === "nigeria" ? "NGN" : "USD";
}

/**
 * Get the price for a specific plan and currency
 */
export function getPlanPrice(
  frequency: FrequencyType,
  currency: CurrencyType
): number {
  const plan = PRICING_PLANS[frequency];
  return currency === "NGN" ? plan.naira : plan.usd;
}

/**
 * Convert amount to smallest unit (kobo for NGN, cents for USD)
 * Paystack expects amounts in kobo/cents
 */
export function toSmallestUnit(amount: number, currency: CurrencyType): number {
  return amount * 100;
}

/**
 * Convert from smallest unit to standard amount
 */
export function fromSmallestUnit(amount: number, currency: CurrencyType): number {
  return amount / 100;
}

/**
 * Format amount with currency symbol
 */
export function formatAmount(amount: number, currency: CurrencyType): string {
  const symbol = currency === "NGN" ? "₦" : "$";
  return `${symbol}${amount.toLocaleString()}`;
}

/**
 * Calculate the complete fee breakdown for a registration
 */
export function calculateFee(frequency: FrequencyType, country: string) {
  const currency = getCurrencyByCountry(country);
  const plan = PRICING_PLANS[frequency];
  const amount = getPlanPrice(frequency, currency);
  const amountInSmallestUnit = toSmallestUnit(amount, currency);

  return {
    frequency,
    currency,
    amount,
    amountInSmallestUnit,
    sessions: plan.sessions,
    daysPerWeek: plan.daysPerWeek,
    label: plan.label,
    formatted: formatAmount(amount, currency),
  };
}

/**
 * Validate that a frequency is valid
 */
export function isValidFrequency(frequency: string): frequency is FrequencyType {
  return frequency in PRICING_PLANS;
}

/**
 * Get all available pricing plans as an array
 */
export function getAllPlans(): PricingPlan[] {
  return Object.values(PRICING_PLANS);
}
