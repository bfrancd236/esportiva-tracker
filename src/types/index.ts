export interface TrackingEvent {
  id: number;
  link_name: string;
  campaign_name: string;
  value: number;
  registration_date: Date;
  ip: string | null;
  user_agent: string | null;
  created_at: Date;
}

export interface TrackingEventInput {
  linkname: string;
  nomecampanha: string;
  valor: string;
  dataRegistro: string;
}

export interface TrackingStats {
  totalEvents: number;
  totalValue: number;
  uniqueCampaigns: number;
  uniqueLinks: number;
}

export interface DashboardFilters {
  campaign?: string;
  linkname?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
