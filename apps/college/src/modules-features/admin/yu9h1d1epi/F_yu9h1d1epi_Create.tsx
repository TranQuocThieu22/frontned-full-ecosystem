'use client'
import { MyButton } from '@/components/Buttons/Button/MyButton';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import MySelect from '@/components/Combobox/Select/MySelect';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFieldset from '@/components/Inputs/Fieldset/MyFieldset';
import { Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import { I_yu9h1d1epi_Read } from './F_yu9h1d1epi_Read';

export default function F_yu9h1d1epi_Create() {
    const [selectRow, setSelectedRow] = useState();
    const [isFullScreenModal, setIsFullscreenModal] = useState(false);
    const disc = useDisclosure();

    // data cho combobox chọn sinh viên
    const dataSelectStudent = [
        {
            id: 1,
            maSinhVien: "SV001",
            hoTen: "To Ngoc Lam",
        },
        {
            id: 2,
            maSinhVien: "SV002",
            hoTen: "Trần Thị B",
        },
        {
            id: 3,
            maSinhVien: "SV003",
            hoTen: "Lê Văn C",
        },
    ].map(e => ({
        value: e.id!.toString(),
        label: `${e.maSinhVien} - ${e.hoTen}` || '',
    })) ?? [];


    // query data danh sách các môn học sinh viên đang ký trong học kỳ
    const danhSachMonHocSVQuery = useQuery<I_yu9h1d1epi_Read[]>({
        queryKey: [`I_yu9h1d1epi_Create`],
        queryFn: async () => [
            {
                id: 1,
                maSinhVien: "SV001",
                hoTen: "To Ngoc Lam",
                ngaySinh: "2001-01-01",
                gioiTinh: "Nam",
                maLop: "IT01",
                maKhoa: "CNTT",
                maMonHoc: "MH001",
                tenMonHoc: "Lập trình cơ bản",
                nhomHoc: "01",
                nhhk: "2024-1",
            },
            {
                id: 2,
                maSinhVien: "SV002",
                hoTen: "Trần Thị B",
                ngaySinh: "2002-02-02",
                gioiTinh: "Nữ",
                maLop: "IT02",
                maKhoa: "CNTT",
                maMonHoc: "MH002",
                tenMonHoc: "Cấu trúc dữ liệu",
                nhomHoc: "02",
                nhhk: "2025-1",
            },
            {
                id: 3,
                maSinhVien: "SV003",
                hoTen: "Lê Văn C",
                ngaySinh: "2003-03-03",
                gioiTinh: "Nam",
                maLop: "IT03",
                maKhoa: "KHMT",
                maMonHoc: "MH003",
                tenMonHoc: "Hệ điều hành",
                nhomHoc: "03",
                nhhk: "2024-1",
            },
        ],
    });

    // column table
    const columns = useMemo<MRT_ColumnDef<I_yu9h1d1epi_Read>[]>(() => [
        { header: "Mã sinh viên", accessorKey: "maSinhVien" },
        { header: "Họ tên", accessorKey: "hoTen" },
        { header: "Ngày sinh", accessorKey: "ngaySinh" },
        { header: "Giới tính", accessorKey: "gioiTinh" },
        { header: "Mã lớp", accessorKey: "maLop" },
        { header: "Mã khóa", accessorKey: "maKhoa" },
        { header: "Mã môn học", accessorKey: "maMonHoc" },
        { header: "Tên môn học", accessorKey: "tenMonHoc" },
        { header: "Nhóm học", accessorKey: "nhomHoc" },
        { header: "NHHK học", accessorKey: "nhhk" },
    ], []);

    return (
        <MyButtonModal
            title="Danh sách kết quả đăng ký môn học trong học kỳ theo sinh viên"
            disclosure={disc}
            crudType="create"
            modalSize={"99%"}
            fullScreen={isFullScreenModal}
        >
            <Group>
                <MySelect label='Chọn sinh viên' defaultValue={dataSelectStudent[0]?.value} data={dataSelectStudent}></MySelect>
            </Group>
            <MyFieldset title="Danh sách kết quả đăng ký của sinh viên">
                <MyDataTable
                    setSelectedRow={setSelectedRow}
                    enableRowSelection={true}
                    columns={columns}
                    data={danhSachMonHocSVQuery.data!}
                    onIsFullScreenChange={(fullScreen) => setIsFullscreenModal(fullScreen)}
                    renderTopToolbarCustomActions={() =>
                        <>
                            <MyButton color='green' crudType='create'>Chọn</MyButton>
                        </>
                    }
                />
            </MyFieldset>
        </MyButtonModal>
    )
}