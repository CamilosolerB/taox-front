import { useQuery } from '@tanstack/react-query';
import waterApi from '@/api/waterApi';

export interface ProcessStockStat {
  process_id: string;
  process_name: string;
  total_stock: number;
  percentage: number;
}

export interface DashboardStats {
  total_products: number;
  low_stock_alerts: number;
  movements_today: number;
  active_processes: number;
  stock_by_process: ProcessStockStat[];
}

export const useDashboard = (companyId: string) => {
  const useGetDashboardStats = () => {
    return useQuery({
      queryKey: ['dashboard_stats', companyId],
      queryFn: async () => {
        if (!companyId) return null;
        const response = await axios.get<DashboardStats>(`/companies/${companyId}/dashboard/stats`);
        return response.data;
      },
      enabled: !!companyId,
    });
  };

  return {
    useGetDashboardStats,
  };
};
