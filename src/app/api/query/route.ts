import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 200; // Max allowed requests per minute globally
let globalRequestCount = 0; // Tracks the number of requests in the current window
let lastRequestTimestamp = Date.now(); // Tracks the timestamp of the last request

// Simple email regex for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10,12}$/;

function sanitizeInput(input: string) {
  // Basic HTML escape for email body to prevent injection
  return input.replace(/[&<>"']/g, (match) => {
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return escapeMap[match];
  });
}

export async function POST(req: Request) {
  try {
    const now = Date.now();

    // Reset counter if more than 1 minute has passed
    if (now - lastRequestTimestamp > RATE_LIMIT_WINDOW) {
      globalRequestCount = 0;
      lastRequestTimestamp = now;
    }

    // Check if the global request limit has been exceeded
    if (globalRequestCount >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { message: 'Global API rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Increment global request count
    globalRequestCount++;

    const { name, email, query, contact } = await req.json();

    // Basic validation & anti-spam
    if (
      !name || typeof name !== 'string' || name.trim().length < 2 ||
      !email || typeof email !== 'string' || !emailRegex.test(email.trim()) ||
      !query || typeof query !== 'string' || query.trim().length < 10 ||
      (contact && (typeof contact !== 'string' || !phoneRegex.test(contact.trim())))
    ) {
      return NextResponse.json(
        { message: 'Invalid input data. Please check your name, email, and message.' },
        { status: 400 }
      );
    }

    // Check env variables
    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;
    if (!smtpEmail || !smtpPassword) {
      console.error('SMTP credentials missing');
      return NextResponse.json(
        { message: 'Server configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
    });

    // Sanitize inputs for HTML email
    const safeName = sanitizeInput(name.trim());
    const safeEmail = sanitizeInput(email.trim());
    const safeQuery = sanitizeInput(query.trim());
    const safeContact =sanitizeInput(contact.trim()) ;

    // Compose the Admin Email (Notification for new query)
    const adminMailOptions = {
      from: `"SmartSecure Healthcare Solutions" <${smtpEmail}>`,
      to: smtpEmail,
      subject: '📩 New Contact Query Received',
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7fc; padding: 40px; margin: 0; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #3498db; padding: 20px; text-align: center;">
              <img src="https://smartsure-nu.vercel.app/images/logo.webp" alt="SmartSecure Logo" style="max-width: 200px; height: auto;">
            </div>
            <div style="padding: 30px;">
              <h2 style="color: #2c3e50; font-size: 26px; font-weight: bold; margin-bottom: 20px;">New Query Submitted</h2>
              <p style="font-size: 16px; color: #7f8c8d; line-height: 1.5; margin-bottom: 20px;">You have received a new query from your contact form. Below are the details:</p>
              <p style="font-size: 16px; color: #2c3e50; margin-bottom: 20px;"><strong>Name:</strong> ${safeName}</p>
              <p style="font-size: 16px; color: #2c3e50; margin-bottom: 20px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #3498db; text-decoration: none;">${safeEmail}</a></p>
              <p style="font-size: 16px; color: #2c3e50; margin-bottom: 20px;"><strong>Contact Number:</strong> ${safeContact}</p>
              <p style="font-size: 16px; color: #2c3e50; margin-bottom: 20px;"><strong>Message:</strong></p>
              <p style="white-space: pre-line; font-size: 16px; color: #2c3e50;">${safeQuery}</p>
            </div>
            <div style="background-color: #2c3e50; color: #ffffff; text-align: center; padding: 20px;">
              <p style="margin: 0; font-size: 12px;">&copy; ${new Date().getFullYear()} SmartSecure Healthcare Solutions | All rights reserved</p>
            </div>
          </div>
        </div>
      `,
    };

    // Compose the Reply Email (Thanking the person who submitted the query)
    const replyMailOptions = {
      from: `"SmartSecure Healthcare Solutions" <${smtpEmail}>`,
      to: safeEmail,
      subject: 'Thank you for reaching out to SmartSecure Healthcare Solutions!',
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7fc; padding: 40px; margin: 0; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #3498db; padding: 20px; text-align: center;">
              <img src="https://smartsure-nu.vercel.app/images/logo.webp" alt="SmartSecure Logo" style="max-width: 200px; height: auto;">
            </div>
            <div style="padding: 30px;">
              <h2 style="color: #2c3e50; font-size: 26px; font-weight: bold; margin-bottom: 20px;">Thank you for your inquiry!</h2>
              <p style="font-size: 16px; color: #7f8c8d; line-height: 1.5; margin-bottom: 20px;">We have received your query and our team will get back to you shortly. Your inquiry is important to us, and we strive to provide the best possible service.</p>
              <p style="font-size: 16px; color: #2c3e50; margin-bottom: 20px;">Here’s a summary of your query:</p>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                <p style="font-size: 16px; color: #2c3e50; margin: 5px 0;"><strong>Name:</strong> ${safeName}</p>
                <p style="font-size: 16px; color: #2c3e50; margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #3498db; text-decoration: none;">${safeEmail}</a></p>
                <p style="font-size: 16px; color: #2c3e50; margin: 5px 0;"><strong>Contact Number:</strong> ${safeContact}</p>
                <p style="font-size: 16px; color: #2c3e50; margin: 5px 0;"><strong>Message:</strong></p>
                <p style="white-space: pre-line; font-size: 16px; color: #2c3e50;">${safeQuery}</p>
              </div>
              <p style="font-size: 16px; color: #2c3e50;">Best regards,</p>
              <p style="font-size: 16px; color: #2c3e50;"><strong>Your team at SmartSecure Healthcare Solutions</strong></p>
            </div>
            <div style="background-color: #2c3e50; color: #ffffff; text-align: center; padding: 20px;">
              <p style="margin: 0; font-size: 12px;">&copy; ${new Date().getFullYear()} SmartSecure Healthcare Solutions | All rights reserved</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send the email to the admin
    await transporter.sendMail(adminMailOptions);

    // Send the acknowledgment email to the person who submitted the query
    await transporter.sendMail(replyMailOptions);

    return NextResponse.json({ message: 'Your query has been sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Email sending failed:', error);
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: 'Something went wrong while sending your query.', error: errorMessage },
      { status: 500 }
    );
  }
}
