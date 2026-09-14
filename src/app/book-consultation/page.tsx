import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { BookingForm } from "@/components/forms/booking-form";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Book a free consultation to see how M2-AI can automate your business with AI.",
};

const highlights = [
  "30-minute call with an AI automation specialist",
  "A walkthrough of where AI can save you the most time",
  "A clear, no-obligation recommendation and next steps",
];

export default function BookConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Consultation"
        title="See what AI can do for your business"
        description="Book a free 30-minute consultation and we'll map out exactly where automation can save you time and money."
      />

      <section className="py-12">
        <Container className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <BookingForm />
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <h3 className="font-heading text-lg font-semibold">
                What to expect
              </h3>
              <ul className="mt-4 space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
