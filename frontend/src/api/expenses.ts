import { apiClient } from "./client";
import type { CategorySummary, Expense, ExpenseInput } from "../types/expense";

/**
 * One function per endpoint on ExpenseController. Paths are relative to
 * apiClient's baseURL ("/api/expenses").
 */

// GET /api/expenses
export async function getAllExpenses(): Promise<Expense[]> {
  const { data } = await apiClient.get<Expense[]>("");
  return data;
}

// GET /api/expenses/category/{category}
export async function getExpensesByCategory(
  category: string
): Promise<Expense[]> {
  const { data } = await apiClient.get<Expense[]>(
    `/category/${encodeURIComponent(category)}`
  );
  return data;
}

// GET /api/expenses/total  -> plain int
export async function getTotalExpenses(): Promise<number> {
  const { data } = await apiClient.get<number>("/total");
  return data;
}

// GET /api/expenses/highest -> Expense, or null when there are no expenses
export async function getHighestExpense(): Promise<Expense | null> {
  const { data } = await apiClient.get<Expense | null>("/highest");
  return data ?? null;
}

// GET /api/expenses/summary -> { [category]: totalAmount }
export async function getCategorySummary(): Promise<CategorySummary> {
  const { data } = await apiClient.get<CategorySummary>("/summary");
  return data;
}

// POST /api/expenses
export async function createExpense(expense: ExpenseInput): Promise<Expense> {
  const { data } = await apiClient.post<Expense>("", expense);
  return data;
}

// PUT /api/expenses/{id}
// The backend overwrites whatever id is in the body with the path {id},
// so ExpenseInput (no id field) is all that's needed here.
export async function updateExpense(
  id: number,
  expense: ExpenseInput
): Promise<Expense> {
  const { data } = await apiClient.put<Expense>(`/${id}`, expense);
  return data;
}

// DELETE /api/expenses/{id} -> plain text confirmation message
export async function deleteExpense(id: number): Promise<void> {
  await apiClient.delete<string>(`/${id}`);
}
