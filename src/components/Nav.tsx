import Link from "next/link";
import { Wordmark } from "./Logo";

export function Nav() {
  return (
    <header className="sticky top-0 z-30 bg-bg">
      <nav className="wrap flex h-16 items-center justify-between gap-6" aria-label="Main">
        <Link href="/console" className="no-underline" aria-label="NIYAM console">
          <Wordmark />
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/prd" className="ui text-[15px] text-ink no-underline hover:text-accent">
            PRD
          </Link>
          <Link href="/console" className="btn whitespace-nowrap">
            Run the pipeline
          </Link>
        </div>
      </nav>
    </header>
  );
}
