'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PriceHistory } from '@/types/property';
import { useThemeStore } from '@/stores/useThemeStore';

interface PriceChartProps {
  data: PriceHistory[];
  title?: string;
}

export function PriceChart({ data, title = '가격 추이' }: PriceChartProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const textColor = isDark ? '#9ca3af' : '#6b7280';
  const lineColor = isDark ? '#60a5fa' : '#3b82f6';

  return (
    <div className="w-full h-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="date"
            stroke={textColor}
            tick={{ fill: textColor }}
          />
          <YAxis
            stroke={textColor}
            tick={{ fill: textColor }}
            tickFormatter={(value) => `${(value / 100_000_000).toFixed(0)}억`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              border: `1px solid ${gridColor}`,
              color: textColor,
            }}
            formatter={(value) =>
              `${typeof value === 'number' ? (value / 100_000_000).toFixed(1) : value}억`
            }
          />
          <Legend wrapperStyle={{ color: textColor }} />
          <Line
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            dot={false}
            name="가격"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
