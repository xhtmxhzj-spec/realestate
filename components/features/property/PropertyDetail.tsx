'use client';

import Link from 'next/link';
import { Property } from '@/types/property';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useComparisonStore } from '@/stores/useComparisonStore';
import { PriceChart } from '@/components/features/charts/PriceChart';
import { generatePriceHistory, getMockProperties } from '@/lib/mock-data';
import { PropertyCard } from './PropertyCard';
import { ChevronLeft, Plus, X } from 'lucide-react';

interface PropertyDetailProps {
  property: Property;
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  const { properties: comparisonProperties, addProperty, removeProperty } =
    useComparisonStore();

  const isInComparison = comparisonProperties.some((p) => p.id === property.id);
  const canAddToComparison = !isInComparison && comparisonProperties.length < 4;

  const handleToggleComparison = () => {
    if (isInComparison) {
      removeProperty(property.id);
    } else if (canAddToComparison) {
      addProperty(property);
    }
  };

  // 가격 포맷팅
  const formatPrice = (price: number) => {
    if (price >= 100_000_000) {
      return `${(price / 100_000_000).toFixed(1)}억`;
    }
    return `${(price / 10_000).toFixed(0)}만`;
  };

  // 거래유형 레이블
  const getTransactionLabel = () => {
    switch (property.transactionType) {
      case 'sale':
        return '매매';
      case 'jeonse':
        return '전세';
      case 'monthly':
        return '월세';
      default:
        return property.transactionType;
    }
  };

  // 부동산 타입 레이블
  const getPropertyTypeLabel = () => {
    switch (property.type) {
      case 'apartment':
        return '아파트';
      case 'officetel':
        return '오피스텔';
      case 'villa':
        return '빌라';
      case 'house':
        return '주택';
      default:
        return property.type;
    }
  };

  // 유사 매물 찾기 (같은 지역, 비슷한 가격대)
  const similarProperties = getMockProperties()
    .filter(
      (p) =>
        p.id !== property.id &&
        p.district === property.district &&
        Math.abs(p.price - property.price) < property.price * 0.2
    )
    .slice(0, 4);

  // 가격 이력 데이터
  const priceHistory = generatePriceHistory(property.price);

  return (
    <div className="space-y-6">
      {/* 뒤로가기 */}
      <Link href="/dashboard">
        <Button variant="outline" className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          뒤로가기
        </Button>
      </Link>

      {/* 헤더 */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3">{property.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {property.address}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{getPropertyTypeLabel()}</Badge>
              <Badge variant="secondary">{getTransactionLabel()}</Badge>
            </div>
          </div>
          <button
            onClick={handleToggleComparison}
            disabled={!canAddToComparison && !isInComparison}
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              isInComparison
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : canAddToComparison
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {isInComparison ? (
              <>
                <X className="h-4 w-4 inline mr-2" />
                비교목록에서 제거
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 inline mr-2" />
                비교목록에 추가
              </>
            )}
          </button>
        </div>

        {/* 핵심 가격 정보 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">가격</p>
            <p className="text-2xl font-bold">
              {property.transactionType === 'monthly'
                ? `보증금 ${property.deposit ? formatPrice(property.deposit) : '-'}`
                : formatPrice(property.price)}
            </p>
            {property.monthlyRent && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                월세 {formatPrice(property.monthlyRent)}
              </p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">면적</p>
            <p className="text-2xl font-bold">{property.area}㎡</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">건축년도</p>
            <p className="text-2xl font-bold">{property.buildYear}년</p>
          </div>
        </div>
      </Card>

      {/* 탭 */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">기본 정보</TabsTrigger>
          <TabsTrigger value="price">가격 이력</TabsTrigger>
          <TabsTrigger value="similar">유사 매물</TabsTrigger>
        </TabsList>

        {/* 기본 정보 탭 */}
        <TabsContent value="basic" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">위치</p>
                <p className="text-lg font-medium">
                  {property.region} {property.district} {property.neighborhood}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">층수</p>
                <p className="text-lg font-medium">
                  {property.floor}층 / 총 {property.totalFloors}층
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">향</p>
                <p className="text-lg font-medium">{property.direction}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">전용면적</p>
                <p className="text-lg font-medium">{property.area}㎡</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">주차</p>
                <p className="text-lg font-medium">
                  {property.parking ? '가능' : '불가'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">엘리베이터</p>
                <p className="text-lg font-medium">
                  {property.elevator ? '있음' : '없음'}
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* 가격 이력 탭 */}
        <TabsContent value="price">
          <Card className="p-6">
            <PriceChart data={priceHistory} title="12개월 가격 추이" />
          </Card>
        </TabsContent>

        {/* 유사 매물 탭 */}
        <TabsContent value="similar">
          <div className="space-y-4">
            {similarProperties.length > 0 ? (
              <>
                <p className="text-gray-600 dark:text-gray-400">
                  같은 지역의 비슷한 가격대 매물입니다.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similarProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              </>
            ) : (
              <Card className="p-6 text-center text-gray-500 dark:text-gray-400">
                유사한 매물이 없습니다.
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* 비교 목록 */}
      {comparisonProperties.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            비교 목록 ({comparisonProperties.length}/4)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {comparisonProperties.map((prop) => (
              <div key={prop.id} className="relative">
                <PropertyCard property={prop} />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
