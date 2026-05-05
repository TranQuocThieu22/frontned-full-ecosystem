'use client'

import { DateInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useMemo, useState } from 'react';
import { MyButton, MyButtonCreate, MyCenterFull, MyCheckbox, MyDataTable, MyDateInput, MyFieldset, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components"
import { U0DateToDDMMYYYString } from '@/utils/date';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import F_7krd8nrlbu_ScheduleUpdate from './F_7krd8nrlbu_ScheduleUpdate';
import F_7krd8nrlbu_ScheduleDelete from './F_7krd8nrlbu_ScheduleDelete';
import { MyActionIcon } from '@/components/ActionIcons/ActionIcon/MyActionIcon';
import { useDisclosure } from '@mantine/hooks';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { Box, Button, Group, Paper } from '@mantine/core';
import F_7krd8nrlbu_ScheduleCreate from './F_7krd8nrlbu_ScheduleCreate';

export interface I_7krd8nrlbu {
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
   ghiChu?:string
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

interface I_hbwyvjoqgu_Schedule {
    id?: number;
    diemDon?: string; // Điểm đón
    gioDon?: Date //Giờ đón
    
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_hbwyvjoqgu_CreateDropOff() {
      
    const dis = useDisclosure(); 
    const form = useForm<I_7krd8nrlbu>({
        initialValues: {
            id: 1,
            maTuyenXe: "",
            tenTuyenXe: "",
            ngayTaoLichTrinh: new Date(),
            luot: "Trả khách",
            gioKhoiHanh:formatTime(new Date()),
            gioDenDuKien: formatTime(new Date()),
              ghiChu:"",
            nguoiCapNhat: "Quản trị viên",
            ngayCapNhat: new Date("2024-12-23")
        },
        validate: {
            maTuyenXe: (value) => (value ? null : 'Mã tuyến xe là bắt buộc'),
            tenTuyenXe: (value) => (value ? null : 'Tên tuyến xe là bắt buộc'),
            ngayTaoLichTrinh: (value) => (value ? null : 'Ngày tạo lịch trình là bắt buộc'),
            gioKhoiHanh: (value) => (value ? null : 'Giờ khởi hành là bắt buộc'),
            gioDenDuKien: (value) => (value ? null : 'Giờ đến dự kiến là bắt buộc'),
          }
          
    });

    const listOfPickUpPointQuery = useQuery<I_hbwyvjoqgu_Schedule[]>({
        queryKey: [`listOfPickUpPointQuery`],
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
    MyActionIcon

    return (
        <MyButtonModal label={"Tạo lượt trả"} modalSize={1000} crudType={"create"} title='Chi tiết lịch trình xe' onSubmit={() => { } } disclosure={dis} >
            <form onSubmit={form.onSubmit((values) => console.log(values)) }>
                <MyDateInput withAsterisk label='Ngày tạo lịch trình' {...form.getInputProps("ngayTaoLichTrinh")}/>
                <MyTextInput withAsterisk  label='Mã tuyến xe '  {...form.getInputProps("maTuyenXe")} />
                <MyTextInput withAsterisk  label='Tên tuyến xe '  {...form.getInputProps("tenTuyenXe")} />
                <MySelect data={['Đón khách', 'Trả khách']}
                            defaultValue="Đón khách" disabled label='Lượt' {...form.getInputProps("luot")}/>
                <TimeInput
                    label="Giờ khởi hành"
                    withAsterisk
                    placeholder="HH:mm"
                    {...form.getInputProps("gioKhoiHanh")}
                    //định dạng HH:mm:AM/PM
                />
                 <TimeInput
                    label="Giờ đến dự kiến"
                    withAsterisk
                    placeholder="HH:mm"
                    {...form.getInputProps("gioDenDuKien")}
                    //định dạng HH:mm:AM/PM
                />
                <MyTextArea label='Ghi chú'  />
                <Group justify="flex-end" mt="md">
                <MyButton
                    crudType={"save"}
                    color='green'
                    onClick={() => {
                        const isValid = form.validate();
                        if (isValid.hasErrors) return; 
                        console.log(form.values); 
                        dis[1].close(); 
                    }}
                    >
                    Lưu
                    </MyButton>
                </Group>
            </form>

            <Box>
                <MyFieldset mt="20" title="Danh sách điểm đón">
                <MyDataTable
                    exportAble
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    columns={columns}
                    data={listOfPickUpPointQuery.data!}
                     renderTopToolbarCustomActions={() => <>
                        <F_7krd8nrlbu_ScheduleCreate />
                        <MyButton crudType="import"></MyButton>
                        <MyButton crudType="delete">Xóa</MyButton>
                            
                    </>} 
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <F_7krd8nrlbu_ScheduleUpdate data={row.original} />
                                <F_7krd8nrlbu_ScheduleDelete id={row.original.id!}  diemDon={row.original.diemDon!}/>
                            </MyCenterFull>
                        );
                    }}
/>         
                </MyFieldset>
            </Box>
            
    </MyButtonModal>
    )
}