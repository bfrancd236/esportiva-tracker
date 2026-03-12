import { NextResponse } from 'next/server';
import { trackingService } from '@/services/tracking.service';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const campaigns = await trackingService.getCampaignNames();

    return NextResponse.json({
      success: true,
      data: campaigns,
    });
  } catch (error) {
    logger.error('Error fetching campaigns', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar campanhas',
      },
      { status: 500 }
    );
  }
}
