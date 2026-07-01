import Link from "next/link"
import { Check, ChevronRight, TriangleAlert } from "lucide-react"
import { journeyStages, type StageStatus } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const statusStyles: Record<StageStatus, { dot: string; label: string; labelClass: string }> = {
  completed: { dot: "bg-success text-success-foreground", label: "Completed", labelClass: "text-success" },
  current: { dot: "bg-primary text-primary-foreground", label: "Current", labelClass: "text-primary" },
  affected: { dot: "bg-warning text-warning-foreground", label: "Affected", labelClass: "text-warning-foreground" },
  upcoming: { dot: "bg-muted text-muted-foreground", label: "Upcoming", labelClass: "text-muted-foreground" },
  goal: { dot: "bg-accent text-accent-foreground", label: "Goal", labelClass: "text-muted-foreground" },
}

export function JourneyRoadmap() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:gap-3 lg:overflow-visible">
      {journeyStages.map((stage, i) => {
        const s = statusStyles[stage.status]
        return (
          <Link
            key={stage.id}
            href={`/journey#${stage.id}`}
            className={cn(
              "group relative flex min-w-[170px] flex-col gap-3 rounded-2xl border bg-card p-4 transition-all hover:shadow-md lg:min-w-0",
              stage.status === "affected" ? "border-warning/40 ring-1 ring-warning/20" : "border-border hover:border-primary/40",
            )}
          >
            <div className="flex items-center justify-between">
              <span className={cn("grid size-9 place-items-center rounded-xl text-sm font-semibold", s.dot)}>
                {stage.status === "completed" ? (
                  <Check className="size-4" />
                ) : stage.status === "affected" ? (
                  <TriangleAlert className="size-4" />
                ) : (
                  i + 1
                )}
              </span>
              <ChevronRight className="size-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{stage.title}</p>
              <p className={cn("mt-0.5 text-xs font-medium", s.labelClass)}>{s.label}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
