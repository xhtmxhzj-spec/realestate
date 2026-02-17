'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatsCard } from '@/components/features/dashboard/StatsCard';
import { PropertyCard } from '@/components/features/property/PropertyCard';
import { Building2, TrendingUp, MapPin, Home, ArrowRight } from 'lucide-react';
import { getMockProperties, generateRegionStats } from '@/lib/mock-data';
import { useMemo } from 'react';

export default function HomePage() {
  const properties = getMockProperties();
  const regionStats = generateRegionStats();

  // 통계 계산
  const stats = useMemo(() => {
    const prices = properties.map((p) => p.price);
    const total = prices.reduce((a, b) => a + b, 0);

    return {
      totalCount: properties.length,
      averagePrice: Math.floor(total / properties.length),
      maxPrice: Math.max(...prices),
      minPrice: Math.min(...prices),
    };
  }, []);

  // 최신 매물
  const recentProperties = properties
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  const formatPrice = (price: number) => {
    if (price >= 100_000_000) {
      return `${(price / 100_000_000).toFixed(1)}억`;
    }
    return `${(price / 10_000).toFixed(0)}만`;
  };

  return (
    <div className="space-y-12">
      {/* 히어로 섹션 */}
      <section className="py-12 sm:py-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold">
            부동산 데이터분석 Starter Kit
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            실시간 부동산 데이터를 시각화하고 분석하는 완성도 높은 대시보드.
            빠르게 시작할 수 있는 템플릿입니다.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              대시보드로 이동
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 주요 통계 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">주요 통계</h2>
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
      </section>

      {/* 지역별 통계 */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">지역별 평균 가격</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regionStats.slice(0, 10).map((stat) => (
            <Card key={stat.region} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{stat.region}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.count}개 매물
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">
                    {formatPrice(stat.averagePrice)}
                  </p>
                  <p
                    className={`text-sm ${
                      stat.priceChange >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.priceChange >= 0 ? '↑' : '↓'} {Math.abs(stat.priceChange).toFixed(1)}%
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 최신 매물 */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">최신 매물</h2>
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2">
              모두 보기
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-12 text-center space-y-6 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold">지금 바로 시작하세요</h2>
        <p className="text-gray-600 dark:text-gray-400">
          부동산 데이터를 효과적으로 분석하고 관리할 수 있는 완성도 높은 대시보드를 경험해보세요.
        </p>
        <Link href="/dashboard">
          <Button size="lg">대시보드 이용하기</Button>
        </Link>
      </section>
    </div>
  );
}
