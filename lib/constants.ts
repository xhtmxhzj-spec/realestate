// 상수 정의

export const PROPERTY_TYPES = {
  apartment: { label: '아파트', value: 'apartment' },
  officetel: { label: '오피스텔', value: 'officetel' },
  villa: { label: '빌라', value: 'villa' },
  house: { label: '주택', value: 'house' },
} as const;

export const TRANSACTION_TYPES = {
  sale: { label: '매매', value: 'sale' },
  jeonse: { label: '전세', value: 'jeonse' },
  monthly: { label: '월세', value: 'monthly' },
} as const;

export const DIRECTIONS = [
  '남향',
  '동남향',
  '동향',
  '동북향',
  '북향',
  '서북향',
  '서향',
  '남서향',
] as const;

// 서울 주요 지역
export const SEOUL_REGIONS = {
  강남구: ['강남', '역삼', '신사', '압구정', '삼성'],
  강동구: ['강일', '성수', '천호'],
  강북구: ['수유', '미아', '도봉'],
  강서구: ['등촌', '방화', '발산'],
  관악구: ['봉천', '신림', '인헌'],
  광진구: ['광장', '자양', '중곡'],
  구로구: ['구로', '고척', '가리봉'],
  금천구: ['독산', '시흥'],
  노원구: ['노원', '상계', '중계'],
  도봉구: ['도봉', '창동', '쌍문'],
  동대문구: ['용두', '신설', '제기'],
  동작구: ['노량진', '흑석', '보라매'],
  마포구: ['합정', '망원', '연남'],
  서대문구: ['홍제', '남가좌', '북가좌'],
  서초구: ['서초', '방배', '양재'],
  성동구: ['성수', '왕십리', '행당'],
  성북구: ['성북', '길음', '석관'],
  송파구: ['송파', '풍납', '방이'],
  양천구: ['목동', '신정', '여의도'],
  영등포구: ['여의동', '영등포', '당산'],
  용산구: ['한남', '이태원', '서빙고'],
  은평구: ['불광', '역촌', '녹번'],
  종로구: ['종로', '을지로', '무악'],
  중구: ['명동', '소공', '충무로'],
  중랑구: ['면목', '상봉', '중랑'],
} as const;

// 경기 주요 지역
export const GYEONGGI_REGIONS = {
  수원시: ['팔달', '영통', '권선', '장안'],
  성남시: ['분당', '수정', '중원'],
  인천시: ['부평', '남동', '연수', '서구'],
  의정부시: ['의정부', '가능'],
  안산시: ['단원', '상록'],
  고양시: ['일산', '덕양'],
  과천시: ['과천'],
  하남시: ['하남'],
  이천시: ['이천'],
  여주시: ['여주'],
} as const;

export const REGIONS = { ...SEOUL_REGIONS, ...GYEONGGI_REGIONS } as const;

// 가격 범위 (원)
export const PRICE_PRESETS = {
  min: 100_000_000, // 1억
  max: 3_000_000_000, // 30억
  step: 10_000_000, // 1천만
} as const;

// 면적 범위 (㎡)
export const AREA_PRESETS = {
  min: 10,
  max: 300,
  step: 5,
} as const;

// 건축연도 범위
export const BUILD_YEAR_PRESETS = {
  min: 1980,
  max: 2024,
} as const;

// 가격대별 분류
export const PRICE_BRACKETS = [
  { min: 0, max: 100_000_000, label: '1억 이하' },
  { min: 100_000_001, max: 300_000_000, label: '1-3억' },
  { min: 300_000_001, max: 500_000_000, label: '3-5억' },
  { min: 500_000_001, max: Infinity, label: '5억 이상' },
] as const;

// 다크모드 클래스명
export const DARK_MODE_CLASS = 'dark';
