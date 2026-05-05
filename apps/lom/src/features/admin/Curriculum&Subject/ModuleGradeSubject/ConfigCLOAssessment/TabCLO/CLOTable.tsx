'use client';
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { COECLO } from "@/interfaces/shared-interfaces/COECLO";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Group, Textarea } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function CLOTable({ isActiveTab, gradeSubjectId }: { isActiveTab: boolean, gradeSubjectId?: number }) {
    const allCLOs = useQuery<COECLO[]>({
        enabled: isActiveTab,
        queryKey: [`CLOByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            if (!gradeSubjectId) return []
            const res = await baseAxios.get(`/COECLO/GetSource?coegradeSubjectId=${gradeSubjectId}`)
            return res.data.data
        },
        refetchOnWindowFocus: false,
    })

    const columns = useMemo<MRT_ColumnDef<COECLO>[]>(() => [
        {
            header: "Mã CG",
            accessorKey: "coecg.code",
        },
        {
            header: "Mã CLO",
            accessorKey: "code",
        },
        {
            header: "Tỷ trọng CLO",
            accessorFn: (originalRow) => originalRow.densityCLO,
            Cell: ({ row }) => {
                return (
                    <>{row.original.densityCLO} %</>
                )
            }
        },
        // {
        //     header: "Tên CLO",
        //     accessorKey: "name",
        //     size: 250,
        // },
        {
            header: "Mô tả CLO",
            accessorKey: "description",
            size: 500,
            Cell: ({ row }) => {
                return (
                    <>
                        <Textarea
                            minRows={1}
                            variant="unstyled"
                            readOnly={true}
                            value={row.original.description}
                        />
                    </>
                )
            }
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
            data={allCLOs.data || []}
            state={{
                isLoading: allCLOs.isFetching
            }}
            initialState={{
                density: "md",
                pagination: { pageIndex: 0, pageSize: 10 },
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
