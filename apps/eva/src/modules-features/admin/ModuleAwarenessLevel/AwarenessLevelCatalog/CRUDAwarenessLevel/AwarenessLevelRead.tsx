'use client'
import { Group } from "@mantine/core";
import { IconTableExport, IconUpload } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyCenterFull, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import AwarenessLevelCreate from "./AwarenessLevelCreate";
import AwarenessLevelDelete from "./AwarenessLevelDelete";
import AwarenessLevelDeleteList from "./AwarenessLevelDeleteList";
import AwarenessLevelUpdate from "./AwarenessLevelUpdate";
import { AwarenessLevelInfoViewModel } from "./Interfaces/InfoInterfaces";

export default function AwarenessLevelRead() {
  
    const queryMucDoNhanThuc = useQuery<AwarenessLevelInfoViewModel[]>({
        queryKey: ["AwarenessLevelRead"],
        queryFn: () => {
            return mockData || [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<AwarenessLevelInfoViewModel>[]>(() => [
        { header: "Mã mức độ", accessorKey: "maMucDo" },
        { header: "Tên mức độ", accessorKey: "tenMucDo" },
        { header: "Ghi chú", accessorKey: "ghiChu" },
    ], []);

    if (queryMucDoNhanThuc.isLoading) return "Loading...";
    if (queryMucDoNhanThuc.isError) return 'Không có dữ liệu...';

    return (
        <MyFieldset title={`Danh mục mức độ nhận thức`}>
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <AwarenessLevelCreate />
                            <MyButton color="green" leftSection={<IconUpload />}>Import</MyButton>
                            <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                            <AwarenessLevelDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </Group>
                    )}
                    columns={columns}
                    data={queryMucDoNhanThuc.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <AwarenessLevelUpdate data={row.original} />
                            <AwarenessLevelDelete id={row.original.id!} code={row.original.maMucDo!} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

const mockData: AwarenessLevelInfoViewModel[] = [
    {
        id: 1,
        maMucDo: "C1",
        tenMucDo: "Ghi nhớ",
        ghiChu: '',
    },
    {
        id: 2,
        maMucDo: "C2",
        tenMucDo: "Hiểu",
        ghiChu: '',
    },
    {
        id: 3,
        maMucDo: "C3",
        tenMucDo: "Vận dụng",
        ghiChu: '',
    },
    {
        id: 4,
        maMucDo: "C4",
        tenMucDo: "Phân tích",
        ghiChu: '',
    },
    {
        id: 5,
        maMucDo: "C5",
        tenMucDo: "Đánh giá",
        ghiChu: '',
    },
    {
        id: 6,
        maMucDo: "C6",
        tenMucDo: "Sáng tạo",
        ghiChu: '',
    },

];
