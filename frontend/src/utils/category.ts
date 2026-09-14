/**
 * Assigns each category name a consistent color from a small fixed
 * palette (same category always maps to the same color within a
 * session). Used for both table/list badges (Tailwind classes) and the
 * Recharts bar chart (hex values), so the two stay visually in sync.
 */

const badgePalette = [
  { bg: "bg-brand-100", text: "text-brand-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-tag-teal-100", text: "text-tag-teal-700" },
  { bg: "bg-tag-plum-100", text: "text-tag-plum-700" },
  { bg: "bg-tag-rose-100", text: "text-tag-rose-700" },
  { bg: "bg-tag-slate-100", text: "text-tag-slate-700" },
];

const chartPalette = [
  "#4F42C4", // brand
  "#BE7B31", // amber
  "#20685D", // tag-teal
  "#6C3E7C", // tag-plum
  "#9C3B57", // tag-rose
  "#454A63", // tag-slate
];

function hashCategory(category: string): number {
  let hash = 0;
  for (let i = 0; i < category.length; i += 1) {
    hash = (hash + category.charCodeAt(i) * (i + 1)) % 997;
  }
  return hash;
}

export function getCategoryBadgeClasses(category: string): string {
  const { bg, text } = badgePalette[hashCategory(category) % badgePalette.length];
  return `${bg} ${text}`;
}

export function getCategoryChartColor(category: string): string {
  return chartPalette[hashCategory(category) % chartPalette.length];
}
