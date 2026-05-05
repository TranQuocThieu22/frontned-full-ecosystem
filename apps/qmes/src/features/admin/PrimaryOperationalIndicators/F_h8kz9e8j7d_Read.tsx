'use client'
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Fieldset, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

import AQButtonExportData from "@/components/ui/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/ui/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/ui/Layouts/FlexColumn/MyFlexColumn";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile } from "aq-fe-framework/components";
import F_h8kz9e8j7d_Create from "./F_h8kz9e8j7d_Create";
import F_h8kz9e8j7d_Delete from "./F_h8kz9e8j7d_Delete";
import F_h8kz9e8j7d_Update from "./F_h8kz9e8j7d_Update";


export interface I_h8kz9e8j7d_Read {
    id?: number;
    indicatorCode?: string;  // Mã chỉ số
    indicatorName?: string;  // Tên chỉ số
    targetValue?: number;    // Chi tiêu (Numeric)
    resultValue?: number;    // Kết quả (Numeric)
    reportYear?: string;     // Năm báo cáo (Extracted from effectiveDate)
    remarks?: string;        // Ghi chú
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date;   // Ngày cập nhật
}


export default function F_h8kz9e8j7d_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<I_h8kz9e8j7d_Read>({
        initialValues: {
        },
    })

    // Query to fetch the mock menuData
    const AllUserQuery = useQuery<I_h8kz9e8j7d_Read[]>({
        queryKey: ["F_h8kz9e8j7d_Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I_h8kz9e8j7d_Read>[]>(() => [
        { header: "Mã chỉ số", accessorKey: "indicatorCode" },
        { header: "Tên chỉ số", accessorKey: "indicatorName" },
        { header: "Chi tiêu", accessorKey: "targetValue" },
        { header: "Kết quả", accessorKey: "resultValue" },
        {
            header: "Năm báo cáo",
            accessorKey: "reportYear",
        },
        {
            header: "Ghi chú",
            accessorKey: "remarks",
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
            { fieldName: "indicatorCode", header: "Mã chỉ số" },
            { fieldName: "indicatorName", header: "Tên chỉ số" },
            { fieldName: "targetValue", header: "Chi tiêu" },
            { fieldName: "resultValue", header: "Kết quả" },
            { fieldName: "reportYear", header: "Năm báo cáo" },
            { fieldName: "remarks", header: "Ghi chú" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };


    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <Fieldset legend={`Danh sách chỉ số hoạt động chính`}>
            <MyFlexColumn>

                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <F_h8kz9e8j7d_Create />
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
                                <F_h8kz9e8j7d_Update values={row.original} />
                                <F_h8kz9e8j7d_Delete id={row.original.id!} maChiSo={row.original.indicatorCode!} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFlexColumn>
        </Fieldset>
    );
}

const data: I_h8kz9e8j7d_Read[] = [
    {
        id: 1,
        indicatorCode: "CS001",
        indicatorName: "Mức độ chuyển đổi số",
        targetValue: 50,
        resultValue: 65,
        reportYear: "2023",
        remarks: "",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 2,
        indicatorCode: "CS002",
        indicatorName: "Số bài báo WoS Scopus",
        targetValue: 50,
        resultValue: 65,
        reportYear: "2023",
        remarks: "",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 3,
        indicatorCode: "CS003",
        indicatorName: "Hài lòng của giảng viên",
        targetValue: 50,
        resultValue: 65,
        reportYear: "2023",
        remarks: "",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 4,
        indicatorCode: "CS004",
        indicatorName: "Kinh phí nghiên cứu",
        targetValue: 50,
        resultValue: 65,
        reportYear: "2023",
        remarks: "",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 5,
        indicatorCode: "CS005",
        indicatorName: "Tỷ lệ giảng viên có trình độ tiến sĩ",
        targetValue: 50,
        resultValue: 65,
        reportYear: "2023",
        remarks: "",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
];
