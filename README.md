# 부동산 데이터분석 Starter Kit

**RealData Hub** — 실시간 부동산 데이터를 시각화하고 분석할 수 있는 완성도 높은 Next.js 대시보드입니다.

> 📌 **전체 프로젝트 사양은 [PRD.md](./PRD.md)를 참고하세요.**

## 🚀 주요 기능

- **대시보드**: 부동산 시장 통계 및 차트 시각화
- **데이터 필터링**: 지역, 가격, 면적, 타입별 실시간 필터링
- **데이터 내보내기**: CSV/Excel 형식으로 데이터 다운로드
- **부동산 상세**: 개별 매물 상세 정보 및 가격 추이
- **비교 기능**: 최대 4개 매물 나란히 비교
- **다크모드**: Light/Dark 테마 토글
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원

## 🛠️ 기술 스택

- **Framework**: Next.js 16.1.6
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Form**: React Hook Form + Zod
- **Charts**: Recharts
- **Table**: TanStack Table
- **Data Export**: PapaParse

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 📂 디렉토리 구조

```
.
├── app/                      # Next.js 앱 라우터
│   ├── api/                 # API 라우트
│   ├── dashboard/           # 대시보드 페이지
│   ├── property/[id]/       # 부동산 상세 페이지
│   ├── layout.tsx           # 루트 레이아웃
│   └── page.tsx             # 홈 페이지
├── components/
│   ├── features/            # 기능별 컴포넌트
│   │   ├── charts/          # 차트 컴포넌트
│   │   ├── dashboard/       # 대시보드 컴포넌트
│   │   ├── filters/         # 필터 컴포넌트
│   │   ├── property/        # 부동산 컴포넌트
│   │   └── theme/           # 테마 컴포넌트
│   ├── layout/              # 레이아웃 컴포넌트
│   ├── providers/           # 프로바이더
│   └── ui/                  # shadcn/ui 컴포넌트
├── hooks/                   # 커스텀 훅
├── stores/                  # Zustand 스토어
├── types/                   # TypeScript 타입
└── lib/
    ├── constants.ts         # 상수
    ├── export.ts            # 내보내기 함수
    └── mock-data.ts         # 모의 데이터
```

## 🎨 주요 컴포넌트

### 대시보드 (`/dashboard`)

통계 카드, 차트, 필터, 테이블을 포함한 완전한 분석 대시보드

- **StatsCard**: 주요 통계 표시
- **PriceChart**: 가격 추이 라인 차트
- **RegionChart**: 지역별 평균 가격 바 차트
- **PriceDistributionChart**: 가격대별 분포 파이 차트
- **FilterBar**: 다양한 필터 옵션
- **PropertyTable**: 정렬, 페이지네이션 기능이 있는 테이블

### 부동산 상세 (`/property/[id]`)

개별 매물의 상세 정보 및 분석

- **PropertyDetail**: 기본 정보, 가격 이력, 유사 매물 탭
- **비교 목록**: 최대 4개 매물 비교

## 🚀 사용 방법

### 홈 페이지

- 주요 통계 및 최신 매물 확인
- "대시보드로 이동" 버튼으로 이동

### 대시보드

1. **필터 설정**: FilterBar에서 원하는 조건 선택
2. **데이터 확인**: 차트와 테이블에서 결과 확인
3. **데이터 내보내기**: ExportButton에서 CSV/Excel 선택
4. **카드 클릭**: 부동산 상세 페이지로 이동

## 🎯 성능 최적화

- Recharts는 클라이언트 컴포넌트로 구성
- TanStack Table의 useMemo로 렌더링 최적화
- Zustand의 persist로 테마 저장
- Code splitting으로 번들 크기 최소화

## 📱 반응형 디자인

- **모바일** (< 768px): 1열 레이아웃, 카드 뷰 테이블
- **태블릿** (768px ~ 1024px): 2열 그리드
- **데스크톱** (1024px+): 3-4열 그리드

## 🌓 다크모드

- Header의 테마 토글로 전환
- localStorage에 자동 저장
- 초기 로드 시 저장된 테마 적용

## 📝 코드 스타일

- **주석**: 한국어 (비즈니스 로직만)
- **변수명**: camelCase (영어)
- **컴포넌트명**: PascalCase
- **상수**: UPPER_SNAKE_CASE
- **들여쓰기**: 2칸

## 📋 프로젝트 정보

- **상태**: MVP (최소 기능 제품)
- **버전**: 1.0.0
- **라이선스**: MIT
- **Node**: 18+ 권장

## 💡 시작 가이드

### 빠른 시작

```bash
# 저장소 클론
git clone https://github.com/your-username/notion-cms-project.git
cd notion-cms-project

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 주요 페이지

- **홈**: http://localhost:3000/
- **대시보드**: http://localhost:3000/dashboard
- **부동산 상세**: http://localhost:3000/property/prop-0001

## 🔄 향후 확장 계획

- [ ] Notion CMS 연동
- [ ] 실시간 데이터 업데이트 (WebSocket)
- [ ] 가격 예측 AI 모델
- [ ] 사용자 인증 및 관심 매물 저장
- [ ] 모바일 앱 (React Native)
- [ ] 다국어 지원

## 📧 피드백

이 프로젝트에 대한 피드백이나 제안은 [Issues](https://github.com/your-username/notion-cms-project/issues)에 등록해주세요.

---

**주의**: 이 프로젝트는 현재 **모의 데이터**를 사용합니다.

실제 데이터 소스와 연동하려면:
- `lib/mock-data.ts` 대신 실제 API 호출 구현
- 또는 향후 [Notion CMS 연동](./PRD.md#추후-확장-계획) 예정
