import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { DashboardFilters } from '@/types';

export class TrackingEventRepository {
  async create(data: {
    link_name: string;
    campaign_name: string;
    value: number;
    registration_date: Date;
    ip: string | null;
    user_agent: string | null;
  }) {
    return await prisma.trackingEvent.create({
      data: {
        link_name: data.link_name,
        campaign_name: data.campaign_name,
        value: data.value,
        registration_date: data.registration_date,
        ip: data.ip,
        user_agent: data.user_agent,
      },
    });
  }

  async findMany(filters: DashboardFilters) {
    const where: Prisma.TrackingEventWhereInput = {};

    if (filters.campaign) {
      where.campaign_name = {
        contains: filters.campaign,
        mode: 'insensitive',
      };
    }

    if (filters.linkname) {
      where.link_name = {
        contains: filters.linkname,
        mode: 'insensitive',
      };
    }

    if (filters.search) {
      where.OR = [
        {
          campaign_name: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
        {
          link_name: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (filters.dateFrom || filters.dateTo) {
      where.registration_date = {};
      
      if (filters.dateFrom) {
        where.registration_date.gte = new Date(filters.dateFrom);
      }
      
      if (filters.dateTo) {
        const dateTo = new Date(filters.dateTo);
        dateTo.setHours(23, 59, 59, 999);
        where.registration_date.lte = dateTo;
      }
    }

    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.trackingEvent.findMany({
        where,
        orderBy: {
          created_at: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.trackingEvent.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getStats(filters?: Omit<DashboardFilters, 'page' | 'limit'>) {
    const where: Prisma.TrackingEventWhereInput = {};

    if (filters?.campaign) {
      where.campaign_name = {
        contains: filters.campaign,
        mode: 'insensitive',
      };
    }

    if (filters?.linkname) {
      where.link_name = {
        contains: filters.linkname,
        mode: 'insensitive',
      };
    }

    if (filters?.dateFrom || filters?.dateTo) {
      where.registration_date = {};
      
      if (filters.dateFrom) {
        where.registration_date.gte = new Date(filters.dateFrom);
      }
      
      if (filters.dateTo) {
        const dateTo = new Date(filters.dateTo);
        dateTo.setHours(23, 59, 59, 999);
        where.registration_date.lte = dateTo;
      }
    }

    const [totalEvents, aggregations, uniqueCampaigns, uniqueLinks] = await Promise.all([
      prisma.trackingEvent.count({ where }),
      prisma.trackingEvent.aggregate({
        where,
        _sum: {
          value: true,
        },
      }),
      prisma.trackingEvent.findMany({
        where,
        select: {
          campaign_name: true,
        },
        distinct: ['campaign_name'],
      }),
      prisma.trackingEvent.findMany({
        where,
        select: {
          link_name: true,
        },
        distinct: ['link_name'],
      }),
    ]);

    return {
      totalEvents,
      totalValue: Number(aggregations._sum.value || 0),
      uniqueCampaigns: uniqueCampaigns.length,
      uniqueLinks: uniqueLinks.length,
    };
  }

  async getCampaignNames() {
    const campaigns = await prisma.trackingEvent.findMany({
      select: {
        campaign_name: true,
      },
      distinct: ['campaign_name'],
      orderBy: {
        campaign_name: 'asc',
      },
    });

    return campaigns.map((c) => c.campaign_name);
  }

  async getLinkNames() {
    const links = await prisma.trackingEvent.findMany({
      select: {
        link_name: true,
      },
      distinct: ['link_name'],
      orderBy: {
        link_name: 'asc',
      },
    });

    return links.map((l) => l.link_name);
  }
}

export const trackingEventRepository = new TrackingEventRepository();
