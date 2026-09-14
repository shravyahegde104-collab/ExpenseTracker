/** Formats a whole-number amount as Indian Rupees, e.g. 1234 -> "₹1,234". */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Formats an ISO date string ("YYYY-MM-DD") as e.g. "12 Sep 2026". */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

/** Today's date as "YYYY-MM-DD", used to default the expense form's date field. */
export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
