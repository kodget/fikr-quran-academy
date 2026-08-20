/**
 * Resend Email Service
 * Handles email sending through Resend API
 */

import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "onboarding@resend.dev";
const EMAIL_TO = process.env.EMAIL_TO || "fikrquranacademy@gmail.com";

if (!RESEND_API_KEY) {
  console.warn("⚠️  RESEND_API_KEY not set in environment variables");
}

// Initialize Resend client
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

/**
 * Send email using Resend API
 */
export async function sendEmail({
  to,
  subject,
  html,
  from = EMAIL_FROM,
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}) {
  if (!resend) {
    console.error("❌ Resend client not initialized. Check RESEND_API_KEY.");
    throw new Error("Email service not configured");
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend API error:", error);
      throw new Error(error.message || "Failed to send email");
    }

    console.log("✅ Email sent successfully:", data?.id);
    return { success: true, id: data?.id };
  } catch (error: any) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
}

/**
 * Send contact form notification to admin
 */
export async function sendContactNotification({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const subject = `New Contact Message from ${name}`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #1A1A18 0%, #2D2D28 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 8px 8px;
          }
          .field {
            margin-bottom: 15px;
          }
          .label {
            font-weight: bold;
            color: #555;
            display: block;
            margin-bottom: 5px;
          }
          .value {
            padding: 10px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          .footer {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #888;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">📬 New Contact Message</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Fikr Quran Academy</p>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">👤 Name:</span>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <span class="label">📧 Email:</span>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="field">
              <span class="label">💬 Message:</span>
              <div class="value" style="white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the Fikr Quran Academy contact form.</p>
            <p>Reply directly to this email to contact ${name}.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return await sendEmail({
    to: EMAIL_TO,
    subject,
    html,
    from: EMAIL_FROM,
  });
}

/**
 * Send email to students (from admin panel)
 */
export async function sendAdminEmail({
  to,
  subject,
  body,
  senderEmail,
}: {
  to: string | string[];
  subject: string;
  body: string;
  senderEmail: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #1A1A18 0%, #2D2D28 100%);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
            border-top: none;
          }
          .message {
            background: white;
            padding: 20px;
            border-radius: 4px;
            white-space: pre-wrap;
          }
          .footer {
            background: #f9f9f9;
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 8px 8px;
            font-size: 12px;
            color: #888;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">Fikr Quran Academy</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Excellence in Quranic Education</p>
          </div>
          <div class="content">
            <div class="message">${body}</div>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Fikr Quran Academy. All rights reserved.</p>
            <p>This email was sent by ${senderEmail}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return await sendEmail({
    to,
    subject,
    html,
    from: EMAIL_FROM,
  });
}

export { EMAIL_FROM, EMAIL_TO };
