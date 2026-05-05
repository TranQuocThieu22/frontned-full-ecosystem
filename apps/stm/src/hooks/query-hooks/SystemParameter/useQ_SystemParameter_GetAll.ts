import baseAxios from '@/api/config/baseAxios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export interface ISystemParameter {
    id?: number;
    code?: string; // Loại thời gian dùng để xếp lịch học, có kiểm tra ngày nghỉ lễ, có kiểm tra tiết nghỉ chung, Có giới hạn số tiết dạy tối đa/ ngày của giảng viên, Giảng viên không dạy 2 cơ sở khác nhau, Tiết bắt đầu được xếp lịch học
    name?: number,
    value?: number;
}


export default function useQ_SystemParameter_GetAll({ options }: { options?: Partial<UseQueryOptions<ISystemParameter[], Error>> } = {}) {
    const query = useQuery<ISystemParameter[]>({
        queryKey: ["useQ_SystemParameter_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/SystemParameter/getall")
            return res.data.data
        },
        ...options
    })
    return query
}
