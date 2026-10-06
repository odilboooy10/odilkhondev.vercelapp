import type { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[68rem] px-6 sm:px-10">{children}</div>;
}

export function Section({
  id,
  label,
  title,
  children,
}: {
  id?: string;
  label?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-rule py-20 sm:py-28">
      <Shell>
        {label && (
          <p className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-faint">
            {label}
          </p>
        )}
        {title && (
          <h2 className="font-display mb-12 max-w-3xl text-title font-medium text-balance">
            {title}
          </h2>
        )}
        {children}
      </Shell>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-rule px-2.5 py-1 text-xs text-ink-muted">
      {children}
    </span>
  );
}
