'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useExportData } from '@/hooks/useExportData';
import { Property } from '@/types/property';

interface ExportButtonProps {
  properties: Property[];
}

export function ExportButton({ properties }: ExportButtonProps) {
  const { exportToCSV, exportToExcel } = useExportData();

  const handleExportCSV = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    exportToCSV(properties, `properties-${timestamp}.csv`);
  };

  const handleExportExcel = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    exportToExcel(properties, `properties-${timestamp}.xlsx`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          내보내기
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportCSV}>
          CSV로 내보내기
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportExcel}>
          Excel로 내보내기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
