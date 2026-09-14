import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: ReactNode;
  hint?: string;
  icon: ReactNode;
  accent?: "brand" | "amber";
}

const accentStyles: Record<NonNullable<StatCardProps["accent"]>, { badge: string; icon: string }> = {
  brand: { badge: "bg-brand-50", icon: "text-brand-600" },
  amber: { badge: "bg-amber-100", icon: "text-amber-700" },
};

export default function StatCard({
  label,
  value,
  hint,
  icon,
  accent = "brand",
}: StatCardProps) {
  const styles = accentStyles[accent];

  return (
    <div className="group rounded-xl border border-line bg-paper-raised p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-raised sm:p-6">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
          {label}
        </p>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${styles.badge} ${styles.icon}`}
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 font-mono text-[1.75rem] font-medium leading-none text-ink sm:text-3xl">
        {value}
      </p>
      {hint && <p className="mt-2.5 text-sm text-ink-soft">{hint}</p>}
    </div>
  );
}
