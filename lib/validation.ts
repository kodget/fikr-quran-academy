/**
 * Validation schemas using Zod
 */

import { z } from "zod";
import { isValidFrequency } from "./pricing";

// Registration validation schema
export const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  parentName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  country: z.string().min(2, "Country is required"),
  state: z.string().optional(),
  gender: z.enum(["Male", "Female"]),
  dateOfBirth: z.string().optional(),
  experience: z.string().min(1, "Experience level is required"),
  programme: z.string().min(1, "Programme selection is required"),
  frequency: z.string().refine(isValidFrequency, {
    message: "Invalid frequency selection",
  }),
  days: z.string().min(1, "At least one day must be selected"),
  time: z.string().min(1, "Preferred time is required"),
  timezone: z.string().optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

// Contact message validation schema
export const contactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

// Admin login validation schema
export const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

// Testimonial validation schema
export const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role is required"),
  country: z.string().min(2, "Country is required"),
  text: z.string().min(10, "Testimonial text must be at least 10 characters"),
  rating: z.number().min(1).max(5),
  image: z.string().optional(),
  published: z.boolean().default(false),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

// Blog post validation schema
export const blogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  coverImage: z.string().optional(),
  author: z.string().min(2, "Author name is required"),
  published: z.boolean().default(false),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

// Email send validation schema
export const emailSendSchema = z.object({
  recipientType: z.enum(["all-paid", "all-registered", "selected", "individual"]),
  recipient: z.string().min(1, "Recipient is required"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  body: z.string().min(10, "Email body must be at least 10 characters"),
});

export type EmailSendInput = z.infer<typeof emailSendSchema>;
