import { z } from 'zod';

export const trackingEventSchema = z.object({
  linkname: z.string().min(1, 'Link name é obrigatório').max(255, 'Link name muito longo'),
  nomecampanha: z.string().min(1, 'Nome da campanha é obrigatório').max(255, 'Nome da campanha muito longo'),
  valor: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, 'Valor deve ser um número válido e não negativo'),
  dataRegistro: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, 'Data de registro inválida'),
});

export const dashboardFiltersSchema = z.object({
  campaign: z.string().optional(),
  linkname: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  search: z.string().optional(),
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
});

export type TrackingEventInput = z.infer<typeof trackingEventSchema>;
export type DashboardFiltersInput = z.infer<typeof dashboardFiltersSchema>;
