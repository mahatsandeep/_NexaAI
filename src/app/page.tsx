import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/container";
import { AnimatedBackground } from "@/components/sections/animated-background";
import { CtaSection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { iconMap } from "@/lib/icon-map";
import { caseStudies, industries, services } from "@/lib/site-config";

const impactStats = [
  { value: "24/7", label: "AI agents always on for your customers" },
  { value: "70%", label: "Average reduction in manual work" },
  { value: "2-4 wks", label: "Typical time to first working AI system" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-6 sm:pt-32 sm:pb-8">
        <div
          className="pointer-events-none absolute inset-0 -z-20"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 0%, oklch(0.4 0.16 262 / 0.14), transparent), radial-gradient(40% 35% at 85% 20%, oklch(0.55 0.14 262 / 0.1), transparent)",
          }}
          aria-hidden="true"
        />
        <AnimatedBackground opacity="opacity-20" />
        <Container className="text-center">
          <Badge variant="secondary" className="mb-6">
            AI Automation &amp; AI Agents for Growing Businesses
          </Badge>
          <h1 className="font-heading text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            AI that works for your business.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            We design and deploy intelligent AI solutions that automate
            repetitive work, improve customer experiences, and help
            businesses operate more efficiently.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" nativeButton={false} render={<Link href="/book-consultation" />}>
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/services" />}>
              Explore Services
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 pt-6 pb-20 sm:pt-8">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              What we do
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              AI solutions built around your business
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <Card key={service.slug} className="border-border/60">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="font-heading text-lg">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {service.summary}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-border/60 py-16">
        <AnimatedBackground />
        <Container>
          <div className="grid gap-8 text-center sm:grid-cols-3">
            {impactStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border/60 bg-background/70 p-6 backdrop-blur-sm">
                <p className="font-heading text-4xl font-semibold text-primary">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 bg-secondary/30 py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Industries
              </p>
              <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                We adapt to how your industry works
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every business is different. We tailor AI agents and
                automations to the workflows, compliance needs, and tools
                your industry already uses.
              </p>
              <Button variant="outline" className="mt-6" nativeButton={false} render={<Link href="/industries" />}>
                View All Industries
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {industries.slice(0, 4).map((industry) => (
                <div
                  key={industry.slug}
                  className="rounded-xl border border-border/60 bg-card p-4"
                >
                  <p className="font-heading text-sm font-semibold">
                    {industry.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 py-12">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Results
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Proven outcomes for real businesses
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Card key={study.slug} className="border-border/60">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {study.industry}
                  </Badge>
                  <CardTitle className="font-heading text-lg">
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

          <div className="mt-10 text-center">
            <Button variant="outline" nativeButton={false} render={<Link href="/case-studies" />}>
              View All Case Studies
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
