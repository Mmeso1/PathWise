"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { Content } from "@/components/app/content";
import { JourneyRoadmap } from "@/components/app/journey-roadmap";
import { PolicyImpactCard } from "@/components/app/policy-impact-card";
import { ActionList } from "@/components/app/action-list";
import { PolicyList } from "@/components/app/policy-list";
import { AskAssistant } from "@/components/app/ask-assistant";
import { Button } from "@/components/ui/button";
import { policies, userProfile } from "@/lib/mock-data";

const affectingPolicies = policies.filter(
  (p) => p.impact === "high" || p.impact === "medium",
);

function SectionHeading({
  title,
  sub,
  href,
  linkLabel,
}: {
  title: string;
  sub?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {sub && <p className="mt-0.5 text-sm text-muted-foreground">{sub}</p>}
      </div>
      {href && (
        <Button
          variant="ghost"
          size="sm"
          className="shrink-0 gap-1 text-primary"
        >
          <Link href={href}>
            {linkLabel}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [username, setUsername] = useState("Guest");
  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  return (
    <AppShell>
      <PageHeader
        title={`Welcome back, ${username}!`}
        description="Here's what has changed that affects your journey."
      />
      <Content className="flex flex-col gap-10">
        {/* Status summary */}
        <section className="grid gap-3 sm:grid-cols-3">
          <StatCard label="Current visa" value={userProfile.currentVisa} />
          <StatCard label="Goal" value={userProfile.goal} />
          <StatCard
            label="Journey status"
            value="On track"
            tone="success"
            icon={<TrendingUp className="size-4" />}
          />
        </section>

        {/* Changes affecting you */}
        <section>
          <SectionHeading
            title="Changes affecting you"
            sub="Personalised to your profile and timeline."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {affectingPolicies.map((policy) => (
              <PolicyImpactCard key={policy.id} policy={policy} />
            ))}
          </div>
        </section>

        {/* Journey */}
        <section>
          <SectionHeading
            title="Your journey"
            sub="From Student Visa to Citizenship."
            href="/journey"
            linkLabel="View full journey"
          />
          <JourneyRoadmap />
        </section>

        {/* Recent updates + actions */}
        <div className="grid gap-10 lg:grid-cols-5">
          <section className="lg:col-span-3">
            <SectionHeading
              title="Recent policy updates"
              href="/policies"
              linkLabel="Explore all"
            />
            <PolicyList />
          </section>
          <section className="lg:col-span-2">
            <SectionHeading
              title="Recommended actions"
              href="/actions"
              linkLabel="Action centre"
            />
            <ActionList limit={3} />
          </section>
        </div>

        {/* Assistant */}
        <section>
          <AskAssistant />
        </section>
      </Content>
    </AppShell>
  );
}

function StatCard({
  label,
  value,
  tone = "default",
  icon,
}: {
  label: string;
  value: string;
  tone?: "default" | "success";
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 flex items-center gap-2">
        {tone === "success" && (
          <span className="grid size-7 place-items-center rounded-lg bg-success-muted text-success">
            {icon}
          </span>
        )}
        <span className="text-lg font-semibold text-foreground">{value}</span>
      </div>
    </div>
  );
}
