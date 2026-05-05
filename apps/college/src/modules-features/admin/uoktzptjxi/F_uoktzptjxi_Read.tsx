'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_uoktzptjxi_Create from "./F_uoktzptjxi_Create";
import F_uoktzptjxi_Delete from "./F_uoktzptjxi_Delete";
import F_uoktzptjxi_Update from "./F_uoktzptjxi_Update";
export interface I {
    id?: number; // STT
    subjectCode?: string; // Mã MÔN HỌC
    name?: string //Tên môn học
    classPeriod?:string //tiết học
    
     tinhChatPhong?:string// tính chất phòng
     
   
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_uoktzptjxi_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const query = useQuery<I[]>({
        queryKey: [`ListOfSubjects`],
        queryFn: async () => [
            {
                id: 1,
                subjectCode: "MD01",
                name: "Lập trình căn bản",
                classPeriod:"45",
                tinhChatPhong: "Vi tính",
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
            header: "Mã môn học",
            accessorKey: "subjectCode",
        },
        {
            header: "Tên môn học",
            accessorKey: "name",
        },
        {
            header: "Số tiết",
            accessorKey: "classPeriod",
            // accessorFn: (row) => {
            //     if (row.type === "1") return "Quyết định vào mới";
               
            // }
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
        exportAble
        enableRowSelection={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() =>
                <> 
                <Group>
                    <F_uoktzptjxi_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                    </Group>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_uoktzptjxi_Update doituong={row.original} />
                        <F_uoktzptjxi_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
