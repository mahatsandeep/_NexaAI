import Link from "next/link";
import { CalendarDays, Mail, Users } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard");
  if (session.user.role !== "ADMIN") redirect("/");

  const [userCount, customerCount, contactCount, consultationCount, contacts, consultations] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.contactSubmission.count(),
      prisma.consultationRequest.count(),
      prisma.contactSubmission.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, email: true, createdAt: true },
      }),
      prisma.consultationRequest.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, email: true, createdAt: true },
      }),
    ]);

  const recentActivity = [
    ...contacts.map((contact) => ({ ...contact, type: "Contact Request" })),
    ...consultations.map((consultation) => ({ ...consultation, type: "Consultation Request" })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 6);

  const stats = [
    { label: "Registered users", value: userCount, icon: Users },
    { label: "Customers", value: customerCount, icon: Users },
    { label: "Contact messages", value: contactCount, icon: Mail },
    { label: "Consultation requests", value: consultationCount, icon: CalendarDays },
  ];

  return (
    <>
      <PageHero eyebrow="Admin" title="Dashboard" description="A snapshot of your accounts and incoming leads." />
      <section className="py-12">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <Card key={label} className="border-border/60">
                <CardContent className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="mt-1 font-heading text-3xl font-semibold">{value}</p>
                  </div>
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 border-border/60">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="font-heading text-lg">Recent activity</CardTitle>
              <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/admin" />}>
                Manage records
              </Button>
            </CardHeader>
            <CardContent>
              {recentActivity.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px] text-left text-sm">
                    <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-3 py-2 font-medium">ID</th>
                        <th className="px-3 py-2 font-medium">Name</th>
                        <th className="px-3 py-2 font-medium">Email</th>
                        <th className="px-3 py-2 font-medium">Type</th>
                        <th className="px-3 py-2 font-medium">Date &amp; time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivity.map((activity) => (
                        <tr key={`${activity.type}-${activity.id}`} className="border-b border-border/40 last:border-0">
                          <td className="px-3 py-3 font-mono text-xs">{activity.id}</td>
                          <td className="px-3 py-3 font-medium">{activity.name}</td>
                          <td className="px-3 py-3">{activity.email}</td>
                          <td className="px-3 py-3">{activity.type}</td>
                          <td className="whitespace-nowrap px-3 py-3">{activity.createdAt.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No contact messages or consultation requests yet.</p>
              )}
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  );
}
