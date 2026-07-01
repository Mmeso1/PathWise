"use client"

import Link from "next/link"
import { useState } from "react"
import { CalendarClock, FileText } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { PriorityBadge } from "@/components/impact-badge"
import { actionItems as initialActions } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function ActionList({ limit }: { limit?: number }) {
  const [items, setItems] = useState(initialActions)

  function toggle(id: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    )
  }

  const active = items.filter((i) => !i.completed)
  const completed = items.filter((i) => i.completed)
  const shown = limit ? active.slice(0, limit) : active

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        {shown.map((item) => (
          <Row key={item.id} item={item} onToggle={() => toggle(item.id)} />
        ))}
        {shown.length === 0 && (
          <p className="rounded-xl border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
            No outstanding actions. You&apos;re all caught up.
          </p>
        )}
      </div>

      {!limit && completed.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Completed</h3>
          <div className="flex flex-col gap-3">
            {completed.map((item) => (
              <Row key={item.id} item={item} onToggle={() => toggle(item.id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Row({
  item,
  onToggle,
}: {
  item: (typeof initialActions)[number]
  onToggle: () => void
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-colors",
        item.completed && "opacity-60",
      )}
    >
      <Checkbox checked={item.completed} onCheckedChange={onToggle} className="mt-1" aria-label={`Mark ${item.title} complete`} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className={cn("text-sm font-medium text-foreground", item.completed && "line-through")}>
            {item.title}
          </p>
          {!item.completed && <PriorityBadge priority={item.priority} />}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarClock className="size-3.5" />
            {item.deadline}
          </span>
          {item.policyId && (
            <Link href={`/policies/${item.policyId}`} className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
              <FileText className="size-3.5" />
              Read policy
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
