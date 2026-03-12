import { NextResponse } from 'next/server';
import { trackingService } from '@/services/tracking.service';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const links = await trackingService.getLinkNames();

    return NextResponse.json({
      success: true,
      data: links,
    });
  } catch (error) {
    logger.error('Error fetching links', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar links',
      },
      { status: 500 }
    );
  }
}
