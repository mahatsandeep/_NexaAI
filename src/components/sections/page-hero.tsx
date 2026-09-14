import { Container } from "@/components/layout/container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, oklch(0.65 0.22 265 / 0.35), transparent)",
        }}
        aria-hidden="true"
      />
      <Container className="text-center">
        {eyebrow ? (
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
