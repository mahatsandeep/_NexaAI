"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Loader2, Mail } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [devResetUrl, setDevResetUrl] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.get("email") }),
      });
      const body = await response.json().catch(() => null);

      setDone(response.ok);
      setDevResetUrl(body?.devResetUrl ?? null);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero eyebrow="Account" title="Reset your password" />
      <section className="py-12">
        <Container className="mx-auto max-w-md">
          {done ? (
            <div className="rounded-xl border border-border/60 bg-card p-6 text-center">
              <p className="text-sm text-muted-foreground">
                If an account exists for that email, we&apos;ve sent a link to reset your
                password.
              </p>
              {devResetUrl ? (
                <p className="mt-4 text-xs text-muted-foreground">
                  Dev mode link:{" "}
                  <Link href={devResetUrl} className="text-primary hover:underline">
                    {devResetUrl}
                  </Link>
                </p>
              ) : null}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <Mail className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Remembered your password?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
