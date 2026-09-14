import { useQuery } from "@tanstack/react-query";
import {
  getAllExpenses,
  getCategorySummary,
  getExpensesByCategory,
  getHighestExpense,
  getTotalExpenses,
} from "../api/expenses";
import { expenseKeys } from "../api/queryKeys";

/**
 * All expenses, or expenses filtered to one category. Pass `category`
 * (e.g. from a dropdown) to switch endpoints — GET /category/{category}
 * is only hit when a category is selected, otherwise GET /api/expenses.
 */
export function useExpenses(category?: string) {
  return useQuery({
    queryKey: expenseKeys.list(category),
    queryFn: () =>
      category ? getExpensesByCategory(category) : getAllExpenses(),
  });
}

/** GET /api/expenses/total */
export function useTotalExpenses() {
  return useQuery({
    queryKey: expenseKeys.total(),
    queryFn: getTotalExpenses,
  });
}

/**
 * GET /api/expenses/highest — resolves to `null` (not an error) when
 * there are no expenses yet, matching the backend's behavior.
 */
export function useHighestExpense() {
  return useQuery({
    queryKey: expenseKeys.highest(),
    queryFn: getHighestExpense,
  });
}

/** GET /api/expenses/summary */
export function useCategorySummary() {
  return useQuery({
    queryKey: expenseKeys.summary(),
    queryFn: getCategorySummary,
  });
}
