import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_FROM,
  EMAIL_TO,
} = process.env;

let transporter;

if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
} else {
  console.warn('SMTP not fully configured; emails will be logged instead of sent.');
}

export async function sendContactEmail(contact) {
  const subject = `New contact enquiry from ${contact.name}`;
  const text = `New contact enquiry:\n\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone || 'N/A'}\n\nMessage:\n${contact.message}`;

  await sendMail({ subject, text });
}

export async function sendApplicationEmail(application, cvFilePath = null) {
  const subject = `New job application from ${application.name} for ${application.position || 'a role'}`;
  const text = `New job application:\n\nName: ${application.name}\nEmail: ${application.email}\nPhone: ${application.phone || 'N/A'}\nPosition: ${application.position || 'N/A'}\n\nCover letter / message:\n${application.message || 'N/A'}`;

  const attachments = [];
  if (cvFilePath && fs.existsSync(cvFilePath)) {
    const filename = application.cvOriginalName || path.basename(cvFilePath);
    attachments.push({ filename, content: fs.readFileSync(cvFilePath) });
  }
  await sendMail({ subject, text, attachments });
}

async function sendMail({ subject, text, attachments = [] }) {
  if (!transporter || !EMAIL_TO || !EMAIL_FROM) {
    console.log('EMAIL (not sent; missing config):', { subject, text });
    return;
  }

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject,
    text,
    attachments: attachments.length ? attachments : undefined,
  });
}
