'use client'
import baseAxios from "@/api/config/baseAxios";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { useListState } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface I3_2Module {
    idProgramSubject?: number,
    id?: number;
    code?: string;
    name?: string;
    classPeriodNumber?: number;
    hours?: number;
}

export default function SF3_2ModuleList({ listState, listStateDelete }: { listState: ReturnType<typeof useListState<I3_2Module>>, listStateDelete?: ReturnType<typeof useListState<I3_2Module>> }) {
    const query = useQuery<I3_2Module[]>({
        queryKey: [`SF3_2ModuleList`],
        queryFn: async () => {
            const result = await baseAxios.get("/subject/getall")
            return result.data.data
        }
    });

    const columns = useMemo<MRT_ColumnDef<I3_2Module>[]>(() => [
        {
            header: "Mã môn học",
            accessorKey: "code",
        },
        {
            header: "Tên môn học",
            accessorKey: "name",
        },
        {
            header: "Số tiết",
            accessorKey: "classPeriodNumber",
        },
        {
            header: "Số giờ",
            accessorKey: "hours",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTableSelect
            listLabel="Danh sách môn học"
            columns={columns}
            listState={listState as any}
            data={query.data}
            listStateDelete={listStateDelete}
        />
    );
}
