import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { industries } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "AI automation and agents tailored to professional services, healthcare, e-commerce, real estate, financial services, and logistics.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for how your industry actually works"
        description="We combine AI expertise with real operational knowledge of your sector so every automation fits into your existing workflows."
      />

      <section className="py-12">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Card key={industry.slug} className="border-border/60">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">
                    {industry.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {industry.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
