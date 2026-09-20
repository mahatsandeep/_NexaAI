"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, KeyRound, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AdminUser = {
  id: string;
  name: string | null;
  email: string;
  role: "ADMIN" | "CUSTOMER";
  createdAt: Date;
  updatedAt: Date;
};

export function AdminUserRow({ user }: { user: AdminUser }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const form = event.currentTarget;
    const response = await fetch(`/api/admin/users/${user.id}/password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: new FormData(form).get("password") }),
    });

    setSubmitting(false);
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setMessage({ type: "error", text: body?.error ?? "Something went wrong." });
      return;
    }

    setMessage({ type: "success", text: "Password updated." });
    form.reset();
  }

  async function handleDelete() {
    if (!window.confirm(`Delete ${user.email}? This cannot be undone.`)) return;

    setDeleting(true);
    setMessage(null);
    const response = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setMessage({ type: "error", text: body?.error ?? "Something went wrong." });
      setDeleting(false);
      return;
    }

    router.refresh();
  }

  return (
    <>
      <tr className="border-b border-border/40 align-top">
        <td className="px-3 py-3 font-medium">{user.name || "—"}</td>
        <td className="px-3 py-3">{user.email}</td>
        <td className="px-3 py-3">
          <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>{user.role}</Badge>
        </td>
        <td className="whitespace-nowrap px-3 py-3">{user.createdAt.toLocaleString()}</td>
        <td className="whitespace-nowrap px-3 py-3">{user.updatedAt.toLocaleString()}</td>
        <td className="px-3 py-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpen((value) => !value)}>
              <KeyRound className="h-3.5 w-3.5" />
              Change Password
            </Button>
            {user.role !== "ADMIN" ? (
              <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting}>
                {deleting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
                Delete
              </Button>
            ) : null}
          </div>
        </td>
      </tr>
      {open ? (
        <tr className="border-b border-border/40">
          <td colSpan={6} className="px-3 pb-3">
            <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
              <div className="relative max-w-xs">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="New password (min 8 characters)"
                  minLength={8}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button type="submit" size="sm" disabled={submitting}>
                {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Save"}
              </Button>
              {message ? (
                <span
                  className={
                    message.type === "success" ? "text-sm text-primary" : "text-sm text-destructive"
                  }
                >
                  {message.text}
                </span>
              ) : null}
            </form>
          </td>
        </tr>
      ) : null}
    </>
  );
}
