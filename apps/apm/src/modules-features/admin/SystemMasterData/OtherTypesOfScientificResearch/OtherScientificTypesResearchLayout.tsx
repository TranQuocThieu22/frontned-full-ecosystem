'use client'
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import OtherScientificTypesResearchCreate from "./OtherScientificTypesResearchCreate";
import OtherScientificTypesResearchDelete from "./OtherScientificTypesResearchDelete";
import OtherScientificTypesResearchDeleteList from "./OtherScientificTypesResearchDeleteList";
import OtherScientificTypesResearchUpdate from "./OtherScientificTypesResearchUpdate";

export interface OtherScientificTypesResearch {
    id: number;
    code: string;
    name: string;
    hours: number;
    score?: number;
    selfDeclaration: boolean;
    isDiscontinued: boolean;
    notes: string;
}

export default function OtherScientificTypesResearchLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<OtherScientificTypesResearch>[]>(() => [
        {
            header: "Mã loại nhiệm vụ",
            accessorKey: "code",
        },
        {
            header: "Tên loại nhiệm vụ",
            accessorKey: "name",
        },
        {
            header: "Số giờ",
            accessorKey: "hours",
        },
        {
            header: "Số điểm",
            accessorKey: "score",
        },
        {
            header: "Tự kê khai",
            accessorKey: "selfDeclaration",
            Cell: ({ row }) => (
                <Checkbox checked={row.original.selfDeclaration} readOnly />
            ),
        },
        {
            header: "Ngừng sử dụng",
            accessorKey: "isDiscontinued",
            Cell: ({ row }) => (
                <Checkbox checked={row.original.isDiscontinued} readOnly />
            ),
        },
        {
            header: "Ghi chú",
            accessorKey: "notes",
        },
    ], []);

    return (
        <MyFieldset title="Danh mục loại nhiệm vụ NCKH khác" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={mockData || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <OtherScientificTypesResearchCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <OtherScientificTypesResearchDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />

                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <OtherScientificTypesResearchUpdate values={row.original} />
                            <OtherScientificTypesResearchDelete id={row.original.id || 0} code={row.original.code} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


export const mockData: OtherScientificTypesResearch[] = [
    {
        id: 1,
        code: "NV001",
        name: "Tham gia xây dựng CTĐT",
        hours: 120,
        score: undefined,
        isDiscontinued: false,
        notes: "",
        selfDeclaration: false
    },
    {
        id: 2,
        code: "NV002",
        name: "Tham gia xây dựng dự án hợp tác đào tạo của trường",
        hours: 120,
        score: undefined,
        isDiscontinued: false,
        notes: "",
        selfDeclaration: false
    },
    {
        id: 3,
        code: "NV003",
        name: "Tham gia xây dựng kế hoạch hội thảo khoa học",
        hours: 120,
        score: undefined,
        isDiscontinued: false,
        notes: "",
        selfDeclaration: false
    },
    {
        id: 4,
        code: "NV004",
        name: "Tham gia phiên dịch hội thảo quốc tế",
        hours: 120,
        score: undefined,
        isDiscontinued: false,
        notes: "",
        selfDeclaration: false
    }
];
