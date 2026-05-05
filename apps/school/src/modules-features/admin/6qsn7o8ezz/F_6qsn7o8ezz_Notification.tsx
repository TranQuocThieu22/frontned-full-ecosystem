'use client';
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MyButtonModal, MyButtonViewPDF, MyCheckbox, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { utils_date_dateToDDMMYYYString } from '@/utils/date';

interface Props {
    id?: number;
}

interface I_6qsn7o8ezz_thongBao {
    id?: number;
    loaiThongBao?: string; // Loại thông báo
    maHocSinh?: string  // Mã học sinh
    hoTen?:string // Họ tên
    noiDung?:string // Nội dung
    fileDinhKem?:string //file đính kèm
    zalo?:boolean 
    email?: boolean
    sms?: boolean
    ngayGui?:Date //ngày gửi
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_6qsn7o8ezz_ThongBao({ id }: Props) {
   
    const dis = useDisclosure();
    const listOfThongBaoQuery = useQuery<I_6qsn7o8ezz_thongBao[]>({
        queryKey: [`listOfThongBaoQuery`,id],
        queryFn: async () => [
            {
                id: 1,
                loaiThongBao: "Thông báo chăm sóc sức khỏe",
                maHocSinh: "HS0001",
                hoTen: "Tô Ngọc Lâm",
                noiDung: "Bé bị tiêu chảy nhờ phụ huynh đón về",
                fileDinhKem: "https://cartographicperspectives.org/index.php/journal/article/view/cp13-full/pdf",
                zalo :true ,
                email : true,
                sms : true,
                ngayGui: new Date(),
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
           
           
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I_6qsn7o8ezz_thongBao>[]>(() => [
        {
            header: "Loại thông báo",
            accessorKey: "loaiThongBao",
          },
          {
            header: "Mã học sinh",
            accessorKey: "maHocSinh",
          },
          {
            header: "Họ tên",
            accessorKey: "hoTen",
          },
          {
            header: "Nội dung",
            accessorKey: "noiDung",
          },
          {
            header: "File đính kèm", 
            accessorKey: "fileDinhKem",
            Cell: ({ row }) => {
                const fileId = row.original.id;
                const src = row.original.fileDinhKem;
                return <MyButtonViewPDF id={fileId} />;
            }
            },
            {
            header: "Zalo",
            accessorKey: "zalo",
            Cell: ({ cell }) => {
                return (
                <MyCheckbox
                    checked={cell.getValue() as boolean}
                    readOnly
                />
                );
            },
            },
            {
                header: "Email",
                accessorKey: "email",
                Cell: ({ cell }) => {
                    return (
                    <MyCheckbox
                        checked={cell.getValue() as boolean}
                        readOnly
                    />
                    );
                },
                },
            {
                header: "SMS",
                accessorKey: "sms",
                Cell: ({ cell }) => {
                return (
                    <MyCheckbox
                    checked={cell.getValue() as boolean}
                    readOnly
                    />
                );
                },
            },
           
          {
            header: "Ngày gửi",
            accessorKey: "ngayGui",
            accessorFn: (row) =>
                row.ngayGui
                    ? utils_date_dateToDDMMYYYString(new Date(row.ngayGui))
                    : ''
          },
          
          {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
          },
          {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) =>
              row.ngayCapNhat
                ? utils_date_dateToDDMMYYYString(new Date(row.ngayCapNhat))
                : "",
          },
    ], []);

    if (listOfThongBaoQuery.isLoading) return "Đang tải dữ liệu...";
    if (listOfThongBaoQuery.isError) return "Không có dữ liệu...";

    return (
        <MyButtonModal modalSize={"xl"} disclosure={dis} title="Danh sách thông báo đã gửi" label="Xem chi tiết">        
                <MyDataTable
                    exportAble
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    columns={columns}
                    data={listOfThongBaoQuery.data!}
                />   
            </MyButtonModal>);
}
