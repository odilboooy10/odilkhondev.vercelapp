import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/lib/content";
import { Shell, Tag } from "@/components/section";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.kind}`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: p.name, description: p.summary, url: `/work/${p.slug}` },
  };
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-rule py-14">
      <p className="mb-6 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-faint">
        {label}
      </p>
      {children}
    </section>
  );
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main id="main">
      <Shell>
        <div className="py-12">
          <Link
            href="/"
            className="font-mono text-xs text-ink-muted transition-colors hover:text-accent"
          >
            ← Index
          </Link>
        </div>

        {/* ── Masthead ───────────────────────────────────────── */}
        <header className="pb-14">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-faint">
            {p.kind} · {p.year}
          </p>
          <h1 className="font-display mt-4 text-display font-medium text-balance">
            {p.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lede text-ink-muted">{p.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium underline decoration-accent decoration-2 underline-offset-[6px] transition-colors hover:text-accent"
            >
              {p.domain} ↗
            </a>
            <span className="text-sm text-ink-faint">{p.role}</span>
          </div>
          <div className="mt-7 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </header>

        <Block label="Problem">
          <p className="max-w-2xl text-[1.0625rem] leading-[1.7] text-ink-muted">
            {p.problem}
          </p>
        </Block>

        <Block label="Constraints">
          <ul className="max-w-2xl space-y-3">
            {p.constraints.map((c) => (
              <li
                key={c}
                className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-muted"
              >
                <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Decisions">
          <ol className="space-y-9">
            {p.decisions.map((d, i) => (
              <li key={d.title} className="grid gap-2 sm:grid-cols-[2.5rem_1fr] sm:gap-6">
                <span className="font-mono text-xs text-ink-faint sm:pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-medium">{d.title}</h3>
                  <p className="mt-2 max-w-2xl text-[0.9375rem] leading-[1.7] text-ink-muted">
                    {d.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Block>

        <Block label="Evidence">
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.evidence.map((e) => (
              <div key={e.label} className="border-t border-rule pt-3">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint">
                  {e.label}
                </dt>
                <dd className="font-display mt-1.5 text-xl font-medium">{e.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs text-ink-faint">
            Measured from the live site, 6 October 2026.
          </p>
        </Block>

        {/* The section nobody else writes. */}
        <Block label="What I'd do differently">
          <ul className="max-w-2xl space-y-5">
            {p.retro.map((r) => (
              <li
                key={r}
                className="border-l-2 border-accent/35 pl-5 text-[0.9375rem] leading-[1.7] text-ink-muted"
              >
                {r}
              </li>
            ))}
          </ul>
        </Block>

        <nav className="border-t border-rule py-12">
          <Link href={`/work/${next.slug}`} className="group block">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-faint">
              Next
            </p>
            <p className="font-display mt-2 text-title font-medium transition-colors group-hover:text-accent">
              {next.name} →
            </p>
          </Link>
        </nav>
      </Shell>
    </main>
  );
}
