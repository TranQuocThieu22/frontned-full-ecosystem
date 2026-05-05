'use client'
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import F_pfkendystd_Update from "./F_pfkendystd_Update";
import { mockDataRead } from "./mockDataRead";


export interface Ipfkendystd {
    maHocVien?: string; //Mã học viên
    hoTen?: string; //Họ tên
    gioiTinh?: string; //Giới tính
    ngaySinh?: string; //Ngày sinh
    soDienThoai?: string; //Số điện thoại
    email?: string; //Email
    maKhoaHoc?: string; //Mã khóa học
    tenKhoaHoc?: string; //Tên khóa học
    cumThoiGian?: string; //Cụm thời gian
    chiNhanh?: string; //Chi nhánh
    loaiQuyetDinh?: string; //Loại quyết định
    ngayQuyetDinh?: string; //Ngày quyết định
    tenQuyetDinh?: string; //Tên quyết định
    ghiChu?: string; //Ghi chú
    minhChungQuyetDinh?: string; //Minh chứng quyết định
    bienLaiChuyenKhoan?: string; //Biên lai chuyển khoản
    huyQuyetDinh?: boolean; //Hủy quyết định
}

export default function F_pfkendystd_Read() {
    const query = useQuery<Ipfkendystd[]>({
        queryKey: [`F_pfkendystd_Read`],
        queryFn: async () => mockDataRead
    })


    const columns = useMemo<MRT_ColumnDef<Ipfkendystd>[]>(
        () => [
            {
                header: "Mã học viên",
                accessorKey: "maHocVien",
            },
            {
                header: "Họ tên",
                accessorKey: "hoTen",
            },
            {
                header: "Giới tính",
                accessorKey: "gioiTinh",
            },
            {
                header: "Ngày sinh",
                accessorKey: "ngaySinh",
                Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>()))

            },
            {
                header: "Số điện thoại",
                accessorKey: "soDienThoai",
            },
            {
                header: "Email",
                accessorKey: "email",
            },
            {
                header: "Mã khóa học",
                accessorKey: "maKhoaHoc",
            },
            {
                header: "Tên khóa học",
                accessorKey: "tenKhoaHoc",
            },
            {
                header: "Cụm thời gian",
                accessorKey: "cumThoiGian",
            },
            {
                header: "Chi nhánh",
                accessorKey: "chiNhanh",
            },
            {
                header: "Loại quyết định",
                accessorKey: "loaiQuyetDinh",
            },
            {
                header: "Ngày quyết định",
                accessorKey: "ngayQuyetDinh",
                Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>()))

            },
            {
                header: "Tên quyết định",
                accessorKey: "tenQuyetDinh",
            },
            {
                header: "Ghi chú",
                accessorKey: "ghiChu",
            },
            {
                header: "Minh chứng quyết định",
                accessorKey: "minhChungQuyetDinh",
                Cell: ({ cell }) => <MyButton variant="transparent" >Xem</MyButton>

            },
            {
                header: "Biên lai chuyển khoản",
                accessorKey: "bienLaiChuyenKhoan",
                Cell: ({ cell }) => <MyButton variant="transparent" >Xem</MyButton>
            },
            {
                header: "Thao tác",
                Cell: ({ cell }) => <F_pfkendystd_Update data={cell.row.original} />,
            },
            {
                header: "Hủy quyết định",
                Cell: ({ row }) =>
                    row.original.huyQuyetDinh
                        ? <MyButton variant="transparent" >Hoàn tác</MyButton>
                        : <MyButton c="red" variant="transparent" >Hủy</MyButton>
            }
        ],
        []
    );
    const exportConfig = {
        fields: [
            {
                header: "Mã học viên",
                fieldName: "maHocVien",
            },
            {
                header: "Họ tên",
                fieldName: "hoTen",
            },
            {
                header: "Giới tính",
                fieldName: "gioiTinh",
            },
            {
                header: "Ngày sinh",
                fieldName: "ngaySinh",
            },
            {
                header: "Số điện thoại",
                fieldName: "soDienThoai",
            },
            {
                header: "Email",
                fieldName: "email",
            },
            {
                header: "Mã khóa học",
                fieldName: "maKhoaHoc",
            },
            {
                header: "Tên khóa học",
                fieldName: "tenKhoaHoc",
            },
            {
                header: "Cụm thời gian",
                fieldName: "cumThoiGian",
            },
            {
                header: "Chi nhánh",
                fieldName: "chiNhanh",
            },
            {
                header: "Loại quyết định",
                fieldName: "loaiQuyetDinh",
            },
            {
                header: "Ngày quyết định",
                fieldName: "ngayQuyetDinh",
            },
            {
                header: "Tên quyết định",
                fieldName: "tenQuyetDinh",
            },
            {
                header: "Ghi chú",
                fieldName: "ghiChu",
            },
            {
                header: "Minh chứng quyết định",
                fieldName: "minhChungQuyetDinh",
            },
            {
                header: "Biên lai chuyển khoản",
                fieldName: "bienLaiChuyenKhoan",
            },
        ]
    };

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."
    return (
        <MyFieldset title="Danh sách đăng ký khóa thi" >
            <MyDataTable
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={query.data!}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>

                                <AQButtonExportData
                                    objectName="dsDanhKyKhoaThi"
                                    data={query.data!}
                                    exportConfig={exportConfig}
                                />

                            </Group >
                        </>
                    )
                }}
            />
        </MyFieldset >
    )
}



