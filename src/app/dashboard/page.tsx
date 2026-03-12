'use client';

import { useState, useEffect, useCallback } from 'react';
import { StatsCard } from '@/components/StatsCard';
import { EventsTable } from '@/components/EventsTable';
import { Filters, FilterValues } from '@/components/Filters';
import { Pagination } from '@/components/Pagination';
import { formatCurrency } from '@/lib/utils';

interface Stats {
  totalEvents: number;
  totalValue: number;
  uniqueCampaigns: number;
  uniqueLinks: number;
}

interface Event {
  id: string;
  link_name: string;
  campaign_name: string;
  value: number;
  registration_date: string;
  ip: string | null;
  user_agent: string | null;
  created_at: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalEvents: 0,
    totalValue: 0,
    uniqueCampaigns: 0,
    uniqueLinks: 0,
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [campaigns, setCampaigns] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterValues>({
    campaign: '',
    linkname: '',
    dateFrom: '',
    dateTo: '',
    search: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filters.campaign) params.append('campaign', filters.campaign);
      if (filters.linkname) params.append('linkname', filters.linkname);
      if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
      if (filters.dateTo) params.append('dateTo', filters.dateTo);

      const response = await fetch(`/api/stats?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, [filters]);

  const fetchEvents = useCallback(async (page: number = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.campaign) params.append('campaign', filters.campaign);
      if (filters.linkname) params.append('linkname', filters.linkname);
      if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
      if (filters.dateTo) params.append('dateTo', filters.dateTo);
      if (filters.search) params.append('search', filters.search);
      params.append('page', page.toString());
      params.append('limit', '10');

      const response = await fetch(`/api/events?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setEvents(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns');
      const data = await response.json();
      if (data.success) {
        setCampaigns(data.data);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await fetch('/api/links');
      const data = await response.json();
      if (data.success) {
        setLinks(data.data);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchLinks();
  }, []);

  useEffect(() => {
    fetchStats();
    fetchEvents(1);
  }, [fetchStats, fetchEvents]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    fetchEvents(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Acompanhe suas campanhas e eventos de tracking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total de Eventos"
            value={stats.totalEvents.toLocaleString('pt-BR')}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
          />
          <StatsCard
            title="Valor Total"
            value={formatCurrency(stats.totalValue)}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
          <StatsCard
            title="Campanhas Únicas"
            value={stats.uniqueCampaigns}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            }
          />
          <StatsCard
            title="Links Únicos"
            value={stats.uniqueLinks}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            }
          />
        </div>

        <Filters
          onFilterChange={handleFilterChange}
          campaigns={campaigns}
          links={links}
        />

        <EventsTable events={events} isLoading={isLoading} />

        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
