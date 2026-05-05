'use client'
import {AQButtonCreateByImportFile, AQButtonExportData, MyButtonModal, MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_tjx179fay4_Update from "./F_tjx179fay4_Update";
import F_tjx179fay4_Delete from "./F_tjx179fay4_Delete";
import F_tjx179fay4_Create from "./F_tjx179fay4_Create";


interface I_tjx179fay4_Table {
    id?: number,
    employcode?: string,
    name?: string,
    gender?: string,
    dob?: Date,
    mission?: string,
    completedate?: Date | null,
}

export default function F_tjx179fay4_Table() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const disc = useDisclosure();

    const query = useQuery<I_tjx179fay4_Table[]>({
        queryKey: [`Employ`],
        queryFn: async () => [
            {
                id: 1,
                employcode: "NV0001",
                name: "Tô Ngọc Lâm",
                gender: "Nam",
                dob: new Date("2000-02-01"),
                mission: "Dẫn chương trình",
                completedate: new Date("2024-10-31"),
            },
        ]
    })

    const exportConfig = {
        fields: [
            { fieldName: "employcode", header: "Mã nhân sự" },
            { fieldName: "name", header: "Họ Tên" },
            { fieldName: "gender", header: "Giới tính" },
            { fieldName: "dob", header: "Ngày sinh" },
            { fieldName: "mission", header: "Nhiệm vụ" },
            { fieldName: "completedate", header: "Ngày cần hoàn thành" },
        ]
    }

    const columns = useMemo<MRT_ColumnDef<I_tjx179fay4_Table>[]>(
        () => [
            {
                header: "Mã nhân sự",
                accessorKey: "employcode",
            },
            {
                header: "Họ Tên",
                accessorKey: "name",
            },
            {
                header: "Giới tính",
                accessorKey: "gender",
            },
            {
                header: "Ngày sinh",
                accessorKey: "dob",
                Cell: ({ cell }) => {
                    const value = cell.getValue<Date>();
                    return value ? U0DateToDDMMYYYString(value) : "";
                },
            },
            {
                header: "Nhiệm vụ",
                accessorKey: "mission",
            },
            {
                header: "Ngày cần hoàn thành",
                accessorKey: "completedate",
                Cell: ({ cell }) => {
                    const value = cell.getValue<Date | null>();
                    return value ? U0DateToDDMMYYYString(value) : "";
                },
            },
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."

    return (
        <MyButtonModal title="Danh sách nhân sự" modalSize="100%" disclosure={disc} label="Phân bổ">
            <MyDataTable
                columns={columns}
                data={query.data!}
                renderTopToolbarCustomActions={() =>
                    <Group>
                        <F_tjx179fay4_Create />
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
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <Group>
                                <F_tjx179fay4_Update />
                                <F_tjx179fay4_Delete id={row.original.employcode!} />
                            </Group>
                        </MyCenterFull>
                    )
                }}
            />

        </MyButtonModal>
    )
}
