import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";
import type { CategorySummary } from "../types/expense";
import { formatCurrency } from "../utils/format";
import { getCategoryChartColor } from "../utils/category";

interface CategorySummaryChartProps {
  summary: CategorySummary;
}

function ChartTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0];

  return (
    <div className="rounded-lg border border-line bg-paper-raised px-3.5 py-2.5 text-sm shadow-popover">
      <p className="font-medium text-ink">{point.payload.category}</p>
      <p className="mt-0.5 font-mono text-ink-soft">
        {formatCurrency(point.value as number)}
      </p>
    </div>
  );
}

export default function CategorySummaryChart({
  summary,
}: CategorySummaryChartProps) {
  const data = Object.entries(summary)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);

  if (data.length === 0) {
    return (
      <p className="py-14 text-center text-sm text-ink-faint">
        No category data yet.
      </p>
    );
  }

  return (
    <div className="h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 5" stroke="#E2E3EC" vertical={false} />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 12, fill: "#8D91A6" }}
            axisLine={{ stroke: "#E2E3EC" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#8D91A6" }}
            axisLine={false}
            tickLine={false}
            width={44}
            tickFormatter={(value: number) =>
              value >= 1000 ? `${value / 1000}k` : `${value}`
            }
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "#F5F6F9" }} />
          <Bar dataKey="total" radius={[6, 6, 0, 0]} maxBarSize={52}>
            {data.map((entry) => (
              <Cell key={entry.category} fill={getCategoryChartColor(entry.category)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
