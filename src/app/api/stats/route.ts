import { NextRequest, NextResponse } from 'next/server';
import { trackingService } from '@/services/tracking.service';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      campaign: searchParams.get('campaign') || undefined,
      linkname: searchParams.get('linkname') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
    };

    const stats = await trackingService.getStats(filters);

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    logger.error('Error fetching stats', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar estatísticas',
      },
      { status: 500 }
    );
  }
}
