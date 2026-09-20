import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminUserRow } from "@/components/admin/admin-user-row";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
    orderBy: { createdAt: "desc" },
  });
  const [contactSubmissions, consultationRequests] = await Promise.all([
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.consultationRequest.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <>
      <PageHero eyebrow="Admin" title="Account overview" />
      <section className="py-12">
        <Container>
          <Button variant="outline" nativeButton={false} render={<Link href="/dashboard" />}>
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Card
            className="mt-4 border-[#5B9BD5] text-slate-900"
            style={{ backgroundColor: "#9CC2E5" }}
          >
            <CardHeader>
              <CardTitle className="font-heading text-lg">
                Registered users ({users.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 font-medium">Name</th>
                      <th className="px-3 py-2 font-medium">Email</th>
                      <th className="px-3 py-2 font-medium">Role</th>
                      <th className="px-3 py-2 font-medium">Created date</th>
                      <th className="px-3 py-2 font-medium">Updated date</th>
                      <th className="px-3 py-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <AdminUserRow key={user.id} user={user} />
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <div className="mt-8 space-y-8">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="font-heading text-lg">
                  Contact messages ({contactSubmissions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {contactSubmissions.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left text-sm">
                      <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
                        <tr>
                          <th className="px-3 py-2 font-medium">ID</th>
                          <th className="px-3 py-2 font-medium">Name</th>
                          <th className="px-3 py-2 font-medium">Company</th>
                          <th className="px-3 py-2 font-medium">Email</th>
                          <th className="px-3 py-2 font-medium">Message</th>
                          <th className="px-3 py-2 font-medium">Created date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contactSubmissions.map((submission) => (
                          <tr key={submission.id} className="border-b border-border/40 align-top last:border-0">
                            <td className="px-3 py-3 font-mono text-xs">{submission.id}</td>
                            <td className="px-3 py-3 font-medium">{submission.name}</td>
                            <td className="px-3 py-3">{submission.company || "—"}</td>
                            <td className="px-3 py-3">{submission.email}</td>
                            <td className="max-w-sm whitespace-pre-wrap px-3 py-3">{submission.message}</td>
                            <td className="whitespace-nowrap px-3 py-3">
                              {submission.createdAt.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No contact messages yet.</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="font-heading text-lg">
                  Consultation requests ({consultationRequests.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {consultationRequests.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px] text-left text-sm">
                      <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
                        <tr>
                          <th className="px-3 py-2 font-medium">ID</th>
                          <th className="px-3 py-2 font-medium">Name</th>
                          <th className="px-3 py-2 font-medium">Company</th>
                          <th className="px-3 py-2 font-medium">Email</th>
                          <th className="px-3 py-2 font-medium">Message</th>
                          <th className="px-3 py-2 font-medium">Preferred date</th>
                          <th className="px-3 py-2 font-medium">Notes</th>
                          <th className="px-3 py-2 font-medium">Created date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {consultationRequests.map((request) => (
                          <tr key={request.id} className="border-b border-border/40 align-top last:border-0">
                            <td className="px-3 py-3 font-mono text-xs">{request.id}</td>
                            <td className="px-3 py-3 font-medium">{request.name}</td>
                            <td className="px-3 py-3">{request.company || "—"}</td>
                            <td className="px-3 py-3">{request.email}</td>
                            <td className="max-w-sm whitespace-pre-wrap px-3 py-3">{request.message || "—"}</td>
                            <td className="whitespace-nowrap px-3 py-3">{request.preferredDate || "—"}</td>
                            <td className="max-w-sm whitespace-pre-wrap px-3 py-3">{request.notes || "—"}</td>
                            <td className="whitespace-nowrap px-3 py-3">
                              {request.createdAt.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No consultation requests yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
