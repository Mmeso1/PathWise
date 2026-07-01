import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowDown,
  User,
  FileText,
  Target,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { Content } from "@/components/app/content";
import { Button } from "@/components/ui/button";
import { ImpactBadge } from "@/components/impact-badge";
import { getPolicy, policies, userProfile } from "@/lib/mock-data";

export function generateStaticParams() {
  return policies.map((p) => ({ id: p.id }));
}

export default async function ImpactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const policy = getPolicy(id);
  if (!policy) notFound();

  const chain = [
    {
      icon: User,
      label: "Your profile",
      value: `${userProfile.currentVisa} · ${userProfile.timeline}`,
    },
    {
      icon: Target,
      label: "Your goal",
      value: `Switch to ${userProfile.goal}`,
    },
    { icon: FileText, label: "The policy", value: policy.title },
  ];

  return (
    <AppShell>
      <PageHeader title="Why does this affect me?" />
      <Content className="flex flex-col gap-8">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2 w-fit gap-1.5 text-muted-foreground"
        >
          <Link href={`/policies/${policy.id}`}>
            <ArrowLeft className="size-4" />
            Back to policy
          </Link>
        </Button>

        <div className="flex flex-col gap-3">
          <ImpactBadge impact={policy.impact} className="w-fit" />
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            We matched this change to your journey
          </h1>
          <p className="text-muted-foreground">
            Here is exactly why {policy.title.toLowerCase()} appears on your
            dashboard.
          </p>
        </div>

        {/* Reasoning chain */}
        <div className="flex flex-col items-stretch gap-2">
          {chain.map((node, i) => (
            <div key={node.label} className="flex flex-col items-center gap-2">
              <div className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <node.icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {node.label}
                  </p>
                  <p className="mt-0.5 font-medium text-foreground">
                    {node.value}
                  </p>
                </div>
              </div>
              {i < chain.length - 1 && (
                <ArrowDown className="size-5 text-muted-foreground" />
              )}
            </div>
          ))}
          <ArrowDown className="mx-auto size-5 text-muted-foreground" />
          <div className="flex items-start gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <CheckCircle2 className="size-5" />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                The result
              </p>
              <p className="mt-1 text-pretty font-medium leading-relaxed text-foreground">
                {policy.personalImpact}
              </p>
            </div>
          </div>
        </div>

        {/* Match summary */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Why these match
          </h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            <Match label="Current visa" value={userProfile.currentVisa} />
            <Match label="Goal" value={userProfile.goal} />
            <Match label="Timeline" value={userProfile.timeline} />
          </dl>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Because your profile and timeline align with the conditions of this
            policy, the change is relevant to you. If your plans change, update
            your profile and we will re-check the impact.
          </p>
          <Button variant="outline" className="mt-4">
            <Link href="/profile">Update my profile</Link>
          </Button>
        </section>
      </Content>
    </AppShell>
  );
}

function Match({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/60 p-4">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium text-foreground">{value}</dd>
    </div>
  );
}
