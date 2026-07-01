"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Route,
  FileText,
  ListChecks,
  Bell,
  MessageSquare,
  User,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { userProfile } from "@/lib/mock-data";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/journey", label: "My Journey", icon: Route },
  { href: "/policies", label: "Policies", icon: FileText },
  { href: "/actions", label: "Action Centre", icon: ListChecks },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/assistant", label: "Assistant", icon: MessageSquare },
  { href: "/profile", label: "Profile", icon: User },
];

const mobileNav = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/journey", label: "Journey", icon: Route },
  { href: "/policies", label: "Policies", icon: FileText },
  { href: "/actions", label: "Actions", icon: ListChecks },
  { href: "/profile", label: "Profile", icon: User },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(sessionStorage.getItem("username") || "Guest");
  }, []);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center px-6">
          <Brand />
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="size-4.5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/profile"
          className="flex items-center gap-3 border-t border-border px-4 py-4 transition-colors hover:bg-sidebar-accent/50"
        >
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {userProfile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {username}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {userProfile.currentVisa}
            </p>
          </div>
        </Link>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-col pb-16 lg:pb-0">{children}</div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden">
        <div className="grid grid-cols-5">
          {mobileNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                isActive(item.href) ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
