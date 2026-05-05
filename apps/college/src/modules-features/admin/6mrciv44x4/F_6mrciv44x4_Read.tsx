'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
    type MRT_ColumnDef
} from 'mantine-react-table';

import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { useEffect, useMemo, useState } from "react";
import F_6mrciv44x4_Delete from "./F_6mrciv44x4_Delete";

export interface I_6mrciv44x4_Read {
    id: number,
    maMonHoc: string; // Mã môn học
    tenMonHoc: string; // Tên môn
    nhomHoc: string; // Nhóm học
    maLop: string; // Mã lớp
    siSoTKB: number; // Sĩ số
    soLuongDaDangKy: number; // Số lượng đã đăng ký
    laKhongThi: boolean; // Có thi hay không
}

// Component hiển thị bảng dữ liệu
export default function F_6mrciv44x4_Read() {
    const [dataTable, setDataTable] = useState<I_6mrciv44x4_Read[]>([]);
    const [selectedRow, setSelectedRow] = useState<number[]>([]);

    // Xử lý lấy các môn học có thay đổi không thi
    const handleValueNotExamChange = (maMonHoc: string, newValue: boolean) => {
        // Xử lý dữ liệu table state để cập nhật checkbox
        if (dataTable) {
            setDataTable((prev) => {
                const newData = prev.map((row) =>
                    row.maMonHoc === maMonHoc ? { ...row, laKhongThi: newValue } : row
                );
                return newData;
            });
        }
    };

    // Hàm để so sánh dữ liệu và ghi nhận sự thay đổi
    const getChangedRows = (data: I_6mrciv44x4_Read[], originalData: I_6mrciv44x4_Read[]) => {
        return data.filter((row, index) => {
            return row.laKhongThi !== originalData[index]?.laKhongThi;
        });
    };

    // Xử lý uncheck
    const handleUncheckNotExam = () => {
        if (dataTable) {
            setDataTable(prev =>
                prev.map(item =>
                    selectedRow.includes(item.id)
                        ? { ...item, laKhongThi: false }
                        : item
                )
            );
        }
    };

    // Sử dụng useQuery để lấy dữ liệu
    const groupStudyQuery = useQuery<I_6mrciv44x4_Read[]>({
        queryKey: ["F_6mrciv44x4_InputTraning"], // Khóa cache dữ liệu
        queryFn: async () => {
            return ([
                { id: 1, maMonHoc: "MH0001", tenMonHoc: "Lập trình web", nhomHoc: "01", maLop: "IT01", siSoTKB: 10, soLuongDaDangKy: 5, laKhongThi: true },
                { id: 2, maMonHoc: "MH0002", tenMonHoc: "Hướng đối tượng", nhomHoc: "02", maLop: "IT02", siSoTKB: 20, soLuongDaDangKy: 6, laKhongThi: false },
                { id: 3, maMonHoc: "MH0003", tenMonHoc: "Cấu trúc dữ liệu", nhomHoc: "03", maLop: "IT03", siSoTKB: 30, soLuongDaDangKy: 7, laKhongThi: false },
                { id: 4, maMonHoc: "MH0004", tenMonHoc: "Đồ án chuyên ngành", nhomHoc: "04", maLop: "IT04", siSoTKB: 40, soLuongDaDangKy: 8, laKhongThi: true },
            ])
        }
    });

    // Cập nhật data trong state khi query có data
    useEffect(() => {
        if (groupStudyQuery.data) {
            setDataTable(groupStudyQuery.data);
        }
    }, [groupStudyQuery.data]);

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_6mrciv44x4_Read>[]>(() => [
        {
            header: "Mã môn học",
            accessorKey: "maMonHoc",
        },
        {
            header: "Tên môn học",
            accessorKey: "tenMonHoc",
        },
        {
            header: "Nhóm học",
            accessorKey: "nhomHoc",
        },
        {
            header: "Mã lớp",
            accessorKey: "maLop",
        },
        {
            header: "Sĩ số TKB",
            accessorKey: "siSoTKB",
        },
        {
            header: "Đã ĐK",
            accessorKey: "soLuongDaDangKy",
        },
        {
            header: "Không thi",
            accessorKey: "laKhongThi",
            id: "laKhongThi",
            Cell: ({ row }) => {
                const { maMonHoc, laKhongThi } = row.original;
                return (
                    <Checkbox
                        checked={laKhongThi}
                        onChange={(event) => {
                            const newValue = event.currentTarget.checked;
                            handleValueNotExamChange(maMonHoc, newValue);
                        }}
                    />
                );
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], []);

    const exportConfig = {
        fields: [
            {
                header: "Mã môn học",
                fieldName: "maMonHoc",
            },
            {
                header: "Tên môn học",
                fieldName: "tenMonHoc",
            },
            {
                header: "Nhóm học",
                fieldName: "nhomHoc",
            },
            {
                header: "Mã lớp",
                fieldName: "maLop",
            },
            {
                header: "Sĩ số TKB",
                fieldName: "siSoTKB",
            },
            {
                header: "Đã ĐK",
                fieldName: "soLuongDaDangKy",
            },
            {
                header: "Không thi",
                fieldName: "laKhongThi",
            },
        ]
    };

    // Xử lý trạng thái tải dữ liệu
    if (groupStudyQuery.isLoading) return "Đang tải dữ liệu...";
    if (groupStudyQuery.isError) return "Không có dữ liệu...";

    if (dataTable) return (
        <MyFieldset title="Danh sách nhóm học">
            <MyDataTable
                enableRowSelection
                columns={columns} // Các cột hiển thị
                data={dataTable!}
                setSelectedRow={setSelectedRow}
                renderTopToolbarCustomActions={() =>
                    <>
                        <MyButton crudType="save" onClick={() => { console.log(getChangedRows(dataTable, groupStudyQuery.data!)) }}>Lưu</MyButton>
                        <AQButtonExportData
                            isAllData
                            objectName={"DanhSachNhomHocKhongThi"}
                            data={dataTable}
                            exportConfig={exportConfig}
                        />
                        <F_6mrciv44x4_Delete handleDelete={handleUncheckNotExam} selectedRowCount={selectedRow.length} />
                    </>
                }
            />
        </MyFieldset>
    );
}