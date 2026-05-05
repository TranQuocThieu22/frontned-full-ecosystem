'use client'
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Checkbox, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyButton, MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_klfidusjgn_PhanHoi from "./F_klfidusjgn_PhanHoi";
import F_Iklfidusjgn_PhanLoai from "./F_klfidusjgn_PhanLoai";
import { mockDataRead } from "./mockDataRead";




export interface Iklfidusjgn {
    maHocVien?: string; //Mã học viên
    hoTen?: string; //Họ tên
    ngaySinh?: string; //Ngày sinh
    gioiTinh?: string; //Giới tính
    maKhoaHoc?: string; //Mã khóa học
    maKhoaThi?: string; //Mã khóa thi
    tieuDe?: string; //Tiêu đề
    fileDinhKem?: string; //File đính kèm
    diemTraiNghiem?: number; //Điểm trải nghiệm
    trangThai?: string; //Trạng thái
    daTraLoi?: boolean; //Đã trả lời
    traLoi?: string; //Trả lời
    noiDungChiTiet?: string; //Nội dung chi tiết
}


export default function F_klfidusjgn_Read() {
    const query = useQuery<Iklfidusjgn[]>({
        queryKey: [`F_klfidusjgn_Read`],
        queryFn: async () => mockDataRead
    })

    const columns = useMemo<MRT_ColumnDef<Iklfidusjgn>[]>(
        () => [
            {
                accessorKey: "maHocVien",
                header: "Mã học viên",
            },
            {
                accessorKey: "hoTen",
                header: "Họ tên",
            },
            {
                accessorKey: "ngaySinh",
                header: "Ngày sinh",
                Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>()))
            },
            {
                accessorKey: "gioiTinh",
                header: "Giới tính",
            },
            {
                accessorKey: "maKhoaHoc",
                header: "Mã khóa học",
            },
            {
                accessorKey: "maKhoaThi",
                header: "Mã khóa thi",
            },
            {
                accessorKey: "tieuDe",
                header: "Tiêu đề",
            },
            {
                accessorKey: "fileDinhKem",
                header: "File đính kèm",
                Cell: ({ cell }) => <MyCenterFull><MyButton >Xem</MyButton></MyCenterFull>
            },
            {
                accessorKey: "diemTraiNghiem",
                header: "Điểm trải nghiệm",
            },
            {
                accessorKey: "trangThai",
                header: "Trạng thái",
            },
            {
                accessorKey: "daTraLoi",
                header: "Đã trả lời",
                accessorFn: (row) => <Checkbox defaultChecked={row.daTraLoi} readOnly />,
            },
            {
                header: "Thao tác",
                Cell: ({ row }) => <MyCenterFull><F_klfidusjgn_PhanHoi data={row.original} /></MyCenterFull>
            }
        ],
        []
    );
    const exportConfig = {
        fields: [
            {
                fieldName: "maHocVien",
                header: "Mã học viên",
            },
            {
                fieldName: "hoTen",
                header: "Họ tên",
            },
            {
                fieldName: "ngaySinh",
                header: "Ngày sinh",
            },
            {
                fieldName: "gioiTinh",
                header: "Giới tính",
            },
            {
                fieldName: "maKhoaHoc",
                header: "Mã khóa học",
            },
            {
                fieldName: "maKhoaThi",
                header: "Mã khóa thi",
            },
            {
                fieldName: "tieuDe",
                header: "Tiêu đề",
            },
            {
                fieldName: "fileDinhKem",
                header: "File đính kèm",
            },
            {
                fieldName: "diemTraiNghiem",
                header: "Điểm trải nghiệm",
            },
            {
                fieldName: "trangThai",
                header: "Trạng thái",
            },
            {
                fieldName: "daTraLoi",
                header: "Đã trả lời",
            }
        ]
    };


    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."
    return (
        <MyFieldset title="Danh sách phản hồi" >
            <MyDataTable
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={query.data!}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <Group>
                            <AQButtonExportData
                                objectName="dsPhanHoi"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                            <F_Iklfidusjgn_PhanLoai />
                        </Group >
                    )
                }}
            />
        </MyFieldset >
    )
}



