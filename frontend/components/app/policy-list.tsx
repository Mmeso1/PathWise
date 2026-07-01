"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ImpactBadge } from "@/components/impact-badge"
import { policies } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const filters = ["All", "Student", "Graduate", "Skilled Worker", "ILR"]

export function PolicyList({ detailed = false }: { detailed?: boolean }) {
  const [filter, setFilter] = useState("All")
  const [query, setQuery] = useState("")

  const filtered = policies.filter((p) => {
    const matchesFilter = filter === "All" || p.route === filter
    const matchesQuery =
      query === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.summary.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesQuery
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search policies…"
            className="h-10 pl-9"
          />
        </div>
      </div>

      <div className={cn("grid gap-3", detailed && "sm:grid-cols-2")}>
        {filtered.map((policy) => (
          <Link
            key={policy.id}
            href={`/policies/${policy.id}`}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-medium text-muted-foreground">{policy.route} · {policy.date}</span>
              <ImpactBadge impact={policy.impact} />
            </div>
            <h3 className="text-pretty font-medium text-foreground">{policy.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{policy.summary}</p>
            <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
              View details
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="rounded-xl border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
            No policies match your filters.
          </p>
        )}
      </div>
    </div>
  )
}
