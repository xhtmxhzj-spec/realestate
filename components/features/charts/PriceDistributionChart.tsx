'use client';

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Property } from '@/types/property';
import { PRICE_BRACKETS } from '@/lib/constants';
import { useThemeStore } from '@/stores/useThemeStore';

interface PriceDistributionChartProps {
  properties: Property[];
  title?: string;
}

export function PriceDistributionChart({
  properties,
  title = '가격대별 분포',
}: PriceDistributionChartProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const textColor = isDark ? '#9ca3af' : '#6b7280';

  // 가격대별 분류
  const distribution = PRICE_BRACKETS.map((bracket) => {
    const count = properties.filter(
      (p) => p.price >= bracket.min && p.price <= bracket.max
    ).length;
    return {
      name: bracket.label,
      value: count,
      percentage: ((count / properties.length) * 100).toFixed(1),
    };
  });

  // 색상 팔레트
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="w-full h-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={distribution}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry: any) => `${entry.name} ${entry.percentage}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {distribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
              color: textColor,
            }}
            formatter={(value) => [`${value}개`, '매물 수']}
          />
          <Legend wrapperStyle={{ color: textColor }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
