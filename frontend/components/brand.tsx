import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import plane_iconn from "@/public/icon.svg";

export function Brand({
  className,
  href = "/",
  showText = true,
}: {
  className?: string;
  href?: string;
  showText?: boolean;
}) {
  return (
    <Link href={href} className={cn("flex items-center gap-2.5", className)}>
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Image src={plane_iconn} alt="Plane Icon" className="size-5" />
      </span>
      {showText && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Pathwise
        </span>
      )}
    </Link>
  );
}
