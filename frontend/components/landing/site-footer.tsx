import { Brand } from "@/components/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Brand />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Pathwise explains how UK immigration policy changes affect your
              personal immigration journey. We are an independent service and
              not affiliated with the UK government.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <span className="font-medium text-foreground">Product</span>
            <a
              href="#how"
              className="text-muted-foreground hover:text-foreground"
            >
              How it works
            </a>
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#why"
              className="text-muted-foreground hover:text-foreground"
            >
              Why it matters
            </a>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
          <p>
            Policy information is summarised from official GOV.UK guidance.
            Pathwise provides information only and does not provide legal or
            immigration advice. Always confirm details with official sources or
            a registered adviser.
          </p>
          <p className="mt-3">
            © {new Date().getFullYear()} Pathwise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
