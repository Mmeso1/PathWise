import Link from "next/link";
import { ArrowRight, Eye, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImpactBadge } from "@/components/impact-badge";
import type { Policy } from "@/lib/mock-data";

export function PolicyImpactCard({ policy }: { policy: Policy }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">
            {policy.route} · {policy.date}
          </p>
          <h3 className="mt-1 text-pretty text-base font-semibold text-foreground sm:text-lg">
            {policy.title}
          </h3>
        </div>
        <ImpactBadge impact={policy.impact} />
      </div>

      <p className="text-sm leading-relaxed text-foreground">
        {policy.summary}
      </p>

      <div className="grid gap-3 rounded-xl bg-muted/60 p-4">
        <div className="flex gap-2.5">
          <Eye className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Why you&apos;re seeing this
            </p>
            <p className="mt-0.5 text-sm text-foreground">{policy.whyYou}</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              What it means
            </p>
            <p className="mt-0.5 text-sm text-foreground">
              {policy.personalImpact}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button>
          <Link
            href={`/policies/${policy.id}`}
            className="flex items-center gap-2"
          >
            See why
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button variant="ghost">
          <Link
            href={`/impact/${policy.id}`}
            className="flex items-center gap-2"
          >
            Why it affects me
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
