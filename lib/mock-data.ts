import { Property, PriceHistory, RegionStats } from '@/types/property';
import { REGIONS, PROPERTY_TYPES, TRANSACTION_TYPES } from './constants';

// 모의 부동산 데이터 생성
export function generateMockProperties(): Property[] {
  const properties: Property[] = [];
  const baseIds = [
    '강남', '역삼', '신사', '압구정', '삼성',
    '서초', '방배', '양재', '잠실', '송파',
    '강동', '성수', '천호', '광장', '자양',
    '홍대', '합정', '망원', '마포', '연남',
    '명동', '종로', '을지로', '충무로', '인사',
  ];

  const sampleAddresses: Record<string, string[]> = {
    강남: ['강남대로 123', '테헤란로 456', '역삼로 789'],
    역삼: ['역삼1로 100', '역삼2로 200', '역삼3로 300'],
    신사: ['신사로 150', '강남구 신사동 150-1'],
    압구정: ['압구정로 200', '압구정로38길 50'],
    삼성: ['테헤란로 521', '강남구 삼성동 100'],
    서초: ['서초대로 100', '강남구 서초동 200'],
    방배: ['사임당로 150', '강남구 방배동 300'],
    양재: ['양재로 100', '강남구 양재동 200'],
    잠실: ['올림픽대로 1000', '송파구 잠실동 500'],
    송파: ['올림픽대로 1100', '송파구 송파동 600'],
  };

  let id = 1;
  for (let i = 0; i < 100; i++) {
    const baseId = baseIds[i % baseIds.length];
    const addresses = sampleAddresses[baseId] || [`${baseId} 거리 ${Math.floor(Math.random() * 1000)}`];
    const address = addresses[Math.floor(Math.random() * addresses.length)];

    // 거래 유형과 가격대 결정
    const transactionTypes = Object.values(TRANSACTION_TYPES).map(t => t.value);
    const transactionType = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];

    let price = 0;
    let deposit = undefined;
    let monthlyRent = undefined;

    if (transactionType === 'sale') {
      // 판매: 1억~30억
      price = 100_000_000 + Math.floor(Math.random() * 2900_000_000);
    } else if (transactionType === 'jeonse') {
      // 전세: 5억~15억
      price = 500_000_000 + Math.floor(Math.random() * 1000_000_000);
    } else {
      // 월세: 보증금 1억~5억, 월세 300~1000만
      deposit = 100_000_000 + Math.floor(Math.random() * 400_000_000);
      monthlyRent = 3_000_000 + Math.floor(Math.random() * 700_000);
    }

    const propertyTypes = Object.values(PROPERTY_TYPES).map(t => t.value);
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const area = 20 + Math.floor(Math.random() * 150);
    const buildYear = 1990 + Math.floor(Math.random() * 34);
    const floor = Math.floor(Math.random() * 20) + 1;
    const totalFloors = floor + Math.floor(Math.random() * 10);
    const directions = ['남향', '동남향', '동향', '서향', '남서향'];
    const direction = directions[Math.floor(Math.random() * directions.length)];

    properties.push({
      id: `prop-${String(id).padStart(4, '0')}`,
      name: `${baseId} ${propertyType === 'apartment' ? '아파트' : propertyType === 'villa' ? '빌라' : '주택'} ${area}㎡`,
      type: propertyType,
      transactionType,
      price,
      deposit,
      monthlyRent,
      area,
      region: '서울',
      district: baseId,
      neighborhood: baseId,
      address,
      buildYear,
      floor,
      totalFloors,
      direction,
      parking: Math.random() > 0.3,
      elevator: totalFloors > 4,
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
    });

    id++;
  }

  return properties;
}

// 가격 이력 데이터 생성
export function generatePriceHistory(basePrice: number): PriceHistory[] {
  const history: PriceHistory[] = [];
  const now = new Date();

  // 12개월 데이터 생성
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);

    // 기초 가격에서 ±5% 변동
    const variance = (Math.random() - 0.5) * 0.1; // -5% ~ +5%
    const price = Math.round(basePrice * (1 + variance));

    history.push({
      date: date.toISOString().split('T')[0],
      price,
    });
  }

  return history;
}

// 지역별 통계 생성
export function generateRegionStats(): RegionStats[] {
  const stats: RegionStats[] = [];

  const regions = [
    '강남구', '강동구', '강북구', '강서구', '관악구',
    '광진구', '구로구', '금천구', '노원구', '도봉구',
  ];

  for (const region of regions) {
    const count = 50 + Math.floor(Math.random() * 150);
    const averagePrice = 300_000_000 + Math.floor(Math.random() * 700_000_000);
    const medianPrice = Math.round(averagePrice * 0.95);
    const priceChange = (Math.random() - 0.5) * 10; // -5% ~ +5%

    stats.push({
      region,
      count,
      averagePrice,
      medianPrice,
      priceChange,
    });
  }

  return stats;
}

// 싱글톤 모의 데이터
let mockPropertiesCache: Property[] | null = null;

export function getMockProperties(): Property[] {
  if (!mockPropertiesCache) {
    mockPropertiesCache = generateMockProperties();
  }
  return mockPropertiesCache;
}
