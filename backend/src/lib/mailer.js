import nodemailer from "nodemailer";

let transporter = null;

function required(name) {
  const value = process.env[name];
  if (!value) {
    const error = new Error(`${name} is required to send authentication emails.`);
    error.statusCode = 503;
    throw error;
  }
  return value;
}

function getTransporter() {
  if (transporter) return transporter;

  if (process.env.MAIL_TRANSPORT === "sendmail") {
    transporter = nodemailer.createTransport({
      sendmail: true,
      path: process.env.SENDMAIL_PATH || "sendmail",
    });
    return transporter;
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.GMAIL_SMTP_USER || process.env.SMTP_USER;
  const password = process.env.GMAIL_SMTP_PASSWORD || process.env.SMTP_PASSWORD;

  transporter = nodemailer.createTransport({
    host: required("SMTP_HOST"),
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    ...(user || password ? { auth: { user, pass: password } } : {}),
  });

  return transporter;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendAuthEmail({ to, subject, heading, message, actionLabel, actionUrl }) {
  const from = process.env.GMAIL_MAIL_FROM || required("MAIL_FROM");
  const safeUrl = escapeHtml(actionUrl);

  await getTransporter().sendMail({
    from,
    to,
    subject,
    text: `${heading}\n\n${message}\n\n${actionLabel}: ${actionUrl}\n\nIf you did not request this, you can safely ignore this email.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#17203f">
        <h1 style="font-size:24px">${escapeHtml(heading)}</h1>
        <p>${escapeHtml(message)}</p>
        <p style="margin:28px 0">
          <a href="${safeUrl}" style="display:inline-block;background:#4f46e5;color:#ffffff;padding:12px 18px;border-radius:6px;text-decoration:none;font-weight:700">${escapeHtml(actionLabel)}</a>
        </p>
        <p style="font-size:13px;color:#667085">If you did not request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}
