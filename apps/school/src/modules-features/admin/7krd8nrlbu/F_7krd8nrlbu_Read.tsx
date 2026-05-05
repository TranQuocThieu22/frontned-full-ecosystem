'use client';
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import {  utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Anchor, Button, Flex, Group, Paper ,Select,Text} from "@mantine/core";
import { useForm } from '@mantine/form';
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButtonModal, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_7krd8nrlbu_Schedule from "./F_7krd8nrlbu_Schedule";
import F_7krd8nrlbu_CreatePickUp from "./F_7krd8nrlbu_CreatePickUp";
import F_7krd8nrlbu_CreateDropOff from "./F_7krd8nrlbu_CreateDropOff";
import F_7krd8nrlbu_Update from "./F_7krd8nrlbu_Update";
import F_7krd8nrlbu_Delete from "./F_7krd8nrlbu_Delete";


interface I_7krd8nrlbu {
    id?: number;
    maTuyenXe?: string; // Mã tuyến xe
    tenTuyenXe?: string // Tên tuyến xe
    trangThai?: string // Trạng thái
    bienSoXe?: string //Biển số xe
    laiXe?: string //Lái xe
    ngayTaoLichTrinh?: Date | null//Ngày tạo lập trình
    luot?: string //Lượt
    soDiemDon?: number //Số điểm đón
    gioKhoiHanh?: Date | undefined |string//Giờ khởi hành
    gioDenDuKien?: Date | undefined |string//Giờ đến dự kiến
   
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_7krd8nrlbu_Read() {
   
    const dis = useDisclosure();
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const listOfScheduleQuery = useQuery<I_7krd8nrlbu[]>({
        queryKey: [`listOfScheduleQuery`],
        queryFn: async () => [
            {
                id: 1,
                maTuyenXe: "TD01",
                tenTuyenXe: "Thủ Đức - Quận 9 - Quận 2",
                trangThai: "Đang hoạt động",  
                bienSoXe: "50A-56985",
                laiXe:"Tô Ngọc Lâm",
                ngayTaoLichTrinh: new Date("2024-10-10"),
                luot: "Đón khách",
                soDiemDon: 23,
                gioKhoiHanh: (() => {
                    const date = new Date(); 
                    date.setHours(6); 
                    date.setMinutes(0); 
                    return date;
                  })(),
                gioDenDuKien: (() => {
                    const date = new Date(); 
                    date.setHours(8); 
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

      const exportConfig = {
        fields: [
          { fieldName: "maTuyenXe", header: "Mã tuyến xe" },
          { fieldName: "tenTuyenXe", header: "Tên tuyến xe" },
          { fieldName: "trangThai", header: "Trạng thái" },
          { fieldName: "bienSoXe", header: "Biển số xe" },
          { fieldName: "laiXe", header: "Lái xe" },
          { fieldName: "ngayTaoLichTrinh", header: "Ngày tạo lịch trình" },
          { fieldName: "luot", header: "Lượt" },
          { fieldName: "soDiemDon", header: "Số điểm đón" },
          { fieldName: "gioKhoiHanh", header: "Giờ khởi hành" },
          { fieldName: "gioDenDuKien", header: "Giờ đến dự kiến" },
          { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
          { fieldName: "ngayCapNhat", header: "Ngày cập nhật" }
          


        ]
    };

    const columns = useMemo<MRT_ColumnDef<I_7krd8nrlbu>[]>(() => [
        {
            header: "Mã tuyến xe",
            accessorKey: "maTuyenXe",
          },
          {
            header: "Tên tuyến xe",
            accessorKey: "tenTuyenXe",
          },
          {
            header: "Trạng thái",
            accessorKey: "trangThai",
          },
          {
            header: "Biển số xe",
            accessorKey: "bienSoXe",
            Cell: ({ cell }) => (
                <Anchor
                  href={`#`}
                  target="_blank"
                  underline="always"
                >
                  {cell.getValue<string>()}
                </Anchor>
            ),
          },
          {
            header: "Lái xe",
            accessorKey: "laiXe",
            Cell: ({ cell }) => (
                <Anchor
                  href={`#`}
                  target="_blank"
                  underline="always"
                >
                  {cell.getValue<string>()}
                </Anchor>
            ),
          },
          {
            header: "Ngày tạo lịch trình",
            accessorKey: "ngayTaoLichTrinh",
            accessorFn: (row) =>
              row.ngayTaoLichTrinh
                ? utils_date_dateToDDMMYYYString(new Date(row.ngayTaoLichTrinh))
                : "",
          },
          {
            header: "Lượt",
            accessorKey: "luot",
          },
          {
            header: "Lịch trình",
            accessorKey: "lichTrinh",
            accessorFn: (row) => {
                return (
                    <MyCenterFull>
                        <F_7krd8nrlbu_Schedule id={row.id}/>
                    </MyCenterFull>
                )
            }
          },
          {
            header: "Số điểm đón",
            accessorKey: "soDiemDon",
          },
          {
            header: "Giờ khởi hành",
            accessorKey: "gioKhoiHanh",
            accessorFn: (row) =>
                row.gioKhoiHanh
                  ? formatTime(new Date(row.gioKhoiHanh))
                  : "",
          },
          {
            header: "Giờ đến dự kiến",
            accessorKey: "gioDenDuKien",
            accessorFn: (row) =>
                row.gioDenDuKien
                  ? formatTime(new Date(row.gioDenDuKien))
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
                ? utils_date_dateToDDMMYYYString(new Date(row.ngayCapNhat))
                : "",
          },
    ], []);

    if (listOfScheduleQuery.isLoading) return "Đang tải dữ liệu...";
    if (listOfScheduleQuery.isError) return "Không có dữ liệu...";

    return (

        <><Group mb={20} ml={20}>
        <Select
          placeholder="Chọn tuyến xe"
          label="Chọn tuyến xe"
          data={[
            "Thủ Đức - Quận 9 - Quận 2",
            "Gò Vấp - Quận 1 - Quận 3",
            "Thủ Đức - Quận 11 - Quận 4",
          ]}
          defaultValue="Thủ Đức - Quận 9 - Quận 2"
          styles={{ input: { width: 300 } }}
        />
      </Group>
                <MyFieldset mt="20" title="Danh sách lịch trình tuyến xe">
       
                    <MyDataTable
                        enableRowNumbers={true}
                        enableRowSelection={true}
                        columns={columns}
                        data={listOfScheduleQuery.data!}
                        renderTopToolbarCustomActions={() => <>
                            <F_7krd8nrlbu_CreatePickUp />
                            <AQButtonCreateByImportFile
                                    setImportedData={setFileData}
                                    onSubmit={() => console.log("data: ")}
                                    form={form_multiple}
                                />
                                <AQButtonExportData
                                    objectName="dmTHPB"
                                    data={listOfScheduleQuery.data!}
                                    exportConfig={exportConfig}
                                />
                            <MyButton crudType="delete">Xóa</MyButton>
                            <F_7krd8nrlbu_CreateDropOff />
                                
                        </>} 
                        renderRowActions={({ row }) => (
                            <MyCenterFull>
                                <F_7krd8nrlbu_Update data={row.original} />
                                <F_7krd8nrlbu_Delete id={row.original.id!} maTuyenXe={row.original.maTuyenXe!} />
                            </MyCenterFull>
                        )}
                        />
                        
                </MyFieldset>
           </>);
}
