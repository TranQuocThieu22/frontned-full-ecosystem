'use client'
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Fieldset, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

import AQButtonExportData from "@/components/ui/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/ui/CenterFull/MyCenterFull";
import MyFlexColumn from "@/components/ui/Layouts/FlexColumn/MyFlexColumn";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, MyDataTable } from "aq-fe-framework/components";
import F_c5ncinr9mi_Create from "./F_c5ncinr9mi_Create";
import F_c5ncinr9mi_Delete from "./F_c5ncinr9mi_Delete";
import F_c5ncinr9mi_Update from "./F_c5ncinr9mi_Update";





export interface I_c5ncinr9mi_Read {
    id?: number;
    statisticalIndicator?: string;
    quantity?: number;
    reportYear?: string;     // Năm báo cáo (Extracted from effectiveDate)
    notes?: string;            // Ghi chú
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date;   // Ngày cập nhật
}


export default function F_c5ncinr9mi_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<I_c5ncinr9mi_Read>({
        initialValues: {
        },
    })

    // Query to fetch the mock menuData
    const AllUserQuery = useQuery<I_c5ncinr9mi_Read[]>({
        queryKey: ["F_c5ncinr9mi_Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I_c5ncinr9mi_Read>[]>(() => [
        { header: "Chỉ số thống kê", accessorKey: "statisticalIndicator" },
        { header: "Số lượng", accessorKey: "quantity" },
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
            { fieldName: "quantity", header: "Số lượng" },
            { fieldName: "notes", header: "Ghi chú" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };


    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <Fieldset legend={`Danh sách hạ tầng công nghệ thông tin`}>
            <MyFlexColumn>

                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <F_c5ncinr9mi_Create />
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
                                <F_c5ncinr9mi_Update values={row.original} />
                                <F_c5ncinr9mi_Delete id={row.original.id!} ma={row.original.statisticalIndicator!} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFlexColumn>
        </Fieldset>
    );
}

const data: I_c5ncinr9mi_Read[] = [
    {
        id: 1,
        statisticalIndicator: "Tốc độ hoặc băng thông đường truyền internet (Mbps)",
        quantity: 18000,
        notes: "",
        reportYear: "2023",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2024-02-01"),
    },
    {
        id: 2,
        statisticalIndicator: "Tổng số học phần giảng dạy trong năm học",
        quantity: 4430,
        notes: "",
        nguoiCapNhat: "Admin",
        reportYear: "2023",
        ngayCapNhat: new Date("2024-02-01"),
    },
    {
        id: 3,
        statisticalIndicator: "Tổng số học phần sẵn sàng dạy trực tuyến > 50%",
        quantity: 425,
        notes: "",
        reportYear: "2023",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2024-02-01"),
    },
];