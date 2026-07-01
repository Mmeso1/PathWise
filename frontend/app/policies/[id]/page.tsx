import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CalendarDays,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { Content } from "@/components/app/content";
import { Button } from "@/components/ui/button";
import { ImpactBadge } from "@/components/impact-badge";
import { getPolicy, policies, impactMeta } from "@/lib/mock-data";

export function generateStaticParams() {
  return policies.map((p) => ({ id: p.id }));
}

export default async function PolicyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const policy = getPolicy(id);
  if (!policy) notFound();

  const related = policy.related.map(getPolicy).filter(Boolean);

  return (
    <AppShell>
      <PageHeader title="Policy details" />
      <Content className="flex flex-col gap-8">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2 w-fit gap-1.5 text-muted-foreground"
        >
          <Link href="/policies" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Back to policies
          </Link>
        </Button>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <ImpactBadge impact={policy.impact} />
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarDays className="size-4" />
              Effective {policy.date}
            </span>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {policy.route}
            </span>
          </div>
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {policy.title}
          </h1>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            {policy.summary}
          </p>
        </div>

        {/* Before / After */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Policy summary
          </h2>
          <div className="mt-4 grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-xl border border-border bg-muted/50 p-4">
              <p className="text-xs font-medium text-muted-foreground">
                Before
              </p>
              <p className="mt-1 font-medium text-foreground">
                {policy.before}
              </p>
            </div>
            <div className="grid place-items-center">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <ArrowRight className="size-4" />
              </span>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <p className="text-xs font-medium text-primary">After</p>
              <p className="mt-1 font-medium text-foreground">{policy.after}</p>
            </div>
          </div>
        </section>

        {/* Impact on you */}
        <section
          className={`rounded-2xl border p-6 ${impactMeta[policy.impact].badgeClass}`}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            Impact on you
          </h2>
          <p className="mt-3 text-pretty text-base font-medium leading-relaxed">
            {policy.personalImpact}
          </p>
          <Button variant="secondary" className="mt-4">
            <Link
              href={`/impact/${policy.id}`}
              className="flex items-center gap-2"
            >
              Why does this affect me?
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </section>

        {/* Why changed */}
        <Section title="Why this changed">
          <p className="text-sm leading-relaxed text-foreground">
            {policy.whyChanged}
          </p>
        </Section>

        {/* Who is affected */}
        <Section title="Who is affected">
          <ul className="flex flex-wrap gap-2">
            {policy.affects.map((a) => (
              <li
                key={a}
                className="rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground"
              >
                {a}
              </li>
            ))}
          </ul>
        </Section>

        {/* Official source */}
        <Section title="Official source">
          <Link
            href={policy.source.href}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-muted"
          >
            <ExternalLink className="size-4" />
            {policy.source.label}
          </Link>
        </Section>

        {/* Related */}
        {related.length > 0 && (
          <Section title="Related policies">
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p!.id}
                  href={`/policies/${p!.id}`}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {p!.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p!.route} · {p!.date}
                    </p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </Section>
        )}
      </Content>
    </AppShell>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}
