'use client';

import { Property } from '@/types/property';
import { exportToCSV, exportToExcel } from '@/lib/export';

interface UseExportDataReturn {
  exportToCSV: (properties: Property[], filename?: string) => void;
  exportToExcel: (properties: Property[], filename?: string) => void;
}

/**
 * 부동산 데이터 내보내기 기능을 제공하는 훅
 */
export function useExportData(): UseExportDataReturn {
  return {
    exportToCSV,
    exportToExcel,
  };
}
