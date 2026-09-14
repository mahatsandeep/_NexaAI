"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, Sparkles } from "lucide-react";

import { navLinks, siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-semibold">
          <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {session?.user ? (
            <>
              {session.user.role === "ADMIN" ? (
                <Button variant="ghost" nativeButton={false} render={<Link href="/admin" />}>
                  Admin
                </Button>
              ) : null}
              <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button variant="outline" nativeButton={false} render={<Link href="/login" />}>
              Sign In
            </Button>
          )}
          <Button nativeButton={false} render={<Link href="/book-consultation" />}>
            Book a Consultation
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />
            }
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="font-heading">{siteConfig.name}</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-col gap-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-base font-medium text-muted-foreground transition-colors hover:text-foreground",
                    pathname === link.href && "text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                className="mt-2"
                nativeButton={false}
                render={<Link href="/book-consultation" onClick={() => setOpen(false)} />}
              >
                Book a Consultation
              </Button>
              {session?.user ? (
                <>
                  {session.user.role === "ADMIN" ? (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Admin
                    </Link>
                  ) : null}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/login" onClick={() => setOpen(false)} />}
                >
                  Sign In
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
