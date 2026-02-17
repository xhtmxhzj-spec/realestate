import Papa from 'papaparse';
import { Property } from '@/types/property';
import { PROPERTY_TYPES, TRANSACTION_TYPES } from './constants';

/**
 * 부동산 배열을 CSV 형식으로 변환 및 다운로드
 */
export function exportToCSV(properties: Property[], filename: string = 'properties.csv') {
  // 다운로드할 데이터 포맷팅
  const data = properties.map((property) => ({
    '이름': property.name,
    '타입': getPropertyTypeLabel(property.type),
    '거래유형': getTransactionTypeLabel(property.transactionType),
    '가격 (원)': property.price.toLocaleString('ko-KR'),
    '보증금 (원)': property.deposit ? property.deposit.toLocaleString('ko-KR') : '-',
    '월세 (원)': property.monthlyRent ? property.monthlyRent.toLocaleString('ko-KR') : '-',
    '면적 (㎡)': property.area,
    '시/도': property.region,
    '구': property.district,
    '동': property.neighborhood,
    '주소': property.address,
    '건축년도': property.buildYear,
    '층수': `${property.floor}/${property.totalFloors}`,
    '향': property.direction,
    '주차': property.parking ? '가능' : '불가',
    '엘리베이터': property.elevator ? '있음' : '없음',
    '등록일': new Date(property.createdAt).toLocaleDateString('ko-KR'),
  }));

  // CSV로 변환
  const csv = Papa.unparse(data);

  // BOM 추가 (Excel에서 한글 깨짐 방지)
  const bom = '\uFEFF';
  const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });

  // 다운로드
  downloadFile(blob, filename);
}

/**
 * 부동산 배열을 Excel 호환 포맷으로 다운로드
 * (실제 Excel 파일이 아닌 CSV를 Excel로 열 수 있는 형식)
 */
export function exportToExcel(properties: Property[], filename: string = 'properties.xlsx') {
  // CSV 포맷과 동일하게 처리 (Excel에서 열 수 있음)
  exportToCSV(properties, filename.replace('.xlsx', '.csv'));
}

/**
 * 파일 다운로드 헬퍼 함수
 */
function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 부동산 타입 레이블 조회
 */
function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    apartment: '아파트',
    officetel: '오피스텔',
    villa: '빌라',
    house: '주택',
  };
  return labels[type] || type;
}

/**
 * 거래 유형 레이블 조회
 */
function getTransactionTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    sale: '매매',
    jeonse: '전세',
    monthly: '월세',
  };
  return labels[type] || type;
}
