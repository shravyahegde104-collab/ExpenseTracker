import { NavLink, Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import { PlusIcon, ReceiptIcon, WalletIcon } from "./icons";

function NavItem({
  to,
  label,
  icon,
  end,
}: {
  to: string;
  label: string;
  icon: ReactNode;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className="group relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-sunken hover:text-ink"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span
              className="absolute inset-0 rounded-lg bg-brand-50"
              aria-hidden="true"
            />
          )}
          <span
            className={`relative z-10 ${
              isActive ? "text-brand-600" : "text-ink-faint group-hover:text-ink-soft"
            }`}
          >
            {icon}
          </span>
          <span className="relative z-10">{label}</span>
          {isActive && (
            <span
              className="absolute -bottom-[9px] left-3.5 right-3.5 h-0.5 rounded-full bg-brand-500"
              aria-hidden="true"
            />
          )}
        </>
      )}
    </NavLink>
  );
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-paper-raised/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
          <NavLink
            to="/"
            className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-ink"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-paper-raised shadow-card">
              <WalletIcon width={17} height={17} strokeWidth={2} />
            </span>
            Ledger
          </NavLink>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <nav className="flex items-center gap-1" aria-label="Primary">
              <NavItem to="/" label="Dashboard" icon={<WalletIcon width={16} height={16} />} end />
              <NavItem to="/expenses" label="Expenses" icon={<ReceiptIcon width={16} height={16} />} />
            </nav>
            <div className="hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
            <NavLink
              to="/expenses/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3.5 py-2 text-sm font-medium text-paper-raised shadow-card transition-all hover:bg-brand-700 hover:shadow-raised active:scale-[0.98]"
            >
              <PlusIcon width={16} height={16} strokeWidth={2.25} />
              <span className="hidden sm:inline">Add Expense</span>
              <span className="sm:hidden">Add</span>
            </NavLink>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-ink-faint sm:px-6">
          Expense Tracker · React + Spring Boot
        </p>
      </footer>
    </div>
  );
}
