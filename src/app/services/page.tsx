import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { iconMap } from "@/lib/icon-map";
import { services } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI agents, process automation, customer experience, and data insight services for growing businesses.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="AI solutions that pay for themselves"
        description="From conversational AI agents to full workflow automation, we build the systems that let your team focus on higher-value work."
      />

      <section className="py-12">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <Card key={service.slug} className="border-border/60">
                  <CardHeader>
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="font-heading text-xl">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.summary}</p>
                    <ul className="mt-4 space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-foreground/90"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
