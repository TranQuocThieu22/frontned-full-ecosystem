import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance'
import { AQModule } from '@aq-fe/core-ui/shared/interfaces/AQModule'
import { useQuery } from '@tanstack/react-query'

export interface GetAQModuleOptions {
    /** Bật/tắt gọi API từ nơi sử dụng (ví dụ: CustomBasicAppShell) */
    enabled?: boolean;
}

/**
 * Lấy thông tin module (logo, favicon, name).
 * Bật/tắt gọi API bằng options.enabled – KHÔNG phụ thuộc biến môi trường.
 */
export function useGetAQModuleQuery(options?: GetAQModuleOptions) {
    const query = useQuery<AQModule>({
        queryKey: ["/AQ/GetAQModule"],
        enabled: options?.enabled ?? true,
        queryFn: async () => {
            const res = await axiosInstance.get("/AQ/GetAQModule")
            return res.data.data
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false
    })
    return query
}
