"use client"

import Link from "next/link"
import { useState } from "react"
import { Check, ChevronDown, TriangleAlert, ExternalLink } from "lucide-react"
import { journeyStages, type StageStatus } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const statusStyles: Record<StageStatus, { dot: string; label: string; labelClass: string }> = {
  completed: { dot: "bg-success text-success-foreground", label: "Completed", labelClass: "bg-success-muted text-success" },
  current: { dot: "bg-primary text-primary-foreground", label: "Current", labelClass: "bg-primary/10 text-primary" },
  affected: { dot: "bg-warning text-warning-foreground", label: "Affected", labelClass: "bg-warning-muted text-warning-foreground" },
  upcoming: { dot: "bg-muted text-muted-foreground", label: "Upcoming", labelClass: "bg-muted text-muted-foreground" },
  goal: { dot: "bg-accent text-accent-foreground", label: "Goal", labelClass: "bg-accent text-accent-foreground" },
}

export function JourneyTimeline() {
  const [open, setOpen] = useState<string | null>("skilled-worker")

  return (
    <ol className="relative flex flex-col gap-4 before:absolute before:left-[18px] before:top-2 before:bottom-2 before:w-px before:bg-border">
      {journeyStages.map((stage, i) => {
        const s = statusStyles[stage.status]
        const isOpen = open === stage.id
        return (
          <li key={stage.id} id={stage.id} className="relative scroll-mt-24 pl-12">
            <span className={cn("absolute left-0 top-3 grid size-9 place-items-center rounded-xl text-sm font-semibold ring-4 ring-background", s.dot)}>
              {stage.status === "completed" ? (
                <Check className="size-4" />
              ) : stage.status === "affected" ? (
                <TriangleAlert className="size-4" />
              ) : (
                i + 1
              )}
            </span>

            <div className={cn("rounded-2xl border bg-card transition-shadow", stage.status === "affected" ? "border-warning/40" : "border-border")}>
              <button
                onClick={() => setOpen(isOpen ? null : stage.id)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-medium text-foreground">{stage.title}</span>
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", s.labelClass)}>{s.label}</span>
                </div>
                <ChevronDown className={cn("size-5 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
              </button>

              {isOpen && (
                <div className="grid gap-5 border-t border-border p-5 sm:grid-cols-2">
                  <DetailBlock title="Eligibility">
                    <p className="text-sm text-foreground">{stage.eligibility}</p>
                  </DetailBlock>
                  <DetailBlock title="Current requirements">
                    <ul className="flex flex-col gap-1.5 text-sm text-foreground">
                      {stage.requirements.map((r) => (
                        <li key={r} className="flex gap-2"><span className="text-primary">·</span>{r}</li>
                      ))}
                    </ul>
                  </DetailBlock>
                  <DetailBlock title="Documents">
                    <ul className="flex flex-wrap gap-2">
                      {stage.documents.map((d) => (
                        <li key={d} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{d}</li>
                      ))}
                    </ul>
                  </DetailBlock>
                  <DetailBlock title="Recent policy changes">
                    <ul className="flex flex-col gap-1.5 text-sm text-foreground">
                      {stage.recentChanges.map((c) => (
                        <li key={c} className="flex gap-2"><span className="text-warning-foreground">·</span>{c}</li>
                      ))}
                    </ul>
                  </DetailBlock>
                  <DetailBlock title="Potential future changes">
                    <ul className="flex flex-col gap-1.5 text-sm text-foreground">
                      {stage.futureChanges.map((c) => (
                        <li key={c} className="flex gap-2"><span className="text-muted-foreground">·</span>{c}</li>
                      ))}
                    </ul>
                  </DetailBlock>
                  <DetailBlock title="Official guidance">
                    <div className="flex flex-col gap-1.5">
                      {stage.govLinks.map((l) => (
                        <Link key={l.href} href={l.href} target="_blank" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                          {l.label}
                          <ExternalLink className="size-3.5" />
                        </Link>
                      ))}
                    </div>
                  </DetailBlock>
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</p>
      {children}
    </div>
  )
}
