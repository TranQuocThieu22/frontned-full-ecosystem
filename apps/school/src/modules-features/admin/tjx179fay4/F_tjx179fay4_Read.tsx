'use client'
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group, NumberFormatter } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_tjx179fay4_Table from "./F_tjx179fay4_Table";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";


interface I_tjx179fay4_Read{
    id?: number,
    eventcode?: string,
    eventname?: string,
    eventdate?: Date,
    starttime?: string,
    duration?: string,
    place?: string,
    registerdate?: Date,
    enddate?: Date,
    state?:string,
    cost?:number,
    employ?: number,
}

export default function F_tjx179fay4_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const query = useQuery<I_tjx179fay4_Read[]>({
        queryKey: [`Employ1`],
        queryFn: async () => [
            { id: 1, 
              eventcode: "SK001", 
              eventname: "Halloween", 
              eventdate: new Date("2024-10-30"), 
              starttime: "07:00", 
              duration: "180 phút", 
              place: "Hội trường A",
              registerdate: new Date("2024-10-15"),
              enddate: new Date("2024-10-25"),
              state: "Sắp diễn ra",
              cost: 150000, 
              employ: 5 },
        ]
    })

    const exportConfig = {
        fields: [
            { fieldName: "eventcode", header: "Mã sự kiện" },
            { fieldName: "eventname", header: "Tên sự kiện" },
            { fieldName: "eventdate", header: "Ngày tổ chức" },
            { fieldName: "starttime", header: "Giờ bắt đầu" },
            { fieldName: "duration", header: "Thời gian" },
            { fieldName: "place", header: "Địa điểm" },
            { fieldName: "registerdate", header: "Ngày bắt đầu đăng ký" },
            { fieldName: "enddate", header: "Ngày kết thúc đăng ký" },
            { fieldName: "state",header: "Trạng thái"},
            { fieldName: "cost",header: "Lệ phí",},
            { fieldName: "employ",header: "Số lượng nhân sự"}
        ]
    }

    const columns = useMemo<MRT_ColumnDef<I_tjx179fay4_Read>[]>(
        () => [
            {
                header: "Mã sự kiện",
                accessorKey: "eventcode",
            },
            {
                header: "Tên sự kiện",
                accessorKey: "eventname",
            },
            {
                header: "Ngày tổ chức",
                accessorKey: "eventdate",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.enddate!))
            },
            {
                header: "Giờ bắt đầu",
                accessorKey: "starttime",
            },
            {
                header: "Thời gian",
                accessorKey: "duration",
            },
            {
                header: "Địa điểm",
                accessorKey: "place",
            },
            {
                header: "Ngày bắt đầu đăng ký",
                accessorKey: "registerdate",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.registerdate!))
            },
            {
                header: "Ngày kết thúc đăng ký",
                accessorKey: "enddate",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.enddate!))
            },
            {
                header: "Trạng thái",
                accessorKey: "state",
            },
            {
                header: "Lệ phí",
                accessorKey: "cost",
                Cell: ({ cell }) => <NumberFormatter thousandSeparator="." decimalSeparator="," value={cell.getValue<number>()} />
            },
            {
                header: "Số lượng nhân sự",
                accessorKey: "employ",
            },

            {
                header: "Phân bổ",
                accessorKey: "allocate",
                accessorFn: (row) => {
                    return <F_tjx179fay4_Table/>
                }
            },


            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayCapNhat!))
            // },
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.nguoiCapNhat!))
            // }
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."
   
    
     return (
        <MyFieldset title="Danh sách sự kiện ">
            <MyDataTable
                columns={columns}
                data={query.data!}
                renderTopToolbarCustomActions={() =>
                            <Group>
                                <MyButton crudType="create">Thêm</MyButton>
                                <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                                Import
                            </AQButtonCreateByImportFile>

                            <AQButtonExportData
                                objectName="dsClass"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />

                           
                            <Button leftSection={<IconTrash />} color="red">
                                Xóa
                            </Button>
                        </Group>
                }
            />
            </MyFieldset>
        )
}
