import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the M2-AI team about your AI automation project.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your business"
        description="Tell us what you're trying to automate and we'll follow up within one business day."
      />

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-heading text-sm font-semibold">Email</p>
                <p className="text-sm text-muted-foreground">{siteConfig.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-heading text-sm font-semibold">Phone</p>
                <p className="text-sm text-muted-foreground">{siteConfig.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-heading text-sm font-semibold">Location</p>
                <p className="text-sm text-muted-foreground">{siteConfig.address}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
