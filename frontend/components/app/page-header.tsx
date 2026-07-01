import Link from "next/link";
import type { ReactNode } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageHeader({
  title,
  description,
  action,
  showNotifications = true,
}: {
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  showNotifications?: boolean;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
          {description && (
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {action}
          {showNotifications && (
            <Button variant="outline" size="icon" className="relative">
              <Link href="/notifications" aria-label="Notifications">
                <Bell className="size-4.5" />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-danger ring-2 ring-background" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
