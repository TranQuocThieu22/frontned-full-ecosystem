'use client';
import { Button, Flex, Group, NumberFormatter, Paper } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useForm } from "@mantine/form";
import F_lxffbhdefm_Settings from "./F_lxffbhdefm_Settings";
import { IconTrash } from "@tabler/icons-react";
import F_lxffbhdefm_Delete from "./F_lxffbhdefm_Delete";
import F_lxffbhdefm_Update from "./F_lxffbhdefm_Update";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils"
import F_lxffbhdefm_Create from "./F_lxffbhdefm_Create";
import { AQButtonCreateByImportFile, AQButtonExportData, MyCenterFull, MyDataTable, MyFieldset, MySelect } from "aq-fe-framework/components";
export interface I_lxffbhdefm {
    id?: number;
    ngay?: Date;
    buoi?: string;
    nhomHocSinh?: string;
    cheDoAn?: string;
    thucDon?: string;
    dingDuong?: string;
    gia?: number;
}

export default function F_lxffbhdefm_Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const [selectedType, setSelectedType] = useState<string>("Ngày");

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const NGAY_DON_TRA_OPTIONS = [
        "Tuần 1: 30-04-2025/02-07-2025",
        "Tuần 2: 28-04-2025/05-06-2025",
        "Tuần 3: 23-04-2025/08-08-2025",
    ];

    const queryMealData = useQuery<I_lxffbhdefm[]>({
        queryKey: ["F_lxffbhdefm_Read"],
        queryFn: async () => [
            {
                id: 1,
                ngay: new Date("2025-04-30"),
                buoi: "Sáng",
                nhomHocSinh: "Tiểu học",
                cheDoAn: "Bình thường",
                thucDon: "Cơm - Rau - Canh rong biển",
                dingDuong: "Đủ chất",
                gia: 20000
            },
            {
                id: 2,
                ngay: new Date("2025-04-30"),
                buoi: "Chiều",
                nhomHocSinh: "Trung học",
                cheDoAn: "Ăn kiêng",
                thucDon: "Cơm - Gà kho - Rau muống",
                dingDuong: "Cân đối",
                gia: 25000
            },
            {
                id: 3,
                ngay: new Date("2025-05-01"),
                buoi: "Trưa",
                nhomHocSinh: "Phổ thông",
                cheDoAn: "Ăn chay",
                thucDon: "Bún - Đậu hũ - Canh cải",
                dingDuong: "Đầy đủ",
                gia: 22000
            }
        ]
    });

    const exportConfig = {
        fields: [
            { fieldName: "ngay", header: "Ngày" },
            { fieldName: "buoi", header: "Buổi" },
            { fieldName: "nhomHocSinh", header: "Nhóm học sinh" },
            { fieldName: "cheDoAn", header: "Chế độ ăn" },
            { fieldName: "thucDon", header: "Thực đơn" },
            { fieldName: "dingDuong", header: "Dinh dưỡng" },
            { fieldName: "gia", header: "Giá" }
        ]
    };

    const columns = useMemo<MRT_ColumnDef<I_lxffbhdefm>[]>(() => [
        {
            header: "Ngày",
            accessorFn: row => utils_date_dateToDDMMYYYString(new Date(row.ngay!)),
            id: "ngay",
        },
        { header: "Buổi", accessorKey: "buoi" },
        { header: "Nhóm học sinh", accessorKey: "nhomHocSinh" },
        { header: "Chế độ ăn", accessorKey: "cheDoAn" },
        { header: "Thực đơn", accessorKey: "thucDon", size: 240 },
        { header: "Dinh dưỡng", accessorKey: "dingDuong" },
        { header: "Giá", accessorFn: (row) => <NumberFormatter thousandSeparator="." decimalSeparator="," value={row.gia} /> }
    ], []);

    if (queryMealData.isLoading) return "Đang tải dữ liệu...";
    if (queryMealData.isError) return "Không thể tải dữ liệu.";

    return (
        <Paper p={20}>
            <Flex justify="space-between" align="center" mx={20}>
                <Group gap="xl">
                    <Group gap="sm">
                        {['Ngày', 'Tuần', 'Tháng'].map((type) => (
                            <Button
                                key={type}
                                variant={selectedType === type ? 'filled' : 'light'}
                                color={selectedType === type ? 'blue' : 'gray'}
                                onClick={() => setSelectedType(type)}
                            >
                                {type}
                            </Button>
                        ))}
                    </Group>
                    <MySelect
                        label="Chọn khoảng thời gian"
                        w={'260'}
                        defaultValue={NGAY_DON_TRA_OPTIONS[0]}
                        data={NGAY_DON_TRA_OPTIONS.map(option => ({
                            value: option,
                            label: option
                        }))}
                        clearable
                        mb={25}
                    />
                </Group>
                <F_lxffbhdefm_Settings />
            </Flex>

            <MyFieldset title="Danh sách thực đơn">
                <MyDataTable
                    enableRowSelection
                    enableRowNumbers
                    columns={columns}
                    data={queryMealData.data!}
                    renderTopToolbarCustomActions={() => (
                        <>
                            <F_lxffbhdefm_Create />
                            <AQButtonCreateByImportFile
                                setImportedData={setFileData}
                                onSubmit={() => console.log("Dữ liệu import: ", fileData)}
                                form={form_multiple}
                            />
                            <AQButtonExportData
                                objectName="DanhMucThucDon"
                                data={queryMealData.data!}
                                exportConfig={exportConfig}
                            />
                            <Button color="red" leftSection={<IconTrash />}>Xoá</Button>
                            <Button color="green">Kiểm tra</Button>
                            <Button color="green">Copy thực đơn tuần</Button>
                        </>
                    )}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <F_lxffbhdefm_Update data={row.original} />
                            <F_lxffbhdefm_Delete contextData={`${utils_date_dateToDDMMYYYString(row.original.ngay!)}-${row.original.buoi}`} />
                        </MyCenterFull>

                    )}
                />
            </MyFieldset>
        </Paper>
    );
}
