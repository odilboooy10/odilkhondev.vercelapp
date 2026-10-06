import Link from "next/link";
import { projects, site, stack } from "@/lib/content";
import { Section, Shell, Tag } from "@/components/section";

export default function Home() {
  return (
    <main id="main">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="py-24 sm:py-36">
        <Shell>
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2.5 w-2.5 bg-accent" aria-hidden />
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-muted">
              {site.role} · {site.location}
            </p>
          </div>
          <h1 className="font-display max-w-4xl text-display font-medium text-balance">
            {site.name}
          </h1>
          <p className="mt-7 max-w-2xl text-lede text-ink-muted">{site.tagline}</p>
          <p className="mt-4 max-w-2xl text-lede text-ink-muted">
            Three platforms in production, shipping in {site.languages.length} languages
            across two markets.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-accent decoration-2 underline-offset-[6px] transition-colors hover:text-accent"
            >
              Selected work
              <span className="transition-transform group-hover:translate-y-0.5" aria-hidden>
                ↓
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-ink-muted underline decoration-rule decoration-1 underline-offset-[6px] transition-colors hover:text-ink"
            >
              {site.email}
            </a>
          </div>
        </Shell>
      </header>

      {/* ── Selected work ────────────────────────────────────── */}
      <Section
        id="work"
        label="Selected work"
        title="Three production platforms, and the decisions behind them."
      >
        <ul className="divide-y divide-rule border-y border-rule">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group grid gap-5 py-9 transition-colors sm:grid-cols-[3.5rem_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <span className="font-mono text-xs text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-medium transition-colors group-hover:text-accent">
                    {p.name}
                  </h3>
                  <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">
                    {p.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
                <span className="font-mono text-xs whitespace-nowrap text-ink-faint">
                  {p.kind}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── About ────────────────────────────────────────────── */}
      <Section id="about" label="About" title="What I actually do.">
        <div className="grid gap-12 sm:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-[1.0625rem] leading-[1.7] text-ink-muted">
            <p>
              I work on the part of a product where the domain is genuinely
              complicated — multi-vendor catalogs, medical-device compliance copy,
              Korean electricity tariff structures — and the job is to make it
              legible without flattening it.
            </p>
            <p>
              {/* TODO: rewrite in your own voice. This is the paragraph people read twice. */}
              That means I spend as much time on content modelling, structured data,
              and performance budgets as on interface work. A site that loads
              instantly and parses cleanly for a crawler is doing commercial work,
              not just looking good.
            </p>
            <p>
              Based in {site.location}, working in {site.languages.join(", ")}.
            </p>
          </div>
          <dl className="space-y-5 text-sm">
            {[
              ["Markets", "Korea, CIS, global B2B"],
              ["Shipping since", "TODO"],
              ["Open to", "TODO: roles, contracts, or both"],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-rule pt-3">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint">
                  {k}
                </dt>
                <dd className="mt-1.5 text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ── Stack ────────────────────────────────────────────── */}
      <Section label="Stack" title="Tools, grouped by what they're for.">
        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(stack).map(([group, items]) => (
            <div key={group} className="border-t border-rule pt-4">
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint">
                {group}
              </h3>
              <ul className="mt-3 space-y-1.5 text-[0.9375rem] text-ink-muted">
                {items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <Section id="contact" label="Contact">
        <h2 className="font-display max-w-2xl text-title font-medium text-balance">
          Available for platform work.
        </h2>
        <p className="mt-5 max-w-xl text-lede text-ink-muted">
          Commerce, regulated B2B, or enterprise SaaS — especially where the domain
          needs understanding before the interface does.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="font-display mt-8 inline-block text-2xl font-medium underline decoration-accent decoration-2 underline-offset-[8px] transition-colors hover:text-accent sm:text-3xl"
        >
          {site.email}
        </a>
      </Section>

      <footer className="border-t border-rule py-10">
        <Shell>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-ink-faint">
            <p>
              © {new Date().getFullYear()} {site.name}
            </p>
            <p className="font-mono">Built with Next.js · Deployed on Vercel</p>
          </div>
        </Shell>
      </footer>
    </main>
  );
}
