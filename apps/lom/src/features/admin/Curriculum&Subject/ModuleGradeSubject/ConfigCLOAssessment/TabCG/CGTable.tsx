'use client';
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { COECG } from "@/interfaces/shared-interfaces/COECG";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function CGTable({ isActiveTab, gradeSubjectId }: { isActiveTab: boolean, gradeSubjectId?: number }) {
    const allGCs = useQuery<COECG[]>({
        enabled: isActiveTab,
        queryKey: [`CGByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            if (!gradeSubjectId) return []
            const res = await baseAxios.get(`/COECG/GetSource?coegradeSubjectId=${gradeSubjectId}`)
            return res.data.data
        },
        refetchOnWindowFocus: false,
    })

    const columns = useMemo<MRT_ColumnDef<COECG>[]>(() => [
        {
            header: "Mã CG",
            accessorKey: "code",
        },
        {
            header: " Mô tả",
            accessorKey: "description",
        },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "nguoiCapNhat"
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        // }
    ], []);

    return (
        <MyDataTable
            columns={columns}
            data={allGCs.data || []}
            state={{
                isLoading: allGCs.isFetching
            }}
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={() => (
                <Group>
                    {/* <Button leftSection={<IconTableExport />} color="teal" size="sm" radius="sm"
                        onClick={() => {
                            notifications.show({
                                title: "Thông báo",
                                message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                color: "blue",
                                autoClose: 5000,
                            })
                        }
                        }
                    >Export</Button> */}
                </Group>
            )}
        />
    );
}
