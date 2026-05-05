'use client';

import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { Group } from "@mantine/core";
import { MyDateInput, MyNumberInput, MySelect, MyTextInput } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
export interface I_o0wt29x8pv_Read {
    id?: number;
    maHocSinh?: string;
    tenLot?: string;
    ten?: string;
    ngaySinh?: Date;
    gioiTinh: string;
    nhomMau: string;
    chieuCao: number;
    canNang: number;
    BMI: number;
    thiLuc: string;
    thinhLuc: string;
    timMach: number;
    hoHap: number;
    ketLuanSoBo: string;
    ngayKham?: Date;
    tienSuBenhLy: string;
    ketLuanYTe: string;
}

export default function F_o0wt29x8pv_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    // data cho chọn lớp
    const dataSelectClass = [
        {
            id: 1,
            maLop: "10A6",
        },
        {
            id: 2,
            maLop: "10A9",
        }
    ].map(e => ({
        value: e.id!.toString(),
        label: e.maLop,
    })) ?? [];


    const ketQuaKhamQuery = useQuery<I_o0wt29x8pv_Read[]>({
        queryKey: [`I_o0wt29x8pv_Read`],
        queryFn: async () => [
            {
                id: 1,
                maHocSinh: "HSSS001",
                tenLot: "Tô Ngọc",
                ten: "Lâm",
                ngaySinh: new Date("01/21/2001"),
                gioiTinh: "Nam",
                nhomMau: "D",
                chieuCao: 150,
                canNang: 95,
                BMI: 40,
                thiLuc: "10/10",
                thinhLuc: "10/10",
                timMach: 85,
                hoHap: 120,
                ketLuanSoBo: "Sức khỏe tốt",
                ngayKham: new Date("01/24/2024"),
                tienSuBenhLy: "Dị ứng nước",
                ketLuanYTe: "Cần theo dõi",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I_o0wt29x8pv_Read>[]>(() => [
        { header: "Mã học sinh", accessorKey: "maHocSinh" },
        { header: "Họ lót", accessorKey: "tenLot" },
        { header: "Tên", accessorKey: "ten" },
        {
            header: "Ngày sinh", accessorKey: "ngaySinh", Cell({ row }) {
                return (utils_date_dateToDDMMYYYString(row.original.ngaySinh!));
            },
        },
        { header: "Giới tính", accessorKey: "gioiTinh" },
        { header: "Nhóm máu", accessorKey: "nhomMau" },
        {
            header: "Chiều cao", accessorKey: "chieuCao", Cell({ row }) {
                return (
                    <MyNumberInput
                        min={0}
                        defaultValue={row.original.chieuCao}
                        hideControls
                    />
                );
            },
        },
        {
            header: "Cân nặng", accessorKey: "canNang", Cell({ row }) {
                return (
                    <MyNumberInput
                        min={0}
                        defaultValue={row.original.canNang}
                        hideControls
                    />
                );
            },
        },
        {
            header: "BMI", accessorKey: "BMI", Cell({ row }) {
                return (
                    <MyNumberInput
                        min={0}
                        defaultValue={row.original.BMI}
                        hideControls
                    />
                );
            },
        },
        {
            header: "Thị lực", accessorKey: "thiLuc", Cell({ row }) {
                return (
                    <MyTextInput
                        defaultValue={row.original.thiLuc}
                    />
                );
            },
        },
        {
            header: "Thính lực", accessorKey: "thinhLuc", Cell({ row }) {
                return (
                    <MyTextInput
                        defaultValue={row.original.thinhLuc}
                    />
                );
            },
        },
        {
            header: "Tim mạch", accessorKey: "timMach", Cell({ row }) {
                return (
                    <MyNumberInput
                        min={0}
                        defaultValue={row.original.timMach}
                        hideControls
                    />
                );
            },
        },
        {
            header: "Hô hấp", accessorKey: "hoHap", Cell({ row }) {
                return (
                    <MyNumberInput
                        min={0}
                        defaultValue={row.original.hoHap}
                        hideControls
                    />
                );
            },
        },
        {
            header: "Kết luận sơ bộ", accessorKey: "ketLuanSoBo", Cell({ row }) {
                return (
                    <MyTextInput
                        defaultValue={row.original.ketLuanSoBo}
                    />
                );
            },
        },
        {
            header: "Ngày khám", accessorKey: "ngayKham", Cell({ row }) {
                return (
                    <MyDateInput defaultValue={row.original.ngayKham}
                    />
                );
            },
        },
        { header: "Tiền sử bệnh lý", accessorKey: "tienSuBenhLy" },
        { header: "Kết luận y tế", accessorKey: "ketLuanYTe" },

    ], []);

    const exportConfig = {
        fields: [
            { header: "Mã học sinh", fieldName: "maHocSinh" },
            { header: "Họ lót", fieldName: "tenLot" },
            { header: "Tên", fieldName: "ten" },
            { header: "Ngày sinh", fieldName: "ngaySinh" },
            { header: "Giới tính", fieldName: "gioiTinh" },
            { header: "Nhóm máu", fieldName: "nhomMau" },
            { header: "Chiều cao", fieldName: "chieuCao" },
            { header: "Cân nặng", fieldName: "canNang" },
            { header: "BMI", fieldName: "BMI" },
            { header: "Thị lực", fieldName: "thiLuc" },
            { header: "Thính lực", fieldName: "thinhLuc" },
            { header: "Tim mạch", fieldName: "timMach" },
            { header: "Hô hấp", fieldName: "hoHap" },
            { header: "Kết luận sơ bộ", fieldName: "ketLuanSoBo" },
            { header: "Ngày khám", fieldName: "ngayKham" },
            { header: "Tiền sử bệnh lý", fieldName: "tienSuBenhLy" },
            { header: "Kết luận y tế", fieldName: "ketLuanYTe" },
        ]
    };


    if (ketQuaKhamQuery.isLoading) return "Đang tải dữ liệu...";
    if (ketQuaKhamQuery.isError) return "Không có dữ liệu...";

    return (
        <>
            <Group mb={20} ml={20}>
                <MySelect
                    label="Chọn lớp"
                    defaultValue={dataSelectClass[0]?.value}
                    data={dataSelectClass}
                />
            </Group>
            <MyFieldset title="Danh sách ghi nhận kết quả khám">
                <MyDataTable
                    enableRowSelection={true}
                    columns={columns}
                    data={ketQuaKhamQuery.data!}
                    renderTopToolbarCustomActions={({ table }) =>
                        <>
                            <MyButton crudType="save" />
                            <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                console.log(form_multiple.values);

                            }} />
                            <AQButtonExportData
                                isAllData
                                objectName={"DanhSachKetQuaKham"}
                                data={ketQuaKhamQuery.data!}
                                exportConfig={exportConfig}
                            />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    }
                />
            </MyFieldset>
        </>
    );
}
