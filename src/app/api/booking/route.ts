import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const company = typeof body?.company === "string" ? body.company.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const preferredDate = typeof body?.preferredDate === "string" ? body.preferredDate.trim() : "";
  const notes = typeof body?.notes === "string" ? body.notes.trim() : "";

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  await prisma.consultationRequest.create({
    data: {
      name,
      email,
      company: company || null,
      message: message || null,
      preferredDate: preferredDate || null,
      notes: notes || null,
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
