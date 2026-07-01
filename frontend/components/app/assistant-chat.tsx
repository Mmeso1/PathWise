"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Sparkles, ArrowUp, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  role: "user" | "assistant"
  text: string
  source?: { label: string; href: string }
}

const starters = [
  "How does the salary threshold change affect me?",
  "What should I do before my visa expires?",
  "Am I still eligible for the Skilled Worker route?",
  "When should I switch from my Graduate visa?",
]

function scriptedReply(question: string): Message {
  const q = question.toLowerCase()
  if (q.includes("salary") || q.includes("threshold")) {
    return {
      role: "assistant",
      text: "The general Skilled Worker salary threshold rose from £26,200 to £38,700 in April 2024. Your current salary is £36,500, which is £2,200 below the new minimum. Because you plan to apply after the change took effect, you would need a salary review or a role that qualifies for a lower going rate before applying.",
      source: {
        label: "Skilled Worker visa — GOV.UK",
        href: "https://www.gov.uk/skilled-worker-visa",
      },
    }
  }
  if (q.includes("expire") || q.includes("expiry") || q.includes("before")) {
    return {
      role: "assistant",
      text: "Your Graduate visa expires on 14 Aug 2026. The key steps before then are confirming your salary meets the threshold, securing a Certificate of Sponsorship from Northwind Technologies, and gathering salary evidence. Switching earlier reduces the risk from any further rule changes to the Graduate route.",
      source: {
        label: "Graduate visa — GOV.UK",
        href: "https://www.gov.uk/graduate-visa",
      },
    }
  }
  if (q.includes("eligible") || q.includes("eligibility")) {
    return {
      role: "assistant",
      text: "You remain eligible for the Skilled Worker route in principle: you have a graduate-level role with an employer that can sponsor you. The main outstanding requirement is meeting the £38,700 salary threshold and the going rate for software engineers. Everything else in your profile currently meets the requirements.",
      source: {
        label: "Skilled Worker eligibility — GOV.UK",
        href: "https://www.gov.uk/skilled-worker-visa/your-job",
      },
    }
  }
  if (q.includes("switch") || q.includes("graduate")) {
    return {
      role: "assistant",
      text: "You can switch from your Graduate visa to Skilled Worker from inside the UK at any point before it expires, as long as you meet the requirements. Given the Graduate route is under formal review, applying once your salary qualifies — rather than waiting until close to expiry — is the lower-risk approach.",
      source: {
        label: "Graduate route review — GOV.UK",
        href: "https://www.gov.uk/government/organisations/migration-advisory-committee",
      },
    }
  }
  return {
    role: "assistant",
    text: "Based on your profile, the most significant recent change is the higher Skilled Worker salary threshold. I can explain how any specific policy affects your journey, what actions to take, or what each visa stage requires. This is general guidance based on official GOV.UK information and is not legal advice.",
    source: {
      label: "Immigration Rules — GOV.UK",
      href: "https://www.gov.uk/guidance/immigration-rules",
    },
  }
}

export function AssistantChat() {
  const params = useSearchParams()
  const initial = params.get("q")
  const [messages, setMessages] = useState<Message[]>([])
  const [value, setValue] = useState("")
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const seeded = useRef(false)

  function send(text: string) {
    const clean = text.trim()
    if (!clean) return
    setMessages((m) => [...m, { role: "user", text: clean }])
    setValue("")
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, scriptedReply(clean)])
      setTyping(false)
    }, 700)
  }

  useEffect(() => {
    if (initial && !seeded.current) {
      seeded.current = true
      send(initial)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, typing])

  const empty = messages.length === 0 && !typing

  return (
    <div className="flex h-[calc(100vh-8.5rem)] flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {empty ? (
          <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="size-7" />
            </span>
            <h2 className="mt-4 text-xl font-semibold text-balance">
              Ask about how UK immigration policy affects you
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground text-pretty">
              I use your profile and official GOV.UK guidance to answer in plain English. This is
              general information, not legal advice.
            </p>
            <div className="mt-6 grid w-full gap-2 sm:grid-cols-2">
              {starters.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-xl border border-border bg-card p-3 text-left text-sm text-foreground transition-colors hover:border-primary/40"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl space-y-5 pb-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-card-foreground",
                  )}
                >
                  <p className="text-pretty">{m.text}</p>
                  {m.source && (
                    <Link
                      href={m.source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      <ExternalLink className="size-3" />
                      {m.source.label}
                    </Link>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-3.5">
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(value)
        }}
        className="mx-auto mt-3 flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask a question about your immigration journey…"
          className="flex-1 bg-transparent px-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!value.trim()}
          className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <ArrowUp className="size-4.5" />
        </button>
      </form>
    </div>
  )
}
