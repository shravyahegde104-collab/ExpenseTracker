import { Link } from "react-router-dom";
import { InboxIcon, PlusIcon } from "./icons";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-line-strong bg-paper-raised/60 px-4 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <InboxIcon width={24} height={24} strokeWidth={1.5} />
      </div>
      <h3 className="mb-1.5 font-display text-lg font-semibold text-ink">
        {title}
      </h3>
      {description && (
        <p className="mb-5 max-w-sm text-sm text-ink-soft">{description}</p>
      )}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper-raised shadow-card transition-all hover:bg-brand-700 hover:shadow-raised active:scale-[0.98]"
        >
          <PlusIcon width={16} height={16} strokeWidth={2.25} />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
