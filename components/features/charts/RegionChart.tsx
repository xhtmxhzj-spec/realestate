'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { RegionStats } from '@/types/property';
import { useThemeStore } from '@/stores/useThemeStore';

interface RegionChartProps {
  data: RegionStats[];
  title?: string;
}

export function RegionChart({ data, title = '지역별 평균 가격' }: RegionChartProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const textColor = isDark ? '#9ca3af' : '#6b7280';
  const barColor = isDark ? '#34d399' : '#10b981';

  return (
    <div className="w-full h-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="region" stroke={textColor} tick={{ fill: textColor }} />
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
          <Bar
            dataKey="averagePrice"
            fill={barColor}
            name="평균 가격"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
