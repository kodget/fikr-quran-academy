"use client";

import { useState, useEffect } from "react";
import { COUNTRIES } from "@/lib/utils";
import { FrequencyType, PRICING_PLANS } from "@/lib/pricing";

interface RegistrationFormProps {
  onSuccess: (applicationId: string) => void;
}

interface PricingPreview {
  currency: string;
  amount: number;
  formatted: string;
  sessions: number;
  daysPerWeek: number;
  label: string;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [form, setForm] = useState({
    fullName: "",
    parentName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    gender: "",
    dateOfBirth: "",
    experience: "",
    programme: "",
    frequency: "" as FrequencyType | "",
    days: [] as string[],
    time: "",
    timezone: "",
  });

  const [pricing, setPricing] = useState<PricingPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const programmes = [
    "Basic Qaidah",
    "Reading The Qur'an Fluently (Nazrah)",
    "Memorisation of The Qur'an (Hifzul Qur'an)",
    "Revision For Huffaz (Murojah)",
  ];

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const frequencies = Object.values(PRICING_PLANS);

  const toggleDay = (day: string) => {
    setForm((f) => ({
      ...f,
      days: f.days.includes(day)
        ? f.days.filter((d) => d !== day)
        : [...f.days, day],
    }));
  };

  // Calculate pricing whenever country or frequency changes
  useEffect(() => {
    if (form.country && form.frequency) {
      fetchPricing();
    } else {
      setPricing(null);
    }
  }, [form.country, form.frequency]);

  const fetchPricing = async () => {
    try {
      const response = await fetch("/api/pricing/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          frequency: form.frequency,
          country: form.country,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPricing(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch pricing:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/registration/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          days: JSON.stringify(form.days),
        }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess(data.data.applicationId);
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div
          className="p-4 rounded-lg text-sm"
          style={{
            background: "rgba(220, 38, 38, 0.1)",
            border: "1px solid rgba(220, 38, 38, 0.3)",
            color: "#fca5a5",
          }}
        >
          {error}
        </div>
      )}

      {/* Personal Information */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Full Name <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            type="text"
            required
            className="field"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="Aisha Muhammad"
          />
        </div>

        <div>
          <label
            className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Parent / Guardian
          </label>
          <input
            type="text"
            className="field"
            value={form.parentName}
            onChange={(e) => setForm({ ...form, parentName: e.target.value })}
            placeholder="If applicable"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Email Address <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            type="email"
            required
            className="field"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Phone Number <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            type="tel"
            required
            className="field"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+234 800 000 0000"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Country <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <select
            required
            className="field"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          >
            <option value="">Select country</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            State / City
          </label>
          <input
            type="text"
            className="field"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            placeholder="Lagos"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Gender <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <select
            required
            className="field"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label
            className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Date of Birth
          </label>
          <input
            type="date"
            className="field"
            value={form.dateOfBirth}
            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
          />
        </div>
      </div>

      {/* Programme Selection */}
      <div>
        <label
          className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Previous Qur&apos;an Experience{" "}
          <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <select
          required
          className="field"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
        >
          <option value="">Select experience level</option>
          <option value="Beginner">Beginner (Never studied)</option>
          <option value="Basic">Basic (Can read Arabic letters)</option>
          <option value="Intermediate">Intermediate (Can read Qur'an)</option>
          <option value="Advanced">Advanced (Memorised portions)</option>
        </select>
      </div>

      <div>
        <label
          className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Desired Programme <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <select
          required
          className="field"
          value={form.programme}
          onChange={(e) => setForm({ ...form, programme: e.target.value })}
        >
          <option value="">Select programme</option>
          {programmes.map((prog) => (
            <option key={prog} value={prog}>
              {prog}
            </option>
          ))}
        </select>
      </div>

      {/* Learning Frequency */}
      <div>
        <label
          className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-3"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Learning Frequency <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <div className="grid sm:grid-cols-3 gap-3">
          {frequencies.map((freq) => (
            <button
              key={freq.id}
              type="button"
              onClick={() => setForm({ ...form, frequency: freq.id })}
              className="p-4 rounded-lg text-left transition-all duration-200"
              style={{
                background:
                  form.frequency === freq.id
                    ? "rgba(232,116,68,0.15)"
                    : "rgba(255,255,255,0.05)",
                border: `1px solid ${
                  form.frequency === freq.id
                    ? "var(--accent)"
                    : "rgba(255,255,255,0.1)"
                }`,
              }}
            >
              <div
                className="font-sans text-sm font-medium mb-1"
                style={{
                  color:
                    form.frequency === freq.id
                      ? "var(--accent)"
                      : "rgba(255,255,255,0.9)",
                }}
              >
                {freq.label}
              </div>
              <div
                className="font-sans text-xs"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {freq.sessions} sessions/month
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Selection */}
      <div>
        <label
          className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-3"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Preferred Days <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Select preferred class days"
        >
          {weekDays.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className="px-4 py-2 rounded-full font-sans text-xs font-medium transition-all duration-200"
              style={{
                background: form.days.includes(day)
                  ? "var(--accent)"
                  : "rgba(255,255,255,0.07)",
                color: form.days.includes(day)
                  ? "#1A1A18"
                  : "rgba(255,255,255,0.45)",
                border: `1px solid ${form.days.includes(day) ? "var(--accent)" : "rgba(255,255,255,0.10)"}`,
              }}
              aria-pressed={form.days.includes(day)}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Time of Day <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <select
            required
            className="field"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          >
            <option value="">Select preferred time</option>
            <option>Morning (6am – 12pm)</option>
            <option>Afternoon (12pm – 5pm)</option>
            <option>Evening (5pm – 10pm)</option>
          </select>
        </div>

        <div>
          <label
            className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Timezone
          </label>
          <input
            type="text"
            className="field"
            value={form.timezone}
            onChange={(e) => setForm({ ...form, timezone: e.target.value })}
            placeholder="e.g., GMT+1, EST"
          />
        </div>
      </div>

      {/* Pricing Preview */}
      {pricing && (
        <div
          className="p-6 rounded-xl"
          style={{
            background: "rgba(232,116,68,0.10)",
            border: "1px solid rgba(232,116,68,0.3)",
          }}
        >
          <h3
            className="font-display font-medium text-lg mb-4"
            style={{ color: "var(--accent)" }}
          >
            Enrollment Summary
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div
                className="font-sans text-xs uppercase tracking-wider mb-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Programme
              </div>
              <div style={{ color: "rgba(255,255,255,0.9)" }}>
                {form.programme || "—"}
              </div>
            </div>

            <div>
              <div
                className="font-sans text-xs uppercase tracking-wider mb-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Learning Plan
              </div>
              <div style={{ color: "rgba(255,255,255,0.9)" }}>
                {pricing.label}
              </div>
            </div>

            <div>
              <div
                className="font-sans text-xs uppercase tracking-wider mb-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Sessions
              </div>
              <div style={{ color: "rgba(255,255,255,0.9)" }}>
                {pricing.sessions} per month
              </div>
            </div>

            <div>
              <div
                className="font-sans text-xs uppercase tracking-wider mb-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Schedule
              </div>
              <div style={{ color: "rgba(255,255,255,0.9)" }}>
                {pricing.daysPerWeek} days per week
              </div>
            </div>

            <div>
              <div
                className="font-sans text-xs uppercase tracking-wider mb-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Country
              </div>
              <div style={{ color: "rgba(255,255,255,0.9)" }}>{form.country}</div>
            </div>

            <div>
              <div
                className="font-sans text-xs uppercase tracking-wider mb-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Monthly Tuition
              </div>
              <div
                className="font-display text-2xl font-medium"
                style={{ color: "var(--accent)" }}
              >
                {pricing.formatted}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !pricing}
        className="w-full btn-base btn-gold text-sm py-4 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit Registration"}
      </button>

      <p
        className="text-center text-xs"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        By submitting, you agree to proceed to payment after registration review.
      </p>
    </form>
  );
}
