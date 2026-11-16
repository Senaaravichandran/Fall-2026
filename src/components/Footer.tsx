import Link from "next/link";
import { REPO_URL, TEAM } from "@/content/site";
import { Mark } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy text-on-navy">
      <div className="wrap flex flex-wrap items-end justify-between gap-8 pb-10 pt-16">
        <div>
          <div className="flex items-center gap-4">
            <Mark size={44} className="ring-1 ring-white/25" />
            <span className="ui text-[clamp(36px,5vw,64px)] font-bold leading-none tracking-[-0.04em] text-white">NIYAM</span>
          </div>
          <p className="ui mt-4 text-[20px] text-on-navy">Every clause becomes a rule.</p>
        </div>
        <nav aria-label="Footer" className="ui flex flex-wrap gap-5 text-[15px]">
          <Link href="/console" className="text-on-navy no-underline hover:text-white">
            Run the pipeline
          </Link>
          <Link href="/prd" className="text-on-navy no-underline hover:text-white">
            Product requirements (PRD)
          </Link>
          <a href={REPO_URL} className="text-on-navy no-underline hover:text-white">
            Source on GitHub
          </a>
        </nav>
      </div>
      <div className="wrap ui border-t border-white/10 py-5 text-[13px] text-on-navy-muted">
        {TEAM.name} · Built for {TEAM.competition}. Every circular, rule, approver, loan and alert shown here is synthetic and labelled so; RBI statistics are public and cited at their source.
      </div>
    </footer>
  );
}
