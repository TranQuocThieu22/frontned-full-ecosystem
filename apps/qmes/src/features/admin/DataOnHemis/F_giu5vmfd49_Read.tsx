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
import F_giu5vmfd49_Create from "./F_giu5vmfd49_Create";
import F_giu5vmfd49_Delete from "./F_giu5vmfd49_Delete";
import F_giu5vmfd49_Update from "./F_giu5vmfd49_Update";





export interface I_giu5vmfd49_Read {
    id?: number;          // Unique identifier
    reportType?: string;    // Loại file báo cáo
    result?: string;        // Kết quả
    reportYear?: string;    // Năm báo cáo
    notes?: string;         // Ghi chú
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date;   // Ngày cập nhật
}


export default function F_giu5vmfd49_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<I_giu5vmfd49_Read>({
        initialValues: {
        },
    })

    // Query to fetch the mock menuData
    const AllUserQuery = useQuery<I_giu5vmfd49_Read[]>({
        queryKey: ["F_giu5vmfd49_Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I_giu5vmfd49_Read>[]>(() => [
        { header: "Loại file báo cáo", accessorKey: "reportType", size: 350 },
        { header: "Kết quả", accessorKey: "result" },
        { header: "Năm báo cáo", accessorKey: "reportYear" },
        { header: "Ghi chú", accessorKey: "notes" },
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
            { fieldName: "reportType", header: "Loại file báo cáo" },
            { fieldName: "result", header: "Kết quả" },
            { fieldName: "reportYear", header: "Năm báo cáo" },
            { fieldName: "notes", header: "Ghi chú" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };


    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <Fieldset>
            <MyFlexColumn>

                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <F_giu5vmfd49_Create />
                                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                        console.log(form_multiple.values);

                                    }} >s</AQButtonCreateByImportFile>
                                    <AQButtonExportData
                                        objectName="dsKhoa"
                                        data={data}
                                        exportConfig={exportConfig}
                                        isAllData={true}
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
                                <F_giu5vmfd49_Update values={row.original} />
                                <F_giu5vmfd49_Delete id={row.original.id!} reportType={row.original.reportType!} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFlexColumn>
        </Fieldset>
    );
}

const data: I_giu5vmfd49_Read[] = [
    {
        id: 1, reportType: "Bảng 1A: Danh sách lãnh đạo chủ chốt", result: "Đầy đủ", reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 2, reportType: "Bảng 1B: Tình trạng hoàn thiện các văn bản", result: "Đầy đủ", reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 3, reportType: "Bảng 1C: Kết quả thực hiện các chỉ số hoạt động chính", result: "Đầy đủ", reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 4, reportType: "Bảng 2A: Đội ngũ giảng viên toàn thời gian", result: "Đầy đủ", reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 5, reportType: "Bảng 3A: Khuôn viên trụ sở chính và các phân hiệu", result: "Đầy đủ", reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 6, reportType: "Bảng 3B: Công trình phục vụ đào tạo và nghiên cứu", result: "Đầy đủ", reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 7, reportType: "Bảng 3C: Giáo trình, tài liệu học tập bắt buộc", result: "Đầy đủ", reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 8, reportType: "Bảng 3D: Hạ tầng công nghệ thông tin", result: "Đầy đủ", reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 9, reportType: "Bảng 4: Báo cáo thu nhập", result: "Đầy đủ", reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 10, reportType: "Bảng 5A: Kết quả đào tạo và tuyển sinh", result: "Đầy đủ", reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 11, reportType: "Bảng 5B: Quy mô đào tạo theo lĩnh vực và trình độ", result: "Đầy đủ", reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 12, reportType: "Bảng 6A: Công bố khoa học của giảng viên", result: "Đầy đủ", reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 13, reportType: "Bảng KS-1: Kết quả khảo sát người học", result: "Đầy đủ", reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
];