'use client'
import { Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyCenterFull, MyDataTable, MyFlexColumn } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import FeatAcademicYearSemestersCreate from "./FeatAcademicYearSemestersCreate";
import FeatAcademicYearSemestersDelete from "./FeatAcademicYearSemestersDelete";
import FeatAcademicYearSemestersDeleteList from "./FeatAcademicYearSemestersDeleteList";
import FeatAcademicYearSemestersUpdate from "./FeatAcademicYearSemestersUpdate";



export interface I_cw38zkpvg4_Read {
    id?: number; // STT
    code?: string; // Mã năm học - học kì
    name?: string; // Tên năm học - học kì
    note?: string; // Ghi chú
    isEnabled?: boolean; // Cho phép hiện
    concurrencyStamp?: string; // ID thay đổi
    coeSchoolYearId?: number; // Mã năm học
    coeSchoolYear?: Array<any>; // Năm học
    coeSchoolYearNew?: string; // Năm học mới
    numberWeek?: number; // Số tuần
    isCurrent?: boolean; // Hiện hành
    startDate?: Date | undefined; // Ngày bắt đầu
    endDate?: Date | undefined; // Ngày kết thúc
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date | undefined; // Ngày cập nhật
}

export default function FeatAcademicYearSemestersRead() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const form = useForm<I_cw38zkpvg4_Read>({
        initialValues: {},
    });

    // Query to fetch the mock data
    const query = useQuery<any[]>({
        queryKey: ["FeatAcademicYearSemestersRead"],
        queryFn: async () => {

            return mockData

        },
    });

    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        { header: "Mã năm học", accessorKey: "academicYearCode", size: 200 },
        { header: "Mã học kỳ", accessorKey: "code", size: 200 },
        { header: "Tên học kỳ", accessorKey: "name", size: 220 },
        {
            header: "Ngày bắt đầu", accessorKey: "startDate",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(originalRow.startDate);
            },
        },
        {
            header: "Ngày kết thúc", accessorKey: "endDate",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.endDate!));
            },
        },
        {
            header: "Hiện hành", accessorKey: "isCurrent",
            accessorFn: (row) => {

                return (
                    <Checkbox
                        readOnly
                        checked={row.isCurrent}
                    />
                )
            }
        },
        { header: "Ghi chú", accessorKey: "note" },
        // { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        // {
        //     header: "Ngày cập nhật", accessorKey: "ngayCapNhat",
        //     accessorFn(originalRow) {
        //         return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
        //     },
        // }


    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Mã khóa" },
            { fieldName: "name", header: "Tên khóa" },
            { fieldName: "note", header: "Ghi chú" },

            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };
    if (query.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <FeatAcademicYearSemestersCreate />
                                <MyButton crudType="import" />
                                <MyButton crudType="export" />
                                <FeatAcademicYearSemestersDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />

                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={query.data || []}
                renderRowActions={({ row }) => {
                    return (

                        <MyCenterFull>
                            <FeatAcademicYearSemestersUpdate values={row.original} />
                            <FeatAcademicYearSemestersDelete values={row.original} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    );
}

const mockData = [
    {
        "startDate": "2025-08-05T00:06:21.393",
        "endDate": "2025-12-09T00:06:21.393",
        "coeSchoolYearId": 3032,
        "numberWeek": 2,
        "note": "",
        "isCurrent": false,
        "coeSchoolYear": null,
        "id": 1,
        "academicYearCode": 2024,
        "code": "20241",
        "name": "H\u1ECDc k\u00EC 1 N\u0103m h\u1ECDc 2024 - 2025",
        "concurrencyStamp": "5a45a0a7-325a-4f4c-be9e-a31afa0aa966",
        "isEnabled": true,
        "modifiedWhen": "2025-06-20T10:30:11.657",
        "modifiedBy": 19136,
        "modifiedFullName": "Dev H\u1EEFu Lu\u00E2n"
    },

]