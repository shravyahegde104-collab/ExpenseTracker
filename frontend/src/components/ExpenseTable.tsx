import { Link } from "react-router-dom";
import type { Expense } from "../types/expense";
import { formatCurrency, formatDate } from "../utils/format";
import { getCategoryBadgeClasses } from "../utils/category";
import { PencilIcon, TrashIcon } from "./icons";

interface ExpenseTableProps {
  expenses: Expense[];
  onDeleteRequest: (expense: Expense) => void;
}

export default function ExpenseTable({
  expenses,
  onDeleteRequest,
}: ExpenseTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-paper-raised shadow-card">
      <div className="scrollbar-thin overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-sunken/60 text-left text-xs font-semibold uppercase tracking-wider text-ink-faint">
              <th className="px-5 py-3.5 font-semibold">Date</th>
              <th className="px-5 py-3.5 font-semibold">Category</th>
              <th className="px-5 py-3.5 font-semibold">Description</th>
              <th className="px-5 py-3.5 text-right font-semibold">Amount</th>
              <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="group border-b border-line transition-colors last:border-0 hover:bg-paper-sunken/50"
              >
                <td className="whitespace-nowrap px-5 py-4 font-mono text-ink-soft">
                  {formatDate(expense.date)}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getCategoryBadgeClasses(
                      expense.category
                    )}`}
                  >
                    {expense.category}
                  </span>
                </td>
                <td className="max-w-xs truncate px-5 py-4 font-medium text-ink">
                  {expense.description}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-right font-mono font-semibold text-ink">
                  {formatCurrency(expense.amount)}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1.5 opacity-80 transition-opacity group-hover:opacity-100">
                    <Link
                      to={`/expenses/${expense.id}/edit`}
                      aria-label={`Edit ${expense.description}`}
                      title="Edit"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-faint transition-colors hover:bg-brand-50 hover:text-brand-600"
                    >
                      <PencilIcon width={15} height={15} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDeleteRequest(expense)}
                      aria-label={`Delete ${expense.description}`}
                      title="Delete"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-faint transition-colors hover:bg-danger-100 hover:text-danger-500"
                    >
                      <TrashIcon width={15} height={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
