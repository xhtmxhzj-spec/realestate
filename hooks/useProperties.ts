'use client';

import { useMemo } from 'react';
import { Property, PropertyFilters } from '@/types/property';
import { getMockProperties } from '@/lib/mock-data';

/**
 * 필터 조건에 맞는 부동산 데이터를 조회 및 필터링하는 훅
 */
export function useProperties(filters?: PropertyFilters) {
  return useMemo(() => {
    const allProperties = getMockProperties();

    if (!filters) {
      return allProperties;
    }

    return allProperties.filter((property) => {
      // 지역 필터
      if (filters.region && property.region !== filters.region) {
        return false;
      }

      // 구 필터
      if (filters.district && property.district !== filters.district) {
        return false;
      }

      // 부동산 타입 필터
      if (
        filters.propertyType &&
        filters.propertyType.length > 0 &&
        !filters.propertyType.includes(property.type)
      ) {
        return false;
      }

      // 거래 유형 필터
      if (
        filters.transactionType &&
        filters.transactionType.length > 0 &&
        !filters.transactionType.includes(property.transactionType)
      ) {
        return false;
      }

      // 가격 범위 필터
      const [minPrice, maxPrice] = filters.priceRange;
      if (property.price < minPrice || property.price > maxPrice) {
        return false;
      }

      // 면적 범위 필터
      const [minArea, maxArea] = filters.areaRange;
      if (property.area < minArea || property.area > maxArea) {
        return false;
      }

      // 건축연도 범위 필터
      if (filters.buildYearRange) {
        const [minYear, maxYear] = filters.buildYearRange;
        if (property.buildYear < minYear || property.buildYear > maxYear) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);
}

/**
 * 개별 부동산 데이터를 ID로 조회하는 훅
 */
export function useProperty(id: string): Property | undefined {
  return useMemo(() => {
    const allProperties = getMockProperties();
    return allProperties.find((property) => property.id === id);
  }, [id]);
}

/**
 * 특정 지역의 부동산들을 조회하는 훅
 */
export function usePropertiesByRegion(region: string): Property[] {
  return useMemo(() => {
    const allProperties = getMockProperties();
    return allProperties.filter((property) => property.district === region);
  }, [region]);
}
