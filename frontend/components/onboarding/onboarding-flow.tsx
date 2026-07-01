"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Globe,
  MapPin,
  Loader2,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const TOTAL = 6;

const nationalities = [
  "Indian",
  "Nigerian",
  "Pakistani",
  "Chinese",
  "Brazilian",
  "South African",
  "Filipino",
  "Other",
];
const statuses = [
  "Student Visa",
  "Graduate Visa",
  "Skilled Worker",
  "Global Talent",
  "Family Visa",
  "Visitor",
  "Other",
];
const goals = [
  { value: "Remain in UK", label: "Remain in the UK" },
  { value: "Settlement", label: "Settlement (ILR)" },
  { value: "Citizenship", label: "British citizenship" },
  { value: "Switch Visa", label: "Switch visa route" },
  { value: "Study", label: "Continue studying" },
  { value: "Work", label: "Work in the UK" },
  { value: "Family", label: "Join or stay with family" },
];

type Data = {
  location: string;
  nationality: string;
  status: string;
  goal: string;
  occupation: string;
  salary: string;
  employer: string;
  expiry: string;
  timeline: string;
};

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [data, setData] = useState<Data>({
    location: "",
    nationality: "",
    status: "",
    goal: "",
    occupation: "",
    salary: "",
    employer: "",
    expiry: "",
    timeline: "",
  });

  function update(key: keyof Data, value: string) {
    setData((d) => ({ ...d, [key]: value }));
  }

  const canContinue =
    (step === 1 && data.location) ||
    (step === 2 && data.nationality) ||
    (step === 3 && data.status) ||
    (step === 4 && data.goal) ||
    step === 5 ||
    step === 6;

  function next() {
    if (step < TOTAL) {
      setStep((s) => s + 1);
    } else {
      setGenerating(true);
      setTimeout(() => router.push("/dashboard"), 2400);
    }
  }

  function back() {
    if (step > 1) setStep((s) => s - 1);
    else router.push("/");
  }

  if (generating) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <span className="relative grid size-16 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Loader2 className="size-7 animate-spin" />
        </span>
        <h2 className="mt-8 text-xl font-semibold text-foreground">
          Building your personalised immigration roadmap…
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          We are mapping your journey and checking the latest policy changes
          against your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Brand />
          <span className="text-sm text-muted-foreground">
            Step {step} of {TOTAL}
          </span>
        </div>
      </header>

      <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
        <Progress value={(step / TOTAL) * 100} className="h-1.5" />

        <div className="mt-10">
          {step === 1 && (
            <Question
              title="Where are you currently?"
              subtitle="This helps us tailor the rules that apply to you."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <ChoiceCard
                  selected={data.location === "Inside UK"}
                  onClick={() => update("location", "Inside UK")}
                  icon={<MapPin className="size-5" />}
                  title="Inside the UK"
                  body="I am living in the UK right now."
                />
                <ChoiceCard
                  selected={data.location === "Outside UK"}
                  onClick={() => update("location", "Outside UK")}
                  icon={<Globe className="size-5" />}
                  title="Outside the UK"
                  body="I am applying from abroad."
                />
              </div>
            </Question>
          )}

          {step === 2 && (
            <Question
              title="What is your nationality?"
              subtitle="Some routes and requirements depend on your nationality."
            >
              <div className="grid gap-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Select
                  value={data.nationality}
                  onValueChange={(v) => update("nationality", v as string)}
                >
                  <SelectTrigger id="nationality" className="h-11">
                    <SelectValue placeholder="Select your nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    {nationalities.map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Question>
          )}

          {step === 3 && (
            <Question
              title="What is your current immigration status?"
              subtitle="We will place you on the right point of your journey."
            >
              <div className="grid gap-2.5">
                {statuses.map((s) => (
                  <SelectRow
                    key={s}
                    label={s}
                    selected={data.status === s}
                    onClick={() => update("status", s)}
                  />
                ))}
              </div>
            </Question>
          )}

          {step === 4 && (
            <Question
              title="What is your long-term goal?"
              subtitle="This sets the destination of your roadmap."
            >
              <div className="grid gap-2.5 sm:grid-cols-2">
                {goals.map((g) => (
                  <SelectRow
                    key={g.value}
                    label={g.label}
                    selected={data.goal === g.value}
                    onClick={() => update("goal", g.value)}
                  />
                ))}
              </div>
            </Question>
          )}

          {step === 5 && (
            <Question
              title="A few more details"
              subtitle="Optional, but they make your impact analysis much sharper."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Occupation">
                  <Input
                    className="h-11"
                    placeholder="e.g. Software Engineer"
                    value={data.occupation}
                    onChange={(e) => update("occupation", e.target.value)}
                  />
                </Field>
                <Field label="Annual salary">
                  <Input
                    className="h-11"
                    placeholder="e.g. £36,500"
                    value={data.salary}
                    onChange={(e) => update("salary", e.target.value)}
                  />
                </Field>
                <Field label="Current employer">
                  <Input
                    className="h-11"
                    placeholder="e.g. Northwind Technologies"
                    value={data.employer}
                    onChange={(e) => update("employer", e.target.value)}
                  />
                </Field>
                <Field label="Visa expiry date">
                  <Input
                    className="h-11"
                    type="date"
                    value={data.expiry}
                    onChange={(e) => update("expiry", e.target.value)}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Expected transition timeline">
                    <Select
                      value={data.timeline}
                      onValueChange={(v) => update("timeline", v as string)}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select a timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Within 6 months">
                          Within 6 months
                        </SelectItem>
                        <SelectItem value="Within 12 months">
                          Within 12 months
                        </SelectItem>
                        <SelectItem value="1–2 years">1–2 years</SelectItem>
                        <SelectItem value="Not sure yet">
                          Not sure yet
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </div>
            </Question>
          )}

          {step === 6 && (
            <Question
              title="Review your details"
              subtitle="Confirm everything looks right, then generate your journey."
            >
              <div className="overflow-hidden rounded-2xl border border-border">
                <ReviewRow label="Location" value={data.location || "—"} />
                <ReviewRow
                  label="Nationality"
                  value={data.nationality || "—"}
                />
                <ReviewRow label="Current status" value={data.status || "—"} />
                <ReviewRow label="Long-term goal" value={data.goal || "—"} />
                <ReviewRow
                  label="Occupation"
                  value={data.occupation || "Not provided"}
                />
                <ReviewRow
                  label="Salary"
                  value={data.salary || "Not provided"}
                />
                <ReviewRow
                  label="Employer"
                  value={data.employer || "Not provided"}
                />
                <ReviewRow
                  label="Timeline"
                  value={data.timeline || "Not provided"}
                  last
                />
              </div>
            </Question>
          )}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <Button variant="ghost" onClick={back} className="gap-2">
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <Button onClick={next} disabled={!canContinue} className="gap-2">
            {step === TOTAL ? "Generate journey" : "Continue"}
            {step !== TOTAL && <ArrowRight className="size-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Question({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-muted-foreground">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function ChoiceCard({
  selected,
  onClick,
  icon,
  title,
  body,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all",
        selected
          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
          : "border-border bg-card hover:border-primary/40",
      )}
    >
      <span
        className={cn(
          "grid size-10 place-items-center rounded-xl",
          selected
            ? "bg-primary text-primary-foreground"
            : "bg-accent text-accent-foreground",
        )}
      >
        {icon}
      </span>
      <span className="font-medium text-foreground">{title}</span>
      <span className="text-sm text-muted-foreground">{body}</span>
    </button>
  );
}

function SelectRow({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all",
        selected
          ? "border-primary bg-primary/5 text-foreground ring-2 ring-primary/20"
          : "border-border bg-card text-foreground hover:border-primary/40",
      )}
    >
      {label}
      <span
        className={cn(
          "grid size-5 place-items-center rounded-full border",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border",
        )}
      >
        {selected && <Check className="size-3.5" />}
      </span>
    </button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function ReviewRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3.5",
        !last && "border-b border-border",
      )}
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
