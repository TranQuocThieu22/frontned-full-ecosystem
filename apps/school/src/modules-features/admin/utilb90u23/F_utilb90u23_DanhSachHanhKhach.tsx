"use client";
import {
    AQButtonExportData,
    MyDataTable,
    MyFieldset,
    MyCheckbox,
    MyButtonModal,
    MyButton,
} from "aq-fe-framework/components";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { IconSearch } from "@tabler/icons-react";

export default function F_utilb90u23_DanhSachHanhKhach() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const disclosure = useDisclosure();

    // Query
    const danhSachKhachHangQuery = useQuery<I_utilb90u23_KhachHang[]>({
        queryKey: ["F_utilb90u23_DanhSachHanhKhach"],
        queryFn: async () => {
            return mockData;
        },
    });

    // export confirm
    const exportConfig = {
        fields: [
            {
                header: "Mã học sinh",
                fieldName: "maHocSinh",
            },
            {
                header: "Họ tên",
                fieldName: "hoTen",
            },
            {
                header: "Lớp",
                fieldName: "lop",
            },
            {
                header: "Ngày sinh",
                fieldName: "ngaySinh",
            }
        ],
    };

    // column table
    const columns = useMemo<MRT_ColumnDef<I_utilb90u23_KhachHang>[]>(
        () => [
            {
                header: "Mã học sinh",
                accessorKey: "maHocSinh",
            },
            {
                header: "Họ tên",
                accessorKey: "hoTen",
            },
            {
                header: "Lớp",
                accessorKey: "lop",
            },
            {
                header: "Ngày sinh",
                accessorFn: (row) => utils_date_dateToDDMMYYYString(row.ngaySinh!)
            }
        ],
        []
    );

    if (danhSachKhachHangQuery.isLoading) return "Đang tải dữ liệu...";
    if (danhSachKhachHangQuery.isError) return "Lỗi tải dữ liệu";

    return (
        <>
            <MyButtonModal
                label={"Chọn hành khách"}
                leftSection={<IconSearch />}
                modalSize={"70%"}
                disclosure={disclosure}
                fullScreen={isFullScreen}
                color="gray"
            >
                <MyFieldset title="Danh sách hành khách">
                    <MyDataTable
                        enableRowSelection
                        data={danhSachKhachHangQuery.data!}
                        columns={columns}
                        onIsFullScreenChange={(isFullScreen) => { setIsFullScreen(isFullScreen) }}
                        renderTopToolbarCustomActions={({ table }) => (
                            <Group>
                                <MyButton crudType="select"></MyButton>
                                <AQButtonExportData
                                    data={danhSachKhachHangQuery.data!}
                                    exportConfig={exportConfig}
                                    objectName="DanhSachHanhKhach"
                                />
                            </Group>
                        )}
                    />
                </MyFieldset>
            </MyButtonModal>
        </>
    );
}


const mockData: I_utilb90u23_KhachHang[] = [
    {
        id: 1,
        maHocSinh: "HS000001",
        hoTen: "To Ngoc Lam",
        lop: "11A6",
        ngaySinh: new Date("01/15/2000"),
    },
];


interface I_utilb90u23_KhachHang {
    id?: number;
    maHocSinh?: string;
    hoTen?: string;
    lop?: string;
    ngaySinh?: Date;
}