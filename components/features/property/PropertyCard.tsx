'use client';

import Link from 'next/link';
import { Property } from '@/types/property';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useComparisonStore } from '@/stores/useComparisonStore';
import { Plus, X } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
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

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <Link
              href={`/property/${property.id}`}
              className="text-lg font-semibold hover:text-blue-500 transition-colors"
            >
              {property.name}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {property.address}
            </p>
          </div>
          <button
            onClick={handleToggleComparison}
            disabled={!canAddToComparison && !isInComparison}
            className={`ml-2 p-2 rounded-lg transition-colors ${
              isInComparison
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : canAddToComparison
                  ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isInComparison ? (
              <X className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* 배지 */}
        <div className="flex gap-2 mb-3">
          <Badge variant="outline">{getPropertyTypeLabel()}</Badge>
          <Badge variant="outline">{getTransactionLabel()}</Badge>
        </div>

        {/* 주요 정보 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">가격</p>
            <p className="font-semibold text-base">
              {property.transactionType === 'monthly'
                ? `${property.deposit ? `보증금 ${formatPrice(property.deposit)}` : ''}`
                : formatPrice(property.price)}
            </p>
            {property.monthlyRent && (
              <p className="text-xs text-gray-600 dark:text-gray-300">
                월세 {formatPrice(property.monthlyRent)}
              </p>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">면적</p>
            <p className="font-semibold">{property.area}㎡</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">건축년도</p>
            <p className="font-semibold">{property.buildYear}년</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">층수</p>
            <p className="font-semibold">
              {property.floor}층/{property.totalFloors}층
            </p>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 mb-4">
          <p>향: {property.direction}</p>
          <p>주차: {property.parking ? '가능' : '불가'}</p>
          <p>엘리베이터: {property.elevator ? '있음' : '없음'}</p>
        </div>

        {/* 상세 보기 버튼 */}
        <Link href={`/property/${property.id}`}>
          <Button className="w-full" variant="default" size="sm">
            상세 보기
          </Button>
        </Link>
      </div>
    </Card>
  );
}
