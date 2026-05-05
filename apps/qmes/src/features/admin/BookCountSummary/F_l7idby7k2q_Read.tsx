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
import F_l7idby7k2q_Create from "./F_l7idby7k2q_Create";
import F_l7idby7k2q_Delete from "./F_l7idby7k2q_Delete";
import F_l7idby7k2q_Update from "./F_l7idby7k2q_Update";

export interface I_l7idby7k2q_Read {
    id?: number;
    statisticalIndicator?: string;
    quantity?: number;
    reportYear?: string;     // Năm báo cáo (Extracted from effectiveDate)
    notes?: string;            // Ghi chú
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date;   // Ngày cập nhật
}


export default function F_l7idby7k2q_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<I_l7idby7k2q_Read>({
        initialValues: {
        },
    })

    // Query to fetch the mock menuData
    const AllUserQuery = useQuery<I_l7idby7k2q_Read[]>({
        queryKey: ["F_l7idby7k2q_Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I_l7idby7k2q_Read>[]>(() => [
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
        <Fieldset legend={`Danh sách số đầu sách`}>
            <MyFlexColumn>

                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <F_l7idby7k2q_Create />
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
                                <F_l7idby7k2q_Update values={row.original} />
                                <F_l7idby7k2q_Delete id={row.original.id!} statisticalIndicator={row.original.statisticalIndicator!} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFlexColumn>
        </Fieldset>
    );
}

const data: I_l7idby7k2q_Read[] = [
    {
        id: 1,
        statisticalIndicator: "Số đầu sách điện tử có thể truy cập trực tuyến",
        quantity: 123,
        notes: "",
        reportYear: "2023",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2024-02-01"),
    },
    {
        id: 2,
        statisticalIndicator: "Số đầu sách có bản in",
        quantity: 1430,
        notes: "",
        nguoiCapNhat: "Admin",
        reportYear: "2023",
        ngayCapNhat: new Date("2024-02-01"),
    },
    {
        id: 3,
        statisticalIndicator: "Số đầu sách in có thể mượn trực tiếp",
        quantity: 232425,
        notes: "",
        reportYear: "2023",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2024-02-01"),
    },
];