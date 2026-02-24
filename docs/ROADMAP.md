# RealData Hub — 개발 로드맵

> 부동산 데이터분석 Starter Kit의 단계별 구현 계획 및 현황

---

## 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | RealData Hub — 부동산 데이터분석 Starter Kit |
| **목적** | Mock 데이터 기반 부동산 매물 통계·차트·비교 대시보드 |
| **설계 철학** | 빠른 프로토타이핑 + 최소 변경으로 실 DB 확장 가능 |
| **문서 기준일** | 2026-02-24 |

### 기술 스택

| 분류 | 기술 |
|------|------|
| **Frontend** | Next.js 15 (App Router), TypeScript 5.x |
| **Styling** | Tailwind CSS 4, shadcn/ui (new-york) |
| **Icons** | Lucide React |
| **상태관리** | Zustand 5 |
| **차트** | Recharts 3 |
| **테이블** | TanStack Table 8 |
| **폼** | React Hook Form 7 + Zod 4 |
| **데이터 내보내기** | PapaParse 5 |
| **날짜 처리** | date-fns 4 |

### 전체 완료 기준 (PRD 기반 검증 체크리스트)

- [ ] 홈 페이지 최신 매물 6개 렌더링
- [ ] 대시보드 필터 변경 시 차트·테이블 실시간 반영
- [ ] CSV 내보내기 — 현재 필터 결과 다운로드
- [ ] 매물 상세 페이지 가격 이력 라인차트 시각화
- [ ] 유사 매물 추천 정상 표시
- [ ] 비교 기능 — 4개 매물 선택 후 `/compare` 비교 테이블
- [ ] 다크모드 새로고침 후 상태 유지
- [ ] 375px / 768px / 1280px 반응형 레이아웃 정상

---

## Phase 1: 프로젝트 초기 설정 ✅

> **이유**: 기반이 없으면 이후 모든 작업이 불가합니다.

**예상 소요**: 0.5일 (단독 개발자 기준)

### 작업 목록

- [x] Next.js 15 프로젝트 초기화 (App Router)
- [x] TypeScript 설정 (`tsconfig.json`, strict mode)
- [x] Tailwind CSS 4 + PostCSS 설정
- [x] shadcn/ui 초기화 (`components.json`, new-york 스타일)
- [x] ESLint 설정 (`eslint.config.mjs`)
- [x] 전역 타입 정의 (`types/property.ts`)
- [x] 루트 레이아웃 (`app/layout.tsx`)
- [x] 전역 스타일 (`app/globals.css`)
- [x] Next.js 설정 (`next.config.ts`)

### 완료 기준

- `npm run dev` 실행 시 오류 없이 로컬 서버 기동
- TypeScript 컴파일 오류 없음
- shadcn/ui 컴포넌트 import 정상 동작

---

## Phase 2: 공통 모듈 & 컴포넌트 개발 ✅

> **이유**: 핵심 기능 컴포넌트가 공통 모듈(스토어, 레이아웃, Mock 데이터)에 의존합니다.

**예상 소요**: 1일 (단독 개발자 기준)

### 작업 목록

**레이아웃 컴포넌트**
- [x] `components/layout/Header.tsx` — 네비게이션, 다크모드 토글
- [x] `components/providers/ThemeProvider.tsx` — 테마 컨텍스트

**Zustand 스토어**
- [x] `stores/useFilterStore.ts` — 지역·가격범위·면적범위·매물타입 필터 상태
- [x] `stores/useComparisonStore.ts` — 비교 매물 목록 (최대 4개, localStorage persist)

**공통 유틸**
- [x] `lib/mock-data.ts` — `generateMockProperties`, `generateRegionStats` 함수
- [x] `lib/utils.ts` — 포매터, 헬퍼 함수
- [x] `lib/export.ts` — PapaParse 기반 CSV 내보내기

**UI 컴포넌트**
- [x] `components/features/theme/ThemeToggle.tsx` — Light/Dark 토글
- [x] `components/features/dashboard/StatsCard.tsx` — 통계 카드

### 완료 기준

- Zustand 스토어 상태 변경 시 구독 컴포넌트에 자동 반영
- Mock 데이터 생성 함수가 타입 오류 없이 동작
- 다크모드 토글 후 새로고침 시 상태 유지 (localStorage)

---

## Phase 3: 핵심 기능 개발 ✅

> **이유**: 레이어드 아키텍처(Repository → Service → API → Page) 순서로 의존성을 따라 빌드업합니다.

**예상 소요**: 2일 (단독 개발자 기준)

### 작업 목록

**레이어드 아키텍처**
- [x] `repositories/propertyRepository.ts` — Mock 데이터 CRUD 접근 레이어
- [x] `services/propertyService.ts` — 비즈니스 로직 (필터링, 통계 집계, 유사 매물 추천)

**API 라우트**
- [x] `app/api/properties/route.ts` — `GET /api/properties` (쿼리 파라미터 필터링)
- [x] `app/api/properties/[id]/route.ts` — `GET /api/properties/[id]` (상세 + 가격이력)

**차트 컴포넌트**
- [x] `components/features/charts/PriceDistributionChart.tsx` — 가격대별 분포 파이차트

**필터 컴포넌트**
- [x] `components/features/filters/FilterBar.tsx` — 지역·가격범위·면적범위·매물타입 필터

**페이지**
- [x] `app/page.tsx` — 홈 페이지 (히어로, 통계 카드, 바차트, 매물 그리드)
- [x] `app/dashboard/page.tsx` — 대시보드 (필터바, 3종 차트, TanStack Table)
- [x] `app/property/[id]/page.tsx` — 매물 상세 (기본정보·가격이력·유사매물 탭)

**매물 컴포넌트**
- [x] `components/features/property/PropertyCard.tsx` — 매물 카드
- [x] `components/features/property/PropertyDetail.tsx` — 매물 상세 (탭 UI)
- [x] `components/features/property/PropertyTable.tsx` — TanStack Table (정렬, 페이지네이션)

### 완료 기준

- `GET /api/properties?region=서울` 응답이 필터링된 매물 배열 반환
- `GET /api/properties/[id]` 응답에 `priceHistory` 배열 포함
- 대시보드 필터 변경 시 차트·테이블 데이터 실시간 갱신 (500ms 이내)
- 매물 상세 페이지 3개 탭(기본정보, 가격이력, 유사매물) 정상 전환

---

## Phase 4: 추가 기능 개발 ✅

> **이유**: 핵심 기능 완성 후 부가 기능을 추가하면 리팩토링 비용이 최소화됩니다.

**예상 소요**: 1일 (단독 개발자 기준)

### 작업 목록

**비교 기능**
- [x] `app/compare/page.tsx` — 비교 페이지 (속성 비교 테이블, 강조 표시)
- [x] 비교 추가/제거 버튼 (`PropertyDetail.tsx` 내 `useComparisonStore` 연동)
- [x] 빈 상태 UI ("매물을 선택해주세요" + 대시보드 링크)

**데이터 내보내기**
- [x] CSV 내보내기 버튼 (대시보드 테이블 상단)
- [x] PapaParse 기반 필터 결과 CSV 변환 및 다운로드

**반응형 디자인**
- [x] 모바일(375px) — 단일 열 레이아웃, 축약 UI
- [x] 태블릿(768px) — 2열 그리드
- [x] 데스크톱(1280px+) — 3열 그리드, 사이드바 레이아웃

**에러 처리**
- [x] API 오류 시 사용자 친화적 메시지
- [x] 빈 결과 Fallback UI
- [x] 로딩 스켈레톤 UI

### 완료 기준

- 4개 매물 선택 후 `/compare` 페이지에서 속성 비교 테이블 렌더링
- CSV 다운로드 파일에 현재 필터 결과 데이터 포함
- 모든 페이지에서 3개 뷰포트 반응형 레이아웃 정상

---

## Phase 5: 최적화 및 배포 🔄

> **이유**: 마지막에 최적화해야 불필요한 중복 작업을 방지할 수 있습니다.

**예상 소요**: 0.5일 (단독 개발자 기준)

### 작업 목록

**DTO 패턴 완성**
- [x] `types/dto.ts` — 요청/응답 DTO 타입 정의
- [x] `types/api.ts` — API 응답 공통 타입
- [ ] `lib/api-response.ts` — 일관된 API 응답 형식 헬퍼 (작업 중)

**성능 최적화**
- [ ] React `memo`, `useMemo`, `useCallback` 적용 — 불필요한 리렌더링 방지
- [ ] 차트 컴포넌트 지연 로딩 (`dynamic import`)
- [ ] 이미지 최적화 (`next/image`)

**안정성 강화**
- [ ] FOUC(Flash of Unstyled Content) 방지 — 다크모드 초기 깜빡임 제거
- [ ] `next build` 오류 없음 확인
- [ ] LCP 2.5초 이내 검증

**빌드 검증**
- [ ] `npm run build` 정상 완료
- [ ] `npm run lint` 경고 없음
- [ ] TypeScript strict 모드 오류 없음

### 완료 기준

- `npm run build` 성공 (오류 없음)
- LCP ≤ 2.5초 (Lighthouse 측정)
- 필터 변경 응답 시간 ≤ 500ms
- 다크모드 새로고침 시 깜빡임 없음

---

## 추후 확장 계획 (PRD 기반)

PRD에서 정의한 미래 기능으로, 현재 아키텍처에서 최소 변경으로 구현 가능합니다.

| 우선순위 | 기능 | 설명 | 의존 조건 |
|---------|------|------|-----------|
| 1 | **Notion CMS 연동** | Mock 데이터 → Notion API 교체 | `propertyRepository.ts` 구현체 교체만으로 가능 |
| 2 | **실시간 데이터** | WebSocket 기반 실시간 가격 업데이트 | Zustand 스토어 확장 |
| 3 | **사용자 인증** | 관심 매물 저장, 개인화 | NextAuth.js + DB 연동 |
| 4 | **고급 분석** | 머신러닝 기반 가격 예측 | Python API 서버 연동 |
| 5 | **다국어 지원** | i18n 추가 (한국어/영어) | `next-intl` 라이브러리 |
| 6 | **모바일 앱** | React Native 포팅 | 공통 비즈니스 로직 분리 |

---

## 구현 진행률 요약

```
Phase 1: 프로젝트 초기 설정     ████████████████████ 100% ✅
Phase 2: 공통 모듈/컴포넌트     ████████████████████ 100% ✅
Phase 3: 핵심 기능 개발         ████████████████████ 100% ✅
Phase 4: 추가 기능 개발         ████████████████████ 100% ✅
Phase 5: 최적화 및 배포         ████████████░░░░░░░░  60% 🔄
```

> **범례**: ✅ 완료 | 🔄 진행 중 | ⏳ 대기

---

*문서 최종 수정: 2026-02-24*
