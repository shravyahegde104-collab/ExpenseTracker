/**
 * Mirrors expense_tracker.model.Expense from the backend.
 *
 * Note: `amount` is a whole-number integer on the backend (no decimals),
 * and `date` is serialized as an ISO date string ("YYYY-MM-DD").
 */
export interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
}

/** Shape sent to the backend when creating or updating an expense. */
export type ExpenseInput = {
  amount: number;
  category: string;
  description: string;
  date: string;
};

/** Response shape of GET /api/expenses/summary — category name to total amount. */
export type CategorySummary = Record<string, number>;
