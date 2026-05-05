"use client";

import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyCenterFull, MyDataTable, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatProgramCreate from "./FeatProgramCreate";
import FeatProgramDelete from "./FeatProgramDelete";
import FeatProgramDeleteList from "./FeatProgramDeleteList";
import FeatProgramUpdate from "./FeatProgramUpdate";

export interface I_h7op7f4nav_Read {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
    coeUnitId?: number;
    unitId?: number;
    coeUnit?: number | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    updatedBy?: string;
    updatedAt?: Date | undefined;
}

export default function FeatProgramRead() {
    const programQuery = useQuery<any[]>({
        queryKey: ["FeatProgramRead"],
        queryFn: async () => {
            return mockData;
        },
    });
    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        { header: "Mã chương trình", accessorKey: "code" },
        { header: "Tên chương trình", accessorKey: "name" },
        {
            header: "Khoa quản lý",
            accessorKey: "unitId",
            accessorFn: (row) => mockUnit[row.unitId as number] || "",

        },
    ], []);


    if (programQuery.isLoading) return "Loading...";
    if (programQuery.isError) return 'Không có dữ liệu...';

    return (
        <MyFlexColumn>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <FeatProgramCreate />
                        <MyButton crudType="export" />
                        <MyButton crudType="import" />
                        <FeatProgramDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                    </Group>
                )}
                columns={columns}
                data={programQuery.data || []}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <FeatProgramUpdate values={row.original} />
                        <FeatProgramDelete values={row.original} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}

const mockData = [
    {
        code: 'KT',
        name: 'Kế toán',
        unitId: 1,
        note: ''
    },
]

const mockUnit: Record<number, string> = {
    1: "Kinh tế",
    2: "Công nghệ thông tin",
    3: "Ngoại ngữ",
};