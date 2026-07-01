export type ImpactLevel = "high" | "medium" | "low" | "none";

export type StageStatus =
  | "completed"
  | "current"
  | "affected"
  | "upcoming"
  | "goal";

export type ActionPriority = "high" | "medium" | "low";

export type UserProfile = {
  name: string;
  nationality: string;
  currentVisa: string;
  goal: string;
  occupation: string;
  salary: string;
  employer: string;
  visaExpiry: string;
  timeline: string;
  location: "Inside UK" | "Outside UK";
};

export const userProfile: UserProfile = {
  name: "Sarah",
  nationality: "Nigerian",
  currentVisa: "Graduate Visa",
  goal: "Skilled Worker",
  occupation: "Software Engineer",
  salary: "£36,500",
  employer: "Northwind Technologies Ltd",
  visaExpiry: "14 Aug 2026",
  timeline: "Within 12 months",
  location: "Inside UK",
};

export type JourneyStage = {
  id: string;
  title: string;
  status: StageStatus;
  caption: string;
  eligibility: string;
  documents: string[];
  requirements: string[];
  recentChanges: string[];
  futureChanges: string[];
  govLinks: { label: string; href: string }[];
};

export const journeyStages: JourneyStage[] = [
  {
    id: "student",
    title: "Student Visa",
    status: "completed",
    caption: "Completed",
    eligibility:
      "Held while studying a full-time degree at a licensed sponsor.",
    documents: ["CAS letter", "Proof of funds", "Academic transcripts"],
    requirements: [
      "Confirmed place on a course",
      "Maintenance funds",
      "English language proficiency",
    ],
    recentChanges: [
      "Dependants restricted for most taught courses (Jan 2024).",
    ],
    futureChanges: ["No further changes expected for completed stages."],
    govLinks: [
      {
        label: "Student visa — GOV.UK",
        href: "https://www.gov.uk/student-visa",
      },
    ],
  },
  {
    id: "graduate",
    title: "Graduate Visa",
    status: "current",
    caption: "Current",
    eligibility:
      "Stay in the UK for 2 years after completing an eligible degree.",
    documents: ["Degree completion confirmation", "Valid BRP", "Passport"],
    requirements: [
      "Completed an eligible UK course",
      "Currently in the UK on a Student visa",
    ],
    recentChanges: ["Graduate route retained but under formal review (2024)."],
    futureChanges: [
      "Possible reduction of the post-study period from 2 years.",
    ],
    govLinks: [
      {
        label: "Graduate visa — GOV.UK",
        href: "https://www.gov.uk/graduate-visa",
      },
    ],
  },
  {
    id: "skilled-worker",
    title: "Skilled Worker",
    status: "affected",
    caption: "Affected",
    eligibility: "Work for an approved UK employer in an eligible occupation.",
    documents: [
      "Certificate of Sponsorship",
      "Proof of salary",
      "Job offer letter",
    ],
    requirements: [
      "Job from a licensed sponsor",
      "Salary at or above the going rate",
      "English language requirement",
    ],
    recentChanges: [
      "General salary threshold raised to £38,700 (Apr 2024).",
      "Immigration Salary List replaced the Shortage Occupation List.",
    ],
    futureChanges: [
      "Further threshold uplifts linked to median earnings under review.",
    ],
    govLinks: [
      {
        label: "Skilled Worker visa — GOV.UK",
        href: "https://www.gov.uk/skilled-worker-visa",
      },
    ],
  },
  {
    id: "ilr",
    title: "Settlement (ILR)",
    status: "upcoming",
    caption: "Future",
    eligibility:
      "Apply for Indefinite Leave to Remain after a qualifying period.",
    documents: [
      "Continuous residence evidence",
      "Life in the UK test",
      "English language proof",
    ],
    requirements: [
      "Usually 5 years of continuous lawful residence",
      "No excess absences",
    ],
    recentChanges: [
      "Government consulting on extending qualifying period to 10 years.",
    ],
    futureChanges: [
      "Qualifying period and earning thresholds may change before you apply.",
    ],
    govLinks: [
      {
        label: "Settle in the UK (ILR) — GOV.UK",
        href: "https://www.gov.uk/settle-in-the-uk",
      },
    ],
  },
  {
    id: "citizenship",
    title: "Citizenship",
    status: "goal",
    caption: "Goal",
    eligibility:
      "Naturalise as a British citizen after holding settled status.",
    documents: ["ILR confirmation", "Life in the UK test", "Referees"],
    requirements: ["Usually 12 months after ILR", "Good character requirement"],
    recentChanges: ["No recent changes affecting your plan."],
    futureChanges: ["Dependent on settlement rules at the time you qualify."],
    govLinks: [
      {
        label: "Become a British citizen — GOV.UK",
        href: "https://www.gov.uk/becoming-a-british-citizen",
      },
    ],
  },
];

export type Policy = {
  id: string;
  title: string;
  route: string;
  date: string;
  impact: ImpactLevel;
  summary: string;
  whyYou: string;
  affects: string[];
  before: string;
  after: string;
  whyChanged: string;
  personalImpact: string;
  source: { label: string; href: string };
  related: string[];
};

export const policies: Policy[] = [
  {
    id: "salary-threshold",
    title: "Skilled Worker salary threshold increased",
    route: "Skilled Worker",
    date: "22 Jul 2025",
    impact: "high",
    summary:
      "The general salary threshold for most new Skilled Worker applicants increased to £41,700 per year.",
    whyYou:
      "You plan to switch from a Graduate Visa to a Skilled Worker Visa within the next 12 months.",
    affects: [
      "Most new Skilled Worker applicants",
      "Applicants switching from another visa route",
    ],
    before: "£38,700 general salary threshold",
    after: "£41,700 general salary threshold",
    whyChanged:
      "The government updated salary requirements as part of wider changes to the Skilled Worker route.",
    personalImpact:
      "If your expected salary is below £41,700, your planned Skilled Worker application may no longer meet the standard salary requirement. You should also check the occupation-specific going rate.",
    source: {
      label: "Skilled Worker visa — GOV.UK",
      href: "https://www.gov.uk/skilled-worker-visa",
    },
    related: ["going-rate", "isl-list"],
  },
  {
    id: "graduate-route",
    title: "Graduate Route remains available following review",
    route: "Graduate",
    date: "14 May 2024",
    impact: "low",
    summary:
      "Following the Migration Advisory Committee review, the government confirmed that the Graduate Route will remain in place.",
    whyYou:
      "You currently hold a Graduate Visa before planning to move to a Skilled Worker Visa.",
    affects: ["Current Graduate Visa holders", "International students"],
    before: "Graduate Route under review",
    after: "Graduate Route retained",
    whyChanged:
      "The Migration Advisory Committee concluded that the route was broadly meeting its objectives.",
    personalImpact:
      "There is currently no immediate change to your Graduate Visa. You can continue planning your transition to a Skilled Worker Visa under the existing Graduate Route.",
    source: {
      label: "Migration Advisory Committee — GOV.UK",
      href: "https://www.gov.uk/government/organisations/migration-advisory-committee",
    },
    related: ["salary-threshold"],
  },
  {
    id: "isl-list",
    title: "Immigration Salary List introduced",
    route: "Skilled Worker",
    date: "4 Apr 2024",
    impact: "medium",
    summary:
      "The Immigration Salary List replaced the Shortage Occupation List and applies to a smaller number of eligible occupations.",
    whyYou:
      "Your occupation may have different salary requirements depending on whether it appears on the Immigration Salary List.",
    affects: ["Applicants in eligible occupations"],
    before: "Shortage Occupation List",
    after: "Immigration Salary List",
    whyChanged:
      "The government replaced the previous shortage occupation framework alongside wider Skilled Worker reforms.",
    personalImpact:
      "You should check whether your occupation appears on the Immigration Salary List before relying on any salary concessions.",
    source: {
      label: "Immigration Salary List — GOV.UK",
      href: "https://www.gov.uk/government/publications/immigration-salary-list",
    },
    related: ["salary-threshold", "going-rate"],
  },
  {
    id: "settlement-white-paper",
    title: "Government proposes longer route to settlement",
    route: "Settlement",
    date: "12 May 2025",
    impact: "medium",
    summary:
      "The Immigration White Paper proposes extending the standard qualifying period for settlement from five years to ten years.",
    whyYou: "Settlement is your long-term immigration goal.",
    affects: ["Future settlement applicants"],
    before: "Standard qualifying period of 5 years",
    after: "Proposal to increase to 10 years",
    whyChanged:
      "The proposal forms part of the government's wider immigration reform plans and has not yet become law.",
    personalImpact:
      "This proposal does not currently change your eligibility. We'll notify you if legislation is introduced or the rules change.",
    source: {
      label: "Restoring Control over the Immigration System — GOV.UK",
      href: "https://www.gov.uk/government/publications/restoring-control-over-the-immigration-system",
    },
    related: [],
  },
  {
    id: "going-rate",
    title: "Occupation-specific salary requirements updated",
    route: "Skilled Worker",
    date: "22 Jul 2025",
    impact: "medium",
    summary:
      "Applicants must meet both the general salary threshold and the occupation-specific going rate for their job.",
    whyYou:
      "Your occupation has its own minimum salary requirement in addition to the general threshold.",
    affects: ["Most Skilled Worker applicants"],
    before: "Previous occupation-specific salary tables",
    after: "Updated salary tables using current occupation codes",
    whyChanged:
      "Salary tables were updated to reflect the latest immigration rules and occupation classifications.",
    personalImpact:
      "Even if your salary meets the general threshold, you'll also need to satisfy the going rate for your occupation before applying.",
    source: {
      label: "Skilled Worker visa — GOV.UK",
      href: "https://www.gov.uk/skilled-worker-visa",
    },
    related: ["salary-threshold"],
  },
];

export type ActionItem = {
  id: string;
  title: string;
  description: string;
  priority: ActionPriority;
  deadline: string;
  policyId?: string;
  completed: boolean;
};

export const actionItems: ActionItem[] = [
  {
    id: "review-salary",
    title: "Review salary against new threshold",
    description:
      "Compare your current £36,500 salary with the £38,700 Skilled Worker threshold and discuss a review with your employer.",
    priority: "high",
    deadline: "Before visa application",
    policyId: "salary-threshold",
    completed: false,
  },
  {
    id: "upload-salary",
    title: "Upload latest salary evidence",
    description:
      "Add a recent payslip and contract so we can confirm whether you meet the going rate for your occupation.",
    priority: "medium",
    deadline: "Within 30 days",
    policyId: "going-rate",
    completed: false,
  },
  {
    id: "employer-letter",
    title: "Request updated employment letter",
    description:
      "Ask Northwind Technologies for a letter confirming your role, salary and intention to sponsor.",
    priority: "medium",
    deadline: "Within 45 days",
    completed: false,
  },
  {
    id: "read-guidance",
    title: "Read updated Skilled Worker guidance",
    description:
      "Review the official GOV.UK guidance on the new salary rules so you understand your options.",
    priority: "low",
    deadline: "No deadline",
    policyId: "salary-threshold",
    completed: false,
  },
  {
    id: "confirm-graduate",
    title: "Confirm Graduate visa end date",
    description:
      "Note your Graduate visa expiry to plan the latest possible switch date.",
    priority: "low",
    deadline: "Completed",
    completed: true,
  },
];

export type Notification = {
  id: string;
  group: "Today" | "This Week" | "Earlier";
  title: string;
  impact: ImpactLevel;
  actionRequired: boolean;
  policyId: string;
  time: string;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    group: "Today",
    title: "Skilled Worker salary threshold increased",
    impact: "high",
    actionRequired: true,
    policyId: "salary-threshold",
    time: "2 hours ago",
  },
  {
    id: "n2",
    group: "This Week",
    title: "Graduate route placed under formal review",
    impact: "medium",
    actionRequired: false,
    policyId: "graduate-review",
    time: "3 days ago",
  },
  {
    id: "n3",
    group: "This Week",
    title: "Consultation on settlement qualifying period",
    impact: "medium",
    actionRequired: false,
    policyId: "ilr-consultation",
    time: "5 days ago",
  },
  {
    id: "n4",
    group: "Earlier",
    title: "Immigration Salary List replaces Shortage Occupation List",
    impact: "low",
    actionRequired: false,
    policyId: "isl-list",
    time: "3 weeks ago",
  },
];

export const impactMeta: Record<
  ImpactLevel,
  { label: string; badgeClass: string; dot: string }
> = {
  high: {
    label: "High impact",
    badgeClass: "bg-danger-muted text-danger border-danger/20",
    dot: "bg-danger",
  },
  medium: {
    label: "Medium impact",
    badgeClass: "bg-warning-muted text-warning-foreground border-warning/30",
    dot: "bg-warning",
  },
  low: {
    label: "Low impact",
    badgeClass: "bg-success-muted text-success border-success/20",
    dot: "bg-success",
  },
  none: {
    label: "No impact",
    badgeClass: "bg-info-muted text-info border-border",
    dot: "bg-muted-foreground",
  },
};

export const priorityMeta: Record<
  ActionPriority,
  { label: string; badgeClass: string }
> = {
  high: {
    label: "High",
    badgeClass: "bg-danger-muted text-danger border-danger/20",
  },
  medium: {
    label: "Medium",
    badgeClass: "bg-warning-muted text-warning-foreground border-warning/30",
  },
  low: { label: "Low", badgeClass: "bg-info-muted text-info border-border" },
};

export function getPolicy(id: string) {
  return policies.find((p) => p.id === id);
}
