'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Fieldset, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
    type MRT_ColumnDef
} from 'mantine-react-table';

import { useMemo, useState } from "react";

export interface I_423j6pu4al_Training {
    maSinhVien: string; // Mã sinh viên
    hoVaTen: string; // Họ và tên
    ngaySinh: string; // Ngày sinh
    gioiTinh: string; // Giới tính
    hienDien: string; // Hiện diện
    diemRenLuyen: number; // Điểm rèn luyện học kỳ
}

export interface I_423j6pu4al_DataTrainingChange {
    maSinhVien: string; // Mã sinh viên
    diemRenLuyen: number; // Điểm rèn luyện học kỳ
}

// Component hiển thị bảng dữ liệu
export default function F_423j6pu4al_InputTraining({ classId }: { classId: string }) {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const discModalNhapDiem = useDisclosure()
    const [editedUsers, setEditedUsers] = useState<I_423j6pu4al_DataTrainingChange[]>([]);

    // Xử lý lấy các sinh viên có điểm rèn luyện được thay đổi
    const handleValueTrainingChange = (maSinhVien : string, newValue : number) => {
        setEditedUsers((prev) => {
            const existingIndex = prev.findIndex((item) => item.maSinhVien === maSinhVien);
            const newEntry = { maSinhVien: maSinhVien, diemRenLuyen: newValue };

            if (existingIndex !== -1) {
                // Nếu ID đã tồn tại, cập nhật giá trị mới
                const updatedList = [...prev];
                updatedList[existingIndex] = newEntry;
                return updatedList;
            } else {
                // Nếu ID chưa tồn tại, thêm mới
                return [...prev, newEntry];
            }
        });
    };

    // Sử dụng useQuery để lấy dữ liệu
    const studentOfClassQuery = useQuery<I_423j6pu4al_Training[]>({
        queryKey: ["F_423j6pu4al_InputTraning"], // Khóa cache dữ liệu
        queryFn: async () => [
            { maSinhVien: "SV0001", hoVaTen: "Tô Ngọc Lâm", ngaySinh: "01/01/2000", gioiTinh: "Nam", hienDien: "Đang học", diemRenLuyen: 89 },
            { maSinhVien: "SV0002", hoVaTen: "Tô Ngọc Lá", ngaySinh: "01/01/2000", gioiTinh: "Nam", hienDien: "Đang học", diemRenLuyen: 80 },
            { maSinhVien: "SV0003", hoVaTen: "Tô Ngọc Báo", ngaySinh: "01/01/2000", gioiTinh: "Nam", hienDien: "Đang học", diemRenLuyen: 78 },
            { maSinhVien: "SV0004", hoVaTen: "Tô Ngọc Bảo", ngaySinh: "01/01/2000", gioiTinh: "Nam", hienDien: "Đang học", diemRenLuyen: 18 },
        ],
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_423j6pu4al_Training>[]>(() => [
        {
            header: "Mã sinh viên",
            accessorKey: "maSinhVien",
        },
        {
            header: "Họ tên",
            accessorKey: "hoVaTen",
        },
        {
            header: "Ngày sinh",
            accessorKey: "ngaySinh",
        },
        {
            header: "Giới tính",
            accessorKey: "gioiTinh",
        },
        {
            header: "Hiện diện",
            accessorKey: "hienDien",
        },
        {
            header: "Điểm rèn luyện học kỳ",
            accessorKey: "diemRenLuyen",
            id: "diemRenLuyen",
            Cell: ({row}) => <TextInput
                variant="unstyled"
                onKeyDown={(event) => {
                    if (!/^[0-9]$/.test(event.key) && event.key !== "Backspace" && event.key !== "Tab") {
                        event.preventDefault();
                    }
                }} 
                placeholder="Input"
                onBlur ={(event) => {
                    const newValue = Number(event.target.value);
                    const maSinhVien = row.original.maSinhVien;
                    handleValueTrainingChange(maSinhVien, newValue);    
                }}
            />
        },

    ], []);

    // Xử lý trạng thái tải dữ liệu
    if (studentOfClassQuery.isLoading) return "Đang tải dữ liệu...";
    if (studentOfClassQuery.isError) return "Không có dữ liệu...";

    return (
        <MyButtonModal
            modalSize={"100%"}
            disclosure={discModalNhapDiem}
            fullScreen={isFullScreen}
            title="Nhập điểm rèn luyện theo danh sách lớp"
            label="Nhập điểm"
        >
            <Fieldset legend="Danh sách sinh viên của lớp" radius="sm">
                <MyDataTable
                    enableRowSelection
                    columns={columns} // Các cột hiển thị
                    data={studentOfClassQuery.data!} // Dữ liệu từ useQuery
                    renderTopToolbarCustomActions={() =>
                        <>
                            <MyButton crudType="default" color="green" onClick={() => { console.log(editedUsers) }}>Lưu</MyButton>
                        </>
                    }
                    onIsFullScreenChange={(fullScreen) => setIsFullScreen(fullScreen)}
                    mantineTableBodyCellProps={({ column, row, table }) => {
                        const firstRowIndex = table.getRowModel().rows[0]?.index; // Lấy index hàng đầu tiên
                        const lastRowIndex = table.getRowModel().rows.at(-1)?.index; // Lấy index hàng cuối cùng
                        const borderStyle = '2px solid black';
                        return column.id === 'diemRenLuyen'
                            ? {
                                style: {
                                    borderLeft: borderStyle,
                                    borderRight: borderStyle,
                                    borderTop: row.index === firstRowIndex ? borderStyle : 'none',
                                    borderBottom: row.index === lastRowIndex ? borderStyle : 'none',
                                },
                            }
                            : {};
                    }}
                />
            </Fieldset>
        </MyButtonModal>
    );
}
