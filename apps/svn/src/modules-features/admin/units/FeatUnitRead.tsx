'use client'
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyCenterFull, MyDataTable, MyFlexColumn } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import FeatUnitCreate from "./FeatUnitCreate";
import FeatUnitDelete from "./FeatUnitDelete";
import FeatUnitDeleteList from "./FeatUnitDeleteList";
import FeatUnitUpdate from "./FeatUnitUpdate";

export interface IUnit {
    id?: number;
    code?: string;
    name?: string;
    unitType?: number;
    unitId?: number;
    parentId?: number;
    note?: string;
    unit?: IUnit;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

const unitType: Record<number, string> = {
    1: "Khoa",
    2: "Bộ môn",
    3: "Phòng",
    4: "Trung tâm",
};
const parentName: Record<number, string> = {
    1: "Khoa Công nghệ thông tin",
    2: "Khoa Lý luận chính trị",
    3: "Khoa Khoa học tự nhiên",
};
export default function FeatUnitRead() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    // Query to fetch mock data
    const query = useQuery<IUnit[]>({
        queryKey: ["FeatUnitRead"],
        queryFn: async () => mockData

    });

    const columns = useMemo<MRT_ColumnDef<IUnit>[]>(() => [
        { header: "Mã đơn vị", accessorKey: "code" },
        { header: "Tên đơn vị", accessorKey: "name" },
        {
            header: "Loại đơn vị",
            accessorKey: "unitType",
            accessorFn: (row) => unitType[row.unitType as number] || "",
        },
        {
            header: "Trực thuộc", accessorKey: "parentName",
            accessorFn: (row) => parentName[row.parentId as number] || "",
        },
        {
            header: "Người cập nhật",
            accessorKey: "modifiedFullName",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "modifiedWhen",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "unitCode", header: "Mã đơn vị" },
            { fieldName: "unitName", header: "Tên đơn vị" },
            { fieldName: "unitType", header: "Loại đơn vị" },
            { fieldName: "affiliated", header: "Trực thuộc" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    if (query.isLoading) return "Loading...";
    if (query.isError) return 'Không có dữ liệu...';

    return (
        <MyFlexColumn>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <FeatUnitCreate />
                        <AQButtonCreateByImportFile
                            form={form_multiple}
                            onSubmit={() => console.log(form_multiple.values)}
                        >
                            Import
                        </AQButtonCreateByImportFile>
                        <AQButtonExportData
                            objectName="dsUnit"
                            data={query.data!}
                            exportConfig={exportConfig}
                        />
                        <FeatUnitDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                    </Group>
                )}
                columns={columns}
                data={query.data || []}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <FeatUnitUpdate data={row.original} />
                        <FeatUnitDelete id={row.original.id!} code={row.original.code!} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}

const mockData: IUnit[] = [
    {
        id: 1,
        code: 'K.CNTT',
        name: 'Khoa Công nghệ thông tin',
        unitType: 1,
        parentId: 0,
    },
    {
        id: 2,
        code: 'K.CNTT.DL',
        name: 'Bộ môn cơ sở dữ liệu',
        unitType: 2,
        parentId: 1,
    },
];
