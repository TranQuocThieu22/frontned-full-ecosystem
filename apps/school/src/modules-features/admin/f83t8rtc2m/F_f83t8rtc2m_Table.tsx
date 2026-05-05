'use client'
import { Button, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_f83t8rtc2m_Update from "./F_f83t8rtc2m_Update";
import F_f83t8rtc2m_Delete from "./F_f83t8rtc2m_Delete";
import F_f83t8rtc2m_Create from "./F_f83t8rtc2m_Create";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButtonModal, MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import {utils_date} from "aq-fe-framework/utils-v2";

export interface I_f83t8rtc2m_Table {
    id?: number,
    eventCode?: string,
    eventName?: string,
    eventDate?: Date,
    assign?: string,
    mission?: string,
    completeDate?: Date | null,
    reportContent?: string,
    reportDate?: Date | null,
    complete?: boolean,
}

export default function F_f83t8rtc2m_Table({ eventCode }: { eventCode: string }) {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const disc = useDisclosure();

    const query = useQuery<I_f83t8rtc2m_Table[]>({
        queryKey: [`I_f83t8rtc2m_Table`],
        queryFn: async () => [
            {
                id: 1,
                eventCode: "SK001",
                eventName: "Halloween",
                eventDate: new Date("2024-10-30"),
                startTime: "07:00",
                mission: "Dẫn chương trình",
                assign: "NS002",
                completeDate: new Date("2024-10-15"),
                reportDate: new Date("2025-01-01"),
                reportContent: "Đã đăng kí hội trường và thuê âm thanh",
                complete: true,
            },
        ]
    })

    const exportConfig = {
        fields: [
            { fieldName: "eventCode", header: "Mã sự kiện" },
            { fieldName: "eventName", header: "Tên sự kiện" },
            { fieldName: "eventDate", header: "Ngày tổ chức" },
            { fieldName: "startTime", header: "Giờ bắt đầu" },
            { fieldName: "assign", header: "Phân công" },
            { fieldName: "reportContent", header: "Nội dung báo cáo" },
            { fieldName: "reportDate", header: "Ngày báo cáo" },
            { fieldName: "reportContent", header: "Nội dung báo cáo" },
            { fieldName: "complete", header: "Hoàn thành" },
            { fieldName: "completeDate", header: "Ngày hoàn thành" },
        ]
    }

    const columns = useMemo<MRT_ColumnDef<I_f83t8rtc2m_Table>[]>(
        () => [
            {
                header: "Ngày báo cáo",
                accessorKey: "reportDate",
                Cell: ({ cell }) => {
                    const value = cell.getValue<Date>();
                    return value ? utils_date.toDDMMYYYY(value) : "";
                },
            },
            {
                header: "Nội dung báo cáo",
                accessorKey: "reportContent",
            },
            {
                header: "Hoàn thành",
                accessorKey: "complete",
                Cell: ({ row }) => <Checkbox checked={row.original.complete} onChange={() => { }} />

            },
            {
                header: "Ngày hoàn thành",
                accessorKey: "completeDate",
                Cell: ({ cell }) => {
                    const value = cell.getValue<Date>();
                    return value ? utils_date.toDDMMYYYY(value) : "";
                },
            },
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."

    return (
        <MyButtonModal title="Danh sách báo cáo" modalSize="100%" disclosure={disc} label="Cập nhật / Xem chi tiết">
            <MyDataTable
                columns={columns}
                data={query.data!}
                renderTopToolbarCustomActions={() =>
                    <Group>
                        <F_f83t8rtc2m_Create />
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
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <Group>
                                <F_f83t8rtc2m_Update data={row.original} />
                                <F_f83t8rtc2m_Delete id={row.original.eventCode!} />
                            </Group>
                        </MyCenterFull>
                    )
                }}
            />

        </MyButtonModal>
    )
}
