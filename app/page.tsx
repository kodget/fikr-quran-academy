"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// ─── SVG Icon System ──────────────────────────────────────────────────────────
const Icon = {
  Book: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  Mic: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  Sparkles: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  ),
  Moon: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  RotateCcw: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
    </svg>
  ),
  User: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Clock: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Calendar: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),

  Zap: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Target: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Users: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  ChevronDown: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Menu: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Plus: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Check: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Star: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="#D77129"
      stroke="none"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Phone: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  MessageCircle: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Globe: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Award: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  Quote: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  ),
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface Testimonial {
  name: string;
  role: string;
  country: string;
  text: string;
  stars: number;
  initials: string;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const testimonials: Testimonial[] = [
  {
    name: "Aisha Mahmoud",
    role: "Parent",
    country: "Nigeria",
    initials: "AM",
    color: "#245C29",
    stars: 5,
    text: "Fikr Quran Academy transformed my daughter's relationship with the Qur'an. Within 3 months she went from struggling to confidently reciting entire surahs. The teachers are patient, knowledgeable, and truly invested in each child.",
  },
  {
    name: "Yusuf Al-Hassan",
    role: "Student (Adult)",
    country: "United Kingdom",
    initials: "YH",
    color: "#9BAD30",
    stars: 5,
    text: "As an adult learner who always felt behind, Fikr gave me structured Tajweed lessons that fit around my work schedule. The 1-on-1 format means I can go at my own pace without any pressure.",
  },
  {
    name: "Fatima Okonkwo",
    role: "Parent of two",
    country: "Canada",
    initials: "FO",
    color: "#D77129",
    stars: 5,
    text: "Both my children attend different programmes. The academy's structure is excellent — each class has clear goals and I receive weekly progress reports. It feels like a proper school, just online.",
  },
  {
    name: "Ibrahim Sule",
    role: "Hifz Student",
    country: "Ghana",
    initials: "IS",
    color: "#173F21",
    stars: 5,
    text: "I have been in the Hifz programme for 8 months. The revision system they use keeps everything fresh in my memory. My teacher remembers every verse I struggle with and we focus there every session.",
  },
  {
    name: "Khadijah Umar",
    role: "Parent",
    country: "Nigeria",
    initials: "KU",
    color: "#245C29",
    stars: 5,
    text: "The free assessment before enrolment was brilliant — they placed my son in exactly the right level. He has not missed a single class in four months. That says everything about how much he enjoys it.",
  },
];

const programmes = [
  {
    title: "Basic Qaidah",
    level: "Foundation",
    Icon: Icon.Book,
    accent: "#9BAD30",
    shortDesc:
      "A structured foundation for beginners to recognize, pronounce, and join Arabic letters correctly before progressing to Qur'an recitation.",
    description:
      "Basic Qaidah is the foundational course for anyone starting their journey to read the Qur'an. Students learn to recognize Arabic letters, pronounce them correctly, and join them into words using a proven, structured method, building the reading skills required before progressing to Qur'an recitation. Suitable for both children and adult beginners with no prior knowledge of Arabic.",
    learn: [
      "The 29 Arabic letters and their correct pronunciation points (Makharij)",
      "Letter shapes at the beginning, middle, and end of words",
      "Joining letters to read simple words and syllables",
      "Short vowels (Fatha, Kasra, Damma) and their effect on sound",
      "Tanween, Sukoon, and Shaddah rules",
      "Madd (elongation) rules for long vowels",
      "Basic Noon Sakinah and Tanween rules",
      "Reading fluency through guided practice and correction",
    ],
    importance:
      "Qaidah is the gateway to the Qur'an. A weak foundation here can lead to mispronunciation habits that are difficult to fix later on. This course ensures students read Arabic accurately and confidently, setting them up for successful Qur'an recitation and future Tajweed learning.",
    duration:
      "Students should be able to finish the foundational book and start reading the Qur'an after 4 to 6 months of consistent classes, depending on their age and learning pace, with 3 to 4 sessions per week.",
  },

  {
    title: "Reading The Qur'an Fluently (Nazrah)",
    level: "Intermediate",
    Icon: Icon.Mic,
    accent: "#D77129",
    shortDesc:
      "Build fluency, confidence, and accuracy by moving from basic Arabic reading to reading directly from the Mushaf.",
    description:
      "Nazrah is the course students take after completing Basic Qaidah, where they move from reading simple words to reading the Qur'an itself directly from the Mushaf. Students apply the letter and vowel rules learned in Qaidah to real Qur'anic text, gradually building speed, accuracy, and confidence. The focus is on correct pronunciation and smooth, connected reading rather than memorization, preparing students for proper Tajweed application.",
    learn: [
      "Applying Qaidah rules directly to Qur'anic verses",
      "Correct pronunciation of letters and words within continuous text",
      "Recognizing and reading Waqf (stopping) and Wasl (continuation) signs",
      "Basic Tajweed rules in practical application",
      "Noon Sakinah, Meem Sakinah, and Madd rules",
      "Reading multiple Surahs with increasing fluency and speed",
      "Reducing hesitation and improving natural flow while reading",
      "Building familiarity with different Mushaf formats and page layouts",
    ],
    importance:
      "Nazrah bridges the gap between learning to read Arabic and actually reading the Qur'an with confidence. It strengthens a student's ability to recite smoothly without stumbling over words, which is essential before moving into deeper Tajweed study or memorization (Hifz).",
    duration:
      "Most students complete this stage within 6 to 12 months, depending on age, consistency, and prior reading ability, with 3 to 4 sessions per week.",
  },

  {
    title: "Memorization of The Qur'an (Hifzul Qur'an)",
    level: "Advanced",
    Icon: Icon.Moon,
    accent: "#9BAD30",
    shortDesc:
      "A structured Hifz programme combining systematic memorization, Tajweed, daily revision, and long-term retention.",
    description:
      "Hifzul Qur'an is a structured memorization program for students who have completed Nazrah and can read the Qur'an fluently and accurately. Students memorize the Qur'an Juz by Juz under close guidance, with continuous revision (Muraja'ah) to ensure retention. This course combines memorization with correct Tajweed application, helping students build a strong, lasting connection with the Qur'an.",
    learn: [
      "Systematic memorization of the Qur'an, Juz by Juz",
      "Proper Tajweed application while memorizing, not just reciting",
      "Daily revision techniques (Muraja'ah) to retain previously memorized portions",
      "Linking and connecting Surahs and Ayahs for smoother recall",
      "Strategies for overcoming common memorization challenges",
      "Building consistency and discipline in daily memorization habits",
      "Preparing for and performing Qur'an recitation from memory",
      "Sabaq, Sabqi, and Manzil revision systems",
    ],
    importance:
      "Memorizing the Qur'an is one of the most rewarding and disciplined journeys a Muslim can undertake. It preserves the Qur'an within the heart, strengthens daily worship, and deepens understanding of its meanings over time. Hifz also develops focus, memory retention, and discipline.",
    duration:
      "Memorization pace depends heavily on focus, consistency, and daily commitment. A well-focused student attending regularly may memorize a Juz in as little as 2 months, while others may require longer. Completing the full Qur'an typically ranges from 2 to 5 years depending on individual pace and revision consistency.",
  },

  {
    title: "Revision For Huffaz (Murojah)",
    level: "Huffaz",
    Icon: Icon.RotateCcw,
    accent: "#D77129",
    shortDesc:
      "Structured Muraja'ah for Huffaz who want to strengthen, maintain, and protect their Qur'an memorization.",
    description:
      "Murojah is a dedicated revision program for students who have already completed memorization of the Qur'an but need structured support to retain it. Many Huffaz struggle to keep their memorization strong without consistent revision, and this course addresses that directly through regular recitation, review cycles, and retention techniques. Students recite in front of a qualified teacher who corrects mistakes and tracks weak areas for targeted revision.",
    learn: [
      "Structured revision cycles covering the full Qur'an on a rotating schedule",
      "Techniques to identify and strengthen weak or fading portions",
      "Methods for daily, weekly, and monthly revision planning",
      "Correcting memorization errors that developed over time",
      "Improving recitation speed and accuracy from memory",
      "Strategies to prevent forgetting through spaced repetition",
      "Listening and paired-revision techniques",
      "Building a sustainable long-term revision habit",
    ],
    importance:
      "Memorizing the Qur'an is only half the journey — retaining it requires consistent revision. Without regular Muraja'ah, even strong memorization can become weaker over time. This course helps Huffaz protect what they have memorized, catch mistakes early, and develop habits that keep their memorization strong.",
    duration:
      "A set number of pages is assigned per session based on the student's attendance and pace. A full revision cycle through the Qur'an is completed on a rotating basis, with the pace adjusted according to each student's schedule and ability.",
  },
];

const whyCards = [
  {
    Icon: Icon.User,
    title: "Personalised 1-on-1",
    desc: "Your teacher adapts pace, content, and style entirely to you — no group dynamics, no falling behind.",
  },
  {
    Icon: Icon.Clock,
    title: "Time Flexibility",
    desc: "Morning, afternoon, or evening. Weekday or weekend. Pick what genuinely fits your life.",
  },
  {
    Icon: Icon.Target,
    title: "Goal Oriented",
    desc: "Clear milestones, measurable targets, and regular assessments so progress is always visible.",
  },
  {
    Icon: Icon.Users,
    title: "Supportive Community",
    desc: "A warm family of learners. Parents receive weekly reports and dedicated WhatsApp support.",
  },
];

const pricingPlans = [
  {
    title: "Twice Weekly",
    sessions: "8 sessions / month",
    priceNaira: "₦40,000",
    priceDollar: "$40",
    description:
      "A steady and flexible programme for students who want consistent Qur'an learning alongside school, work, or other commitments.",
    accent: "#9BAD30",
    icon: Icon.Calendar,
  },
  {
    title: "Three Times Weekly",
    sessions: "12 sessions / month",
    priceNaira: "₦50,000",
    priceDollar: "$50",
    description:
      "Our balanced programme for students who want faster progress while maintaining a sustainable weekly learning routine.",
    accent: "#D77129",
    icon: Icon.Zap,
    popular: true,
  },
  {
    title: "Four Times Weekly",
    sessions: "16 sessions / month",
    priceNaira: "₦60,000",
    priceDollar: "$60",
    description:
      "Our most intensive programme for students committed to accelerating their Qur'an reading, memorization, or revision journey.",
    accent: "#9BAD30",
    icon: Icon.Star,
  },
];

const perks = [
  "Personalised 1-on-1 sessions (30 to 45 minutes per session)",
  "Flexible scheduling to fit your lifestyle",
  "Highly knowledgeable and dedicated instructors",
  "Access to comprehensive Qur'anic education materials",
  "Focus on recitation precision and memorization excellence",
  "Regular progress monitoring and feedback",
  "Secure online payment & digital receipt",
];

const faqs = [
  {
    q: "What age groups do you accept?",
    a: "We welcome students from 4 years old through to adults of all ages. Each age group has tailored teaching methods and dedicated class times.",
  },
  {
    q: "How long is each session?",
    a: "Standard sessions are 45 minutes. Hifz sessions can extend to 60 minutes. You can discuss your preferred session length with your assigned teacher.",
  },
  {
    q: "Do you offer a free trial class?",
    a: "Yes! Every new student receives a free placement assessment and trial class before committing to any programme. No payment details required upfront.",
  },
  {
    q: "What technology do I need?",
    a: "A stable internet connection, a device with a camera and microphone, and the free Google Meet app — that is all you need to get started.",
  },
  {
    q: "Are classes available on weekends?",
    a: "Yes. We offer morning, afternoon, and evening slots seven days a week, including weekends, to accommodate all time zones.",
  },
  {
    q: "How do I make payment?",
    a: "We accept bank transfers, Paystack (Nigeria), Stripe (international), and PayPal. Digital receipts are issued within 24 hours of payment.",
  },
];

const admissionSteps = [
  {
    n: "01",
    title: "Submit Application",
    desc: "Fill in our simple online registration form with your details.",
  },
  {
    n: "02",
    title: "Placement Assessment",
    desc: "A free 30-minute session with a qualified teacher to find your exact level.",
  },
  {
    n: "03",
    title: "Choose Programme",
    desc: "Select the programme that best matches your goals and current level.",
  },
  {
    n: "04",
    title: "Select Schedule",
    desc: "Pick your preferred days and time — morning, afternoon, or evening.",
  },
  {
    n: "05",
    title: "Make Payment",
    desc: "Secure payment via Paystack, Stripe, or PayPal. Receipt within 24 hours.",
  },
  {
    n: "06",
    title: "Receive Student ID",
    desc: "Your personal student ID and welcome pack are sent to your inbox.",
  },
  {
    n: "07",
    title: "Begin Classes",
    desc: "Your teacher confirms your first session. Your journey begins.",
  },
];

// ─── Utilities ────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

// ─── Shared atoms ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px w-8 bg-olive opacity-60" />
      <span
        className="chip"
        style={{ background: "rgba(155,173,48,.12)", color: "#173F21" }}
      >
        {children}
      </span>
      <div className="h-px w-8 bg-olive opacity-60" />
    </div>
  );
}

function SectionLabelLight({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px w-8 bg-olive opacity-50" />
      <span
        className="chip"
        style={{
          background: "rgba(155,173,48,.15)",
          color: "rgba(155,173,48,1)",
        }}
      >
        {children}
      </span>
      <div className="h-px w-8 bg-olive opacity-50" />
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Icon.Star key={i} />
      ))}
    </div>
  );
}

function OrnamentDivider({ light }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className={`flex-1 ornament-line ${light ? "opacity-40" : ""}`} />
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path
          d="M12 2 14.5 9.5H22L16 14l2.5 7.5L12 17l-6.5 4.5L8 14 2 9.5h7.5z"
          fill="#9BAD30"
        />
      </svg>
      <div className={`flex-1 ornament-line ${light ? "opacity-40" : ""}`} />
    </div>
  );
}

function Btn({
  children,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 font-sans font-semibold rounded-full transition-all duration-300 cursor-pointer";
  const styles = {
    primary:
      "bg-amber text-white px-8 py-3.5 hover:bg-amber/90 anim-pulse-glow hover:shadow-[0_0_32px_rgba(215,113,41,.45)]",
    outline:
      "border-2 border-white/30 text-white px-7 py-3.5 hover:border-olive hover:text-olive",
    ghost: "text-forest/70 hover:text-forest px-4 py-2 text-sm",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ onNav }: { onNav: (s: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    "About",
    "Programmes",
    "Admission",
    "Fees",
    "Terms",
    "Contact",
  ];
  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "nav-blur bg-forest/95 py-3 shadow-2xl" : "bg-transparent py-5"}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => onNav("hero")}
            className="flex items-center gap-3 shrink-0"
          >
            <Image
              src="/images/fikr-logo.jpeg"
              alt="Fikr logo"
              width={36}
              height={36}
              className="rounded-full object-contain bg-white/10 p-0.5 ring-1 ring-olive/30"
            />
            <div className="text-left hidden xs:block">
              <div className="text-white font-display font-bold text-base leading-tight">
                Fikr Quran Academy
              </div>
              <div className="text-olive/80 text-[10px] tracking-[.2em] uppercase font-sans">
                Online Learning
              </div>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <button
                key={l}
                onClick={() => onNav(l.toLowerCase())}
                className="relative text-white/75 hover:text-white font-sans text-sm font-medium tracking-wide transition-colors group"
              >
                {l}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-olive transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onNav("contact")}
              className="text-white/75 hover:text-olive border border-white/25 hover:border-olive/60 px-5 py-2 rounded-full text-sm font-sans font-medium transition-all duration-200"
            >
              Free Assessment
            </button>
            <button
              onClick={() => onNav("register")}
              className="bg-amber hover:bg-amber/90 text-white px-6 py-2 rounded-full text-sm font-sans font-semibold transition-all duration-200 shadow-lg"
            >
              Enrol Now
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden text-white p-1.5"
            onClick={() => setOpen(true)}
          >
            <Icon.Menu />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden pointer-events-${open ? "auto" : "none"}`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 bottom-0 w-72 bg-forest flex flex-col py-8 px-7 gap-5 transition-transform duration-350 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between mb-2">
            <Image
              src="/images/fikr-logo.jpeg"
              alt="Logo"
              width={44}
              height={44}
              className="rounded-full object-contain bg-white/10 p-1 ring-1 ring-olive/30"
            />
            <button
              className="text-white/60 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <Icon.X />
            </button>
          </div>
          <div className="ornament-line opacity-30" />
          {links.map((l) => (
            <button
              key={l}
              onClick={() => {
                onNav(l.toLowerCase());
                setOpen(false);
              }}
              className="text-white/75 hover:text-olive font-sans text-base text-left transition-colors py-1"
            >
              {l}
            </button>
          ))}
          <div className="mt-auto">
            <button
              onClick={() => {
                onNav("register");
                setOpen(false);
              }}
              className="w-full bg-amber text-white py-3.5 rounded-2xl font-sans font-semibold text-sm"
            >
              Enrol Now →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onNav }: { onNav: (s: string) => void }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({
      x: (e.clientX - r.left - r.width / 2) / r.width,
      y: (e.clientY - r.top - r.height / 2) / r.height,
    });
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-forest"
    >
      {/* Bg image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.jpg"
          alt="Teacher teaching children Quran"
          fill
          className="object-cover object-center opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-forest/82" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-transparent to-forest/95" />
      </div>

      {/* Geometric overlay */}
      <div className="absolute inset-0 islamic-pattern" />

      {/* Spinning ring — top right */}
      <div
        className="absolute top-16 right-12 w-72 h-72 opacity-[.08] anim-spin pointer-events-none hidden md:block soft-3d"
        style={{
          transform: `translate(${mouse.x * -20}px,${mouse.y * -20}px) perspective(1000px) rotateX(${mouse.y * 10}deg) rotateY(${mouse.x * 10}deg)`,
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" className="floating-glow">
          {[0, 1, 2, 3].map((i) => (
            <polygon
              key={i}
              points="100,10 190,55 190,145 100,190 10,145 10,55"
              stroke="#9BAD30"
              strokeWidth={0.8 + i * 0.1}
              opacity={0.8 - i * 0.15}
              transform={`rotate(${i * 15} 100 100) scale(${1 - i * 0.12}) translate(${i * 12} ${i * 12})`}
            />
          ))}
          <circle
            cx="100"
            cy="100"
            r="32"
            stroke="#D77129"
            strokeWidth="1"
            opacity="0.7"
          />
          <circle
            cx="100"
            cy="100"
            r="24"
            stroke="#9BAD30"
            strokeWidth="0.5"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Floating diamond — bottom left */}
      <div
        className="absolute bottom-28 left-10 w-20 h-20 border border-olive/25 rotate-45 anim-float floating-glow hidden sm:block soft-3d"
        style={{
          animationDelay: ".8s",
          transform: `rotate(45deg) translate(${mouse.x * 8}px,${mouse.y * 8}px)`,
        }}
      />
      <div
        className="absolute bottom-36 left-14 w-10 h-10 border border-amber/20 rotate-[22deg] anim-float2 floating-glow soft-3d"
        style={{
          animationDelay: "1.4s",
          transform: `rotate(22deg) translate(${mouse.x * -6}px,${mouse.y * -6}px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-10 text-center pt-28 pb-20 flex flex-col items-center">
        {/* Verse */}
        <div className="anim-fade-up mb-5 w-full soft-3d">
          <p
            className="font-arabic text-2xl sm:text-3xl md:text-4xl text-olive leading-loose text-depth"
            dir="rtl"
            style={{
              filter: "drop-shadow(0 2px 4px rgba(23, 63, 33, 0.3))",
            }}
          >
            قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا
            يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ
          </p>
          <p className="text-white/50 text-xs font-sans mt-2 tracking-wide">
            "Say, ‘Are those who know equal to those who do not know?’ Only
            those of understanding will be mindful." — Az-Zumar 39:9
          </p>
        </div>

        <OrnamentDivider light />

        {/* Logo lockup */}
        <div className="anim-fade-up d-200 flex flex-col items-center justify-center mb-6 soft-3d text-center">
          <Image
            src="/images/fikr-logo.jpeg"
            alt="Fikr Quran Academy"
            width={170}
            height={170}
            className="rounded-full object-contain bg-white/10 ring-2 ring-olive/30 p-2 floating-glow mb-4"
          />

          <div className="text-center">
            <div className="font-display text-4xl text-white font-bold leading-tight text-depth">
              Fikr Quran Academy
            </div>

            <div className="text-olive/70 text-[10px] tracking-[.22em] uppercase font-sans mt-1">
              Online Islamic Education
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="anim-fade-up d-300 font-display text-4xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-[-0.03em] leading-[1.02] mb-6 text-depth">
          <span className="block">Qur'an Education</span>
          <span className="block text-olive">That Builds</span>
          <span className="block">
            <span className="text-white">Strong Muslims.</span>
          </span>
        </h1>

        <p className="anim-fade-up d-400 text-white/65 font-sans text-base sm:text-lg leading-7 mb-9 max-w-xl tracking-[-0.01em]">
          Structured, personalised Qur'an and Islamic education designed to
          produce confident, consistent, and grounded Muslims — from Nigeria to
          the world.
        </p>

        <div className="anim-fade-up d-500 flex flex-wrap justify-center gap-4">
          <Btn onClick={() => onNav("register")} variant="primary">
            Start Your Qur'an Journey <Icon.ArrowRight />
          </Btn>
          <Btn onClick={() => onNav("contact")} variant="outline">
            Book Free Assessment
          </Btn>
        </div>

        {/* Stats strip */}
        <div className="anim-fade-up d-600 mt-14 flex gap-8 sm:gap-12 flex-wrap justify-center">
          {[
            { v: "4+", l: "Countries" },
            { v: "98%", l: "Satisfaction" },
            { v: "5yrs+", l: "Experience" },
            { v: "100%", l: "Separate classes" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-2xl sm:text-3xl text-olive font-bold">
                {s.v}
              </div>
              <div className="text-white/40 text-xs font-sans mt-0.5 tracking-wide">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 anim-float2">
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        <div className="text-white/30 text-[10px] font-sans tracking-[.25em] uppercase">
          Scroll
        </div>
      </div>
    </section>
  );
}
// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const { ref, vis } = useReveal();
  return (
    <section id="about" ref={ref} className="py-24 sm:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className={`text-center mb-16 reveal ${vis ? "visible" : ""}`}>
          <SectionLabel>Who We Are</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl text-forest font-bold mt-2 mb-3">
            About Fikr Quran Academy
          </h2>
          <OrnamentDivider />
        </div>

        {/* Story + image */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div
            className={`reveal-l ${vis ? "visible" : ""}`}
            style={{ transitionDelay: ".15s" }}
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 h-full shadow-lg border border-forest/5">
              <div className="w-10 h-1 bg-amber rounded-full mb-7" />
              <h3 className="font-display text-2xl text-forest font-bold mb-4">
                Our Story
              </h3>
              <p className="text-forest/65 font-sans leading-relaxed mb-4">
                Fikr Quran Academy is an online remarkable institution that
                plays a pivotal role in educating individuals about the profound
                teachings of the Qur'an. It serves as a hub for learning,
                understanding, and connecting with the Qur'an.
              </p>
              <p className="text-forest/65 font-sans leading-relaxed mb-4">
                We focus on helping the Muslim Ummah achieve Qur'anic excellence
                through our personalized one-on-one classes (30 to 45 minutes
                per session) with our highly knowledgeable and dedicated
                instructors.
              </p>
              <p className="text-forest/65 font-sans leading-relaxed">
                Operating entirely online, we have built a community of
                dedicated students who connect deeply with the Qur'an — not just
                to recite it, but to understand, memorize, and live by it.
              </p>
            </div>
          </div>
          <div
            className={`reveal-r ${vis ? "visible" : ""}`}
            style={{ transitionDelay: ".2s" }}
          >
            <Image
              src="/images/students-class.jpg"
              alt="Students in a Quran class"
              width={600}
              height={400}
              className="w-full h-full min-h-64 object-cover rounded-3xl shadow-xl"
            />
          </div>
        </div>

        {/* Mission / Vision */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Mission */}
          <div
            className={`reveal ${vis ? "visible" : ""} rounded-3xl overflow-hidden shadow-xl flex`}
            style={{ transitionDelay: ".3s" }}
          >
            <div className="flex-1 bg-forest p-8 sm:p-10">
              <span
                className="chip mb-4 block"
                style={{ background: "rgba(155,173,48,.18)", color: "#9BAD30" }}
              >
                Our Mission
              </span>
              <h3 className="font-display text-2xl text-white font-bold mb-3">
                Our Mission
              </h3>
              <p className="text-white/60 font-sans text-sm leading-relaxed">
                To provide individuals around the world with the opportunity to
                learn and have access to high-quality Qur'anic education by
                reciting with precision and excelling in memorization.
              </p>
            </div>
            <div className="w-36 shrink-0 hidden sm:block">
              <Image
                src="/images/mission-image.jpg"
                alt="Mission"
                width={144}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Vision */}
          <div
            className={`reveal ${vis ? "visible" : ""} rounded-3xl overflow-hidden shadow-xl flex`}
            style={{ transitionDelay: ".4s" }}
          >
            <div className="w-36 shrink-0 hidden sm:block">
              <Image
                src="/images/vision-image.jpg"
                alt="Vision"
                width={144}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 bg-forest-mid p-8 sm:p-10">
              <span
                className="chip mb-4 block"
                style={{ background: "rgba(215,113,41,.18)", color: "#D77129" }}
              >
                Our Vision
              </span>
              <h3 className="font-display text-2xl text-white font-bold mb-3">
                Our Vision
              </h3>
              <p className="text-white/60 font-sans text-sm leading-relaxed">
                To create an inclusive and accessible learning environment for
                students to have numerous students who will become Hufaazul
                Qur'an through our impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose ───────────────────────────────────────────────────────────────
function WhyChoose({ onNav }: { onNav: (s: string) => void }) {
  const { ref, vis } = useReveal();
  return (
    <section id="why" ref={ref} className="py-24 sm:py-32 bg-forest">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className={`text-center mb-16 reveal ${vis ? "visible" : ""}`}>
          <SectionLabelLight>Why Fikr?</SectionLabelLight>
          <h2 className="font-display text-4xl sm:text-5xl text-white font-bold mt-2 mb-3">
            The Fikr Difference
          </h2>
          <OrnamentDivider light />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Image */}
          <div
            className={`reveal-l ${vis ? "visible" : ""} relative`}
            style={{ transitionDelay: ".15s" }}
          >
            <div className="relative rounded-3xl overflow-hidden h-full min-h-80 shadow-2xl">
              <Image
                src="/images/mission-image.jpg"
                alt="Student with Quran"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="bg-white/8 backdrop-blur-md rounded-2xl p-5 border border-white/15 grad-border">
                  <p
                    className="font-arabic text-xl text-olive mb-1.5"
                    dir="rtl"
                  >
                    وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن
                    مُّدَّكِرٍوَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ
                    مِن مُّدَّكِرٍ
                  </p>
                  <p className="text-white font-display text-base font-semibold">
                    "And We have certainly made the Qur’an easy for remembrance,
                    so is there anyone who will take heed?d"
                  </p>
                  <p className="text-white/50 text-xs font-sans mt-0.5">
                    — Surah Al-Qamar 54:17
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -top-5 -left-5 w-20 h-20 rounded-full border border-olive/20 anim-float2 hidden md:block" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-amber/15 rounded-xl rotate-12 anim-float hidden md:block" />
          </div>

          {/* 4 cards */}
          <div
            className={`reveal-r ${vis ? "visible" : ""} grid grid-cols-1 sm:grid-cols-2 gap-4`}
            style={{ transitionDelay: ".2s" }}
          >
            {whyCards.map((c, i) => (
              <div
                key={c.title}
                className="shine bg-white/5 border border-white/10 hover:border-olive/35 rounded-2xl p-6 transition-all duration-300 hover:bg-white/8 card-3d group"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div className="w-11 h-11 rounded-xl bg-olive/10 flex items-center justify-center text-olive mb-4 group-hover:bg-olive/20 transition-colors duration-300">
                  <c.Icon />
                </div>
                <h4 className="font-display text-white font-semibold text-base mb-2 leading-snug">
                  {c.title}
                </h4>
                <p className="text-white/50 text-sm font-sans leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`text-center mt-14 reveal ${vis ? "visible" : ""}`}
          style={{ transitionDelay: ".4s" }}
        >
          <Btn
            onClick={() => onNav("register")}
            variant="primary"
            className="text-base px-10 py-4"
          >
            Join Us Today <Icon.ArrowRight />
          </Btn>
        </div>
      </div>
    </section>
  );
}

// ─── Programmes ───────────────────────────────────────────────────────────────
function Programmes({ onNav }: { onNav: (s: string) => void }) {
  const { ref, vis } = useReveal();
  const [selectedProgramme, setSelectedProgramme] = useState<
    (typeof programmes)[number] | null
  >(null);
  return (
    <section id="programmes" ref={ref} className="py-24 sm:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className={`text-center mb-16 reveal ${vis ? "visible" : ""}`}>
          <SectionLabel>What We Offer</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl text-forest font-bold mt-2 mb-3">
            Our Programmes
          </h2>
          <p className="text-forest/55 font-sans max-w-lg mx-auto">
            Five structured pathways — from absolute beginner to Hafiz — each
            designed for measurable, meaningful progress.
          </p>
          <OrnamentDivider />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programmes.map((p, i) => (
            <div
              key={p.title}
              className={`shine bg-white rounded-3xl overflow-hidden shadow-md border border-forest/5 hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 card-3d group reveal ${
                vis ? "visible" : ""
              }`}
              style={{ transitionDelay: `${i * 0.08 + 0.15}s` }}
            >
              {/* Accent bar */}
              <div
                className="h-1.5 w-full"
                style={{
                  background: `linear-gradient(90deg, ${p.accent}, transparent)`,
                }}
              />

              <div className="p-7">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${p.accent}18`,
                    color: p.accent,
                  }}
                >
                  <p.Icon />
                </div>

                {/* Level */}
                <span
                  className="chip mb-3"
                  style={{
                    background: `${p.accent}12`,
                    color: p.accent,
                  }}
                >
                  {p.level}
                </span>

                {/* Title */}
                <h3 className="font-display text-lg text-forest font-bold mt-2 mb-3">
                  {p.title}
                </h3>

                {/* Short description */}
                <p className="text-forest/55 font-sans text-sm leading-relaxed mb-6">
                  {p.shortDesc}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedProgramme(p)}
                    className="flex-1 px-4 py-2.5 rounded-xl border font-sans text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      borderColor: `${p.accent}40`,
                      color: p.accent,
                      background: `${p.accent}08`,
                    }}
                  >
                    Learn More
                  </button>

                  <button
                    onClick={() => onNav("register")}
                    className="flex-1 px-4 py-2.5 rounded-xl text-white font-sans text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      background: p.accent,
                    }}
                  >
                    Enrol Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProgramme && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="programme-modal-title"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedProgramme(null);
              }
            }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-forest/70 backdrop-blur-md" />

            {/* Modal */}
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden bg-white rounded-[2rem] shadow-2xl">
              {/* Top accent */}
              <div
                className="h-1.5 w-full"
                style={{
                  background: selectedProgramme.accent,
                }}
              />

              {/* Close button */}
              <button
                onClick={() => setSelectedProgramme(null)}
                aria-label="Close programme details"
                className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-forest/5 text-forest/60 flex items-center justify-center hover:bg-forest/10 hover:text-forest transition-colors"
              >
                <Icon.X />
              </button>

              {/* Scrollable content */}
              <div className="overflow-y-auto max-h-[calc(90vh-6px)] p-6 sm:p-9">
                {/* Header */}
                <div className="pr-10">
                  <span
                    className="chip inline-flex mb-3"
                    style={{
                      background: `${selectedProgramme.accent}12`,
                      color: selectedProgramme.accent,
                    }}
                  >
                    {selectedProgramme.level}
                  </span>

                  <h2
                    id="programme-modal-title"
                    className="font-display text-2xl sm:text-3xl font-bold text-forest leading-tight mb-4"
                  >
                    {selectedProgramme.title}
                  </h2>

                  <p className="font-sans text-forest/65 leading-relaxed">
                    {selectedProgramme.description}
                  </p>
                </div>

                {/* What You'll Learn */}
                <div className="mt-8">
                  <h3 className="font-display text-lg font-bold text-forest mb-4">
                    What You'll Learn
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedProgramme.learn.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-forest/[0.03]"
                      >
                        <div
                          className="w-5 h-5 shrink-0 rounded-full flex items-center justify-center mt-0.5"
                          style={{
                            background: `${selectedProgramme.accent}18`,
                            color: selectedProgramme.accent,
                          }}
                        >
                          <Icon.Check />
                        </div>

                        <span className="font-sans text-sm text-forest/70 leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why It's Important */}
                <div className="mt-8">
                  <h3 className="font-display text-lg font-bold text-forest mb-3">
                    Why It's Important
                  </h3>

                  <div
                    className="p-5 rounded-2xl"
                    style={{
                      background: `${selectedProgramme.accent}08`,
                      border: `1px solid ${selectedProgramme.accent}18`,
                    }}
                  >
                    <p className="font-sans text-sm text-forest/70 leading-relaxed">
                      {selectedProgramme.importance}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="mt-8">
                  <h3 className="font-display text-lg font-bold text-forest mb-3">
                    Expected Duration
                  </h3>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${selectedProgramme.accent}12`,
                        color: selectedProgramme.accent,
                      }}
                    >
                      <Icon.Clock />
                    </div>

                    <p className="font-sans text-sm text-forest/65 leading-relaxed pt-1.5">
                      {selectedProgramme.duration}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-9 pt-6 border-t border-forest/10 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSelectedProgramme(null);
                      onNav("register");
                    }}
                    className="flex-1 py-3.5 rounded-xl text-white font-sans font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      background: selectedProgramme.accent,
                    }}
                  >
                    Enrol in This Programme
                  </button>

                  <button
                    onClick={() => setSelectedProgramme(null)}
                    className="px-6 py-3.5 rounded-xl border border-forest/10 text-forest/65 font-sans font-semibold hover:bg-forest/5 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const { ref, vis } = useReveal();
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<"left" | "right">("right");
  const [anim, setAnim] = useState(false);
  const total = testimonials.length;

  const go = useCallback(
    (next: number, direction: "left" | "right") => {
      if (anim) return;
      setDir(direction);
      setAnim(true);
      setTimeout(() => {
        setIdx((next + total) % total);
        setAnim(false);
      }, 420);
    },
    [anim, total],
  );

  const prev = () => go(idx - 1, "left");
  const next = () => go(idx + 1, "right");

  const getOffset = (offset: number) => (idx + offset + total) % total;

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 sm:py-32 bg-forest overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className={`text-center mb-20 reveal ${vis ? "visible" : ""}`}>
          <SectionLabelLight>Real Stories</SectionLabelLight>
          <h2 className="font-display text-4xl sm:text-5xl text-white font-bold mt-2 mb-3">
            What Parents & Students Say
          </h2>
          <OrnamentDivider light />
        </div>

        {/* Slider stage */}
        <div
          className={`relative flex items-center justify-center gap-0 reveal ${vis ? "visible" : ""}`}
          style={{ transitionDelay: ".2s" }}
        >
          {/* Prev card — diagonal, half off screen */}
          <div
            onClick={prev}
            className="hidden md:block absolute cursor-pointer select-none"
            style={{
              left: 0,
              width: "34%",
              transform:
                "perspective(900px) rotateY(22deg) translateX(-26%) scale(.82)",
              opacity: 0.38,
              filter: "blur(.6px)",
              transition: "all .45s cubic-bezier(.4,0,.2,1)",
              zIndex: 1,
              clipPath: "inset(0 -8% 0 0)",
            }}
          >
            <TestimonialCard t={testimonials[getOffset(-1)]} dim />
          </div>

          {/* Active card */}
          <div
            className="w-full max-w-xl relative z-10"
            style={{ minHeight: "340px" }}
          >
            {/* Swipe gesture hint arrows */}
            <div
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white/8 border border-white/15 text-white/40 cursor-pointer hover:bg-white/15 hover:text-olive transition-all duration-200"
              onClick={prev}
            >
              <Icon.ChevronLeft />
            </div>
            <div
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white/8 border border-white/15 text-white/40 cursor-pointer hover:bg-white/15 hover:text-olive transition-all duration-200"
              onClick={next}
            >
              <Icon.ChevronRight />
            </div>

            <div
              style={{
                transition: "all .42s cubic-bezier(.4,0,.2,1)",
                opacity: anim ? 0 : 1,
                transform: anim
                  ? `perspective(900px) translateX(${dir === "right" ? "-30px" : "30px"}) scale(.97)`
                  : "perspective(900px) translateX(0) scale(1)",
              }}
            >
              <TestimonialCard t={testimonials[idx]} />
            </div>
          </div>

          {/* Next card — diagonal, half off screen */}
          <div
            onClick={next}
            className="hidden md:block absolute cursor-pointer select-none"
            style={{
              right: 0,
              width: "34%",
              transform:
                "perspective(900px) rotateY(-22deg) translateX(26%) scale(.82)",
              opacity: 0.38,
              filter: "blur(.6px)",
              transition: "all .45s cubic-bezier(.4,0,.2,1)",
              zIndex: 1,
              clipPath: "inset(0 0 0 -8%)",
            }}
          >
            <TestimonialCard t={testimonials[getOffset(1)]} dim />
          </div>
        </div>

        {/* Controls */}
        <div
          className={`flex items-center justify-center gap-5 mt-10 reveal ${vis ? "visible" : ""}`}
          style={{ transitionDelay: ".3s" }}
        >
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-white/20 hover:border-olive text-white/50 hover:text-olive flex items-center justify-center transition-all duration-200"
          >
            <Icon.ChevronLeft />
          </button>
          <div className="flex gap-2 items-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > idx ? "right" : "left")}
                className={`rounded-full transition-all duration-300 ${i === idx ? "w-7 h-2.5 bg-amber" : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-11 h-11 rounded-full border border-white/20 hover:border-olive text-white/50 hover:text-olive flex items-center justify-center transition-all duration-200"
          >
            <Icon.ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t, dim }: { t: Testimonial; dim?: boolean }) {
  return (
    <div
      className={`relative rounded-3xl p-7 sm:p-9 border ${dim ? "bg-forest-mid border-white/8" : "bg-white/10 border-white/15 shadow-2xl backdrop-blur-sm"}`}
    >
      {/* Quote icon */}
      {!dim && (
        <div className="absolute top-6 right-8 text-olive/20">
          <Icon.Quote />
        </div>
      )}
      <Stars n={t.stars} />
      <p
        className={`font-sans leading-relaxed my-5 ${dim ? "text-white/40 text-sm" : "text-white/80 text-base"}`}
      >
        "{t.text}"
      </p>
      <div className="flex items-center gap-3.5">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0"
          style={{ background: t.color, color: "#F3F4F1" }}
        >
          {t.initials}
        </div>
        <div>
          <div
            className={`font-display font-semibold leading-tight ${dim ? "text-white/40" : "text-white"}`}
          >
            {t.name}
          </div>
          <div
            className={`text-xs font-sans mt-0.5 ${dim ? "text-white/25" : "text-white/45"}`}
          >
            {t.role} · {t.country}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admission ────────────────────────────────────────────────────────────────
function Admission() {
  const { ref, vis } = useReveal();
  return (
    <section id="admission" ref={ref} className="py-24 sm:py-32 bg-cream">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className={`text-center mb-16 reveal ${vis ? "visible" : ""}`}>
          <SectionLabel>Getting Started</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl text-forest font-bold mt-2 mb-3">
            Admission in 7 Simple Steps
          </h2>
          <OrnamentDivider />
        </div>

        <div className="relative">
          {/* Vertical track */}
          <div className="absolute left-[1.95rem] top-6 bottom-6 w-px bg-gradient-to-b from-olive via-amber to-olive opacity-20 hidden sm:block" />

          <div className="space-y-5">
            {admissionSteps.map((s, i) => (
              <div
                key={s.n}
                className={`flex gap-5 items-start reveal ${vis ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.08 + 0.15}s` }}
              >
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-forest flex items-center justify-center font-display font-bold text-olive text-base shadow-lg relative z-10">
                  {s.n}
                </div>
                <div className="flex-1 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-forest/5 hover:border-olive/20 hover:shadow-md transition-all duration-300">
                  <h4 className="font-display text-forest font-bold text-base sm:text-lg mb-1">
                    {s.title}
                  </h4>
                  <p className="text-forest/55 font-sans text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Fees ─────────────────────────────────────────────────────────────────────

function Fees({ onNav }: { onNav: (s: string) => void }) {
  const { ref, vis } = useReveal();
  return (
    <section id="fees" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section heading */}
        <div
          ref={ref}
          className={`text-center mb-14 reveal ${vis ? "visible" : ""}`}
        >
          <span className="chip mb-4 inline-block bg-olive/10 text-olive">
            Pricing
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight text-depth">
            Simple, Transparent Fees
          </h2>

          <p className="text-white/50 font-sans text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Choose a learning schedule that matches your goals, availability,
            and desired pace of progress.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {pricingPlans.map((plan, i) => {
            const PlanIcon = plan.icon;

            return (
              <div
                key={plan.title}
                className={`relative reveal ${
                  vis ? "visible" : ""
                } ${plan.popular ? "md:-translate-y-3" : ""}`}
                style={{
                  transitionDelay: `${0.15 + i * 0.1}s`,
                }}
              >
                {/* Recommended badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className="px-4 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-[.16em] text-white shadow-lg"
                      style={{
                        background: plan.accent,
                      }}
                    >
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={`relative h-full flex flex-col rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                    plan.popular
                      ? "border-amber/40 bg-forest-mid"
                      : "border-white/10 bg-forest-mid"
                  }`}
                >
                  {/* Accent line */}
                  <div
                    className="h-1.5 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${plan.accent}, transparent)`,
                    }}
                  />

                  <div className="p-7 sm:p-8 flex flex-col flex-1">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        background: `${plan.accent}18`,
                        color: plan.accent,
                      }}
                    >
                      <PlanIcon />
                    </div>

                    {/* Plan title */}
                    <h3 className="font-display text-xl text-white font-bold mb-2">
                      {plan.title}
                    </h3>

                    {/* Sessions */}
                    <p
                      className="font-sans text-sm font-medium mb-7"
                      style={{ color: plan.accent }}
                    >
                      {plan.sessions}
                    </p>

                    {/* Price */}
                    <div className="mb-5">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl sm:text-5xl text-white font-bold tracking-tight">
                          {plan.priceNaira}
                        </span>
                        <span className="text-white/40 font-sans text-sm">
                          / month
                        </span>
                      </div>

                      <div className="mt-2 text-white/40 font-sans text-sm">
                        Equivalent to{" "}
                        <span className="text-white/65 font-semibold">
                          {plan.priceDollar}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/55 font-sans text-sm leading-relaxed mb-8">
                      {plan.description}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-white/10 mb-7" />

                    {/* What's included */}
                    <div className="mb-8">
                      <p className="text-white/80 font-sans text-xs font-bold uppercase tracking-[.14em] mb-4">
                        What's Included
                      </p>

                      <ul className="space-y-3">
                        {[
                          "1-on-1 personalised sessions",
                          "30–45 minutes per session",
                          "Flexible scheduling",
                          "Progress monitoring",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{
                                background: `${plan.accent}18`,
                                color: plan.accent,
                              }}
                            >
                              <Icon.Check />
                            </div>

                            <span className="text-white/55 font-sans text-sm leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <button
                        onClick={() => onNav("register")}
                        className="w-full py-3.5 rounded-2xl font-sans font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                        style={{
                          background: plan.popular
                            ? plan.accent
                            : `${plan.accent}15`,
                          color: plan.popular ? "#fff" : plan.accent,
                          border: plan.popular
                            ? "none"
                            : `1px solid ${plan.accent}35`,
                        }}
                      >
                        Choose This Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shared benefits */}
        <div
          className={`mt-16 reveal ${vis ? "visible" : ""}`}
          style={{ transitionDelay: ".5s" }}
        >
          <div className="relative overflow-hidden rounded-[2rem] bg-[#F4F6E8] border border-[#9BAD30]/20 shadow-xl">
            {/* Decorative background elements */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-olive/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-amber/10 blur-3xl pointer-events-none" />

            <div className="relative grid lg:grid-cols-[0.8fr_1.5fr] gap-10 lg:gap-16 p-7 sm:p-10 lg:p-14">
              {/* Left: Introduction */}
              <div className="flex flex-col justify-center">
                <span className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full bg-olive/10 text-olive font-sans text-[10px] font-bold uppercase tracking-[0.16em] mb-5">
                  The Fikr Standard
                </span>

                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-forest font-bold leading-tight mb-4">
                  More than a class.
                  <br />
                  <span className="text-olive">
                    A complete learning experience.
                  </span>
                </h3>

                <p className="text-forest/55 font-sans text-sm sm:text-base leading-relaxed max-w-md">
                  Every student receives the same high standard of personalised
                  attention, structured learning, and continuous support —
                  regardless of the programme or schedule they choose.
                </p>

                {/* Small trust indicator */}
                <div className="flex items-center gap-3 mt-7 pt-6 border-t border-forest/10">
                  <div className="w-10 h-10 rounded-xl bg-olive/10 flex items-center justify-center text-olive">
                    <Icon.Award />
                  </div>

                  <div>
                    <p className="font-display text-sm font-bold text-forest">
                      Personalised 1-on-1 Learning
                    </p>
                    <p className="font-sans text-xs text-forest/45 mt-0.5">
                      Built around every student's pace
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Benefits */}
              <div className="grid sm:grid-cols-2 gap-3">
                {perks.map((perk, index) => (
                  <div
                    key={perk}
                    className="group flex items-start gap-4 rounded-2xl bg-white/65 border border-forest/[0.06] p-4 sm:p-5 transition-all duration-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {/* Number */}
                    <span className="font-display text-xs font-bold text-forest/20 pt-1 w-4 shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Check */}
                    <div className="w-8 h-8 rounded-xl bg-olive/10 text-olive flex items-center justify-center shrink-0 group-hover:bg-olive group-hover:text-white transition-colors duration-300">
                      <Icon.Check />
                    </div>

                    {/* Text */}
                    <span className="text-forest/65 font-sans text-sm leading-relaxed pt-1">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Bottom reassurance */}
        <div
          className={`text-center mt-8 reveal ${vis ? "visible" : ""}`}
          style={{ transitionDelay: ".6s" }}
        >
          <p className="text-white/35 font-sans text-xs sm:text-sm">
            All programmes are delivered online through personalised 1-on-1
            classes.
          </p>
        </div>
      </div>
    </section>
  );
}
// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const { ref, vis } = useReveal();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" ref={ref} className="py-24 sm:py-32 bg-cream">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <div className={`text-center mb-14 reveal ${vis ? "visible" : ""}`}>
          <SectionLabel>Common Questions</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl text-forest font-bold mt-2 mb-3">
            Frequently Asked Questions
          </h2>
          <OrnamentDivider />
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl border border-forest/6 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 reveal ${vis ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.07 + 0.15}s` }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-display text-forest font-semibold text-base leading-snug">
                  {f.q}
                </span>
                <span
                  className={`text-forest/40 shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                >
                  <Icon.ChevronDown />
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-350 ${open === i ? "max-h-60" : "max-h-0"}`}
              >
                <p className="px-6 pb-5 text-forest/55 font-sans text-sm leading-relaxed">
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Registration ─────────────────────────────────────────────────────────────
function Registration() {
  const { ref, vis } = useReveal();
  const [form, setForm] = useState({
    fullName: "",
    parentName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    gender: "",
    dob: "",
    experience: "",
    programme: "",
    days: [] as string[],
    time: "",
    tz: "",
  });
  const [done, setDone] = useState(false);
  const prog = [
    "Basic Qaidah",
    "Reading The Qur'an Fluently (Nazrah)",
    "Memorization of The Qur'an (Hifzul Qur'an)",
    "Revision For Huffaz (Murojah)",
  ];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const toggleDay = (d: string) =>
    setForm((f) => ({
      ...f,
      days: f.days.includes(d) ? f.days.filter((x) => x !== d) : [...f.days, d],
    }));

  return (
    <section id="register" ref={ref} className="py-24 sm:py-32 bg-forest-mid">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className={`text-center mb-14 reveal ${vis ? "visible" : ""}`}>
          <SectionLabelLight>Begin Your Journey</SectionLabelLight>
          <h2 className="font-display text-4xl sm:text-5xl text-white font-bold mt-2 mb-3">
            Student Registration
          </h2>
          <OrnamentDivider light />
        </div>

        {done ? (
          <div className="bg-white/8 rounded-3xl p-14 text-center border border-white/15">
            <div className="w-20 h-20 rounded-full bg-olive/20 flex items-center justify-center text-olive mx-auto mb-6">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-display text-3xl text-white font-bold mb-3">
              JazakAllahu Khayran!
            </h3>
            <p className="text-white/60 font-sans leading-relaxed">
              Your registration has been received. Our team will be in touch
              within 24 hours to arrange your free placement assessment.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className={`space-y-5 reveal ${vis ? "visible" : ""}`}
            style={{ transitionDelay: ".2s" }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/55 font-sans text-xs uppercase tracking-wider mb-2">
                  Full Name <span className="text-amber">*</span>
                </label>
                <input
                  className="field"
                  placeholder="Aisha Muhammad"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, fullName: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-white/55 font-sans text-xs uppercase tracking-wider mb-2">
                  Parent / Guardian
                </label>
                <input
                  className="field"
                  placeholder="If applicable"
                  value={form.parentName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, parentName: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-white/55 font-sans text-xs uppercase tracking-wider mb-2">
                  Email <span className="text-amber">*</span>
                </label>
                <input
                  type="email"
                  className="field"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-white/55 font-sans text-xs uppercase tracking-wider mb-2">
                  Phone <span className="text-amber">*</span>
                </label>
                <input
                  type="tel"
                  className="field"
                  placeholder="+234 800 000 0000"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-white/55 font-sans text-xs uppercase tracking-wider mb-2">
                  Country <span className="text-amber">*</span>
                </label>
                <input
                  className="field"
                  placeholder="Nigeria"
                  value={form.country}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, country: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-white/55 font-sans text-xs uppercase tracking-wider mb-2">
                  State / City
                </label>
                <input
                  className="field"
                  placeholder="Lagos"
                  value={form.state}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, state: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-white/55 font-sans text-xs uppercase tracking-wider mb-2">
                  Gender <span className="text-amber">*</span>
                </label>
                <select
                  className="field"
                  value={form.gender}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, gender: e.target.value }))
                  }
                  required
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label className="block text-white/55 font-sans text-xs uppercase tracking-wider mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="field"
                  value={form.dob}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, dob: e.target.value }))
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-white/55 font-sans text-xs uppercase tracking-wider mb-2">
                Previous Qur'an Experience <span className="text-amber">*</span>
              </label>
              <select
                className="field"
                value={form.experience}
                onChange={(e) =>
                  setForm((f) => ({ ...f, experience: e.target.value }))
                }
                required
              >
                <option value="">Select your level</option>
                <option>Complete beginner — no prior knowledge</option>
                <option>Can read Arabic letters</option>
                <option>Can read basic Qaidah</option>
                <option>Can recite but with errors</option>
                <option>Reading fluently, learning Tajweed</option>
                <option>Currently memorising</option>
                <option>Hafiz looking for revision</option>
              </select>
            </div>

            <div>
              <label className="block text-white/55 font-sans text-xs uppercase tracking-wider mb-2">
                Selected Programme <span className="text-amber">*</span>
              </label>
              <select
                className="field"
                value={form.programme}
                onChange={(e) =>
                  setForm((f) => ({ ...f, programme: e.target.value }))
                }
                required
              >
                <option value="">Choose a programme</option>
                {prog.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/55 font-sans text-xs uppercase tracking-wider mb-3">
                Preferred Class Days
              </label>
              <div className="flex flex-wrap gap-2">
                {days.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDay(d)}
                    className={`px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-200 ${form.days.includes(d) ? "bg-olive text-forest" : "bg-white/8 text-white/50 hover:bg-white/15 border border-white/10"}`}
                  >
                    {d.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/55 font-sans text-xs uppercase tracking-wider mb-2">
                  Time of Day
                </label>
                <select
                  className="field"
                  value={form.time}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, time: e.target.value }))
                  }
                >
                  <option value="">Select time</option>
                  <option>Morning (6am – 12pm)</option>
                  <option>Afternoon (12pm – 5pm)</option>
                  <option>Evening (5pm – 10pm)</option>
                </select>
              </div>
              <div>
                <label className="block text-white/55 font-sans text-xs uppercase tracking-wider mb-2">
                  Timezone
                </label>
                <select
                  className="field"
                  value={form.tz}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, tz: e.target.value }))
                  }
                >
                  <option value="">Select timezone</option>
                  <option>WAT (UTC+1) — Nigeria</option>
                  <option>GMT (UTC+0) — UK / Ghana</option>
                  <option>EST (UTC-5) — Eastern North America</option>
                  <option>CST (UTC-6) — Central North America</option>
                  <option>PST (UTC-8) — Western North America</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber hover:bg-amber/90 text-white py-4 rounded-2xl font-sans font-semibold text-base transition-all duration-300 hover:shadow-[0_0_32px_rgba(215,113,41,.4)] mt-2"
            >
              Submit Registration →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const { ref, vis } = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const channels = [
    {
      Icon: Icon.MessageCircle,
      label: "WhatsApp",
      val: "+234 911 438 5960",
      href: "https://wa.me/2349114385960",
    },
    {
      Icon: Icon.Phone,
      label: "Phone",
      val: "+234 818 201 6174",
      href: "tel:+2348182016174",
    },
    {
      Icon: Icon.Mail,
      label: "Email",
      val: "fikrquranacademy@gmail.com",
      href: "mailto:fikrquranacademy@gmail.com",
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-24 sm:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className={`text-center mb-16 reveal ${vis ? "visible" : ""}`}>
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl text-forest font-bold mt-2 mb-3">
            Contact Us
          </h2>
          <OrnamentDivider />
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Left */}
          <div
            className={`reveal-l ${vis ? "visible" : ""} space-y-6`}
            style={{ transitionDelay: ".15s" }}
          >
            <div>
              <h3 className="font-display text-2xl text-forest font-bold mb-3">
                We'd love to hear from you
              </h3>
              <p className="text-forest/55 font-sans leading-relaxed">
                Whether you have a question about our programmes, need help with
                registration, or simply want to learn more — our team is here
                and ready to help.
              </p>
            </div>
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-forest/8 hover:border-olive/25 hover:shadow-md transition-all duration-300 card-3d group"
              >
                <div className="w-12 h-12 rounded-xl bg-forest/8 flex items-center justify-center text-forest/50 group-hover:bg-olive/15 group-hover:text-olive transition-colors duration-300">
                  <c.Icon />
                </div>
                <div>
                  <div className="font-display text-forest font-semibold text-base">
                    {c.label}
                  </div>
                  <div className="text-forest/45 font-sans text-sm">
                    {c.val}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Right */}
          <div
            className={`reveal-r ${vis ? "visible" : ""}`}
            style={{ transitionDelay: ".2s" }}
          >
            {sent ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-forest/8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-olive/15 flex items-center justify-center text-olive mx-auto mb-4">
                  <Icon.Check />
                </div>
                <h4 className="font-display text-2xl text-forest font-bold mb-2">
                  Message Sent!
                </h4>
                <p className="text-forest/55 font-sans">
                  We'll get back to you within 24 hours, InshāAllah.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-forest/8 space-y-5"
              >
                <div>
                  <label className="block text-forest/45 font-sans text-xs uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    className="field-light"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-forest/45 font-sans text-xs uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="field-light"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-forest/45 font-sans text-xs uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="field-light resize-none"
                    placeholder="I'd like to know more about..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-forest hover:bg-forest-mid text-white py-4 rounded-2xl font-sans font-semibold transition-all duration-300"
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Terms ────────────────────────────────────────────────────────────────────
function Terms() {
  const { ref, vis } = useReveal();
  const [openSection, setOpenSection] = useState<number | null>(null);

  const sections = [
    {
      title: "Student Requirements & Class Policies",
      content: [
        "Students must register for their online Qur'an class in advance and pay the required fees.",
        "Students are expected to attend all of their scheduled classes. If a student needs to miss a class, they must notify the teacher as soon as possible.",
        "Students are expected to be on time for class. If a student is more than 15 minutes late, they may be marked as absent.",
        "Students are expected to behave respectfully in class. This includes being polite to the teacher and refraining from disruptive behavior.",
        "Students must have a computer with a working webcam and microphone in order to participate in online Qur'an classes.",
      ],
    },
    {
      title: "Recording & Materials Policy",
      content: [
        "Students are not allowed to record classes without the teacher's permission.",
        "All of the materials used in online Qur'an classes are copyrighted. Students are not allowed to share or distribute these materials without permission.",
      ],
    },
    {
      title: "Privacy & Dispute Resolution",
      content: [
        "The online Qur'an class will respect the privacy of all students. Student information will not be shared with third parties without permission.",
        "Any disputes arising from the online Qur'an class will be resolved amicably. If a resolution cannot be reached, the dispute will be submitted to arbitration.",
      ],
    },
  ];

  return (
    <section id="terms" ref={ref} className="py-24 sm:py-32 bg-forest">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className={`text-center mb-16 reveal ${vis ? "visible" : ""}`}>
          <SectionLabelLight>Policies</SectionLabelLight>
          <h2 className="font-display text-4xl sm:text-5xl text-white font-bold mt-2 mb-3">
            Terms and Conditions
          </h2>
          <OrnamentDivider light />
        </div>

        <div className="space-y-4">
          {sections.map((section, i) => (
            <div
              key={i}
              className={`bg-white/8 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm hover:bg-white/12 transition-all duration-300 reveal ${vis ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.1 + 0.15}s` }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpenSection(openSection === i ? null : i)}
              >
                <span className="font-display text-white font-semibold text-base leading-snug">
                  {section.title}
                </span>
                <span
                  className={`text-white/40 shrink-0 transition-transform duration-300 ${openSection === i ? "rotate-180" : ""}`}
                >
                  <Icon.ChevronDown />
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-350 ${openSection === i ? "max-h-96" : "max-h-0"}`}
              >
                <div className="px-6 pb-5">
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-olive text-sm mt-1.5">•</span>
                        <span className="text-white/70 font-sans text-sm leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onNav }: { onNav: (s: string) => void }) {
  const links = [
    "About",
    "Programmes",
    "Admission",
    "Fees",
    "Terms",
    "Contact",
  ];
  return (
    <footer className="bg-[#0d2512] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/fikr-logo.jpeg"
                alt="Fikr logo"
                width={44}
                height={44}
                className="rounded-full object-contain bg-white/10 p-1 ring-1 ring-olive/25"
              />
              <div>
                <div className="font-display text-lg font-bold leading-tight">
                  Fikr Quran Academy
                </div>
                <div className="text-olive/60 text-[10px] tracking-[.2em] uppercase font-sans">
                  Online Islamic Education
                </div>
              </div>
            </div>
            <p className="text-white/40 font-sans text-sm leading-relaxed max-w-xs mb-5">
              Building strong Muslims through structured Qur'an and Islamic
              education — accessible from anywhere in the world.
            </p>
            <p className="font-arabic text-xl text-olive/60" dir="rtl">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
          </div>
          <div>
            <h5 className="text-white/35 font-sans text-[10px] uppercase tracking-[.18em] font-semibold mb-5">
              Navigation
            </h5>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l}>
                  <button
                    onClick={() => onNav(l.toLowerCase())}
                    className="text-white/45 hover:text-olive font-sans text-sm transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-white/35 font-sans text-[10px] uppercase tracking-[.18em] font-semibold mb-5">
              Programmes
            </h5>
            <ul className="space-y-3">
              {programmes.map((p) => (
                <li key={p.title}>
                  <button
                    onClick={() => onNav("programmes")}
                    className="text-white/45 hover:text-olive font-sans text-sm text-left transition-colors"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ornament-line opacity-15 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 font-sans text-xs">
            © {new Date().getFullYear()} Fikr Quran Academy. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => onNav("register")}
              className="text-amber/70 hover:text-amber font-sans text-xs font-medium transition-colors"
            >
              Enrol Now
            </button>
            <button
              onClick={() => onNav("contact")}
              className="text-white/30 hover:text-white/60 font-sans text-xs transition-colors"
            >
              Book Free Assessment
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const scrollTo = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen">
      <Nav onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <About />
      <WhyChoose onNav={scrollTo} />
      <Programmes onNav={scrollTo} />
      <Testimonials />
      <Admission />
      <Fees onNav={scrollTo} />
      <FAQ />
      <Registration />
      <Contact />
      <Terms />
      <Footer onNav={scrollTo} />
    </div>
  );
}
