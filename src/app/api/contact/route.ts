import nodemailer from 'nodemailer';

const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 200; // Max allowed requests per minute globally
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
let globalRequestCount = 0;
let lastRequestTimestamp = Date.now();

// Simple email regex for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10,12}$/;

function sanitizeInput(input: string) {
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
      return new Response(
        JSON.stringify({ message: 'Global API rate limit exceeded. Please try again later.' }),
        { status: 429 }
      );
    }

    // Increment global request count
    globalRequestCount++;

    // Parse the form data (multipart/form-data)
    const formData = await req.formData();

    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const phone = formData.get('phone')?.toString();
    const attachment = formData.get('attachment') as File | null;

    // Basic validation & anti-spam
    if (!name || !email || !phone || !name.trim() || !email.trim() || !phone.trim()) {
      return new Response(
        JSON.stringify({ message: 'Invalid input data. Please check your name, email, message, and phone number.' }),
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ message: 'Please enter a valid email address.' }),
        { status: 400 }
      );
    }

    if (!phoneRegex.test(phone)) {
      return new Response(
        JSON.stringify({ message: 'Please enter a valid 10-digit phone number.' }),
        { status: 400 }
      );
    }

    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;
    if (!smtpEmail || !smtpPassword) {
      console.error('SMTP credentials missing');
      return new Response(
        JSON.stringify({ message: 'Server configuration error. Please try again later.' }),
        { status: 500 }
      );
    }

    // Check if the attachment exists and ensure it's under the 5MB size limit
    if (attachment && attachment.size > MAX_FILE_SIZE) {
      return new Response(
        JSON.stringify({ message: 'File size exceeds the 5 MB limit.' }),
        { status: 400 }
      );
    }

    // Create transporter for sending email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
    });

    const safeName = sanitizeInput(name);
    const safeEmail = sanitizeInput(email);
    const safePhone = sanitizeInput(phone);

    const mailOptions: any = {
      from: `"Portfolio Contact" <${smtpEmail}>`,
      to: smtpEmail,
      subject: '📩 New Portfolio Contact Request',
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7fc; padding: 40px; margin: 0; color: #333;">
    <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
      
      <!-- Header with logo -->
      <div style="background-color: #3498db; padding: 25px; text-align: center;">
        <img src="https://smartsure-nu.vercel.app/images/logo.png" alt="SmartSecure Logo" style="max-width: 250px; height: auto;">
      </div>
      
      <!-- Main Content -->
      <div style="padding: 35px;">
        <h2 style="color: #2c3e50; font-size: 28px; font-weight: 600; margin-bottom: 20px;">📬 New Resume Submission</h2>
        <p style="font-size: 16px; color: #7f8c8d; line-height: 1.6; margin-bottom: 25px;">You have received a new resume submission from your contact form. Below are the details:</p>

        <div style="background-color: #f9fafb; border-left: 5px solid #3498db; padding: 20px; border-radius: 5px; margin-bottom: 30px;">
          <p style="font-size: 16px; color: #2c3e50; font-weight: 600; margin-bottom: 10px;">Applicant Details:</p>
          <p style="font-size: 16px; color: #2c3e50; margin: 5px 0;"><strong>Name:</strong> ${safeName}</p>
          <p style="font-size: 16px; color: #2c3e50; margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #3498db; text-decoration: none;">${safeEmail}</a></p>
          <p style="font-size: 16px; color: #2c3e50; margin: 5px 0;"><strong>Phone:</strong> ${safePhone}</p>
        </div>

        <p style="font-size: 16px; color: #2c3e50; margin-bottom: 25px;">You can review the application and contact the applicant for the next steps. Please ensure the best candidates are chosen for our team!</p>

        <div style="background-color: #3498db; color: #ffffff; text-align: center; padding: 15px; border-radius: 5px;">
          <p style="font-size: 16px; margin: 0; font-weight: 600;">You have a new applicant!</p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #2c3e50; color: #ffffff; text-align: center; padding: 20px;">
        <p style="margin: 0; font-size: 12px;">&copy; ${new Date().getFullYear()} SmartSecure Healthcare Solutions | All Rights Reserved</p>
      </div>
    </div>
  </div>
      `,
    };

    // Attach file if present
    if (attachment) {
      const fileName = attachment.name || 'attachment';
      const arrayBuffer = await attachment.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      mailOptions.attachments = [
        {
          filename: fileName,
          content: buffer,
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    const replyMailOptions = {
      from: `"SmartSecure Healthcare Solutions" <${smtpEmail}>`,
      to: safeEmail,
      subject: 'Thank you for your Resume Submission!',
      html: `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7fc; padding: 40px; margin: 0; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        
        <!-- Header with logo -->
        <div style="background-color: #3498db; padding: 20px; text-align: center;">
          <img src="https://smartsure-nu.vercel.app/images/logo.png" alt="SmartSecure Logo" style="max-width: 200px; height: auto;">
        </div>
        
        <!-- Main Content -->
        <div style="padding: 30px;">
          <h2 style="color: #2c3e50; font-size: 26px; font-weight: bold; margin-bottom: 20px;">Thank you for submitting your resume!</h2>
          <p style="font-size: 16px; color: #7f8c8d; line-height: 1.5; margin-bottom: 20px;">We have successfully received your resume and our team will review it shortly. You’ll hear from us soon regarding the next steps in the process.</p>
          <p style="font-size: 16px; color: #2c3e50; margin-bottom: 20px;">At SmartSecure Healthcare Solutions, we are committed to delivering <strong>innovative and secure healthcare solutions</strong> to help healthcare professionals and patients. We prioritize security and the well-being of all stakeholders in every solution we provide.</p>
          
          <p style="font-size: 14px; color: #7f8c8d; margin-top: 30px; text-align: center;">If you have any questions, feel free to <a href="mailto:contact@smartsecure.com" style="color: #3498db;">reach out to us</a> anytime.</p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #2c3e50; color: #ffffff; text-align: center; padding: 20px;">
          <p style="margin: 0; font-size: 12px;">&copy; ${new Date().getFullYear()} SmartSecure Healthcare Solutions | All rights reserved</p>
        </div>
      </div>
    </div>
  `,
    };


    // Send the acknowledgment email
    await transporter.sendMail(replyMailOptions);

    return new Response(
      JSON.stringify({ message: 'Your message has been sent successfully!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending failed:', error);
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(
      JSON.stringify({ message: 'Something went wrong while sending your message.', error: errorMessage }),
      { status: 500 }
    );
  }
}
