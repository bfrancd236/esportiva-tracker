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
      search: searchParams.get('search') || undefined,
      page: parseInt(searchParams.get('page') || '1', 10),
      limit: parseInt(searchParams.get('limit') || '10', 10),
    };

    const result = await trackingService.getEvents(filters);

    const serializedData = result.data.map((event) => ({
      id: event.id.toString(),
      link_name: event.link_name,
      campaign_name: event.campaign_name,
      value: Number(event.value),
      registration_date: event.registration_date.toISOString(),
      ip: event.ip,
      user_agent: event.user_agent,
      created_at: event.created_at.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: serializedData,
      pagination: result.pagination,
    });
  } catch (error) {
    logger.error('Error fetching events', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar eventos',
      },
      { status: 500 }
    );
  }
}
