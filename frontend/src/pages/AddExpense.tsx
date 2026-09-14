import { Link, useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { useCategorySummary } from "../hooks/useExpenses";
import { useCreateExpense } from "../hooks/useExpenseMutations";
import { useToast } from "../components/ToastProvider";
import type { ExpenseInput } from "../types/expense";

export default function AddExpense() {
  const navigate = useNavigate();
  const createExpense = useCreateExpense();
  const { data: summary } = useCategorySummary();
  const { showSuccess, showError } = useToast();

  async function handleSubmit(values: ExpenseInput) {
    try {
      await createExpense.mutateAsync(values);
      showSuccess("Expense added.");
      navigate("/expenses");
    } catch (err) {
      showError(err instanceof Error ? err.message : "Couldn't add this expense.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/expenses"
          className="mb-3 inline-block text-sm font-medium text-ink-faint transition-colors hover:text-ink-soft"
        >
          ← Back to expenses
        </Link>
        <h1 className="text-2xl font-semibold sm:text-3xl">Add expense</h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          Log a new expense to your ledger.
        </p>
      </div>
      <div className="rounded-xl border border-line bg-paper-raised p-6 shadow-card sm:p-8">
        <ExpenseForm
          submitLabel="Add expense"
          isSubmitting={createExpense.isPending}
          onSubmit={handleSubmit}
          existingCategories={Object.keys(summary ?? {})}
        />
      </div>
    </div>
  );
}
