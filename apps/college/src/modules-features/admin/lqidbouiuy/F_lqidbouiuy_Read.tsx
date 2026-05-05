'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_lqidbouiuy_Create from "./F_lqidbouiuy_Create";
import F_lqidbouiuy_Delete from "./F_lqidbouiuy_Delete";
import F_lqidbouiuy_Update from "./F_lqidbouiuy_Update";
export interface I {
    id?: number; // STT
    roomCode?: string; // Mã phòng
    name?: string //Tên phòng
    branch?:string//chi nhánh
    building?:string//dãy nhà

     sucChuaHoc?: number //sức chứa học sinh
     sucChuaThi?:number//sức chứa người thi
     tinhChatPhong?:string// tính chất phòng
     
   
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_lqidbouiuy_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const query = useQuery<I[]>({
        queryKey: [`ListOfRooms`],
        queryFn: async () => [
            {
                id: 1,
                roomCode: "PO1",
                name: "Phòng 01",
                branch: "Thủ Đức",
                building: "Dãy A",
                sucChuaHoc: 30,
                sucChuaThi: 25,
                tinhChatPhong: "Thí nghiệm",
                nguoiCapNhat: "Quản trị viên",

                ngayCapNhat: new Date("2024-12-23")
            },
            // {
            //     id: 2,
            //     courseCode: "CNTT",
            //     name: "Công nghệ thông tin",
            //     khoaQuanLy: 2,
            //     nguoiCapNhat: "Quản trị viên",
            //     ngayCapNhat: new Date("2024-12-23")
            // },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã phòng",
            accessorKey: "roomCode",
        },
        {
            header: "Tên phòng",
            accessorKey: "name",
        },
        {
            header: "Chi nhánh",
            accessorKey: "branch",
            // accessorFn: (row) => {
            //     if (row.type === "1") return "Quyết định vào mới";
               
            // }
        },
        {
            header: "Dãy",
            accessorKey: "building",
        },
        {
            header: "Sức chứa học",
            accessorKey: "sucChuaHoc",
        },
        {
            header: "Sức chứa thi",
            accessorKey: "sucChuaThi",
        },
        {
            header: "Tính chất phòng",
            accessorKey: "tinhChatPhong",
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",

        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },

        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
        enableRowSelection={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() =>
                <>
                    <F_lqidbouiuy_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_lqidbouiuy_Update doituong={row.original} />
                        <F_lqidbouiuy_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
