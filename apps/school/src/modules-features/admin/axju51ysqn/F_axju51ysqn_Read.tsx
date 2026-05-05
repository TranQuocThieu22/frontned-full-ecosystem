'use client'

import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_axju51ysqn_Update from "./F_axju51ysqn_Update";
import F_axju51ysqn_Create from "./F_axju51ysqn_Create";
import F_axju51ysqn_Delete from "./F_axju51ysqn_Delete";
import { MyFlexColumn, MySelect, MyFieldset, MyDataTable, AQButtonCreateByImportFile, AQButtonExportData } from "aq-fe-framework/components";


export interface I_axju51ysqn_Read {
    id?: number,
    order?: number,
    startTime?: string,
    content?: string,
}
export default function F_axju51ysqn_Read(
) {
    const query = useQuery<I_axju51ysqn_Read[]>({
        queryKey: ['I_axju51ysqn_Read'],
        queryFn: async () => {
            return mockData || []
        },
    })
    const listEvent = [
        { value: "1", label: "Halloween-SK001" },
        { value: "2", label: "Trung thu-SK002" },
        { value: "3", label: "Tết Nguyên Đán-SK003" },
    ];

    const columns = useMemo<MRT_ColumnDef<I_axju51ysqn_Read>[]>(() => [
        {
            header: "Thứ tự",
            accessorKey: "order",
        },
        {
            header: "Giờ bắt đầu",
            accessorKey: "startTime",
        },
        {
            header: "Nội dung",
            accessorKey: "content",
        },
    ], []);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const exportConfig = {
        fields: [
            { fieldName: "order", header: "Thứ tự" },
            { fieldName: "startTime", header: "Giờ bắt đầu" },
            { fieldName: "content", header: "Nội dung" },
        ]
    };


    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <>
            <Group ml={20} mb={20}>
            <MySelect data={listEvent} label="Chọn sự kiện"  w={240} defaultValue={listEvent[0]?.value} >
                    
            </MySelect>
            </Group>

            <MyFieldset title="Danh sách nội dung sự kiện ">
                <MyDataTable

                    columns={columns}
                    enableRowNumbers={true}
                    data={query.data!}
                    renderTopToolbarCustomActions={() => {
                        return (
                            <Group>
                                <F_axju51ysqn_Create />
                                <AQButtonCreateByImportFile
                                    setImportedData={(data) => console.log("Imported Data:", data)}
                                    onSubmit={() => { }}
                                    form={form_multiple}
                                />
                                <AQButtonExportData
                                    objectName="dsClass"
                                    data={query.data!}
                                    exportConfig={exportConfig}
                                />
                                <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                            </Group>
                        )
                    }}
                    renderRowActions={({ row }) => {
                        return (
                            <Group>
                                <F_axju51ysqn_Update values={row.original} />
                                <F_axju51ysqn_Delete id={row.original.id!} code={row.original.order?.toString()!}/>
                            </Group>
                        )
                    }}
                />
            </MyFieldset>
        </>
    )
}

const mockData: I_axju51ysqn_Read[] = [{
    id: 1,
    order: 1,
    startTime: "18:00",
    content: "MC khai mạc",

}]

