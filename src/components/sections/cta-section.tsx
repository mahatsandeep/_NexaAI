import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="border-t border-border/60 bg-secondary/40 py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to put AI to work for your business?
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Book a free consultation and we&apos;ll show you exactly where AI
          automation can save you time and money.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" nativeButton={false} render={<Link href="/book-consultation" />}>
            Book a Consultation
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/contact" />}>
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
