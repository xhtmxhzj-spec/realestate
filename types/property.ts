// 부동산 타입 정의 모음

export type PropertyType = 'apartment' | 'officetel' | 'villa' | 'house';
export type TransactionType = 'sale' | 'jeonse' | 'monthly';

/**
 * 부동산 정보
 */
export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  transactionType: TransactionType;
  price: number; // 판매가 (원)
  deposit?: number; // 월세 보증금 (원)
  monthlyRent?: number; // 월세 (원)
  area: number; // 전용면적 (㎡)
  region: string; // 시/도 (예: "서울")
  district: string; // 구 (예: "강남구")
  neighborhood: string; // 동 (예: "역삼동")
  address: string; // 전체 주소
  buildYear: number; // 건축연도
  floor: number; // 현재 층수
  totalFloors: number; // 전체 층수
  direction: string; // 향 (남향, 동남향 등)
  parking: boolean; // 주차 여부
  elevator: boolean; // 엘리베이터 여부
  createdAt: Date; // 등록일
}

/**
 * 부동산 필터 조건
 */
export interface PropertyFilters {
  region?: string;
  district?: string;
  propertyType?: PropertyType[];
  transactionType?: TransactionType[];
  priceRange: [number, number];
  areaRange: [number, number];
  buildYearRange?: [number, number];
}

/**
 * 가격 이력
 */
export interface PriceHistory {
  date: string; // YYYY-MM-DD 형식
  price: number; // 가격 (원)
}

/**
 * 지역별 통계
 */
export interface RegionStats {
  region: string;
  count: number; // 매물 수
  averagePrice: number; // 평균 가격
  medianPrice: number; // 중앙값
  priceChange: number; // 전월 대비 변화율 (%)
}
