import type { Metadata } from "next";
import { Target, Rocket, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description:
    "M2-AI is an AI automation agency helping small and mid-sized businesses deploy intelligent agents and automation.",
};

const values = [
  {
    icon: Target,
    title: "Outcome-driven",
    description:
      "We measure success by hours saved, revenue captured, and costs reduced — not just software shipped.",
  },
  {
    icon: Rocket,
    title: "Fast to deploy",
    description:
      "Most engagements go from kickoff to a working AI system in a matter of weeks, not quarters.",
  },
  {
    icon: ShieldCheck,
    title: "Built to last",
    description:
      "Every solution comes with monthly support so your AI systems keep improving after launch.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="We help businesses put AI to work — not just talk about it"
        description="M2-AI is a team of AI engineers and automation specialists focused on one thing: building AI agents and systems that create measurable impact for small and mid-sized businesses."
      />

      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Our mission
            </h2>
            <p className="mt-4 text-muted-foreground">
              Too many businesses assume AI is only for large enterprises
              with big budgets and in-house engineering teams. We started
              M2-AI to close that gap — designing and deploying practical AI
              agents and automations that any growing business can adopt,
              backed by ongoing support to keep them running smoothly.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title} className="border-border/60 text-center">
                <CardHeader className="items-center">
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="font-heading text-lg">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
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
