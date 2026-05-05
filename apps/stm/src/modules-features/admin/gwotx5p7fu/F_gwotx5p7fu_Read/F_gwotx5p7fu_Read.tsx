'use client'
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import useQ_SystemParameter_GetAll, { ISystemParameter } from "@/hooks/query-hooks/SystemParameter/useQ_SystemParameter_GetAll";
import useHGetTimeType from "@/hooks/query-hooks/TimeType/useHGetTimeType";
import { NumberInput } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_gwotx5p7fu_Save from "../F_gwotx5p7fu_Save";


export default function F_gwotx5p7fu_Read() {
    const timeTypeQuery = useHGetTimeType()
    const queryClient = useQueryClient()
    const query = useQ_SystemParameter_GetAll({
        options: {
            refetchOnWindowFocus: false
        }
    })

    const columns = useMemo<MRT_ColumnDef<ISystemParameter>[]>(
        () => [
            {
                header: "Thông số",
                accessorKey: "code",
            },
            {
                header: "Cài đặt",
                accessorFn: (row) => {
                    if (row.code == "Loại thời gian dùng để xếp lịch học") return (
                        <MySelect
                            data={timeTypeQuery.data?.map(item => ({
                                value: item.id?.toString()!,
                                label: item.name!
                            })) || []}
                            value={row.value?.toString()}
                            onChange={(value) => {
                                updateRow(row.id, { value: parseInt(value!) })
                            }}
                        />
                    )
                    // if (row.code == "Loại thời gian dùng để xếp lịch thi") return (
                    //     <MySelect
                    //         data={timeTypeQuery.data?.map(item => ({
                    //             value: item.id?.toString()!,
                    //             label: item.name!
                    //         })) || []}
                    //         value={row.value?.toString()}
                    //         onChange={(value) => {
                    //             updateRow(row.id, { value: parseInt(value!) })
                    //         }}
                    //     />
                    // )
                    if (row.code == "Có tránh ngày nghỉ lễ và tự tăng buổi học cuối cùng") return (
                        <MyCheckbox
                            checked={row.value == 1 ? true : false}
                            onChange={(e) => {
                                const value = e.currentTarget.checked ? 1 : 0
                                updateRow(row.id, { value: value })
                            }}
                        />
                    )
                    if (row.code == "test") return (
                        <NumberInput
                            value={row.value}
                            onChange={(value) => {
                                updateRow(row.id, { value: parseInt(value.toString()) })
                            }}
                        />
                    )
                }
            },
        ],
        [query.data]
    );
    function updateRow(id?: number, updatedFields?: Partial<ISystemParameter>) {
        const rootData = queryClient.getQueryData<ISystemParameter[]>(["useQ_SystemParameter_GetAll"])
        const updatedData = rootData?.map(item =>
            item.id == id ? { ...item, ...updatedFields } : item
        )
        queryClient.setQueryData(["useQ_SystemParameter_GetAll"], updatedData)
    }

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";
    if (timeTypeQuery.isLoading) return "Đang tải dữ liệu..."
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => (
                <MyFlexRow>
                    <F_gwotx5p7fu_Save />
                </MyFlexRow>
            )}
            exportAble
        />
    );
}
