'use client'

import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyDataTable, MyFieldset, MySelect } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

interface Iynqwfnnk5a_Read {
    maHocSinh: string;
    hoLot: string;
    ten: string;
    ngaySinh: Date;
    gioiTinh: string;
    nhomMau: string;
    chieuCao: number; 
    canNang: number;
    BMI: number;
    thiLuc: string;
    thinhLuc: string;
    timMach?: number;
    hoHap?: number;
    tienSuBenhLy: string;
    ketLuanYTe: string;
}

interface ISelectBoxProps {
    label: string;
    value: string;
}

const mockDSHoSoSucKhoeHS: Iynqwfnnk5a_Read[] = [
    {
        maHocSinh: 'HS000001',
        hoLot: 'Tô Ngọc',
        ten: 'Lâm',
        ngaySinh: new Date(),
        gioiTinh: 'Nam',
        nhomMau: 'D',
        chieuCao: 150,
        canNang: 95,
        BMI: 40,
        thiLuc: '',
        thinhLuc: '',
        timMach: undefined,
        hoHap: undefined,
        tienSuBenhLy: 'Dị ứng nước',
        ketLuanYTe: 'Cần theo dõi'
    }
]

const mockLop: ISelectBoxProps[] = [
    {
        label: '11A6',
        value: '1',
    },
    {
        label: '11A7',
        value: '2',
    },
    {
        label: '11A8',
        value: '3',
    },
]

export default function F_ynqwfnnk5a_Read() {
    //===initiate===

    //===pseudo code===
    const dSHoSoSucKhoeHSQuery = useQuery<Iynqwfnnk5a_Read[]>({
        queryKey: ['Fynqwfnnk5a_ReadDSHoSoSucKhoeHS'],
        queryFn: async () => mockDSHoSoSucKhoeHS,
    });

    const lopQuery = useQuery<ISelectBoxProps[]>({
        queryKey: ['Fynqwfnnk5a_ReadDSLop'],
        queryFn: async () => mockLop,
    });

    //===function===
    const exportConfig = {
        fields: [
            { fieldName: 'maHocSinh', header: 'Mã học sinh' },
            { fieldName: 'hoLot', header: 'Họ lót' },
            { fieldName: 'ten', header: 'Tên' },
            { fieldName: 'ngaySinh', header: 'Ngày sinh' },
            { fieldName: 'gioiTinh', header: 'Giới tính' },
            { fieldName: 'nhomMau', header: 'Nhóm máu' },
            { fieldName: 'chieuCao', header: 'Chiều cao' },
            { fieldName: 'canNang', header: 'Cân nặng' },
            { fieldName: 'BMI', header: 'BMI' },
            { fieldName: 'thiLuc', header: 'Thị lực' },
            { fieldName: 'thinhLuc', header: 'Thính lực' },
            { fieldName: 'timMach', header: 'Tim mạch' },
            { fieldName: 'hoHap', header: 'Hô hấp' },
            { fieldName: 'tienSuBenhLy', header: 'Tiền sử bệnh lý' },
            { fieldName: 'ketLuanYTe', header: 'Kết luận y tế' },
        ],
    };    

    //===component===
    const dSHoSoSucKhoeHSColumns = useMemo<MRT_ColumnDef<Iynqwfnnk5a_Read>[]>(()=>[
        { accessorKey: 'maHocSinh', header: 'Mã học sinh' },
        { accessorKey: 'hoLot', header: 'Họ lót' },
        { accessorKey: 'ten', header: 'Tên' },
        { accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngaySinh!)), header: 'Ngày sinh' },
        { accessorKey: 'gioiTinh', header: 'Giới tính' },
        { accessorKey: 'nhomMau', header: 'Nhóm máu' },
        { accessorKey: 'chieuCao', header: 'Chiều cao' },
        { accessorKey: 'canNang', header: 'Cân nặng' },
        { accessorKey: 'BMI', header: 'BMI' },
        { accessorKey: 'thiLuc', header: 'Thị lực' },
        { accessorKey: 'thinhLuc', header: 'Thính lực' },
        { accessorKey: 'timMach', header: 'Tim mạch' },
        { accessorKey: 'hoHap', header: 'Hô hấp' },
        { accessorKey: 'tienSuBenhLy', header: 'Tiền sử bệnh lý' },
        { accessorKey: 'ketLuanYTe', header: 'Kết luận y tế' },
    ],[]);

    //===query stage condition===
    if (dSHoSoSucKhoeHSQuery.isLoading) {
        return "Đang tải dữ liệu...";
    }

    if (dSHoSoSucKhoeHSQuery.isError) {
        return "Lỗi Tải dữ liệu!";
    }

    return(
        <>
            <Group>
                <MySelect pb={20} pl={20} data={lopQuery.data!} label='Chọn lớp' defaultValue={"1"}/>
            </Group>
            <MyFieldset title="Danh sách hồ sơ sức khỏe học sinh">
                <MyDataTable
                    enableRowSelection={true}
                    columns={dSHoSoSucKhoeHSColumns}
                    data={dSHoSoSucKhoeHSQuery.data!}
                    renderTopToolbarCustomActions={() => 
                        <>
                            <AQButtonExportData
                            data={dSHoSoSucKhoeHSQuery.data!}
                            exportConfig={exportConfig}
                            objectName="danhSachHoSoSucKhoeHocSinh"/>
                        </>
                    }
                />
            </MyFieldset>
        </>
    )
}
