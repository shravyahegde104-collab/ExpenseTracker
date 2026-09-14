import { useMemo, useState } from "react";
import { useCategorySummary, useExpenses } from "../hooks/useExpenses";
import { useDeleteExpense } from "../hooks/useExpenseMutations";
import ExpenseTable from "../components/ExpenseTable";
import CategoryFilter from "../components/CategoryFilter";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import EmptyState from "../components/EmptyState";
import { useToast } from "../components/ToastProvider";
import { formatCurrency } from "../utils/format";
import { AlertTriangleIcon } from "../components/icons";
import type { Expense } from "../types/expense";

export default function ExpensesList() {
  const [category, setCategory] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Expense | null>(null);

  const {
    data: expenses,
    isLoading,
    isError,
    error,
  } = useExpenses(category || undefined);
  const { data: summary } = useCategorySummary();
  const deleteExpense = useDeleteExpense();
  const { showSuccess, showError } = useToast();

  const categories = useMemo(
    () => Object.keys(summary ?? {}).sort(),
    [summary]
  );

  const sorted = useMemo(
    () =>
      [...(expenses ?? [])].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [expenses]
  );

  const filteredTotal = useMemo(
    () => sorted.reduce((sum, expense) => sum + expense.amount, 0),
    [sorted]
  );

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    try {
      await deleteExpense.mutateAsync(pendingDelete.id);
      showSuccess("Expense deleted.");
      setPendingDelete(null);
    } catch (err) {
      showError(err instanceof Error ? err.message : "Couldn't delete this expense.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Expenses</h1>
          <p className="mt-1.5 text-sm text-ink-soft">
            Every expense you've logged, newest first.
          </p>
        </div>
        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
        />
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-14 animate-pulse rounded-xl border border-line bg-paper-raised"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="flex items-start gap-3 rounded-xl border border-danger-100 bg-danger-100/40 p-4 text-sm text-danger-700">
          <AlertTriangleIcon width={18} height={18} className="mt-0.5 shrink-0" />
          <span>{error instanceof Error ? error.message : "Couldn't load expenses."}</span>
        </div>
      ) : sorted.length === 0 ? (
        category ? (
          <EmptyState
            title={`No expenses in "${category}"`}
            description="Try a different category, or add one here."
            actionLabel="Add an expense"
            actionTo="/expenses/new"
          />
        ) : (
          <EmptyState
            title="No expenses yet"
            description="Start tracking by adding your first expense."
            actionLabel="Add an expense"
            actionTo="/expenses/new"
          />
        )
      ) : (
        <>
          <div className="flex items-center justify-between rounded-lg bg-paper-sunken/70 px-4 py-2.5 text-sm">
            <span className="text-ink-soft">
              {sorted.length} {sorted.length === 1 ? "expense" : "expenses"}
              {category ? ` in "${category}"` : ""}
            </span>
            <span className="font-mono font-semibold text-ink">
              {formatCurrency(filteredTotal)}
            </span>
          </div>
          <ExpenseTable expenses={sorted} onDeleteRequest={setPendingDelete} />
        </>
      )}

      <ConfirmDeleteModal
        open={pendingDelete !== null}
        title="Delete this expense?"
        description={
          pendingDelete
            ? `${pendingDelete.description} · ${pendingDelete.category} — this can't be undone.`
            : undefined
        }
        isLoading={deleteExpense.isPending}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
