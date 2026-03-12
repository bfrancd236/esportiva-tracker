'use client';

import { useState, useEffect } from 'react';

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  campaigns: string[];
  links: string[];
}

export interface FilterValues {
  campaign: string;
  linkname: string;
  dateFrom: string;
  dateTo: string;
  search: string;
}

export function Filters({ onFilterChange, campaigns, links }: FiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({
    campaign: '',
    linkname: '',
    dateFrom: '',
    dateTo: '',
    search: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(filters);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, onFilterChange]);

  const handleChange = (field: keyof FilterValues, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      campaign: '',
      linkname: '',
      dateFrom: '',
      dateTo: '',
      search: '',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        <button
          onClick={handleReset}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Limpar filtros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Buscar em campanhas e links..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campanha
          </label>
          <select
            value={filters.campaign}
            onChange={(e) => handleChange('campaign', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todas as campanhas</option>
            {campaigns.map((campaign) => (
              <option key={campaign} value={campaign}>
                {campaign}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link
          </label>
          <select
            value={filters.linkname}
            onChange={(e) => handleChange('linkname', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todos os links</option>
            {links.map((link) => (
              <option key={link} value={link}>
                {link}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data início
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleChange('dateFrom', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data fim
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleChange('dateTo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
