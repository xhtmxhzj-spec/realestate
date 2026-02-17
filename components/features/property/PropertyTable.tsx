'use client';

import { useState, useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import { Property } from '@/types/property';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PropertyCard } from './PropertyCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyTableProps {
  properties: Property[];
}

// 포맷팅 함수들
const formatPrice = (price: number) => {
  if (price >= 100_000_000) {
    return `${(price / 100_000_000).toFixed(1)}억`;
  }
  return `${(price / 10_000).toFixed(0)}만`;
};

const getPropertyTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    apartment: '아파트',
    officetel: '오피스텔',
    villa: '빌라',
    house: '주택',
  };
  return labels[type] || type;
};

const getTransactionTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    sale: '매매',
    jeonse: '전세',
    monthly: '월세',
  };
  return labels[type] || type;
};

// 테이블 컬럼 정의
const columns: ColumnDef<Property>[] = [
  {
    accessorKey: 'name',
    header: '이름',
    cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
  },
  {
    accessorKey: 'type',
    header: '타입',
    cell: ({ row }) => getPropertyTypeLabel(row.getValue('type') as string),
    size: 60,
  },
  {
    accessorKey: 'price',
    header: '가격',
    cell: ({ row }) => formatPrice(row.getValue('price') as number),
    sortingFn: 'basic',
  },
  {
    accessorKey: 'area',
    header: '면적 (㎡)',
    cell: ({ row }) => `${row.getValue('area')}㎡`,
  },
  {
    accessorKey: 'district',
    header: '위치',
    cell: ({ row }) => row.getValue('district'),
  },
  {
    accessorKey: 'buildYear',
    header: '건축년도',
    cell: ({ row }) => row.getValue('buildYear'),
  },
];

export function PropertyTable({ properties }: PropertyTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isCompactView, setIsCompactView] = useState(false);

  const table = useReactTable({
    data: properties,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  // 모바일에서는 카드 뷰로 표시
  if (isCompactView) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCompactView(false)}
          >
            테이블 보기
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* 뷰 전환 버튼 */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            총 {properties.length}개 매물
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCompactView(true)}
            className="md:hidden"
          >
            카드 보기
          </Button>
        </div>

        {/* 테이블 */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span>
                          {header.column.getIsSorted() === 'asc' && ' 🔼'}
                          {header.column.getIsSorted() === 'desc' && ' 🔽'}
                        </span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* 모바일 카드 뷰 */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {table.getRowModel().rows.map((row) => (
            <PropertyCard key={row.id} property={row.original} />
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex items-center justify-between gap-2 mt-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {table.getState().pagination.pageIndex + 1} /{' '}
            {table.getPageCount()} 페이지
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="gap-1"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
