'use client';
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MyButtonModal, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_7krd8nrlbu_ScheduleUpdate from "./F_7krd8nrlbu_ScheduleUpdate";
import F_7krd8nrlbu_ScheduleDelete from "./F_7krd8nrlbu_ScheduleDelete";

interface Props {
    id?: number;
}

interface I_hbwyvjoqgu_Schedule {
    id?: number;
    diemDon?: string; // Điểm đón
    gioDon?: Date | undefined //Giờ đón
    
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_7krd8nrlbu_Schedule({ id }: Props) {
   
    const dis = useDisclosure();
    const listOfPickUpPointQuery = useQuery<I_hbwyvjoqgu_Schedule[]>({
        queryKey: [`listOfScheduleQuery`,id],
        queryFn: async () => [
            {
                id: 1,
                diemDon: "Mega Market Thủ Đức",
                gioDon: (() => {
                    const date = new Date(); 
                    date.setHours(6); 
                    date.setMinutes(0); 
                    return date;
                  })(),
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
           
           
        ],
    });

    function formatTime( date: Date) {
        const hours = date.getHours().toString().padStart(2, '0');  
        const minutes = date.getMinutes().toString().padStart(2, '0');  
        return `${hours}:${minutes}`; 
      }

    const columns = useMemo<MRT_ColumnDef<I_hbwyvjoqgu_Schedule>[]>(() => [
        {
            header: "Điểm đón",
            accessorKey: "diemDon",
          },
         
          {
            header: "Giờ đón",
            accessorKey: "gioDon",
            accessorFn: (row) =>
                row.gioDon
                  ? formatTime(new Date(row.gioDon))
                  : "",
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
                ? U0DateToDDMMYYYString(new Date(row.ngayCapNhat))
                : "",
          },
    ], []);

    if (listOfPickUpPointQuery.isLoading) return "Đang tải dữ liệu...";
    if (listOfPickUpPointQuery.isError) return "Không có dữ liệu...";

    return (
        <MyButtonModal modalSize={"xl"} disclosure={dis} title="Danh sách điểm đón" label="Lịch trình">        
                <MyDataTable
                    exportAble
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    columns={columns}
                    data={listOfPickUpPointQuery.data!}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <F_7krd8nrlbu_ScheduleUpdate data={row.original} />
                                <F_7krd8nrlbu_ScheduleDelete id={row.original.id!}  diemDon={row.original.diemDon!}/>
                            </MyCenterFull>
                        );
                    }}
                />   
            </MyButtonModal>);
}
