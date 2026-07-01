"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sparkles, ArrowUp } from "lucide-react"

const suggestions = ["What changed?", "Does this affect me?", "How do I prepare?"]

export function AskAssistant() {
  const router = useRouter()
  const [value, setValue] = useState("")

  function go(q?: string) {
    const query = q ?? value
    router.push(`/assistant${query ? `?q=${encodeURIComponent(query)}` : ""}`)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="size-4" />
        </span>
        <h3 className="text-sm font-medium text-foreground">Ask the assistant</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          go()
        }}
        className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask about any policy…"
          className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          aria-label="Ask"
          className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ArrowUp className="size-4" />
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => go(s)}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
