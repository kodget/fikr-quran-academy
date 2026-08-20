"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import RegistrationForm from "@/components/RegistrationForm";
import RegistrationSuccess from "@/components/RegistrationSuccess";

/* ─────────────────────────────────────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────────────────────────────────────── */
function IBook() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function IMic() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}
function IMoon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function ISun() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
function IRotate() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
    </svg>
  );
}
function IUser() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IClock() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function ITarget() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IUsers() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IGlobe() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function IAward() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
function IArrow() {
  return (
    <svg
      width="16"
      height="16"
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
  );
}
function IChevLeft() {
  return (
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
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function IChevRight() {
  return (
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
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function IChevDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function IMenu() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function IClose() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IPlus() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function ICheck() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IStar() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IPhone() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IMail() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function IMsg() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function ICalendar() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IZap() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IQuote() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}
function IPin() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────────────────────────────────────── */
interface Testimonial {
  name: string;
  role: string;
  country: string;
  text: string;
  stars: number;
  initials: string;
  image?: string; // Optional image URL from database
}

// Testimonials will be fetched from API
let testimonials: Testimonial[] = [];

const programmes = [
  {
    title: "Basic Qaidah",
    arabicTitle: "القاعدة الأساسية",
    level: "Foundation",
    Icon: IBook,
    shortDesc:
      "A structured foundation for beginners to recognise, pronounce, and join Arabic letters correctly before progressing to Qur'an recitation.",
    description:
      "Basic Qaidah is the foundational course for anyone starting their journey to read the Qur'an. Students learn to recognise Arabic letters, pronounce them correctly, and join them into words using a proven, structured method.",
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
      "Qaidah is the gateway to the Qur'an. A weak foundation here leads to mispronunciation habits that are difficult to correct later. This course ensures students read Arabic accurately and confidently.",
    duration:
      "Students typically complete the foundational book within 4 to 6 months with 3 to 4 sessions per week, depending on age and learning pace.",
  },
  {
    title: "Reading The Qur'an Fluently",
    arabicTitle: "النظرة والتجويد",
    level: "Intermediate",
    Icon: IMic,
    shortDesc:
      "Build fluency, confidence, and accuracy — moving from basic Arabic reading to reading directly from the Mushaf with correct Tajweed.",
    description:
      "Nazrah is taken after completing Basic Qaidah. Students move from reading simple words to reading the Qur'an directly from the Mushaf, applying letter and vowel rules to real Qur'anic text.",
    learn: [
      "Applying Qaidah rules directly to Qur'anic verses",
      "Correct pronunciation within continuous Qur'anic text",
      "Recognising Waqf (stopping) and Wasl (continuation) signs",
      "Basic Tajweed rules in practical application",
      "Noon Sakinah, Meem Sakinah, and Madd rules",
      "Reading multiple Surahs with increasing fluency and speed",
      "Reducing hesitation and improving natural flow",
      "Familiarity with different Mushaf formats and page layouts",
    ],
    importance:
      "Nazrah bridges the gap between learning to read Arabic and reading the Qur'an with confidence. It strengthens a student's ability to recite smoothly, essential before Tajweed study or memorisation.",
    duration:
      "Most students complete this within 6 to 12 months with 3 to 4 sessions per week, depending on age, consistency, and prior reading ability.",
  },
  {
    title: "Memorisation of The Qur'an",
    arabicTitle: "حفظ القرآن الكريم",
    level: "Advanced",
    Icon: IMoon,
    shortDesc:
      "A structured Hifz programme combining systematic memorisation, Tajweed, daily revision, and long-term retention.",
    description:
      "Hifzul Qur'an is a structured memorisation programme for students who can read the Qur'an fluently. Students memorise Juz by Juz under close guidance with continuous revision to ensure long-term retention.",
    learn: [
      "Systematic memorisation of the Qur'an, Juz by Juz",
      "Proper Tajweed application throughout memorisation",
      "Daily revision (Muraja'ah) to retain memorised portions",
      "Linking and connecting Surahs and Ayahs for smoother recall",
      "Strategies for overcoming common memorisation challenges",
      "Building consistency and discipline in daily memorisation",
      "Preparing for recitation from memory",
      "Sabaq, Sabqi, and Manzil revision systems",
    ],
    importance:
      "Memorising the Qur'an is one of the most rewarding journeys a Muslim can undertake. It preserves the Qur'an within the heart and deepens understanding of its meanings over time.",
    duration:
      "A focused student may memorise a Juz in as little as 2 months. Completing the full Qur'an typically ranges from 2 to 5 years depending on pace and commitment.",
  },
  {
    title: "Revision For Huffaz",
    arabicTitle: "مراجعة للحفاظ",
    level: "Huffaz",
    Icon: IRotate,
    shortDesc:
      "Structured Muraja'ah for Huffaz who want to strengthen, maintain, and protect their Qur'an memorisation.",
    description:
      "Murojah is a dedicated revision programme for students who have completed memorisation but need structured support to retain it. Students recite before a qualified teacher who corrects mistakes and tracks weak areas.",
    learn: [
      "Structured revision cycles covering the full Qur'an",
      "Techniques to identify and strengthen weak portions",
      "Methods for daily, weekly, and monthly revision planning",
      "Correcting memorisation errors that developed over time",
      "Improving recitation speed and accuracy from memory",
      "Strategies to prevent forgetting through spaced repetition",
      "Listening and paired-revision techniques",
      "Building a sustainable long-term revision habit",
    ],
    importance:
      "Memorising the Qur'an is only half the journey — retaining it requires consistent revision. Without regular Muraja'ah, even strong memorisation weakens over time.",
    duration:
      "A set number of pages is assigned per session based on attendance and pace. A full revision cycle is completed on a rotating basis, adjusted to each student's schedule.",
  },
];

const whyItems = [
  {
    n: "01",
    Icon: IUser,
    title: "Personalised 1-on-1",
    desc: "Your teacher adapts pace, content, and style entirely to you — no group dynamics, no falling behind.",
  },
  {
    n: "02",
    Icon: IClock,
    title: "Flexible Scheduling",
    desc: "Morning, afternoon, or evening. Weekday or weekend. Pick what genuinely fits your life.",
  },
  {
    n: "03",
    Icon: ITarget,
    title: "Goal-Oriented Progress",
    desc: "Clear milestones, measurable targets, and regular assessments so progress is always visible.",
  },
  {
    n: "04",
    Icon: IUsers,
    title: "Dedicated Support",
    desc: "A warm community of learners. Parents receive weekly reports and dedicated WhatsApp support.",
  },
  {
    n: "05",
    Icon: IGlobe,
    title: "Global Accessibility",
    desc: "Students from Nigeria, UK, Canada, USA, Ghana and beyond — learning from anywhere in the world.",
  },
  {
    n: "06",
    Icon: IAward,
    title: "Qualified Instruction",
    desc: "Highly knowledgeable teachers with structured programmes designed for measurable, meaningful progress.",
  },
];

const pricingPlans = [
  {
    title: "Twice Weekly",
    sessions: "8 sessions / month",
    priceNaira: "₦40,000",
    priceDollar: "$40",
    description:
      "A steady programme for students who want consistent Qur'an learning alongside school, work, or other commitments.",
    Icon: ICalendar,
    popular: false,
  },
  {
    title: "Three Times Weekly",
    sessions: "12 sessions / month",
    priceNaira: "₦50,000",
    priceDollar: "$50",
    description:
      "Our balanced programme for students who want faster progress while maintaining a sustainable weekly routine.",
    Icon: IZap,
    popular: true,
  },
  {
    title: "Four Times Weekly",
    sessions: "16 sessions / month",
    priceNaira: "₦60,000",
    priceDollar: "$60",
    description:
      "Our most intensive programme for students committed to accelerating their Qur'an reading, memorisation, or revision.",
    Icon: IStar,
    popular: false,
  },
];

const perks = [
  "Personalised 1-on-1 sessions (30 to 45 minutes per session)",
  "Flexible scheduling to fit your lifestyle",
  "Highly knowledgeable and dedicated instructors",
  "Access to comprehensive Qur'anic education materials",
  "Focus on recitation precision and memorisation excellence",
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
    a: "Yes. Every new student receives a free placement assessment and trial class before committing to any programme. No payment details required upfront.",
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
    desc: "Fill in our online registration form with your details and learning goals.",
  },
  {
    n: "02",
    title: "Placement Assessment",
    desc: "A free 30-minute session with a qualified teacher to establish your exact level.",
  },
  {
    n: "03",
    title: "Choose Programme",
    desc: "Select the programme that best matches your goals and current level.",
  },
  {
    n: "04",
    title: "Select Schedule",
    desc: "Choose your preferred days and time — morning, afternoon, or evening.",
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
    desc: "Your teacher confirms your first session. Your Qur'anic journey begins.",
  },
];

const termsSections = [
  {
    n: "01",
    title: "Student Requirements & Class Policies",
    items: [
      "Students must register and pay the required fees before attending class.",
      "Students are expected to attend all scheduled classes. If unable to attend, they must notify the teacher as soon as possible.",
      "Students are expected to be on time. If more than 15 minutes late, they may be marked as absent.",
      "Students must behave respectfully in class — being polite to the teacher and refraining from disruptive behaviour.",
      "Students must have a device with a working webcam and microphone to participate.",
    ],
  },
  {
    n: "02",
    title: "Recording & Materials Policy",
    items: [
      "Students are not permitted to record classes without the teacher's explicit permission.",
      "All materials used in classes are copyrighted. Students are not permitted to share or distribute these materials without written permission.",
    ],
  },
  {
    n: "03",
    title: "Privacy & Dispute Resolution",
    items: [
      "Fikr Quran Academy respects the privacy of all students. Student information will not be shared with third parties without express permission.",
      "Any disputes arising from classes will be resolved amicably. If a resolution cannot be reached, the matter will be submitted to arbitration.",
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(true); // Changed to true to make content immediately visible
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

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    try {
      const stored = localStorage.getItem("fikr-theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const initial =
        stored === "dark" || stored === "light"
          ? (stored as "light" | "dark")
          : prefersDark
            ? "dark"
            : "light";
      setTheme(initial);
      if (initial === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    } catch (_) {}
  }, []);
  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("fikr-theme", next);
        if (next === "dark") document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      } catch (_) {}
      return next;
    });
  }, []);
  return { theme, toggle };
}

/* ─────────────────────────────────────────────────────────────────────────────
   PRIMITIVES
───────────────────────────────────────────────────────────────────────────── */
function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" style={{ color: "var(--accent)" }}>
      {Array.from({ length: n }).map((_, i) => (
        <IStar key={i} />
      ))}
    </div>
  );
}

function SectionHeading({
  arabic,
  eyebrow,
  title,
  description,
  light = false,
  center = true,
}: {
  arabic?: string;
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {arabic && (
        <p className="arabic-eyebrow mb-1" dir="rtl">
          {arabic}
        </p>
      )}
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2
        className="font-display font-light mb-4"
        style={{
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: light ? "var(--primary-foreground)" : "var(--foreground)",
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="font-sans text-base leading-relaxed max-w-xl"
          style={{
            color: light ? "rgba(255,255,255,0.5)" : "var(--foreground-subtle)",
            margin: center ? "0 auto" : undefined,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────────────────────────────── */
function Nav({
  onNav,
  theme,
  toggleTheme,
}: {
  onNav: (s: string) => void;
  theme: string;
  toggleTheme: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "About", id: "about" },
    { label: "Programmes", id: "programmes" },
    { label: "Admission", id: "admission" },
    { label: "Fees", id: "fees" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  const go = (id: string) => {
    onNav(id);
    setOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "nav-scrolled py-3" : "bg-transparent py-5"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => go("hero")}
            className="flex items-center gap-3 shrink-0"
            aria-label="Fikr Quran Academy — return to top"
          >
            <img
              src="/images/fikr-logo.jpeg"
              alt=""
              aria-hidden="true"
              className="h-9 w-9 rounded-full object-cover"
              style={{ outline: "1px solid rgba(255,255,255,0.2)" }}
            />
            <div className="hidden xs:block text-left">
              <div
                className="text-white font-display font-semibold text-base leading-tight"
                style={{ letterSpacing: "-0.01em" }}
              >
                Fikr Quran Academy
              </div>
              <div
                className="font-sans text-[9px] tracking-[0.2em] uppercase mt-0.5"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Online Education
              </div>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="relative font-sans text-sm font-medium tracking-wide transition-colors duration-200 group"
                style={{ color: "rgba(255,255,255,0.65)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.65)")
                }
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {theme === "dark" ? <ISun /> : <IMoon />}
            </button>
            <a
              href="/blog"
              className="btn-base btn-ghost-light text-sm px-4 py-2"
            >
              Blog
            </a>
            <button
              onClick={() => go("register")}
              className="btn-base btn-gold text-sm px-5 py-2"
            >
              Enrol Now
            </button>
          </div>

          {/* Mobile right */}
          <div className="flex lg:hidden items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {theme === "dark" ? <ISun /> : <IMoon />}
            </button>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ color: "rgba(255,255,255,0.7)" }}
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
            >
              <IMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div
          className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 bottom-0 w-72 flex flex-col py-8 px-6 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
          style={{ background: "var(--primary)" }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <img
                src="/images/fikr-logo.jpeg"
                alt="Fikr Quran Academy"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="font-display text-white font-semibold text-base">
                Fikr Quran Academy
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg transition-colors"
              style={{ color: "rgba(255,255,255,0.5)" }}
              aria-label="Close menu"
            >
              <IClose />
            </button>
          </div>

          <div
            className="h-px mb-6"
            style={{ background: "rgba(255,255,255,0.1)" }}
          />

          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-left font-sans text-base py-2.5 px-3 rounded-lg transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-3">
            <div
              className="h-px mb-4"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />
            <a
              href="/blog"
              className="w-full btn-base btn-ghost-light text-sm py-2.5 block text-center"
            >
              Read Blog
            </a>
            <button
              onClick={() => go("register")}
              className="w-full btn-base btn-gold text-sm py-2.5"
            >
              Enrol Now →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────────── */
function Hero({ onNav }: { onNav: (s: string) => void }) {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 10% 15%, rgba(44,95,62,0.95) 0%, rgba(30,75,48,0.98) 60%), radial-gradient(ellipse at 90% 85%, rgba(232,116,68,0.15) 0%, transparent 50%)",
        backgroundColor: "#1E4A34",
      }}
    >
      {/* Subtle geometric overlay */}
      <div
        className="absolute inset-0 islamic-geo opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Soft glow top-left */}
      <div
        className="absolute top-0 left-0 w-[55vw] h-[55vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,116,68,0.09) 0%, transparent 70%)",
          transform: "translate(-20%,-20%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative rotating ring — desktop only */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[400px] h-[400px] opacity-[0.06] pointer-events-none hidden lg:block anim-rotate"
        aria-hidden="true"
      >
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
          {[0, 1, 2, 3].map((i) => (
            <polygon
              key={i}
              points="150,15 285,82 285,218 150,285 15,218 15,82"
              stroke="#B8972A"
              strokeWidth="0.8"
              opacity={0.9 - i * 0.18}
              transform={`rotate(${i * 12} 150 150) scale(${1 - i * 0.1}) translate(${i * 15} ${i * 15})`}
            />
          ))}
          <circle
            cx="150"
            cy="150"
            r="45"
            stroke="#B8972A"
            strokeWidth="0.6"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 w-full pt-28 pb-16 lg:min-h-[100svh] lg:flex lg:items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* LEFT — Editorial content */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="anim-fade-up flex items-center gap-4 mb-8">
              <p
                className="font-arabic text-lg"
                style={{
                  color: "var(--accent)",
                  opacity: 0.8,
                  direction: "rtl",
                }}
              >
                القرآن حياة
              </p>
              <div
                className="w-px h-5"
                style={{ background: "rgba(255,255,255,0.2)" }}
                aria-hidden="true"
              />
              <p
                className="font-sans text-[0.65rem] font-semibold tracking-[0.15em] uppercase"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                QUR'ANIC EDUCATION
              </p>
            </div>

            {/* Main headline */}
            <h1
              className="anim-fade-up d-100 font-display font-light text-white mb-6"
              style={{
                fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
              }}
            >
              A Deeper Way
              <br />
              <em style={{ color: "var(--accent-light)", fontStyle: "italic" }}>
                to Learn
              </em>
              <br />
              the Qur&apos;an.
            </h1>

            {/* Supporting copy */}
            <p
              className="anim-fade-up d-200 font-sans text-base sm:text-lg leading-relaxed mb-10 max-w-md"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Structured, personalised Qur&apos;an and Islamic education for
              adults, students, and families — from Nigeria to the world.
            </p>

            {/* CTAs */}
            <div className="anim-fade-up d-300 flex flex-wrap gap-3 mb-12">
              <button
                onClick={() => onNav("register")}
                className="btn-base btn-gold text-sm px-7 py-3.5 group"
              >
                Begin Your Journey
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  <IArrow />
                </span>
              </button>
              <button
                onClick={() => onNav("contact")}
                className="btn-base btn-ghost-light text-sm px-6 py-3.5"
              >
                Book a Free Assessment
              </button>
            </div>

            {/* Trust indicators */}
            <div className="anim-fade-up d-400">
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {[
                  "1-on-1 Learning",
                  "Flexible Scheduling",
                  "Global Access",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--accent)", opacity: 0.7 }}
                      aria-hidden="true"
                    />
                    <span
                      className="font-sans text-sm font-medium"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats strip */}
              <div
                className="flex gap-8 mt-8 pt-8"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                {[
                  { v: "4+", l: "Countries" },
                  { v: "98%", l: "Satisfaction" },
                  { v: "5+", l: "Years" },
                  { v: "100%", l: "1-on-1" },
                ].map((s) => (
                  <div key={s.l}>
                    <div
                      className="font-display font-light"
                      style={{
                        fontSize: "1.5rem",
                        color: "var(--accent-light)",
                      }}
                    >
                      {s.v}
                    </div>
                    <div
                      className="font-sans text-[10px] tracking-wide uppercase mt-0.5"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Qur'anic verse panel (desktop) */}
          <div className="anim-fade-up d-200 hidden lg:block relative">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{
                aspectRatio: "4/5",
                maxHeight: "580px",
                background:
                  "linear-gradient(160deg, rgba(44,82,56,0.95) 0%, rgba(30,58,42,0.98) 100%)",
              }}
            >
              <div
                className="absolute inset-0 islamic-geo opacity-25"
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                <div
                  className="w-16 h-px mb-8"
                  style={{ background: "var(--accent)", opacity: 0.3 }}
                  aria-hidden="true"
                />
                <p
                  className="font-arabic leading-loose mb-4"
                  style={{
                    fontSize: "1.6rem",
                    color: "var(--accent-light)",
                    direction: "rtl",
                  }}
                >
                  وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ
                  <br />
                  فَهَلْ مِن مُّدَّكِرٍ
                </p>
                <p
                  className="font-sans text-sm leading-relaxed max-w-xs"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  &ldquo;And We have certainly made the Qur&apos;an easy for
                  remembrance, so is there anyone who will take heed?&rdquo;
                </p>
                <p
                  className="font-sans text-xs tracking-wide uppercase mt-2"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  Surah Al-Qamar 54:17
                </p>
                <div
                  className="w-16 h-px mt-8"
                  style={{ background: "var(--accent)", opacity: 0.3 }}
                  aria-hidden="true"
                />
                <div className="flex items-center gap-3 mt-10">
                  <img
                    src="/images/fikr-logo.jpeg"
                    alt="Fikr Quran Academy"
                    className="h-14 w-14 rounded-full object-cover"
                    style={{ outline: "2px solid rgba(255,255,255,0.15)" }}
                  />
                  <div className="text-left">
                    <div className="font-display text-white font-semibold text-base leading-tight">
                      Fikr Quran Academy
                    </div>
                    <div
                      className="font-sans text-[10px] tracking-[0.15em] uppercase mt-0.5"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      Premium Qur&apos;an Education
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-5 -left-5 px-5 py-4 shadow-xl anim-float"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(16px)",
                borderRadius: "1rem",
                animationDelay: "1s",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[var(--accent)]"
                  style={{ background: "rgba(232,116,68,0.2)" }}
                >
                  <ICheck />
                </div>
                <div>
                  <div className="text-white font-sans text-sm font-medium">
                    Free Placement Assessment
                  </div>
                  <div
                    className="font-sans text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    No commitment required
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.3 }}
        aria-hidden="true"
      >
        <div
          className="w-px h-12"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)",
          }}
        />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────────────────────────── */
function About({ onNav }: { onNav: (s: string) => void }) {
  const { ref, vis } = useReveal();
  return (
    <section
      id="about"
      ref={ref}
      className="py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(135deg, var(--green-50) 0%, rgba(232,116,68,0.03) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className={`mb-16 reveal ${vis ? "visible" : ""}`}>
          <SectionHeading
            arabic="من نحن"
            eyebrow="WHO WE ARE"
            title="About Fikr Quran Academy"
            description="An online institution dedicated to helping the Muslim Ummah achieve Qur'anic excellence through structured, personalised education."
          />
        </div>

        {/* Story text */}
        <div className="mb-12">
          <div
            className={`reveal ${vis ? "visible" : ""} space-y-5 max-w-3xl mx-auto`}
            style={{ transitionDelay: "0.1s" }}
          >
            <p
              className="font-sans text-base leading-relaxed"
              style={{ color: "var(--foreground-muted)" }}
            >
              Fikr Quran Academy is an online institution that plays a pivotal
              role in educating individuals about the profound teachings of the
              Qur&apos;an. It serves as a hub for learning, understanding, and
              connecting with the Qur&apos;an.
            </p>
            <p
              className="font-sans text-base leading-relaxed"
              style={{ color: "var(--foreground-muted)" }}
            >
              We focus on helping the Muslim Ummah achieve Qur&apos;anic
              excellence through personalised one-on-one classes (30 to 45
              minutes per session) with highly knowledgeable and dedicated
              instructors.
            </p>
            <p
              className="font-sans text-base leading-relaxed"
              style={{ color: "var(--foreground-muted)" }}
            >
              Operating entirely online, we have built a community of dedicated
              students who connect deeply with the Qur&apos;an — not just to
              recite it, but to understand, memorise, and live by it.
            </p>
          </div>
        </div>

        {/* Statistics banner */}
        <div
          className={`reveal ${vis ? "visible" : ""} premium-card p-8 mb-16`}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="grid grid-cols-3 gap-8">
            {[
              { v: "4+", l: "Countries Reached" },
              { v: "100%", l: "Personalised 1-on-1" },
              { v: "7 days", l: "Weekly Availability" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div
                  className="font-display font-light mb-1"
                  style={{
                    fontSize: "2.5rem",
                    color: "var(--accent)",
                    lineHeight: 1,
                  }}
                >
                  {s.v}
                </div>
                <div
                  className="font-sans text-xs uppercase tracking-wider"
                  style={{ color: "var(--foreground-subtle)" }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 ornament-line" />
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            style={{ color: "var(--accent)", opacity: 0.4 }}
          >
            <polygon points="12,2 22,12 12,22 2,12" fill="currentColor" />
          </svg>
          <div className="flex-1 ornament-line" />
        </div>

        {/* Mission / Vision / Philosophy */}
        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {[
            {
              arabic: "رسالتنا",
              label: "Our Mission",
              delay: "0.1s",
              text: "To provide individuals around the world with the opportunity to learn and access high-quality Qur'anic education — reciting with precision and excelling in memorisation.",
            },
            {
              arabic: "رؤيتنا",
              label: "Our Vision",
              delay: "0.2s",
              text: "To create an inclusive and accessible learning environment that produces numerous students who become Hufaazul Qur'an through our impact.",
            },
            {
              arabic: "فلسفتنا",
              label: "Our Philosophy",
              delay: "0.3s",
              text: "Every Muslim deserves access to authentic Qur'anic education delivered with patience, structure, and deep care — regardless of age, location, or starting level.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`reveal premium-card p-7 ${vis ? "visible" : ""}`}
              style={{ transitionDelay: item.delay }}
            >
              <p
                className="font-arabic text-base mb-2"
                style={{
                  color: "var(--accent)",
                  direction: "rtl",
                  textAlign: "right",
                  opacity: 0.65,
                }}
              >
                {item.arabic}
              </p>
              <div
                className="w-8 h-px mb-4"
                style={{ background: "var(--border-strong)" }}
                aria-hidden="true"
              />
              <h3
                className="font-display font-medium mb-3"
                style={{ fontSize: "1.4rem", color: "var(--foreground)" }}
              >
                {item.label}
              </h3>
              <p
                className="font-sans text-sm leading-relaxed"
                style={{ color: "var(--foreground-subtle)" }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   WHY FIKR
───────────────────────────────────────────────────────────────────────────── */
function WhyFikr({ onNav }: { onNav: (s: string) => void }) {
  const { ref, vis } = useReveal();
  return (
    <section
      id="why"
      ref={ref}
      className="py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(135deg, rgba(90,155,74,0.08) 0%, rgba(232,116,68,0.08) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className={`mb-16 reveal ${vis ? "visible" : ""}`}>
          <SectionHeading
            arabic="لماذا فكر؟"
            eyebrow="WHY FIKR"
            title="Designed around the learner."
            description="Six principles that make Fikr Quran Academy different from every other online Qur'an school."
          />
        </div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3"
          style={{
            border: "1px solid var(--border)",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
        >
          {whyItems.map((item, i) => (
            <div
              key={item.n}
              className={`reveal p-8 group transition-all duration-300 ${vis ? "visible" : ""}`}
              style={{
                transitionDelay: `${i * 0.07 + 0.1}s`,
                background: "var(--surface)",
                borderRight: i % 3 !== 2 ? "1px solid var(--border)" : "none",
                borderBottom: i < 3 ? "1px solid var(--border)" : "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--surface-elevated)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--surface)")
              }
            >
              <div className="flex items-start gap-4">
                <span
                  className="font-display text-xs font-light shrink-0 mt-0.5"
                  style={{
                    color: "var(--accent)",
                    opacity: 0.6,
                    minWidth: "1.5rem",
                  }}
                >
                  {item.n}
                </span>
                <div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: "var(--surface-muted)",
                      color: "var(--primary-light)",
                    }}
                  >
                    <item.Icon />
                  </div>
                  <h3
                    className="font-display font-medium mb-2"
                    style={{ fontSize: "1.3rem", color: "var(--foreground)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: "var(--foreground-subtle)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`text-center mt-14 reveal ${vis ? "visible" : ""}`}
          style={{ transitionDelay: "0.5s" }}
        >
          <button
            onClick={() => onNav("register")}
            className="btn-base btn-primary px-8 py-3.5 group"
          >
            Start Learning Today
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              <IArrow />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROGRAMMES
───────────────────────────────────────────────────────────────────────────── */
function Programmes({ onNav }: { onNav: (s: string) => void }) {
  const { ref, vis } = useReveal();
  const [selected, setSelected] = useState<(typeof programmes)[number] | null>(
    null,
  );

  useEffect(() => {
    if (!selected) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section
      id="programmes"
      ref={ref}
      className="py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(135deg, var(--green-100) 0%, rgba(232,116,68,0.05) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className={`mb-16 reveal ${vis ? "visible" : ""}`}>
          <SectionHeading
            arabic="البرامج"
            eyebrow="PROGRAMMES"
            title="Choose Your Path"
            description="Four structured pathways — from absolute beginner to Hafiz — each designed for measurable, meaningful progress."
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {programmes.map((p, i) => (
            <div
              key={p.title}
              className={`reveal premium-card overflow-hidden group ${vis ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.08 + 0.1}s` }}
            >
              {/* Accent line */}
              <div
                style={{
                  height: "2px",
                  background:
                    i % 2 === 0
                      ? "linear-gradient(90deg, var(--accent) 0%, transparent 100%)"
                      : "linear-gradient(90deg, var(--primary-light) 0%, transparent 100%)",
                }}
              />

              <div className="p-7">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p
                      className="font-arabic text-sm mb-1"
                      style={{
                        color: "var(--accent)",
                        direction: "rtl",
                        textAlign: "right",
                        opacity: 0.6,
                      }}
                    >
                      {p.arabicTitle}
                    </p>
                    <span
                      className="chip text-[10px] px-3 py-1"
                      style={{
                        background: "var(--surface-muted)",
                        color: "var(--foreground-muted)",
                      }}
                    >
                      {p.level}
                    </span>
                  </div>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      background: "var(--surface-muted)",
                      color: "var(--primary-light)",
                    }}
                  >
                    <p.Icon />
                  </div>
                </div>

                <h3
                  className="font-display font-medium mb-3"
                  style={{ fontSize: "1.4rem", color: "var(--foreground)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed mb-5"
                  style={{ color: "var(--foreground-subtle)" }}
                >
                  {p.shortDesc}
                </p>

                <ul className="space-y-2 mb-6">
                  {p.learn.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span
                        className="mt-1 shrink-0"
                        style={{ color: "var(--accent)", opacity: 0.7 }}
                      >
                        <ICheck />
                      </span>
                      <span
                        className="font-sans text-xs leading-relaxed"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelected(p)}
                    className="flex-1 btn-base btn-outline text-xs py-2.5"
                    aria-haspopup="dialog"
                  >
                    View Curriculum
                  </button>
                  <button
                    onClick={() => onNav("register")}
                    className="flex-1 btn-base btn-primary text-xs py-2.5"
                  >
                    Enrol Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Programme Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="prog-modal-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(17,26,20,0.75)",
              backdropFilter: "blur(8px)",
            }}
          />
          <div
            className="anim-modal-in relative w-full max-w-2xl max-h-[88vh] overflow-hidden rounded-2xl shadow-2xl"
            style={{ background: "var(--surface)" }}
          >
            <div
              style={{
                height: "2px",
                background:
                  "linear-gradient(90deg, var(--accent), transparent)",
              }}
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{
                background: "var(--surface-muted)",
                color: "var(--foreground-muted)",
              }}
              aria-label="Close programme details"
            >
              <IClose />
            </button>
            <div
              className="overflow-y-auto p-7 sm:p-9"
              style={{ maxHeight: "calc(88vh - 2px)" }}
            >
              <p
                className="font-arabic text-lg mb-1"
                style={{
                  color: "var(--accent)",
                  direction: "rtl",
                  opacity: 0.6,
                }}
              >
                {selected.arabicTitle}
              </p>
              <span
                className="chip text-[10px] px-3 py-1 mb-4 inline-block"
                style={{
                  background: "var(--surface-muted)",
                  color: "var(--foreground-muted)",
                }}
              >
                {selected.level}
              </span>
              <h2
                id="prog-modal-title"
                className="font-display font-medium mb-4"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  color: "var(--foreground)",
                }}
              >
                {selected.title}
              </h2>
              <p
                className="font-sans text-sm leading-relaxed mb-8"
                style={{ color: "var(--foreground-muted)" }}
              >
                {selected.description}
              </p>

              <h3
                className="font-display font-medium mb-4"
                style={{ fontSize: "1.3rem", color: "var(--foreground)" }}
              >
                What You&apos;ll Learn
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {selected.learn.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl"
                    style={{ background: "var(--surface-muted)" }}
                  >
                    <span
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--accent)" }}
                    >
                      <ICheck />
                    </span>
                    <span
                      className="font-sans text-xs leading-relaxed"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <h3
                className="font-display font-medium mb-3"
                style={{ fontSize: "1.3rem", color: "var(--foreground)" }}
              >
                Why It Matters
              </h3>
              <div
                className="p-5 rounded-xl mb-8"
                style={{
                  background: "var(--surface-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {selected.importance}
                </p>
              </div>

              <div
                className="flex items-start gap-3 p-4 rounded-xl mb-8"
                style={{ background: "var(--surface-muted)" }}
              >
                <span
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--primary-light)" }}
                >
                  <IClock />
                </span>
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {selected.duration}
                </p>
              </div>

              <div
                className="flex flex-col sm:flex-row gap-3 pt-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <button
                  onClick={() => {
                    setSelected(null);
                    onNav("register");
                  }}
                  className="flex-1 btn-base btn-primary py-3.5"
                >
                  Enrol in This Programme
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-6 btn-base btn-outline py-3.5"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────────────────────────────────────── */
function Testimonials({
  onNav,
  testimonialsReady,
}: {
  onNav: (s: string) => void;
  testimonialsReady?: boolean;
}) {
  const { ref, vis } = useReveal();
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const total = testimonials.length;

  const go = useCallback(
    (next: number) => {
      if (fading) return;
      setFading(true);
      setTimeout(() => {
        setIdx((next + total) % total);
        setFading(false);
      }, 300);
    },
    [fading, total],
  );

  // Don't render if no testimonials loaded yet
  if (!testimonialsReady || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(135deg, rgba(232,116,68,0.06) 0%, rgba(90,155,74,0.06) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className={`mb-16 reveal ${vis ? "visible" : ""}`}>
          <SectionHeading
            arabic="شهادات"
            eyebrow="TESTIMONIALS"
            title="What students and parents say."
          />
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-12 items-start">
          {/* Selector list */}
          <div
            className={`reveal-l ${vis ? "visible" : ""} space-y-1`}
            style={{ transitionDelay: "0.1s" }}
          >
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => go(i)}
                className="w-full text-left p-4 rounded-xl transition-all duration-300"
                style={{
                  background: i === idx ? "var(--surface)" : "transparent",
                  border: `1px solid ${i === idx ? "var(--border-strong)" : "transparent"}`,
                  opacity: i === idx ? 1 : 0.5,
                }}
                aria-pressed={i === idx}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-display font-semibold text-sm shrink-0"
                    style={{
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div
                      className="font-sans text-sm font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {t.name}
                    </div>
                    <div
                      className="font-sans text-xs"
                      style={{ color: "var(--foreground-faint)" }}
                    >
                      {t.country}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active testimonial */}
          <div
            className={`reveal-r ${vis ? "visible" : ""}`}
            style={{ transitionDelay: "0.15s" }}
          >
            <div
              className="premium-card p-8 sm:p-10"
              style={{
                transition: "opacity 0.3s ease, transform 0.3s ease",
                opacity: fading ? 0 : 1,
                transform: fading ? "translateY(6px)" : "translateY(0)",
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <Stars n={testimonials[idx].stars} />
                <span
                  style={{ color: "var(--foreground-faint)", opacity: 0.25 }}
                >
                  <IQuote />
                </span>
              </div>

              <blockquote
                className="font-display font-light italic leading-relaxed mb-8"
                style={{
                  fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                  color: "var(--foreground)",
                }}
              >
                &ldquo;{testimonials[idx].text}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display font-semibold text-base shrink-0"
                    style={{
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    {testimonials[idx].initials}
                  </div>
                  <div>
                    <div
                      className="font-sans font-semibold text-sm"
                      style={{ color: "var(--foreground)" }}
                    >
                      {testimonials[idx].name}
                    </div>
                    <div
                      className="font-sans text-xs mt-0.5"
                      style={{ color: "var(--foreground-subtle)" }}
                    >
                      {testimonials[idx].role}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span style={{ color: "var(--foreground-faint)" }}>
                        <IPin />
                      </span>
                      <span
                        className="font-sans text-xs"
                        style={{ color: "var(--foreground-faint)" }}
                      >
                        {testimonials[idx].country}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => go(idx - 1)}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--foreground-muted)",
                    }}
                    aria-label="Previous testimonial"
                  >
                    <IChevLeft />
                  </button>
                  <span
                    className="font-sans text-xs"
                    style={{ color: "var(--foreground-faint)" }}
                  >
                    {idx + 1} / {total}
                  </span>
                  <button
                    onClick={() => go(idx + 1)}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--foreground-muted)",
                    }}
                    aria-label="Next testimonial"
                  >
                    <IChevRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ADMISSION
───────────────────────────────────────────────────────────────────────────── */
function Admission({ onNav }: { onNav: (s: string) => void }) {
  const { ref, vis } = useReveal();
  return (
    <section
      id="admission"
      ref={ref}
      className="py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(135deg, var(--green-50) 0%, rgba(232,116,68,0.04) 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className={`mb-16 reveal ${vis ? "visible" : ""}`}>
          <SectionHeading
            arabic="القبول"
            eyebrow="GETTING STARTED"
            title="Your admissions journey."
            description="A straightforward seven-step process designed for clarity and ease."
          />
        </div>

        <div className="relative">
          {/* Vertical track line */}
          <div
            className="absolute left-5 sm:left-7 top-7 bottom-7 w-px hidden sm:block"
            style={{
              background:
                "linear-gradient(180deg, var(--accent), var(--primary-light))",
              opacity: 0.2,
            }}
            aria-hidden="true"
          />
          <div className="space-y-4 sm:space-y-5">
            {admissionSteps.map((s, i) => (
              <div
                key={s.n}
                className={`flex gap-5 sm:gap-7 items-start reveal ${vis ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.07 + 0.1}s` }}
              >
                <div
                  className="shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative z-10 font-sans font-semibold text-xs sm:text-sm"
                  style={{
                    background: i < 2 ? "var(--primary)" : "var(--surface)",
                    color:
                      i < 2
                        ? "var(--primary-foreground)"
                        : "var(--foreground-muted)",
                    border: `1.5px solid ${i < 2 ? "var(--primary)" : "var(--border-strong)"}`,
                    boxShadow:
                      i < 2 ? "0 4px 16px rgba(30,58,42,0.25)" : "none",
                  }}
                >
                  {s.n}
                </div>
                <div
                  className="flex-1 p-5 sm:p-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h4
                    className="font-display font-medium mb-1.5"
                    style={{ fontSize: "1.2rem", color: "var(--foreground)" }}
                  >
                    {s.title}
                  </h4>
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: "var(--foreground-subtle)" }}
                  >
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

/* ─────────────────────────────────────────────────────────────────────────────
   FEES
───────────────────────────────────────────────────────────────────────────── */
function Fees({ onNav }: { onNav: (s: string) => void }) {
  const { ref, vis } = useReveal();
  return (
    <section
      id="fees"
      className="py-24 sm:py-32"
      style={{
        background:
          "radial-gradient(ellipse at 15% 20%, rgba(232,116,68,0.12) 0%, transparent 45%), radial-gradient(ellipse at 85% 80%, rgba(90,155,74,0.15) 0%, transparent 50%), var(--primary)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div ref={ref} className={`mb-14 reveal ${vis ? "visible" : ""}`}>
          <SectionHeading
            arabic="الرسوم"
            eyebrow="FEES"
            title="Choose your learning rhythm."
            description="Simple, transparent pricing with no hidden fees. Every plan includes the same high standard of personalised 1-on-1 instruction."
            light
          />
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {pricingPlans.map((plan, i) => (
            <div
              key={plan.title}
              className={`reveal flex flex-col p-7 sm:p-8 relative ${vis ? "visible" : ""}`}
              style={{
                transitionDelay: `${i * 0.1 + 0.1}s`,
                background: "rgba(255,255,255,0.06)",
                border: plan.popular
                  ? "1px solid rgba(184,151,42,0.4)"
                  : "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(16px)",
                borderRadius: "1.25rem",
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full"
                    style={{ background: "var(--accent)", color: "#1A1A18" }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: "rgba(232,116,68,0.15)",
                  color: "var(--accent-light)",
                }}
              >
                <plan.Icon />
              </div>

              <h3
                className="font-display font-light text-white mb-1"
                style={{ fontSize: "1.5rem" }}
              >
                {plan.title}
              </h3>
              <p
                className="font-sans text-xs mb-6"
                style={{ color: "var(--accent-light)", opacity: 0.7 }}
              >
                {plan.sessions}
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display font-light text-white"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 2.8rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {plan.priceNaira}
                  </span>
                  <span
                    className="font-sans text-sm"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    / month
                  </span>
                </div>
                <div
                  className="font-sans text-xs mt-1"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  International:{" "}
                  <span
                    className="font-medium"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {plan.priceDollar} / month
                  </span>
                </div>
              </div>

              <p
                className="font-sans text-sm leading-relaxed mb-7 flex-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {plan.description}
              </p>

              <div
                className="h-px mb-6"
                style={{ background: "rgba(255,255,255,0.08)" }}
              />

              <ul className="space-y-3 mb-8">
                {[
                  "1-on-1 personalised sessions",
                  "30–45 minutes per session",
                  "Flexible scheduling",
                  "Progress monitoring & feedback",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--accent)", opacity: 0.7 }}
                    >
                      <ICheck />
                    </span>
                    <span
                      className="font-sans text-sm"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onNav("register")}
                className={`w-full btn-base py-3.5 ${plan.popular ? "btn-gold" : "btn-ghost-light"}`}
              >
                Choose This Plan
              </button>
            </div>
          ))}
        </div>

        {/* What's always included */}
        <div
          className={`mt-14 reveal ${vis ? "visible" : ""}`}
          style={{ transitionDelay: "0.45s" }}
        >
          <div
            className="p-7 sm:p-10 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="text-center mb-8">
              <p className="eyebrow mb-3">THE FIKR STANDARD</p>
              <h3
                className="font-display font-light text-white"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
              >
                Included with every plan.
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {perks.map((perk) => (
                <div key={perk} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--accent)", opacity: 0.7 }}
                  >
                    <ICheck />
                  </span>
                  <span
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {perk}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`text-center mt-6 reveal ${vis ? "visible" : ""}`}
          style={{ transitionDelay: "0.55s" }}
        >
          <p
            className="font-sans text-xs"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            All programmes delivered online through personalised 1-on-1
            sessions. No contracts. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FAQ
───────────────────────────────────────────────────────────────────────────── */
function FAQ({ onNav }: { onNav: (s: string) => void }) {
  const { ref, vis } = useReveal();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section
      id="faq"
      ref={ref}
      className="py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(135deg, rgba(90,155,74,0.07) 0%, rgba(232,116,68,0.07) 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <div className={`mb-14 reveal ${vis ? "visible" : ""}`}>
          <SectionHeading
            arabic="الأسئلة"
            eyebrow="FAQ"
            title="Common questions."
          />
        </div>

        <dl className="space-y-0">
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`reveal ${vis ? "visible" : ""}`}
              style={{
                transitionDelay: `${i * 0.06 + 0.1}s`,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <dt>
                <button
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-${i}`}
                >
                  <span
                    className="font-display font-medium"
                    style={{ fontSize: "1.2rem", color: "var(--foreground)" }}
                  >
                    {f.q}
                  </span>
                  <span
                    className="shrink-0 transition-transform duration-300"
                    style={{
                      color: "var(--foreground-faint)",
                      transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  >
                    <IPlus />
                  </span>
                </button>
              </dt>
              <dd
                id={`faq-${i}`}
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? "200px" : "0px" }}
              >
                <p
                  className="font-sans text-sm leading-relaxed pb-5"
                  style={{ color: "var(--foreground-subtle)" }}
                >
                  {f.a}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   REGISTRATION
───────────────────────────────────────────────────────────────────────────── */
function Registration({ onNav }: { onNav: (s: string) => void }) {
  const { ref, vis } = useReveal();
  const [registrationData, setRegistrationData] = useState<{
    applicationId: string;
    registrationId: string;
    currency: string;
    amount: number;
    amountForPayment: number;
    formatted: string;
  } | null>(null);

  const handleRegistrationSuccess = (data: any) => {
    setRegistrationData(data);
  };

  const handleProceedToPayment = () => {
    // Payment will be handled by RegistrationSuccess component
    console.log("Proceeding to payment...");
  };

  return (
    <section
      id="register"
      ref={ref}
      className="py-24 sm:py-32"
      style={{
        background:
          "radial-gradient(ellipse at 80% 20%, rgba(232,116,68,0.10) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(90,155,74,0.12) 0%, transparent 50%), var(--primary)",
      }}
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className={`mb-12 reveal ${vis ? "visible" : ""}`}>
          <SectionHeading
            arabic="التسجيل"
            eyebrow="ENROLMENT"
            title="Begin your Qur'anic journey."
            light
          />
        </div>

        <div
          className={`reveal ${vis ? "visible" : ""}`}
          style={{ transitionDelay: "0.1s" }}
        >
          {registrationData ? (
            <RegistrationSuccess
              applicationId={registrationData.applicationId}
              registrationId={registrationData.registrationId}
              currency={registrationData.currency}
              amount={registrationData.amount}
              formatted={registrationData.formatted}
              onProceedToPayment={handleProceedToPayment}
            />
          ) : (
            <RegistrationForm onSuccess={handleRegistrationSuccess} />
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────────────────────────── */
function Contact({ onNav }: { onNav: (s: string) => void }) {
  const { ref, vis } = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const channels = [
    {
      Icon: IMsg,
      label: "WhatsApp",
      val: "+234 911 438 5960",
      href: "https://wa.me/2349114385960",
      desc: "Fastest response",
    },
    {
      Icon: IPhone,
      label: "Phone",
      val: "+234 818 201 6174",
      href: "tel:+2348182016174",
      desc: "Available daily",
    },
    {
      Icon: IMail,
      label: "Email",
      val: "fikrquranacademy@gmail.com",
      href: "mailto:fikrquranacademy@gmail.com",
      desc: "24-hour response",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(135deg, rgba(232,116,68,0.05) 0%, rgba(90,155,74,0.08) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className={`mb-16 reveal ${vis ? "visible" : ""}`}>
          <SectionHeading
            arabic="تواصل معنا"
            eyebrow="CONTACT"
            title="Let's begin."
            description="Questions about programmes, placement, scheduling, or payments? Our team is here to help."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — contact channels */}
          <div
            className={`reveal-l ${vis ? "visible" : ""} space-y-4`}
            style={{ transitionDelay: "0.1s" }}
          >
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 p-5 rounded-xl transition-all duration-300 group"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
                aria-label={`${c.label}: ${c.val}`}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                  style={{
                    background: "var(--surface-muted)",
                    color: "var(--primary-light)",
                  }}
                >
                  <c.Icon />
                </div>
                <div className="flex-1">
                  <div
                    className="font-display font-medium"
                    style={{ fontSize: "1.1rem", color: "var(--foreground)" }}
                  >
                    {c.label}
                  </div>
                  <div
                    className="font-sans text-sm mt-0.5"
                    style={{ color: "var(--foreground-subtle)" }}
                  >
                    {c.val}
                  </div>
                </div>
                <span
                  className="font-sans text-[10px] uppercase tracking-wider px-2 py-1 rounded-full"
                  style={{
                    color: "var(--foreground-faint)",
                    background: "var(--surface-muted)",
                  }}
                >
                  {c.desc}
                </span>
              </a>
            ))}

            <div
              className="mt-8 p-5 rounded-2xl"
              style={{
                border: "1px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              <div
                className="font-arabic text-base mb-3"
                style={{
                  color: "var(--accent)",
                  opacity: 0.7,
                  direction: "rtl",
                }}
              >
                إِنَّ مَعَ الْعُسْرِ يُسْرًا
              </div>
              <p
                className="font-sans text-xs leading-relaxed"
                style={{ color: "var(--foreground-subtle)" }}
              >
                &ldquo;Verily, with hardship comes ease.&rdquo; — Al-Inshirah
                94:6. We understand every learner&apos;s journey is different.
                Reach out and we will help you find the right path.
              </p>
            </div>
          </div>

          {/* Right — contact form */}
          <div
            className={`reveal-r ${vis ? "visible" : ""}`}
            style={{ transitionDelay: "0.15s" }}
          >
            {sent ? (
              <div
                className="p-10 text-center h-full flex flex-col items-center justify-center rounded-2xl"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: "var(--surface-muted)",
                    color: "var(--primary-light)",
                  }}
                >
                  <ICheck />
                </div>
                <h4
                  className="font-display font-medium mb-2"
                  style={{ fontSize: "1.4rem", color: "var(--foreground)" }}
                >
                  Message Sent!
                </h4>
                <p
                  className="font-sans text-sm"
                  style={{ color: "var(--foreground-subtle)" }}
                >
                  We will respond within 24 hours, InshāAllah.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="p-7 sm:p-8 space-y-5 rounded-2xl"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
                noValidate
              >
                <div>
                  <label
                    className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
                    style={{ color: "var(--foreground-faint)" }}
                  >
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
                  <label
                    className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
                    style={{ color: "var(--foreground-faint)" }}
                  >
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
                  <label
                    className="block font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
                    style={{ color: "var(--foreground-faint)" }}
                  >
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
                  className="w-full btn-base btn-primary py-3.5"
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

/* ─────────────────────────────────────────────────────────────────────────────
   TERMS
───────────────────────────────────────────────────────────────────────────── */
function Terms({ onNav }: { onNav: (s: string) => void }) {
  const { ref, vis } = useReveal();
  const [openSec, setOpenSec] = useState<number | null>(null);
  return (
    <section
      id="terms"
      ref={ref}
      className="py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(135deg, var(--green-50) 0%, rgba(232,116,68,0.03) 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className={`mb-14 reveal ${vis ? "visible" : ""}`}>
          <SectionHeading
            arabic="الشروط"
            eyebrow="POLICIES"
            title="Terms and Conditions"
          />
        </div>

        <dl className="space-y-3">
          {termsSections.map((section, i) => (
            <div
              key={i}
              className={`reveal overflow-hidden rounded-2xl ${vis ? "visible" : ""}`}
              style={{
                transitionDelay: `${i * 0.1 + 0.1}s`,
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <dt>
                <button
                  className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenSec(openSec === i ? null : i)}
                  aria-expanded={openSec === i}
                  aria-controls={`terms-${i}`}
                >
                  <span
                    className="font-display font-light text-sm shrink-0"
                    style={{ color: "var(--accent)", opacity: 0.5 }}
                  >
                    {section.n}
                  </span>
                  <span
                    className="flex-1 font-display font-medium"
                    style={{ fontSize: "1.1rem", color: "var(--foreground)" }}
                  >
                    {section.title}
                  </span>
                  <span
                    className="shrink-0 transition-transform duration-300"
                    style={{
                      color: "var(--foreground-faint)",
                      transform:
                        openSec === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  >
                    <IPlus />
                  </span>
                </button>
              </dt>
              <dd
                id={`terms-${i}`}
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openSec === i ? "500px" : "0px" }}
              >
                <ul className="px-6 pb-6 space-y-3" role="list">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 shrink-0"
                        style={{ color: "var(--accent)", opacity: 0.5 }}
                      >
                        <ICheck />
                      </span>
                      <span
                        className="font-sans text-sm leading-relaxed"
                        style={{ color: "var(--foreground-subtle)" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────────────────── */
function Footer({ onNav }: { onNav: (s: string) => void }) {
  const links = [
    { label: "About", id: "about" },
    { label: "Programmes", id: "programmes" },
    { label: "Admission", id: "admission" },
    { label: "Fees", id: "fees" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
    { label: "Terms", id: "terms" },
  ];
  return (
    <footer
      className="pt-20 pb-10"
      style={{
        background:
          "radial-gradient(ellipse at 20% 0%, rgba(232,116,68,0.10) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(90,155,74,0.08) 0%, transparent 50%), linear-gradient(180deg, var(--primary) 0%, #0F1F15 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-14">
          {/* Brand */}
          <div>
            <button
              onClick={() => onNav("hero")}
              className="flex items-center gap-3 mb-5"
              aria-label="Go to top"
            >
              <img
                src="/images/fikr-logo.jpeg"
                alt="Fikr Quran Academy"
                className="h-11 w-11 rounded-full object-cover"
                style={{ outline: "1px solid rgba(255,255,255,0.15)" }}
              />
              <div>
                <div className="font-display font-semibold text-white text-base leading-tight">
                  Fikr Quran Academy
                </div>
                <div
                  className="font-sans text-[9px] tracking-[0.2em] uppercase mt-0.5"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Online Education
                </div>
              </div>
            </button>
            <p
              className="font-sans text-sm leading-relaxed max-w-xs mb-6"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Building strong Muslims through structured Qur&apos;an and Islamic
              education — accessible from anywhere in the world.
            </p>
            <p
              className="font-arabic text-xl"
              style={{ color: "var(--accent)", opacity: 0.5, direction: "rtl" }}
            >
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h5
              className="font-sans text-[9px] uppercase tracking-[0.2em] font-semibold mb-5"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Navigation
            </h5>
            <ul className="space-y-3">
              {links.slice(0, 4).map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => onNav(l.id)}
                    className="font-sans text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h5
              className="font-sans text-[9px] uppercase tracking-[0.2em] font-semibold mb-5"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Programmes
            </h5>
            <ul className="space-y-3">
              {programmes.map((p) => (
                <li key={p.title}>
                  <button
                    onClick={() => onNav("programmes")}
                    className="font-sans text-sm text-left leading-snug transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5
              className="font-sans text-[9px] uppercase tracking-[0.2em] font-semibold mb-5"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Contact
            </h5>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/2349114385960"
                  className="font-sans text-sm flex items-center gap-2 transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <IMsg /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:fikrquranacademy@gmail.com"
                  className="font-sans text-sm flex items-center gap-2 transition-colors duration-200 break-all"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <IMail /> Email
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNav("register")}
                  className="btn-base btn-gold text-xs px-5 py-2.5"
                >
                  Enrol Now
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="ornament-line mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="font-sans text-xs"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            © {new Date().getFullYear()} Fikr Quran Academy. All rights
            reserved.
          </p>
          <div className="flex gap-5">
            <button
              onClick={() => onNav("terms")}
              className="font-sans text-xs transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Terms &amp; Conditions
            </button>
            <a
              href="/blog"
              className="font-sans text-xs transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Blog
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   REGISTRATION MODAL
───────────────────────────────────────────────────────────────────────────── */
function RegistrationModal({ onNav }: { onNav: (s: string) => void }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("fikr-modal-dismissed")) return;
    } catch (_) {}
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    try {
      sessionStorage.setItem("fikr-modal-dismissed", "1");
    } catch (_) {}
  };

  const handleEnrol = () => {
    dismiss();
    setTimeout(() => onNav("register"), 400);
  };

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        className="anim-fade-in absolute inset-0"
        style={{
          background: "rgba(10,20,14,0.70)",
          backdropFilter: "blur(6px)",
        }}
        aria-hidden="true"
      />

      <div
        className="anim-modal-in relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "var(--surface)" }}
      >
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, var(--accent) 40%, var(--accent) 60%, transparent)",
          }}
        />

        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{
            background: "var(--surface-muted)",
            color: "var(--foreground-faint)",
          }}
          aria-label="Close and continue browsing"
        >
          <IClose />
        </button>

        <div className="p-8 sm:p-9">
          <p
            className="font-arabic text-lg mb-2"
            style={{ color: "var(--accent)", opacity: 0.65, direction: "rtl" }}
          >
            ابدأ رحلتك
          </p>
          <h2
            id="modal-heading"
            className="font-display font-light mb-3"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2rem)",
              color: "var(--foreground)",
            }}
          >
            Start Your Qur&apos;anic Journey
          </h2>
          <p
            className="font-sans text-sm leading-relaxed mb-6"
            style={{ color: "var(--foreground-subtle)" }}
          >
            Discover your current level and find the programme that fits your
            goals. Your first session is completely free — no commitment
            required.
          </p>

          <div
            className="flex items-start gap-3 p-4 rounded-xl mb-6"
            style={{
              background: "var(--surface-muted)",
              border: "1px solid var(--border)",
            }}
          >
            <span
              className="shrink-0 mt-0.5"
              style={{ color: "var(--accent)" }}
            >
              <IAward />
            </span>
            <p
              className="font-sans text-xs leading-relaxed"
              style={{ color: "var(--foreground-muted)" }}
            >
              <strong
                className="font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                Free Placement Assessment
              </strong>{" "}
              — A 30-minute session with a qualified teacher to establish your
              exact level and recommend the right programme.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleEnrol}
              className="w-full btn-base btn-primary py-3.5 group"
            >
              Begin Your Assessment
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <IArrow />
              </span>
            </button>
            <button
              onClick={dismiss}
              className="w-full font-sans text-sm py-2 transition-colors duration-200"
              style={{ color: "var(--foreground-faint)" }}
            >
              Continue browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────────────────────────────────── */
export default function App() {
  const { theme, toggle } = useTheme();
  const [isTestimonialsLoaded, setIsTestimonialsLoaded] = useState(false);

  const scrollTo = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Fetch testimonials from API on mount
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/testimonials");
        const data = await response.json();
        if (data.success && data.data) {
          // Map API testimonials to match interface
          testimonials = data.data.map((t: any) => ({
            name: t.name,
            role: t.role,
            country: t.country,
            text: t.text,
            stars: t.rating,
            initials: t.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2),
            image: t.image,
          }));
          setIsTestimonialsLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load testimonials:", error);
        // Keep empty array if fetch fails
        setIsTestimonialsLoaded(true);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, var(--background) 0%, var(--green-50) 100%)",
        color: "var(--foreground)",
      }}
    >
      <RegistrationModal onNav={scrollTo} />
      <Nav onNav={scrollTo} theme={theme} toggleTheme={toggle} />
      <Hero onNav={scrollTo} />
      <About onNav={scrollTo} />
      <WhyFikr onNav={scrollTo} />
      <Programmes onNav={scrollTo} />
      <Testimonials onNav={scrollTo} testimonialsReady={isTestimonialsLoaded} />
      <Admission onNav={scrollTo} />
      <Fees onNav={scrollTo} />
      <FAQ onNav={scrollTo} />
      <Registration onNav={scrollTo} />
      <Contact onNav={scrollTo} />
      <Terms onNav={scrollTo} />
      <Footer onNav={scrollTo} />
    </div>
  );
}
