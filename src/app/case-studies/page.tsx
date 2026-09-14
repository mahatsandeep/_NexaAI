import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { caseStudies } from "@/lib/site-config";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real results from AI automation and AI agent projects delivered by M2-AI.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Real businesses, real results"
        description="A look at how our AI agents and automations have saved time, cut costs, and improved customer experience."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Card key={study.slug} className="border-border/60">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {study.industry}
                  </Badge>
                  <CardTitle className="font-heading text-xl">
                    {study.client}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="flex items-center gap-2 font-heading text-sm font-semibold text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    {study.result}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {study.summary}
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
