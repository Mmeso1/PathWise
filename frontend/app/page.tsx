import Link from "next/link";
import {
  UserPlus,
  Map,
  RadarIcon,
  BellRing,
  Check,
  X,
  Route,
  ShieldCheck,
  Target,
  ListChecks,
  FileCheck2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/landing/site-nav";
import { SiteFooter } from "@/components/landing/site-footer";
import { JourneyIllustration } from "@/components/landing/journey-illustration";

const steps = [
  {
    icon: UserPlus,
    title: "Create your profile",
    body: "Tell us your nationality, current visa and long-term goal.",
  },
  {
    icon: Map,
    title: "We map your journey",
    body: "Pathwise builds a personalised immigration roadmap for you.",
  },
  {
    icon: RadarIcon,
    title: "We monitor policy",
    body: "We track official GOV.UK updates across every visa route.",
  },
  {
    icon: BellRing,
    title: "We tell you what changed",
    body: "You get plain-English alerts on how it affects you.",
  },
];

const withoutItems = [
  "Dense government PDFs",
  "Conflicting news articles",
  "Reddit and forum guesswork",
  "Expensive ad-hoc advice",
  "Hoping nothing changed",
];
const withItems = [
  "A personal dashboard",
  "Only relevant updates",
  "Your personal impact",
  "Recommended next actions",
  "Linked official sources",
];

const features = [
  {
    icon: Route,
    title: "Personal journey mapping",
    body: "Visualise every stage from your current visa to your goal.",
  },
  {
    icon: RadarIcon,
    title: "Policy monitoring",
    body: "Continuous tracking of official immigration rule changes.",
  },
  {
    icon: Target,
    title: "Impact analysis",
    body: "We explain exactly why a change is relevant to you.",
  },
  {
    icon: ListChecks,
    title: "Action centre",
    body: "Turn each change into clear, prioritised next steps.",
  },
  {
    icon: FileCheck2,
    title: "Official sources",
    body: "Every policy links straight back to GOV.UK guidance.",
  },
  {
    icon: Sparkles,
    title: "AI assistant",
    body: "Ask questions about any policy in plain language.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-105 bg-linear-to-b from-accent/60 to-transparent" />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="size-3.5 text-primary" />
                Backed by official GOV.UK guidance
              </span>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                Government policies change. We make that impact clear for you.
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Understand how UK immigration policy updates affect your
                personal immigration journey, with personalised impact analysis
                you can actually act on.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-12 px-6 text-base">
                  <Link href="/onboarding" className="flex items-center gap-2">
                    Start my journey
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-6 text-base"
                >
                  {/* Remember to put Youtube Link here */}
                  <Link href="/dashboard">View demo</Link>
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Free to start. No immigration jargon, ever.
              </p>
            </div>
            <div className="lg:pl-6">
              <JourneyIllustration />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-t border-border bg-card/40 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground">
                How it works
              </h2>
              <p className="mt-3 text-muted-foreground">
                We reveal what government updates don't.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <step.icon className="size-5" />
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground/60">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-medium text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <section id="why" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground">
                Why this matters
              </h2>
              <p className="mt-3 text-muted-foreground">
                Information isn't enough. Understanding is.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-7">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Without Pathwise
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {withoutItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                        <X className="size-3.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-7 ring-1 ring-primary/10">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                  With Pathwise
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {withItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm font-medium text-foreground"
                    >
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-success text-success-foreground">
                        <Check className="size-3.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-t border-border bg-card/40 py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground">
                Everything you need to stay ahead
              </h2>
              <p className="mt-3 text-muted-foreground">
                Built around one question: does this affect me?
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <feature.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-medium text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12">
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-primary-foreground">
                See how the latest changes affect your journey
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/80">
                Create your profile and get a personalised immigration roadmap
                in minutes.
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 px-6 text-base"
                >
                  <Link href="/onboarding" className="flex items-center gap-2">
                    Start my journey
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
