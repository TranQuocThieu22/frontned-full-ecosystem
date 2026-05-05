"use client"

import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyCenterFull, MyDataTable, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import FeatSubjectCreate from "./FeatSubjectCreate";
import FeatSubjectDelete from "./FeatSubjectDelete";
import FeatSubjectDeleteList from "./FeatSubjectDeleteList";
import FeatSubjectUpdate from "./FeatSubjectUpdate";

interface ISubject {
    id: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    nameEg?: string;
    unitName?: string
    numberPeriod?: number;
    numberCredit?: number;
    note?: string;
    coeUnitId?: number | null;
    coeUnit?: any | null;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function FeatSubjectRead() {

    const AllQuery = useQuery<ISubject[]>({
        queryKey: [`FeatSubjectRead`],
        queryFn: async () => {
            return mockSubjects
        }
    });
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // const formatFunctions = {
    //     birthDate: (value: string) => {
    //         const date = new Date(value);
    //         return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
    //     },
    //     isEnabled: (value: boolean) => (value ? "Đã kích hoạt" : "Chưa kích hoạt")
    // };
    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã môn học"
            },
            {
                fieldName: "name",
                header: "Tên môn học"
            },

        ]
    };
    const columns = useMemo<MRT_ColumnDef<ISubject>[]>(() => [
        {
            header: "Mã môn học",
            accessorKey: "code"
        },
        {
            header: "Tên môn học",
            accessorKey: "name"
        },
        {
            header: "Số tiết",
            accessorKey: "numberPeriod"
        },
        {
            header: "Số tín chỉ",
            accessorKey: "numberCredit"
        },
        {
            header: "Đơn vị quản lý",
            accessorKey: "coeUnitId",
            accessorFn: (row) => row.unitName || "Chưa cập nhật", // Lấy tên từ Map
        },
    ], []);
    // {
    //     header: "Người cập nhật",
    //     accessorKey: "nguoiCapNhat",

    // },
    // {
    //     header: "Ngày cập nhật",
    //     accessorKey: "ngayCapNhat",
    //     accessorFn(originalRow) {
    //         return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
    //     },

    // },0
    return (
        <MyFlexColumn>
            <MyDataTable
                isLoading={AllQuery.isLoading}
                isError={AllQuery.isError}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <FeatSubjectCreate />
                                <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                    console.log(form_multiple.values);

                                }} >s</AQButtonCreateByImportFile>
                                <AQButtonExportData
                                    objectName="dm_mh"
                                    data={AllQuery.data || []}
                                    exportConfig={exportConfig}
                                />
                                <FeatSubjectDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={AllQuery.data || []}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <FeatSubjectUpdate lecturerAndExpertValues={row.original} />
                            <FeatSubjectDelete values={row.original} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    )
}
const mockSubjects: ISubject[] = [
    {
        // --- Data from the image ---
        code: 'KTTC001',
        name: 'Kế toán tài chính',
        numberPeriod: 45,
        numberCredit: 3,
        coeUnit: { id: 201, name: 'Khoa Kinh tế' }, // Mocked object for the managing unit
        coeUnitId: 1,                             // Mocked ID for the managing unit
        unitName: 'Khoa Kinh tế', // Assuming this is the name of the managing unit
        // --- Inferred/Default mock data ---
        id: 1,
        nameEg: 'Financial Accounting', // English translation
        isEnabled: true, // Assuming the subject is active
        note: '', // No note was provided
        concurrencyStamp: 'b8a4f9a0-6b19-4b6c-b2e1-7d1a1e09c8d5', // A typical server-generated value

        // Optional properties 'nguoiCapNhat' and 'ngayCapNhat' are omitted.
    },
    // You can add more mock subject objects here following the same structure
    // e.g.,
    // {
    //   id: 2,
    //   code: 'CNTT002',
    //   ...
    // }
];

