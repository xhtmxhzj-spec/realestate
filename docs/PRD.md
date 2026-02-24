# PRD: 부동산 데이터분석 Starter Kit

---

## 프로젝트 개요

- **프로젝트명**: RealData Hub — 부동산 데이터분석 Starter Kit
- **목적**: 부동산 매물 데이터를 기반으로 웹에서 실시간 통계·차트·비교 기능으로 분석할 수 있는 데이터 대시보드 제공
- **설계 철학**: Mock 데이터를 활용하여 빠르게 프로토타이핑하고, 추후 실제 DB 연동 시 최소한의 변경으로 확장 가능한 구조

---

## 주요 기능

1. **대시보드**: 부동산 시장 통계 카드 및 Recharts 차트 시각화
   - 지역별 평균가격 바차트
   - 가격대 분포 파이차트
   - 월별 가격 추이 라인차트

2. **실시간 데이터 필터링**: Zustand 상태 관리 기반 필터링
   - 지역·가격범위·면적범위·매물타입별 필터링
   - 클라이언트 사이드 필터링
   - API 쿼리 파라미터 병행

3. **데이터 내보내기**: TanStack Table에 표시된 필터 결과를 CSV/Excel 형식 다운로드
   - PapaParse를 활용한 데이터 변환
   - 현재 필터 상태 기반 내보내기

4. **부동산 상세 페이지**: 개별 매물의 종합 정보 제공
   - 기본 정보 (가격, 면적, 층수 등)
   - 가격 이력 라인차트
   - 유사 매물 추천 (같은 지역/유사 가격대)

5. **매물 비교 기능**: 최대 4개 매물 선택 후 나란히 비교
   - Zustand 비교 스토어로 상태 관리
   - 속성 비교 테이블
   - 실시간 추가/제거

6. **다크모드**: Light/Dark 테마 토글
   - Zustand + localStorage persist 기반
   - 새로고침 후에도 사용자 선택 유지

7. **반응형 디자인**: Tailwind CSS 4 기반 완벽한 반응형 지원
   - 모바일 (375px)
   - 태블릿 (768px)
   - 데스크톱 (1280px+)

---

## 기술 스택

- **Frontend**: Next.js 16.1.6 (App Router), TypeScript 5.x
- **Styling**: Tailwind CSS 4, shadcn/ui (new-york 스타일)
- **Icons**: Lucide React
- **상태관리**: Zustand 5
- **차트**: Recharts 3
- **테이블**: TanStack Table 8
- **폼**: React Hook Form 7 + Zod 4
- **데이터 내보내기**: PapaParse 5
- **날짜 처리**: date-fns 4

---

## 데이터 구조

### Property 인터페이스

```typescript
interface Property {
  id: string;                // 고유 ID
  name: string;              // 매물명
  type: PropertyType;        // 매물 타입 (apartment, officetel, villa, house)
  transactionType: TransactionType;  // 거래 유형 (sale, jeonse, monthly)
  price: number;             // 가격 (원)
  deposit?: number;          // 월세 보증금 (원)
  monthlyRent?: number;      // 월세 (원)
  area: number;              // 면적 (㎡)
  region: string;            // 시/도 (예: "서울")
  district: string;          // 구 (예: "강남구")
  neighborhood: string;      // 동 (예: "역삼동")
  address: string;           // 전체 주소
  buildYear: number;         // 건축연도
  floor: number;             // 현재 층수
  totalFloors: number;       // 전체 층수
  direction: string;         // 향 (남향, 동남향 등)
  parking: boolean;          // 주차 여부
  elevator: boolean;         // 엘리베이터 여부
  createdAt: Date;           // 등록일
}
```

### 필터 인터페이스

```typescript
interface PropertyFilters {
  region?: string;
  district?: string;
  propertyType?: PropertyType[];
  transactionType?: TransactionType[];
  priceRange: [number, number];      // [최소, 최대]
  areaRange: [number, number];       // [최소, 최대]
  buildYearRange?: [number, number];
}
```

### 가격 이력

```typescript
interface PriceHistory {
  date: string;  // YYYY-MM-DD 형식
  price: number; // 가격 (원)
}
```

### 지역별 통계

```typescript
interface RegionStats {
  region: string;
  count: number;        // 매물 수
  averagePrice: number; // 평균 가격
  medianPrice: number;  // 중앙값
  priceChange: number;  // 전월 대비 변화율 (%)
}
```

---

## 화면 구성 & 라우트

### 1. 홈 페이지 (`/`)

**목적**: 서비스 소개 및 최신 매물 정보 한눈에 보기

**주요 구성**:
- 히어로 섹션 (타이틀, 설명, CTA 버튼)
- 주요 통계 요약 카드 (총 매물 수, 평균 가격, 지역별 분포)
- 지역별 통계 바차트
- 최신 매물 그리드 (카드형, 6개 표시)
- 반응형: 모바일 1열, 태블릿 2열, 데스크톱 3열

**데이터 로딩**:
- Mock 데이터 기반 (generateMockProperties, generateRegionStats 사용)
- 최신 등록 매물 순 정렬

---

### 2. 대시보드 페이지 (`/dashboard`)

**목적**: 상세한 데이터 분석 및 필터링

**주요 구성**:
- **필터바**: 지역, 가격범위, 면적범위, 매물타입 필터
- **통계 카드**: 필터 적용 후 집계 통계
- **3종 차트**:
  - 지역별 평균가격 바차트
  - 가격대별 분포 파이차트
  - 월별 가격 추이 라인차트
- **데이터 테이블** (TanStack Table):
  - 정렬 기능
  - 페이지네이션
  - CSV 내보내기 버튼

**상태 관리**:
- Zustand 필터 스토어로 필터 상태 관리
- API 쿼리 파라미터로 필터 조건 전달

**데이터 흐름**:
1. 사용자가 필터 변경
2. Zustand 스토어 업데이트
3. API 호출 (`GET /api/properties?region=...&priceMin=...` 등)
4. 차트, 테이블 자동 갱신

---

### 3. 매물 상세 페이지 (`/property/[id]`)

**목적**: 개별 매물의 종합 정보 제공

**주요 구성**:
- **기본 정보 탭**:
  - 매물명, 주소, 이미지 (있는 경우)
  - 가격, 면적, 층수, 건축연도
  - 향, 주차 여부, 엘리베이터 여부
  - 거래 유형별 가격 정보
  - 설명

- **가격 이력 탭**:
  - 12개월 가격 추이 라인차트
  - 가격 변동 테이블 (날짜, 가격, 변동율)

- **유사 매물 탭**:
  - 같은 지역 & 유사 가격대 (±20%) 매물 추천
  - 카드형 그리드 (최대 6개)

**액션**:
- 비교 추가 버튼: 비교 스토어에 현재 매물 추가 (최대 4개)
- 공유 버튼: 매물 링크 복사

**데이터 로딩**:
- Mock 데이터 기반 동적 라우팅
- API: `GET /api/properties/[id]`

---

### 4. 비교 페이지 (`/compare`)

**목적**: 선택한 매물들을 나란히 비교

**주요 구성**:
- **비교 선택 영역**:
  - 현재 비교 중인 매물 최대 4개 표시
  - 각 매물별 제거 버튼

- **속성 비교 테이블**:
  - 행: 속성 (가격, 면적, 층수, 건축연도, 향, 주차, 엘리베이터 등)
  - 열: 각 매물의 값
  - 강조 표시: 차이가 큰 항목 (예: 가장 저렴, 가장 큼 등)

- **빈 상태**:
  - 비교 매물이 없을 때: "매물을 선택해주세요" 메시지
  - 대시보드 링크

**상태 관리**:
- Zustand 비교 스토어 (`useComparisonStore`)
- localStorage persist

---

## API 엔드포인트

### GET /api/properties

**목적**: 필터링된 매물 목록 조회

**쿼리 파라미터**:
```
?region=서울&district=강남구&priceMin=500000000&priceMax=2000000000&areaMin=30&areaMax=100&propertyType=apartment&transactionType=sale
```

**응답**:
```json
[
  {
    "id": "prop-0001",
    "name": "강남 아파트 60㎡",
    "type": "apartment",
    "transactionType": "sale",
    "price": 1500000000,
    ...
  },
  ...
]
```

**오류 처리**:
- 400: 잘못된 쿼리 파라미터
- 500: 서버 오류
- Fallback: 빈 배열 반환

---

### GET /api/properties/[id]

**목적**: 특정 매물 상세 정보 조회

**응답**:
```json
{
  "id": "prop-0001",
  "name": "강남 아파트 60㎡",
  ...,
  "priceHistory": [
    { "date": "2024-02", "price": 1450000000 },
    { "date": "2024-03", "price": 1500000000 }
  ]
}
```

---

## 구현 범위

### Phase 1: 기본 레이아웃 & 컴포넌트
- [ ] 공통 레이아웃 (Header, Footer, Navigation)
- [ ] 기본 UI 컴포넌트 (Button, Card, Input, Select 등)
- [ ] 다크모드 토글 (Zustand + localStorage)

### Phase 2: 홈 & 대시보드
- [ ] 홈 페이지 UI 구현
- [ ] 대시보드 필터바 컴포넌트
- [ ] 3종 차트 컴포넌트 (Recharts)
- [ ] TanStack Table 구현
- [ ] Zustand 필터 스토어

### Phase 3: 매물 상세 & 비교
- [ ] 상세 페이지 탭 UI
- [ ] 가격 이력 라인차트
- [ ] 유사 매물 추천 로직
- [ ] 비교 페이지 & 속성 비교 테이블
- [ ] Zustand 비교 스토어

### Phase 4: 부가 기능
- [ ] CSV 내보내기 (PapaParse)
- [ ] 반응형 디자인 최적화
- [ ] 오류 처리 & Fallback UI
- [ ] 성능 최적화

---

## 스토어 구조 (Zustand)

### FilterStore

```typescript
interface FilterState {
  // 필터 값
  region?: string;
  district?: string;
  propertyType: PropertyType[];
  transactionType: TransactionType[];
  priceRange: [number, number];
  areaRange: [number, number];

  // 액션
  setRegion: (region: string) => void;
  setDistrict: (district: string) => void;
  setPropertyType: (types: PropertyType[]) => void;
  setTransactionType: (types: TransactionType[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setAreaRange: (range: [number, number]) => void;
  reset: () => void;
}
```

### ComparisonStore

```typescript
interface ComparisonState {
  selectedIds: string[];  // 최대 4개
  addProperty: (id: string) => void;
  removeProperty: (id: string) => void;
  clear: () => void;
}
```

### ThemeStore

```typescript
interface ThemeState {
  isDark: boolean;
  toggle: () => void;
}
```

---

## 검증 기준

### 기능 검증
1. 홈 페이지에서 최신 매물 6개가 정상 렌더링되는지 확인
2. 대시보드에서 필터 변경 시 차트·테이블이 실시간 반영되는지 확인
3. CSV 내보내기 버튼으로 현재 필터 결과가 다운로드되는지 확인
4. 매물 상세 페이지에서 가격이력 탭이 라인차트로 시각화되는지 확인
5. 유사매물 추천이 정상적으로 표시되는지 확인
6. 비교 기능: 4개 매물 선택 후 `/compare` 페이지에서 비교 테이블 렌더링 확인
7. 비교 매물 추가/제거가 정상 작동하는지 확인

### UI/UX 검증
1. 다크모드 토글 후 새로고침해도 상태 유지되는지 확인
2. 모바일(375px), 태블릿(768px), 데스크톱(1280px) 뷰포트에서 반응형 레이아웃 확인
3. 각 페이지에서 로딩 상태 UI 표시 확인
4. 오류 발생 시 사용자 친화적 메시지 표시 확인

### 성능 검증
1. LCP (Largest Contentful Paint): 2.5초 이내
2. 차트 렌더링 성능 (대규모 데이터셋: 1000+ 항목)
3. 필터 변경 시 응답 시간: 500ms 이내

---

## 추후 확장 계획

1. **Notion CMS 연동**: Mock 데이터 → Notion API로 교체 (최소 변경)
2. **실시간 데이터**: WebSocket 기반 실시간 가격 업데이트
3. **고급 분석**: 머신러닝 기반 가격 예측
4. **모바일 앱**: React Native 포팅
5. **다국어 지원**: i18n 추가
6. **사용자 인증**: 관심 매물 저장 기능

---

## 파일 구조

```
notion-cms-project/
├── app/
│   ├── layout.tsx                 # 루트 레이아웃
│   ├── page.tsx                   # 홈 페이지
│   ├── dashboard/
│   │   └── page.tsx               # 대시보드
│   ├── property/
│   │   └── [id]/
│   │       └── page.tsx           # 매물 상세
│   ├── compare/
│   │   └── page.tsx               # 비교 페이지
│   └── api/
│       ├── properties/
│       │   ├── route.ts           # 목록 API
│       │   └── [id]/
│       │       └── route.ts       # 상세 API
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── features/
│   │   ├── dashboard/
│   │   │   ├── FilterBar.tsx
│   │   │   ├── StatCards.tsx
│   │   │   └── Charts.tsx
│   │   └── property/
│   │       ├── DetailTabs.tsx
│   │       ├── PriceHistoryChart.tsx
│   │       ├── SimilarProperties.tsx
│   │       └── CompareTable.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── ... (shadcn/ui components)
├── stores/
│   ├── filterStore.ts
│   ├── comparisonStore.ts
│   └── themeStore.ts
├── lib/
│   ├── constants.ts               # 상수 (지역, 매물타입 등)
│   ├── mock-data.ts               # Mock 데이터 생성
│   ├── utils.ts                   # 유틸 함수
│   └── export.ts                  # CSV 내보내기
├── hooks/
│   ├── useFilters.ts
│   ├── useComparison.ts
│   └── useTheme.ts
├── types/
│   └── property.ts                # Property 타입 정의
├── public/
│   └── ... (이미지, 아이콘 등)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 개발 가이드

### 로컬 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 빌드
npm run build

# 프로덕션 서버 시작
npm start

# ESLint 검사
npm run lint
```

### 코드 스타일
- TypeScript strict mode 활성화
- Prettier 사용 (2칸 들여쓰기)
- 컴포넌트는 PascalCase, 함수는 camelCase
- 한국어 주석 (비즈니스 로직)

### 브라우저 지원
- Chrome/Edge: 최신 2개 버전
- Firefox: 최신 2개 버전
- Safari: 최신 2개 버전
- iOS Safari: 최신 2개 버전

---

**문서 작성일**: 2025-02-17
**버전**: 1.0.0
