'use client';

import { useMemo } from 'react';
import { Building2, TrendingUp, MapPin, Home } from 'lucide-react';
import { StatsCard } from '@/components/features/dashboard/StatsCard';
import { ExportButton } from '@/components/features/dashboard/ExportButton';
import { FilterBar } from '@/components/features/filters/FilterBar';
import { PropertyTable } from '@/components/features/property/PropertyTable';
import { PriceChart } from '@/components/features/charts/PriceChart';
import { RegionChart } from '@/components/features/charts/RegionChart';
import { PriceDistributionChart } from '@/components/features/charts/PriceDistributionChart';
import { useFilterStore } from '@/stores/useFilterStore';
import { useProperties } from '@/hooks/useProperties';
import { generatePriceHistory, generateRegionStats } from '@/lib/mock-data';

export default function DashboardPage() {
  const { filters } = useFilterStore();
  const filteredProperties = useProperties(filters);

  // 통계 계산
  const stats = useMemo(() => {
    if (filteredProperties.length === 0) {
      return {
        totalCount: 0,
        averagePrice: 0,
        maxPrice: 0,
        minPrice: 0,
      };
    }

    const prices = filteredProperties.map((p) => p.price);
    const total = prices.reduce((a, b) => a + b, 0);

    return {
      totalCount: filteredProperties.length,
      averagePrice: Math.floor(total / filteredProperties.length),
      maxPrice: Math.max(...prices),
      minPrice: Math.min(...prices),
    };
  }, [filteredProperties]);

  // 가격 이력 (평균 기준)
  const priceHistory = useMemo(() => {
    if (filteredProperties.length === 0) {
      return generatePriceHistory(500_000_000);
    }
    return generatePriceHistory(stats.averagePrice);
  }, [filteredProperties, stats.averagePrice]);

  // 지역별 통계
  const regionStats = useMemo(() => {
    const stats = generateRegionStats();
    // 필터링된 지역만 표시
    if (filters.region) {
      return stats.filter((s) => s.region.startsWith(filters.region!.charAt(0)));
    }
    return stats.slice(0, 10);
  }, [filters.region]);

  const formatPrice = (price: number) => {
    if (price >= 100_000_000) {
      return `${(price / 100_000_000).toFixed(1)}억`;
    }
    return `${(price / 10_000).toFixed(0)}만`;
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">부동산 대시보드</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            실시간 부동산 데이터 분석 및 조회
          </p>
        </div>
        <ExportButton properties={filteredProperties} />
      </div>

      {/* 필터 바 */}
      <FilterBar />

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="총 매물 수"
          value={stats.totalCount}
          icon={Building2}
        />
        <StatsCard
          title="평균 가격"
          value={formatPrice(stats.averagePrice)}
          icon={TrendingUp}
        />
        <StatsCard
          title="최고가"
          value={formatPrice(stats.maxPrice)}
          icon={Home}
        />
        <StatsCard
          title="최저가"
          value={formatPrice(stats.minPrice)}
          icon={MapPin}
        />
      </div>

      {/* 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
          <PriceChart data={priceHistory} title="평균 가격 추이" />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
          <RegionChart data={regionStats} title="지역별 평균 가격" />
        </div>
      </div>

      {/* 가격 분포 차트 */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
        <PriceDistributionChart properties={filteredProperties} />
      </div>

      {/* 부동산 테이블 */}
      <PropertyTable properties={filteredProperties} />
    </div>
  );
}
