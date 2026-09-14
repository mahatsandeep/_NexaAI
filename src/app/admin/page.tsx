import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHero eyebrow="Admin" title="Account overview" />
      <section className="py-12">
        <Container>
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="font-heading text-lg">
                Registered users ({users.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/60 p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{user.name || "—"}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                    {user.role}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  );
}
