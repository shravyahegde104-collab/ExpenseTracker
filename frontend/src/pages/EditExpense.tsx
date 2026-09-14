import { Link, useNavigate, useParams } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { useCategorySummary, useExpenses } from "../hooks/useExpenses";
import { useUpdateExpense } from "../hooks/useExpenseMutations";
import { useToast } from "../components/ToastProvider";
import type { ExpenseInput } from "../types/expense";

export default function EditExpense() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // There's no GET /api/expenses/{id} on the backend, so the edit page
  // reuses the same "all expenses" query the list page uses (usually
  // already cached by React Query) and finds the one it needs.
  const { data: expenses, isLoading } = useExpenses();
  const { data: summary } = useCategorySummary();
  const updateExpense = useUpdateExpense();
  const { showSuccess, showError } = useToast();

  const expenseId = Number(id);
  const expense = expenses?.find((item) => item.id === expenseId);

  async function handleSubmit(values: ExpenseInput) {
    try {
      await updateExpense.mutateAsync({ id: expenseId, expense: values });
      showSuccess("Expense updated.");
      navigate("/expenses");
    } catch (err) {
      showError(err instanceof Error ? err.message : "Couldn't update this expense.");
    }
  }

  const backLink = (
    <Link
      to="/expenses"
      className="mb-3 inline-block text-sm font-medium text-ink-faint transition-colors hover:text-ink-soft"
    >
      ← Back to expenses
    </Link>
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        {backLink}
        <div className="h-72 animate-pulse rounded-xl border border-line bg-paper-raised" />
      </div>
    );
  }

  if (!expense) {
    return (
      <div className="space-y-4">
        {backLink}
        <h1 className="text-2xl font-semibold sm:text-3xl">Edit expense</h1>
        <div className="rounded-xl border border-line bg-paper-raised p-6 text-sm text-ink-soft shadow-card">
          Couldn't find that expense. It may have already been deleted.{" "}
          <Link
            to="/expenses"
            className="font-medium text-brand-600 hover:text-brand-700"
          >
            Back to expenses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {backLink}
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">Edit expense</h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          Update the details below.
        </p>
      </div>
      <div className="rounded-xl border border-line bg-paper-raised p-6 shadow-card sm:p-8">
        <ExpenseForm
          initialValues={expense}
          submitLabel="Save changes"
          isSubmitting={updateExpense.isPending}
          onSubmit={handleSubmit}
          existingCategories={Object.keys(summary ?? {})}
        />
      </div>
    </div>
  );
}
