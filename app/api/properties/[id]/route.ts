import { NextRequest, NextResponse } from 'next/server';
import { getMockProperties } from '@/lib/mock-data';

/**
 * GET /api/properties/[id]
 * 개별 부동산 데이터 반환
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const allProperties = getMockProperties();
    const property = allProperties.find((p) => p.id === id);

    if (!property) {
      return NextResponse.json(
        { error: '해당 매물을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: '요청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
