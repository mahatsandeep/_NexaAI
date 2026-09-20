"use client";

import { useState, type FormEvent } from "react";
import { CalendarCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "submitting" | "success" | "error";

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    setStatus(response.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border/60 bg-card p-8 text-center">
        <h3 className="font-heading text-lg font-semibold">
          Consultation requested
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ve received your request. Our team will follow up by email
          to confirm a time that works for you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="booking-name">Full name</Label>
          <Input id="booking-name" name="name" placeholder="Jane Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="booking-email">Work email</Label>
          <Input
            id="booking-email"
            name="email"
            type="email"
            placeholder="jane@company.com"
            required
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="booking-company">Company</Label>
          <Input id="booking-company" name="company" placeholder="Company name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="booking-date">Preferred date/time</Label>
          <Input id="booking-date" name="preferredDate" type="datetime-local" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="booking-message">What would you like to discuss?</Label>
        <Textarea
          id="booking-message"
          name="message"
          placeholder="Share a bit about your goals so we can prepare for the call..."
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="booking-notes">Additional notes</Label>
        <Textarea id="booking-notes" name="notes" placeholder="Anything else we should know?" rows={3} />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Booking...
          </>
        ) : (
          <>
            Request Consultation
            <CalendarCheck className="h-4 w-4" />
          </>
        )}
      </Button>
      {status === "error" ? (
        <p className="text-sm text-destructive">We couldn&apos;t submit your request. Please try again.</p>
      ) : null}
    </form>
  );
}
