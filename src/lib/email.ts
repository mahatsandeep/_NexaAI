type PasswordResetEmail = {
  to: string;
  resetUrl: string;
};

/**
 * Sends transactional email through Resend when it is configured. Keeping this
 * small wrapper dependency-free also makes local password-reset testing easy.
 */
export async function sendPasswordResetEmail({ to, resetUrl }: PasswordResetEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") {
      console.error("Password reset email was not sent: RESEND_API_KEY or RESEND_FROM is missing.");
    }
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Reset your password",
      text: `Reset your password by visiting this link: ${resetUrl}\n\nThis link expires in one hour.`,
      html: `<p>Reset your password by clicking the link below.</p><p><a href="${resetUrl}">Reset password</a></p><p>This link expires in one hour.</p>`,
    }),
  });

  if (!response.ok) {
    console.error("Password reset email was not sent.", await response.text());
    return false;
  }

  return true;
}
