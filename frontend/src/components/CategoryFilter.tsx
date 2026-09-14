import { ChevronDownIcon, TagIcon } from "./icons";

interface CategoryFilterProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({
  categories,
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="relative">
      <TagIcon
        width={15}
        height={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
      />
      <select
        aria-label="Filter by category"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="appearance-none rounded-lg border border-line bg-paper-raised py-2 pl-8 pr-9 text-sm text-ink shadow-card transition-colors hover:border-line-strong focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        width={14}
        height={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint"
      />
    </div>
  );
}
