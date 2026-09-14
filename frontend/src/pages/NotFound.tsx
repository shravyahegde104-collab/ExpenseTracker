import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <p className="mb-2 font-mono text-sm text-ink-faint">404</p>
      <h1 className="mb-2 text-xl font-semibold text-ink">Page not found</h1>
      <p className="mb-5 max-w-sm text-sm text-ink-soft">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper-raised shadow-card transition-all hover:bg-brand-700 hover:shadow-raised"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
