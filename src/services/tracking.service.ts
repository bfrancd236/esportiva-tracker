import { trackingEventRepository } from '@/repositories/tracking-event.repository';
import { TrackingEventInput } from '@/lib/validators';
import { parseDecimal } from '@/lib/utils';
import { logger } from '@/lib/logger';
import { DashboardFilters } from '@/types';

export class TrackingService {
  async createTrackingEvent(
    input: TrackingEventInput,
    ip: string | null,
    userAgent: string | null
  ) {
    try {
      const value = parseDecimal(input.valor);
      const registrationDate = new Date(input.dataRegistro);

      const event = await trackingEventRepository.create({
        link_name: input.linkname,
        campaign_name: input.nomecampanha,
        value,
        registration_date: registrationDate,
        ip,
        user_agent: userAgent,
      });

      logger.info('Tracking event created', {
        id: event.id.toString(),
        campaign: event.campaign_name,
        link: event.link_name,
      });

      return event;
    } catch (error) {
      logger.error('Error creating tracking event', error);
      throw error;
    }
  }

  async getEvents(filters: DashboardFilters) {
    try {
      return await trackingEventRepository.findMany(filters);
    } catch (error) {
      logger.error('Error fetching tracking events', error);
      throw error;
    }
  }

  async getStats(filters?: Omit<DashboardFilters, 'page' | 'limit'>) {
    try {
      return await trackingEventRepository.getStats(filters);
    } catch (error) {
      logger.error('Error fetching stats', error);
      throw error;
    }
  }

  async getCampaignNames() {
    try {
      return await trackingEventRepository.getCampaignNames();
    } catch (error) {
      logger.error('Error fetching campaign names', error);
      throw error;
    }
  }

  async getLinkNames() {
    try {
      return await trackingEventRepository.getLinkNames();
    } catch (error) {
      logger.error('Error fetching link names', error);
      throw error;
    }
  }
}

export const trackingService = new TrackingService();
