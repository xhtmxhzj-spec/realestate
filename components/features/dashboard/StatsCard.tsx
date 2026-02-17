'use client';

import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number; // 변화율 (%)
  trendLabel?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
}: StatsCardProps) {
  const isTrendPositive = trend ? trend >= 0 : false;

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {title}
          </p>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            {value}
          </p>
          {trend !== undefined && (
            <p
              className={`text-sm mt-2 ${
                isTrendPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isTrendPositive ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
              {trendLabel && ` ${trendLabel}`}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-blue-100 dark:bg-blue-900 p-3">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    </Card>
  );
}
