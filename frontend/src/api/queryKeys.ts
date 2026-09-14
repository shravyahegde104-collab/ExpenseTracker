/**
 * Central query key factory. Every expense-related query key is nested
 * under expenseKeys.all, so a single invalidateQueries({ queryKey:
 * expenseKeys.all }) after any mutation refreshes the list, total,
 * highest, and summary together — they all read from the same underlying
 * table with no server-side caching to worry about.
 */
export const expenseKeys = {
  all: ["expenses"] as const,
  lists: () => [...expenseKeys.all, "list"] as const,
  list: (category?: string) => [...expenseKeys.lists(), category ?? "all"] as const,
  total: () => [...expenseKeys.all, "total"] as const,
  highest: () => [...expenseKeys.all, "highest"] as const,
  summary: () => [...expenseKeys.all, "summary"] as const,
};
