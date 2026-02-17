import { NextRequest, NextResponse } from 'next/server';
import { getMockProperties } from '@/lib/mock-data';
import { PropertyFilters } from '@/types/property';

/**
 * GET /api/properties
 * 필터링된 부동산 데이터 반환
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // 쿼리 파라미터에서 필터 조건 추출
    const filters: PropertyFilters = {
      priceRange: [
        parseInt(searchParams.get('priceMin') || '100000000'),
        parseInt(searchParams.get('priceMax') || '3000000000'),
      ],
      areaRange: [
        parseInt(searchParams.get('areaMin') || '10'),
        parseInt(searchParams.get('areaMax') || '300'),
      ],
    };

    if (searchParams.get('region')) {
      filters.region = searchParams.get('region') || undefined;
    }

    if (searchParams.get('district')) {
      filters.district = searchParams.get('district') || undefined;
    }

    if (searchParams.get('propertyType')) {
      filters.propertyType = (searchParams.get('propertyType') || '')
        .split(',')
        .filter(Boolean) as any[];
    }

    if (searchParams.get('transactionType')) {
      filters.transactionType = (searchParams.get('transactionType') || '')
        .split(',')
        .filter(Boolean) as any[];
    }

    // 필터링 로직
    const allProperties = getMockProperties();
    const filtered = allProperties.filter((property) => {
      if (filters.region && property.region !== filters.region) {
        return false;
      }

      if (filters.district && property.district !== filters.district) {
        return false;
      }

      const [minPrice, maxPrice] = filters.priceRange;
      if (property.price < minPrice || property.price > maxPrice) {
        return false;
      }

      const [minArea, maxArea] = filters.areaRange;
      if (property.area < minArea || property.area > maxArea) {
        return false;
      }

      if (
        filters.propertyType &&
        filters.propertyType.length > 0 &&
        !filters.propertyType.includes(property.type)
      ) {
        return false;
      }

      if (
        filters.transactionType &&
        filters.transactionType.length > 0 &&
        !filters.transactionType.includes(property.transactionType)
      ) {
        return false;
      }

      return true;
    });

    return NextResponse.json(filtered);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: '요청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
