'use client'
import AQButtonExportData from "@/components/ui/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/ui/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/ui/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Fieldset, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton } from "aq-fe-framework/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_oqx2kb9ikm_Create from "./F_oqx2kb9ikm_Create";
import F_oqx2kb9ikm_Delete from "./F_oqx2kb9ikm_Delete";
import F_oqx2kb9ikm_Update from "./F_oqx2kb9ikm_Update";

export interface I_oqx2kb9ikm_Read {
    id?: number;          // Unique identifier
    statisticalIndicator?: string;
    bachelor?: number;
    master?: number;
    doctorate?: number;
    notes?: string;
    reportYear?: string;
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date;   // Ngày cập nhật
}


export default function F_oqx2kb9ikm_Read() {
    const [importData, setImportData] = useState(false);


    // Query to fetch the mock menuData
    const AllUserQuery = useQuery<I_oqx2kb9ikm_Read[]>({
        queryKey: ["F_t2gufmu9g3_Read"],
        queryFn: () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I_oqx2kb9ikm_Read>[]>(() => [
        { header: "Chỉ số thống kê", accessorKey: "statisticalIndicator", size: 350 },
        { header: "Đại học", accessorKey: "bachelor" },
        { header: "Thạc sĩ", accessorKey: "master" },
        { header: "Tiến sĩ", accessorKey: "doctorate" },
        { header: "Năm báo cáo", accessorKey: "reportYear" },
        {
            header: "Ghi chú",
            accessorKey: "notes",
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
            { fieldName: "statisticalIndicator", header: "Chỉ số thống kê" },
            { fieldName: "bachelor", header: "Đại học" },
            { fieldName: "master", header: "Thạc sĩ" },
            { fieldName: "doctorate", header: "Tiến sĩ" },
            { fieldName: "reportYear", header: "Năm báo cáo" },
            { fieldName: "notes", header: "Ghi chú" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };


    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <Fieldset legend={`Danh sách chỉ số giảng viên`}>
            <MyFlexColumn>

                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <F_oqx2kb9ikm_Create />
                                    <MyButton actionType="import" />
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
                                <F_oqx2kb9ikm_Update values={row.original} />
                                <F_oqx2kb9ikm_Delete id={row.original.id!} statisticalIndicator={row.original.statisticalIndicator!} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFlexColumn>
        </Fieldset>
    );
}

const data: I_oqx2kb9ikm_Read[] = [
    {
        id: 1, statisticalIndicator: "Số giảng viên toàn thời gian", bachelor: 0, master: 245, doctorate: 150, reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 2, statisticalIndicator: "Số giảng viên cơ hữu trong độ tuổi lao động", bachelor: 0, master: 245, doctorate: 150, reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 3, statisticalIndicator: "Số giảng viên toàn thời gian có chỗ làm việc riêng biệt (diện tích tối thiểu 6m2/giảng viên)", bachelor: 0, master: 245, doctorate: 150, reportYear: "2024", notes: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
];