'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export async function sendEmail(data: ContactFormInputs): Promise<{ success: boolean; error?: string }> {
  // Server-side validation
  const parsedData = contactFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, error: 'Invalid form data.' };
  }

  const { name, email, subject, message } = parsedData.data;
  const adminEmail = 'saytee.software@gmail.com';

  if (!process.env.EMAIL_SERVER_HOST) {
    console.log("EMAIL_SERVER_HOST not found, simulating email success.");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Check for a specific test case to simulate an error
    if (email.includes('fail@')) {
      console.error('Simulated email failure.');
      return { success: false, error: 'Failed to send message due to a simulation error.' };
    }
    return { success: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_FROM || email}>`,
    to: adminEmail,
    replyTo: email,
    subject: `New Contact Form Submission: ${subject}`,
    text: message,
    html: `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    // In production, you would not expose the raw error to the client.
    return { success: false, error: 'Failed to send message. Please try again later.' };
  }
}