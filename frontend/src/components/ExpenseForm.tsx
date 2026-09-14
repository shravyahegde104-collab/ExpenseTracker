import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { ExpenseInput } from "../types/expense";
import { todayIso } from "../utils/format";

interface ExpenseFormProps {
  initialValues?: Partial<ExpenseInput>;
  submitLabel: string;
  isSubmitting?: boolean;
  onSubmit: (values: ExpenseInput) => void;
  /** Known category names (from the real category summary), offered as
   * autocomplete suggestions — not a restriction, just a convenience. */
  existingCategories?: string[];
  cancelTo?: string;
}

interface FormErrors {
  amount?: string;
  category?: string;
  description?: string;
  date?: string;
}

const fieldClasses = (hasError: boolean) =>
  `w-full rounded-lg border bg-paper-raised px-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-ink-faint focus:outline-none focus:ring-1 ${
    hasError
      ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
      : "border-line hover:border-line-strong focus:border-brand-500 focus:ring-brand-500"
  }`;

export default function ExpenseForm({
  initialValues,
  submitLabel,
  isSubmitting,
  onSubmit,
  existingCategories = [],
  cancelTo = "/expenses",
}: ExpenseFormProps) {
  const [amount, setAmount] = useState(
    initialValues?.amount != null ? String(initialValues.amount) : ""
  );
  const [category, setCategory] = useState(initialValues?.category ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );
  const [date, setDate] = useState(initialValues?.date ?? todayIso());
  const [errors, setErrors] = useState<FormErrors>({});

  // The edit page loads the expense asynchronously (from the cached list),
  // so initialValues can arrive after this form has already mounted.
  useEffect(() => {
    if (!initialValues) return;
    if (initialValues.amount != null) setAmount(String(initialValues.amount));
    if (initialValues.category != null) setCategory(initialValues.category);
    if (initialValues.description != null)
      setDescription(initialValues.description);
    if (initialValues.date != null) setDate(initialValues.date);
  }, [initialValues]);

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    const trimmedAmount = amount.trim();

    if (!trimmedAmount) {
      nextErrors.amount = "Enter an amount.";
    } else if (!/^\d+$/.test(trimmedAmount)) {
      nextErrors.amount = "Whole numbers only — no decimals.";
    } else if (Number(trimmedAmount) <= 0) {
      nextErrors.amount = "Amount must be greater than 0.";
    }

    if (!category.trim()) {
      nextErrors.category = "Enter a category.";
    }

    if (!description.trim()) {
      nextErrors.description = "Enter a description.";
    }

    if (!date) {
      nextErrors.date = "Pick a date.";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      amount: Number(amount.trim()),
      category: category.trim(),
      description: description.trim(),
      date,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-lg space-y-6">
      <div>
        <label htmlFor="amount" className="mb-1.5 block text-sm font-medium text-ink">
          Amount
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-ink-faint">
            ₹
          </span>
          <input
            id="amount"
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="500"
            aria-invalid={!!errors.amount}
            aria-describedby={errors.amount ? "amount-error" : undefined}
            className={`${fieldClasses(!!errors.amount)} pl-7 font-mono`}
          />
        </div>
        {errors.amount && (
          <p id="amount-error" className="mt-1.5 text-xs font-medium text-danger-500">
            {errors.amount}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-ink">
          Category
        </label>
        <input
          id="category"
          type="text"
          list="category-suggestions"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Food, Travel, Rent…"
          aria-invalid={!!errors.category}
          aria-describedby={errors.category ? "category-error" : undefined}
          className={fieldClasses(!!errors.category)}
        />
        {existingCategories.length > 0 && (
          <datalist id="category-suggestions">
            {existingCategories.map((existing) => (
              <option key={existing} value={existing} />
            ))}
          </datalist>
        )}
        {errors.category && (
          <p id="category-error" className="mt-1.5 text-xs font-medium text-danger-500">
            {errors.category}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What was this for?"
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "description-error" : undefined}
          className={fieldClasses(!!errors.description)}
        />
        {errors.description && (
          <p id="description-error" className="mt-1.5 text-xs font-medium text-danger-500">
            {errors.description}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-ink">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? "date-error" : undefined}
          className={`${fieldClasses(!!errors.date)} font-mono`}
        />
        {errors.date && (
          <p id="date-error" className="mt-1.5 text-xs font-medium text-danger-500">
            {errors.date}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-paper-raised shadow-card transition-all hover:bg-brand-700 hover:shadow-raised disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-card active:scale-[0.98]"
        >
          {isSubmitting ? "Saving…" : submitLabel}
        </button>
        <Link
          to={cancelTo}
          className="rounded-lg px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-sunken hover:text-ink"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
