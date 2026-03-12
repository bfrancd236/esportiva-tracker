import { NextRequest, NextResponse } from 'next/server';
import { trackingEventSchema } from '@/lib/validators';
import { trackingService } from '@/services/tracking.service';
import { getClientIp, getUserAgent } from '@/lib/utils';
import { logger } from '@/lib/logger';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const params = {
      linkname: searchParams.get('linkname') || '',
      nomecampanha: searchParams.get('nomecampanha') || '',
      valor: searchParams.get('valor') || '',
      dataRegistro: searchParams.get('dataRegistro') || '',
    };

    logger.debug('Received tracking request', params);

    const validatedData = trackingEventSchema.parse(params);

    const ip = getClientIp(request);
    const userAgent = getUserAgent(request);

    const event = await trackingService.createTrackingEvent(
      validatedData,
      ip,
      userAgent
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Evento registrado com sucesso',
        data: {
          id: event.id.toString(),
          link_name: event.link_name,
          campaign_name: event.campaign_name,
          value: Number(event.value),
          registration_date: event.registration_date.toISOString(),
          created_at: event.created_at.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      logger.warn('Validation error in tracking request', { errors });

      return NextResponse.json(
        {
          success: false,
          error: 'Dados inválidos',
          details: errors,
        },
        { status: 400 }
      );
    }

    logger.error('Error processing tracking request', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao processar requisição',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
