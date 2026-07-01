import { Check, ArrowDown, Bell, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import london_img from "../../assets/London-bro.svg";
type Node = {
  label: string;
  state: "done" | "current" | "alert" | "future";
  badge?: { text: string; tone: "amber" | "info" };
};
import Image from "next/image";

const nodes: Node[] = [
  { label: "Student Visa", state: "done" },
  {
    label: "Graduate Visa",
    state: "current",
    badge: { text: "You are here", tone: "info" },
  },
  {
    label: "Skilled Worker",
    state: "alert",
    badge: { text: "Policy changed", tone: "amber" },
  },
  { label: "Settlement", state: "future" },
  { label: "Citizenship", state: "future" },
];

export function JourneyIllustration() {
  return (
    // <div className="relative rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
    //   <div className="mb-6 flex items-center justify-between">
    //     <div>
    //       <p className="text-sm font-medium text-foreground">Your journey</p>
    //       <p className="text-xs text-muted-foreground">Mapped to your profile</p>
    //     </div>
    //     <span className="inline-flex items-center gap-1.5 rounded-full bg-success-muted px-2.5 py-1 text-xs font-medium text-success">
    //       <span className="size-1.5 rounded-full bg-success" />
    //       On track
    //     </span>
    //   </div>

    //   <ol className="flex flex-col gap-1">
    //     {nodes.map((node, i) => (
    //       <li key={node.label} className="flex flex-col">
    //         <div className="flex items-center gap-3 rounded-2xl border border-transparent p-2 transition-colors hover:border-border hover:bg-muted/50">
    //           <span
    //             className={cn(
    //               "grid size-9 shrink-0 place-items-center rounded-xl text-sm font-semibold",
    //               node.state === "done" && "bg-success-muted text-success",
    //               node.state === "current" && "bg-primary text-primary-foreground",
    //               node.state === "alert" && "bg-warning-muted text-warning-foreground",
    //               node.state === "future" && "bg-muted text-muted-foreground",
    //             )}
    //           >
    //             {node.state === "done" ? (
    //               <Check className="size-4" />
    //             ) : node.state === "alert" ? (
    //               <TriangleAlert className="size-4" />
    //             ) : (
    //               i + 1
    //             )}
    //           </span>
    //           <div className="flex flex-1 items-center justify-between gap-2">
    //             <span
    //               className={cn(
    //                 "text-sm font-medium",
    //                 node.state === "future" ? "text-muted-foreground" : "text-foreground",
    //               )}
    //             >
    //               {node.label}
    //             </span>
    //             {node.badge && (
    //               <span
    //                 className={cn(
    //                   "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
    //                   node.badge.tone === "amber"
    //                     ? "bg-warning-muted text-warning-foreground"
    //                     : "bg-accent text-accent-foreground",
    //                 )}
    //               >
    //                 {node.badge.tone === "amber" && <Bell className="size-3" />}
    //                 {node.badge.text}
    //               </span>
    //             )}
    //           </div>
    //         </div>
    //         {i < nodes.length - 1 && (
    //           <span className="ml-6 flex h-4 items-center text-border">
    //             <ArrowDown className="size-3.5" />
    //           </span>
    //         )}
    //       </li>
    //     ))}
    //   </ol>

    //   <div className="mt-6 rounded-2xl bg-warning-muted/70 p-4">
    //     <p className="text-xs font-medium text-warning-foreground">
    //       1 change affects your route to Skilled Worker
    //     </p>
    //     <p className="mt-1 text-xs text-warning-foreground/80">
    //       The salary threshold rose to £38,700. See what it means for you.
    //     </p>
    //   </div>
    // </div>
    <Image
      src={london_img}
      alt="London"
      className="w-full rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8"
    />
  );
}
