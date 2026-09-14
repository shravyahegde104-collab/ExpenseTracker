import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense, deleteExpense, updateExpense } from "../api/expenses";
import { expenseKeys } from "../api/queryKeys";
import type { ExpenseInput } from "../types/expense";

/**
 * Every mutation below invalidates expenseKeys.all on success, so the
 * list, total, highest, and category summary all refetch together —
 * there's no need to reason about which specific views a given change
 * affects (e.g. deleting the highest expense changes /highest too).
 */

// POST /api/expenses
export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (expense: ExpenseInput) => createExpense(expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}

// PUT /api/expenses/{id}
export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, expense }: { id: number; expense: ExpenseInput }) =>
      updateExpense(id, expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}

// DELETE /api/expenses/{id}
export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}
