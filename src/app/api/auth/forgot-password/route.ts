import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import { createPasswordResetToken } from "@/lib/password-reset";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  // Always return a generic success message so this endpoint can't be used to enumerate accounts.
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ ok: true });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    const token = await createPasswordResetToken(user.id);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
    const resetUrl = new URL(`/reset-password?token=${token}`, appUrl).toString();

    await sendPasswordResetEmail({ to: email, resetUrl });

    return NextResponse.json({
      ok: true,
      ...(process.env.NODE_ENV !== "production" ? { devResetUrl: resetUrl } : {}),
    });
  }

  return NextResponse.json({ ok: true });
}
