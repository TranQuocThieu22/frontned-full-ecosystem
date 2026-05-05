'use client'
import { Button, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_f83t8rtc2m_Table from "./F_f83t8rtc2m_Table";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButton, MyDataTable } from "aq-fe-framework/components";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { utils_date } from "aq-fe-framework/utils-v2";

export interface I_f83t8rtc2m_Read {
    id?: number,
    eventCode?: string,
    eventName?: string,
    eventDate?: Date,
    startTime?: string,
    duration?: string,
    place?: string,
    registerDate?: Date,
    assign?: string,
    mission?: string,
    completeDate?: Date | null,
    result?: boolean,
    endDate?: Date | null,
}

export default function F_f83t8rtc2m_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const query = useQuery<I_f83t8rtc2m_Read[]>({
        queryKey: [`I_f83t8rtc2m_Read`],
        queryFn: async () => [
            {
                id: 1,
                eventCode: "SK001",
                eventName: "Halloween",
                eventDate: new Date("2024-10-30"),
                startTime: "07:00",
                duration: "180 phút",
                place: "Hội trường A",
                registerDate: new Date("2024-10-15"),
                assign: "NS002",
                mission: "Dẫn chương trình",
                completeDate: new Date("2024-10-15"),
                result: true,
                endDate: new Date("2024-10-15"),
            },

        ]
    })

    const exportConfig = {
        fields: [
            { fieldName: "eventCode", header: "Mã sự kiện" },
            { fieldName: "eventName", header: "Tên sự kiện" },
            { fieldName: "eventDate", header: "Ngày tổ chức" },
            { fieldName: "startTime", header: "Giờ bắt đầu" },
            { fieldName: "duration", header: "Thời gian" },
            { fieldName: "place", header: "Địa điểm" },
            { fieldName: "registerDate", header: "Ngày bắt đầu đăng ký" },
            { fieldName: "assign", header: "Phân công" },
            { fieldName: "mission", header: "Nhiệm vụ" },
            { fieldName: "completeDate", header: "Ngày cần hoàn thành", },
            { fieldName: "result", header: "Kết quả" },
            { fieldName: "endDate", header: "Ngày hoàn thành" }
        ]
    }

    const columns = useMemo<MRT_ColumnDef<I_f83t8rtc2m_Read>[]>(
        () => [
            {
                header: "Mã sự kiện",
                accessorKey: "eventCode",
            },
            {
                header: "Tên sự kiện",
                accessorKey: "eventName",
            },
            {
                header: "Ngày tổ chức",
                accessorFn: (row) => utils_date.toDDMMYYYY(row.eventDate!)
            },
            {
                header: "Giờ bắt đầu",
                accessorKey: "startTime",
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
                accessorFn: (row) => utils_date.toDDMMYYYY(row.registerDate!)
            },
            {
                header: "Phân công",
                accessorKey: "assign",
            },
            {
                header: "Nhiệm vụ",
                accessorKey: "mission",
            },
            {
                header: "Ngày cần hoàn thành",
                accessorFn: (row) => utils_date.toDDMMYYYY(row.completeDate!)
            },
            {
                header: "Tiến độ thực hiện",
                accessorFn: (row) => {
                    return <MyCenterFull><F_f83t8rtc2m_Table eventCode={row.eventCode!}/></MyCenterFull>
                }
            },
            {
                header: "Kết quả",
                accessorKey: "result",
                Cell: ({ row }) => <Checkbox checked={row.original.result} onChange={() => { }} />

            },
            {
                header: "Ngày hoàn thành",
                accessorFn: (row) => utils_date.toDDMMYYYY(row.endDate!)
            },



            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn: (row) => utils_date.toDDMMYYYY(new Date(row.ngayCapNhat!))
            // },
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn: (row) => utils_date.toDDMMYYYY(new Date(row.nguoiCapNhat!))
            // }
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."


    return (
        <MyFieldset title="Danh sách phân công nhiệm vụ tổ chức sự kiện">
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
                            objectName="dsReport"
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
