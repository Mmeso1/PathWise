import Link from "next/link"
import type { ReactNode } from "react"
import { Brand } from "@/components/brand"
import { ShieldCheck, Route, FileCheck2 } from "lucide-react"

const points = [
  { icon: Route, text: "A personalised immigration roadmap" },
  { icon: ShieldCheck, text: "Alerts only when a change affects you" },
  { icon: FileCheck2, text: "Every update linked to official GOV.UK guidance" },
]

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-4 py-8 sm:px-8">
        <Brand />
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Back to home
          </Link>
        </p>
      </div>

      <div className="relative hidden bg-primary lg:flex lg:flex-col lg:justify-center lg:px-12">
        <div className="max-w-md">
          <p className="text-sm font-medium text-primary-foreground/70">
            Pathwise
          </p>
          <p className="mt-4 text-balance text-2xl font-semibold leading-snug text-primary-foreground">
            Government policies are written for everyone. We explain what they
            mean for you.
          </p>
          <ul className="mt-10 flex flex-col gap-5">
            {points.map((point) => (
              <li key={point.text} className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-primary-foreground/10 text-primary-foreground">
                  <point.icon className="size-4.5" />
                </span>
                <span className="text-sm text-primary-foreground/90">
                  {point.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
