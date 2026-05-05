'use client'
import baseAxios from "@/api/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Accordion, Button, Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";
import useS_7p4mh9d75x, { I_7p4mh9d75x_GroupMenu } from "./S_7p4mh9d75x";


const optionsNormal = {
    size: 40,
    enableColumnFilter: false,
    enableColumnDragging: false,
    enableColumnActions: false,
    enableSorting: false,
    enableResizing: false,
}
interface I {
    userId: number;
    pageId: number;
    isCreate: boolean;
    isRead: boolean;
    isUpdate: boolean;
    isDelete: boolean;
    isPrint: boolean;
    isExport: boolean;
    code?: string | null;
    name?: string | null;
    id: number;
    createdWhen: Date;
    createdBy: number;
    modifiedWhen?: Date;
    modifiedBy?: number;
    concurrencyStamp?: string;
    isEnabled: boolean;
}

export default function F_7p4mh9d75x_ReadPermission() {
    const store = useS_7p4mh9d75x()
    const query = useQuery<I[]>({
        queryKey: ['F_7p4mh9d75x_ReadPermission', store.state.userId],
        queryFn: async () => {
            const result = await baseAxios.get('/Role/GetRolePermission?roleId=' + store.state.userId)
            return result.data.data || []
        },
    })

    useEffect(() => {
        if (query.data == undefined) return
        const data = query.data!.map(item => ({
            isCreate: item.isCreate,
            isRead: item.isRead,
            isUpdate: item.isUpdate,
            isDelete: item.isDelete,
            isPrint: item.isPrint,
            isExport: item.isExport,
            pageId: item.pageId,
        }))
        store.setProperty("data", data)
    }, [query.data])

    const columns = useMemo<MRT_ColumnDef<I_7p4mh9d75x_GroupMenu>[]>(
        () => [
            {
                header: "Tên menu",
                accessorKey: "label",
            },
            {
                header: "Xem",
                accessorFn: (row) => {
                    return <Checkbox />
                }
            },
            {
                header: "Thêm",
                accessorFn: (row) => {
                    return <Checkbox />
                }
            },
            {
                header: "Sửa",
                accessorFn: (row) => {
                    return <Checkbox />
                }
            },
            {
                header: "Xóa",
                accessorFn: (row) => {
                    return <Checkbox />
                }
            },
            {
                header: "In",
                accessorFn: (row) => {
                    return <Checkbox />
                }
            },
            {
                header: "Xuất",
                accessorFn: (row) => {
                    return <Checkbox />
                }
            },
        ],
        [query.data]
    );
    if (query.isLoading) return "Loading..."
    if (store.state.groupMenu?.length == 0) return "No data"
    return (
        <Accordion variant="separated" multiple>
            {store.state.groupMenu!.map((item) => (
                <Accordion.Item key={item.label} value={item.label!}>
                    <Accordion.Control>{item.label}</Accordion.Control>
                    <Accordion.Panel>
                        <MyDataTable
                            enableGrouping={item.label !== "Dashboard"}
                            columns={columns}
                            data={item.children!}
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
            <Button onClick={() => store.getFetchByPageId(200)}>s</Button>
        </Accordion>
    )
}
