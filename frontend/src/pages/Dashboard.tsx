import { Link } from "react-router-dom";
import {
  useCategorySummary,
  useExpenses,
  useHighestExpense,
  useTotalExpenses,
} from "../hooks/useExpenses";
import StatCard from "../components/StatCard";
import CategorySummaryChart from "../components/CategorySummaryChart";
import EmptyState from "../components/EmptyState";
import { formatCurrency, formatDate } from "../utils/format";
import { getCategoryBadgeClasses } from "../utils/category";
import { LayersIcon, TrendingUpIcon, WalletIcon } from "../components/icons";

export default function Dashboard() {
  const { data: total, isLoading: totalLoading } = useTotalExpenses();
  const { data: highest, isLoading: highestLoading } = useHighestExpense();
  const { data: expenses, isLoading: expensesLoading } = useExpenses();
  const { data: summary, isLoading: summaryLoading } = useCategorySummary();

  const recentExpenses = [...(expenses ?? [])]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const hasExpenses = (expenses?.length ?? 0) > 0;
  const categoryCount = Object.keys(summary ?? {}).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">Dashboard</h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          A snapshot of where your money's going.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total expenses"
          icon={<WalletIcon width={17} height={17} />}
          value={totalLoading ? "…" : formatCurrency(total ?? 0)}
          hint={hasExpenses ? `Across ${expenses?.length} expenses` : undefined}
        />
        <StatCard
          label="Highest expense"
          accent="amber"
          icon={<TrendingUpIcon width={17} height={17} />}
          value={
            highestLoading ? "…" : highest ? formatCurrency(highest.amount) : "—"
          }
          hint={
            highest
              ? `${highest.category} · ${formatDate(highest.date)}`
              : "No expenses yet"
          }
        />
        <StatCard
          label="Categories tracked"
          icon={<LayersIcon width={17} height={17} />}
          value={summaryLoading ? "…" : categoryCount}
          hint={categoryCount > 0 ? "Distinct spending categories" : undefined}
        />
      </div>

      {!expensesLoading && !hasExpenses ? (
        <EmptyState
          title="No expenses yet"
          description="Add your first expense to see totals, trends, and a category breakdown here."
          actionLabel="Add an expense"
          actionTo="/expenses/new"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="rounded-xl border border-line bg-paper-raised p-5 shadow-card sm:p-6 lg:col-span-3">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="font-display font-semibold text-ink">
                Spending by category
              </h2>
            </div>
            <p className="mb-4 text-xs text-ink-faint">
              Total amount spent per category, highest first.
            </p>
            {summaryLoading ? (
              <div className="h-64 animate-pulse rounded-lg bg-paper-sunken sm:h-72" />
            ) : (
              <CategorySummaryChart summary={summary ?? {}} />
            )}
          </div>

          <div className="rounded-xl border border-line bg-paper-raised p-5 shadow-card sm:p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display font-semibold text-ink">
                Recent expenses
              </h2>
              <Link
                to="/expenses"
                className="text-xs font-semibold text-brand-600 transition-colors hover:text-brand-700"
              >
                View all →
              </Link>
            </div>

            {expensesLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 animate-pulse rounded-lg bg-paper-sunken" />
                ))}
              </div>
            ) : recentExpenses.length === 0 ? (
              <p className="text-sm text-ink-faint">Nothing here yet.</p>
            ) : (
              <ul className="divide-y divide-line">
                {recentExpenses.map((expense) => (
                  <li
                    key={expense.id}
                    className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink">
                        {expense.description}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${getCategoryBadgeClasses(
                            expense.category
                          )}`}
                        >
                          {expense.category}
                        </span>
                        <span className="text-xs text-ink-faint">
                          {formatDate(expense.date)}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-sm font-semibold text-ink">
                      {formatCurrency(expense.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
