import { cn } from "@/lib/utils"
import { impactMeta, priorityMeta, type ImpactLevel, type ActionPriority } from "@/lib/mock-data"

export function ImpactBadge({
  impact,
  className,
}: {
  impact: ImpactLevel
  className?: string
}) {
  const meta = impactMeta[impact]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        meta.badgeClass,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  )
}

export function PriorityBadge({
  priority,
  className,
}: {
  priority: ActionPriority
  className?: string
}) {
  const meta = priorityMeta[priority]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        meta.badgeClass,
        className,
      )}
    >
      {meta.label} priority
    </span>
  )
}
