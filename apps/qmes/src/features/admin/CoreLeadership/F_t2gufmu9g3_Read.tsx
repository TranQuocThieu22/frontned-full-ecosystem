'use client'
import AQButtonExportData from "@/components/ui/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/ui/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/ui/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_t2gufmu9g3_Create from "./F_t2gufmu9g3_Create";
import F_t2gufmu9g3_Delete from "./F_t2gufmu9g3_Delete";
import F_t2gufmu9g3_Update from "./F_t2gufmu9g3_Update";





export interface I_t2gufmu9g3_Read {
    id?: number;          // Unique identifier
    code?: string;        // Mã nhân sự
    name?: string;        // Họ tên
    position?: string;    // Chức vụ
    decisionNumber?: string; // Số quyết định
    effectiveDate?: Date; // Ngày hiệu lực
    expiryDate?: Date;    // Ngày hết hiệu lực
    issuedBy?: string;    // Nơi ban hành
    link?: string;
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date;   // Ngày cập nhật
}


export default function F_t2gufmu9g3_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<I_t2gufmu9g3_Read>({
        initialValues: {
        },
    })

    // Query to fetch the mock menuData
    const AllUserQuery = useQuery<I_t2gufmu9g3_Read[]>({
        queryKey: ["F_t2gufmu9g3_Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I_t2gufmu9g3_Read>[]>(() => [
        { header: "Mã nhân sự", accessorKey: "code" },
        { header: "Họ tên", accessorKey: "name" },
        { header: "Chức vụ", accessorKey: "position" },
        { header: "Số quyết định", accessorKey: "decisionNumber" },
        {
            header: "Ngày hiệu lực",
            accessorKey: "effectiveDate",
            accessorFn: (originalRow) =>
                originalRow.effectiveDate ? U0DateToDDMMYYYString(new Date(originalRow.effectiveDate)) : "",
        },
        {
            header: "Ngày hết hiệu lực",
            accessorKey: "expiryDate",
            accessorFn: (originalRow) =>
                originalRow.expiryDate ? U0DateToDDMMYYYString(new Date(originalRow.expiryDate)) : "",
        },
        { header: "Nơi ban hành", accessorKey: "issuedBy" },
        {
            header: "Link Website",
            accessorKey: "webLink",
        },
        { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (originalRow) =>
                originalRow.ngayCapNhat ? U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat)) : "",
        },
    ], []);


    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Mã nhân sự" },
            { fieldName: "name", header: "Họ tên" },
            { fieldName: "position", header: "Chức vụ" },
            { fieldName: "decisionNumber", header: "Số quyết định" },
            { fieldName: "effectiveDate", header: "Ngày hiệu lực" },
            { fieldName: "expiryDate", header: "Ngày hết hiệu lực" },
            { fieldName: "issuedBy", header: "Nơi ban hành" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };


    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <Fieldset legend={`Danh sách lãnh đạo chủ chốt`}>
            <MyFlexColumn>

                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <F_t2gufmu9g3_Create />
                                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                        console.log(form_multiple.values);

                                    }} >s</AQButtonCreateByImportFile>
                                    <AQButtonExportData
                                        isAllData={true}
                                        objectName="dsKhoa"
                                        data={data}
                                        exportConfig={exportConfig}
                                    />
                                    <Button color="red" leftSection={<IconTrash />}>Xóa</Button>

                                </Group>
                            </>
                        )
                    }}
                    columns={columns}
                    data={AllUserQuery.data || []}
                    renderRowActions={({ row }) => {
                        return (

                            <MyCenterFull>
                                <F_t2gufmu9g3_Update values={row.original} />
                                <F_t2gufmu9g3_Delete id={row.original.id!} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFlexColumn>
        </Fieldset>
    );
}

const data: I_t2gufmu9g3_Read[] = [
    {
        id: 1,
        code: "NS001",
        name: "Tô Ngọc Lâm",
        position: "Chủ tịch Hội đồng Đại học",
        decisionNumber: "DQ/DH-0125",
        effectiveDate: new Date("2023-12-31"),
        expiryDate: new Date("2025-12-31"),
        issuedBy: "Bộ Giáo dục và Đào tạo",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
];