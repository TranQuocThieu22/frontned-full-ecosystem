'use client'

import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButton, MyCenterFull, MyCheckbox, MyDataTable, MyFieldset, MySelect } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_xbx2dluzw4_Update from "./F_xbx2dluzw4_Update";
import F_xbx2dluzw4_Create from "./F_xbx2dluzw4_Create";
import F_xbx2dluzw4_Delete from "./F_xbx2dluzw4_Delete";
import { Group } from "@mantine/core";

interface Ixbx2dluzw4_ReadDSVatTuToChucSK {
    maSuKien: string;
    tenSuKien: string;
    ngayToChuc: Date;
    gioBatDau: string;
    thoiGian: number;
    diaDiem: string;
    ngayBatDauDangKy: Date;
    vatTu: string;
    soLuong: number;
    ngayTrangBi: Date;
    tinhTrang: string;
    tienDoThucHien: string;
    hoanThanh: boolean;
    ngayHoanThanh: Date;
    ghiChu: string;
}

interface ISelectBoxProps {
    label: string;
    value: string;
}

const tinhTrangOption: ISelectBoxProps[] = [
    {
        label: 'Có sẵn',
        value: "1"
    },
    {
        label: 'Thuê',
        value: "2"
    },
    {
        label: 'Mua',
        value: "3"
    },
];

const vatTuOption: ISelectBoxProps[] = [
    {
        label: 'Loa 50W',
        value: "1"
    },
    {
        label: 'Dàn âm ly dj sôi động',
        value: "2"
    },
    {
        label: 'Đèn LED sân khấu',
        value: "3"
    },
]

const mockDSVatTuToChucSK: Ixbx2dluzw4_ReadDSVatTuToChucSK[] = [
    {
        maSuKien: 'SK0001',
        tenSuKien: 'Sự kiện 1',
        ngayToChuc: new Date(2022, 10, 10),
        gioBatDau: '08:00',
        thoiGian: 180,
        diaDiem: 'Đại học Bách Khoa',
        ngayBatDauDangKy: new Date(2022, 10, 10),
        vatTu: '1',
        soLuong: 20,
        ngayTrangBi: new Date(2022, 10, 10),
        tinhTrang: '1',
        tienDoThucHien: 'Khả dụng trong kho',
        hoanThanh: true,
        ngayHoanThanh: new Date(2022, 10, 10),
        ghiChu: ''
    },
    {
        maSuKien: 'SK0002',
        tenSuKien: 'Sự kiện 2',
        ngayToChuc: new Date(2022, 12, 11),
        gioBatDau: '09:00',
        thoiGian: 180,
        diaDiem: 'Đại học Sài Gòn',
        ngayBatDauDangKy: new Date(2022, 12, 11),
        vatTu: '2',
        soLuong: 1,
        ngayTrangBi: new Date(2022, 12, 11),
        tinhTrang: '2',
        tienDoThucHien: 'Không khả dụng trong kho',
        hoanThanh: false,
        ngayHoanThanh: new Date(2022, 12, 11),
        ghiChu: 'Thue CTy Anh Quân'
    },
]

const suKienOption: ISelectBoxProps[] = [
    {
        label: 'Halowin',
        value: "SK0001"
    },
    {
        label: 'Lunar New Year',
        value: "SK0002"
    },
    {
        label: 'Mid-autumn Festival',
        value: "SK0003"
    },
]

export default function F_xbx2dluzw4_Read() {
    //===initiate===
    const [importData, setImportData] = useState(false);

    const form = useForm<any>({
        initialValues: {
            importedData: []
        }
    });

    //===pseudo code===
    const dSVatTuToChucSKQuery = useQuery<Ixbx2dluzw4_ReadDSVatTuToChucSK[]>({
        queryKey: ['Fxbx2dluzw4_ReadDSVatTuToChucSK'],
        queryFn: async () => mockDSVatTuToChucSK,
    });

    const vatTuQuery = useQuery<ISelectBoxProps[]>({
        queryKey: ['Fxbx2dluzw4_ReadVatTu'],
        queryFn: async () => vatTuOption,
    });

    const tinhTrangQuery = useQuery<ISelectBoxProps[]>({
        queryKey: ['Fxbx2dluzw4_ReadTinhTrang'],
        queryFn: async () => tinhTrangOption,
    });

    const suKienQuery = useQuery<ISelectBoxProps[]>({
        queryKey: ['Fxbx2dluzw4_ReadSukien'],
        queryFn: async () => suKienOption.map((e) => {
            return {
                label: `${e.value} - ${e.label}`,
                value: e.value
            }
        }),
    });

    //===function===
    const exportConfig = {
        fields: [
            { fieldName: 'maSuKien', header: 'Mã sự kiện' },
            { fieldName: 'tenSuKien', header: 'Tên sự kiện' },
            { fieldName: 'ngayToChuc', header: 'Ngày tổ chức' },
            { fieldName: 'gioBatDau', header: 'Giờ bắt đầu' },
            { fieldName: 'thoiGian', header: 'Thời gian' },
            { fieldName: 'diaDiem', header: 'Địa điểm' },
            { fieldName: 'ngayBatDauDangKy', header: 'Ngày bắt đầu đăng ký' },
            { fieldName: 'vatTu', header: 'Vật tư' },
            { fieldName: 'soLuong', header: 'Số lượng' },
            { fieldName: 'ngayTrangBi', header: 'Ngày trang bị' },
            { fieldName: 'tinhTrang', header: 'Tình trạng' },
            { fieldName: 'tienDoThucHien', header: 'Tiến độ thực hiện' },
            { fieldName: 'hoanThanh', header: 'Hoàn thành' },
            { fieldName: 'ngayHoanThanh', header: 'Ngày hoàn thành' },
            { fieldName: 'ghiChu', header: 'Ghi chú' },
        ],
    };

    //===component===
    const dSVatTuToChucSKColumns = useMemo<MRT_ColumnDef<Ixbx2dluzw4_ReadDSVatTuToChucSK>[]>(() => [
        { accessorKey: 'maSuKien', header: 'Mã sự kiện' },
        { accessorKey: 'tenSuKien', header: 'Tên sự kiện' },
        { accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayToChuc!)), header: 'Ngày tổ chức' },
        { accessorKey: 'gioBatDau', header: 'Giờ bắt đầu' },
        { accessorFn: (row) => `${row.thoiGian} phút`, header: 'Thời gian' },
        { accessorKey: 'diaDiem', header: 'Địa điểm' },
        { accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayBatDauDangKy!)), header: 'Ngày bắt đầu đăng ký' },
        { accessorFn: (row) => vatTuQuery.data?.find((e) => row.vatTu == e.value)?.label, header: 'Vật tư' },
        { accessorKey: 'soLuong', header: 'Số lượng' },
        { accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayTrangBi!)), header: 'Ngày trang bị' },
        { accessorFn: (row) => tinhTrangQuery.data?.find((e) => row.vatTu == e.value)?.label, header: 'Tình trạng' },
        { accessorKey: 'tienDoThucHien', header: 'Tiến độ thực hiện' },
        { accessorFn: (row) => <MyCheckbox checked={row.hoanThanh} onChange={() => { }} />, header: 'Hoàn thành' },
        { accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayHoanThanh!)), header: 'Ngày hoàn thành' },
        { accessorKey: 'ghiChu', header: 'Ghi chú' },
    ], [vatTuQuery, tinhTrangQuery]);

    //===query stage condition===
    if (dSVatTuToChucSKQuery.isLoading) {
        return "Đang tải dữ liệu...";
    }

    if (dSVatTuToChucSKQuery.isError) {
        return "Lỗi Tải dữ liệu!";
    }

    if (vatTuQuery.isLoading) {
        return "Đang tải dữ liệu...";
    }

    if (vatTuQuery.isError) {
        return "Lỗi Tải dữ liệu!";
    }

    if (tinhTrangQuery.isLoading) {
        return "Đang tải dữ liệu...";
    }

    if (tinhTrangQuery.isError) {
        return "Lỗi Tải dữ liệu!";
    }

    if (suKienQuery.isLoading) {
        return "Đang tải dữ liệu...";
    }

    if (suKienQuery.isError) {
        return "Lỗi Tải dữ liệu!";
    }

    return (
        <>
            <Group>
                <MySelect pb={20} pl={20} data={suKienQuery.data!} label='Chọn sự kiện' defaultValue={"SK0001"} />
            </Group>
            <MyFieldset title="Danh sách vật tư tổ chức sự kiện">
                <MyDataTable
                    enableRowSelection={true}
                    columns={dSVatTuToChucSKColumns}
                    data={dSVatTuToChucSKQuery.data!}
                    renderTopToolbarCustomActions={() =>
                        <>
                            <F_xbx2dluzw4_Create />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form}
                                onSubmit={() => { console.log(form.values) }} />
                            <AQButtonExportData
                                data={dSVatTuToChucSKQuery.data!}
                                exportConfig={exportConfig}
                                objectName="danhSachSuKien" />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    }
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <F_xbx2dluzw4_Update data={row.original} />
                            <F_xbx2dluzw4_Delete id={row.original.maSuKien} />
                        </MyCenterFull>
                    )}
                />
            </MyFieldset>
        </>
    )
}