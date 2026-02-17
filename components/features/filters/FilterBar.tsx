'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { PropertyFilters } from '@/types/property';
import {
  PROPERTY_TYPES,
  TRANSACTION_TYPES,
  SEOUL_REGIONS,
  GYEONGGI_REGIONS,
  PRICE_PRESETS,
  AREA_PRESETS,
} from '@/lib/constants';
import { useFilterStore } from '@/stores/useFilterStore';

interface FilterBarProps {
  onFilterChange?: (filters: PropertyFilters) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const { filters, setFilters, resetFilters } = useFilterStore();
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  const allRegions = { ...SEOUL_REGIONS, ...GYEONGGI_REGIONS };
  const districts = expandedRegion
    ? allRegions[expandedRegion as keyof typeof allRegions]
    : [];

  const handleRegionChange = (region: string) => {
    setExpandedRegion(expandedRegion === region ? null : region);
    setFilters({ region, district: undefined });
    onFilterChange?.(filters);
  };

  const handleDistrictChange = (district: string) => {
    setFilters({ district });
    onFilterChange?.(filters);
  };

  const handlePriceChange = (values: number[]) => {
    const [min, max] = values;
    setFilters({ priceRange: [min, max] });
    onFilterChange?.(filters);
  };

  const handleAreaChange = (values: number[]) => {
    const [min, max] = values;
    setFilters({ areaRange: [min, max] });
    onFilterChange?.(filters);
  };

  const handlePropertyTypeChange = (type: string) => {
    const currentTypes = filters.propertyType || [];
    const newTypes = currentTypes.includes(type as any)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type as any];
    setFilters({ propertyType: newTypes });
    onFilterChange?.(filters);
  };

  const handleTransactionTypeChange = (type: string) => {
    const currentTypes = filters.transactionType || [];
    const newTypes = currentTypes.includes(type as any)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type as any];
    setFilters({ transactionType: newTypes });
    onFilterChange?.(filters);
  };

  const handleReset = () => {
    resetFilters();
    setExpandedRegion(null);
    onFilterChange?.(filters);
  };

  return (
    <Card className="p-6 mb-6">
      <div className="space-y-6">
        {/* 지역 선택 */}
        <div>
          <h3 className="font-semibold mb-3">지역</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {Object.keys(allRegions).map((region) => (
              <button
                key={region}
                onClick={() => handleRegionChange(region)}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.region === region
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* 동 선택 */}
          {expandedRegion && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-2">동 선택</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {districts.map((district) => (
                  <button
                    key={district}
                    onClick={() => handleDistrictChange(district)}
                    className={`px-3 py-2 rounded-md text-sm transition-colors ${
                      filters.district === district
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {district}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 가격 범위 */}
        <div>
          <h3 className="font-semibold mb-3">
            가격: {(filters.priceRange[0] / 100_000_000).toFixed(1)}억 ~{' '}
            {(filters.priceRange[1] / 100_000_000).toFixed(0)}억
          </h3>
          <Slider
            min={PRICE_PRESETS.min}
            max={PRICE_PRESETS.max}
            step={PRICE_PRESETS.step}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="w-full"
          />
        </div>

        {/* 면적 범위 */}
        <div>
          <h3 className="font-semibold mb-3">
            면적: {filters.areaRange[0]}㎡ ~ {filters.areaRange[1]}㎡
          </h3>
          <Slider
            min={AREA_PRESETS.min}
            max={AREA_PRESETS.max}
            step={AREA_PRESETS.step}
            value={filters.areaRange}
            onValueChange={handleAreaChange}
            className="w-full"
          />
        </div>

        {/* 부동산 타입 */}
        <div>
          <h3 className="font-semibold mb-3">부동산 타입</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PROPERTY_TYPES).map(([key, { label, value }]) => (
              <button
                key={key}
                onClick={() => handlePropertyTypeChange(value)}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  filters.propertyType?.includes(value)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 거래 유형 */}
        <div>
          <h3 className="font-semibold mb-3">거래 유형</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(TRANSACTION_TYPES).map(([key, { label, value }]) => (
              <button
                key={key}
                onClick={() => handleTransactionTypeChange(value)}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  filters.transactionType?.includes(value)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 리셋 버튼 */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full sm:w-auto"
          >
            필터 초기화
          </Button>
        </div>
      </div>
    </Card>
  );
}
