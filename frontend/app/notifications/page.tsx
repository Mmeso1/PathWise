import Link from "next/link"
import { AppShell } from "@/components/app/app-shell"
import { PageHeader } from "@/components/app/page-header"
import { Content } from "@/components/app/content"
import { ImpactBadge } from "@/components/impact-badge"
import { notifications } from "@/lib/mock-data"
import { Bell, ArrowRight } from "lucide-react"

const groups = ["Today", "This Week", "Earlier"] as const

export default function NotificationsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Notifications"
        description="Policy changes that affect your journey, newest first."
        showNotifications={false}
      />
      <Content>
        <div className="space-y-8">
          {groups.map((group) => {
            const items = notifications.filter((n) => n.group === group)
            if (items.length === 0) return null
            return (
              <section key={group}>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group}
                </h2>
                <ul className="mt-3 space-y-3">
                  {items.map((n) => (
                    <li key={n.id}>
                      <Link
                        href={`/policies/${n.policyId}`}
                        className="group flex items-start gap-4 rounded-2xl border bg-card p-4 transition-colors hover:border-primary/40"
                      >
                        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                          <Bell className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <ImpactBadge impact={n.impact} />
                            {n.actionRequired && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                Action required
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground">{n.time}</span>
                          </div>
                          <p className="mt-1.5 font-medium leading-snug text-pretty">{n.title}</p>
                        </div>
                        <ArrowRight className="mt-2 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </Content>
    </AppShell>
  )
}
