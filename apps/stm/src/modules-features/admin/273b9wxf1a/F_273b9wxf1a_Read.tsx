'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyButtonDeleteList } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_273b9wxf1a_Create from "./F_273b9wxf1a_Create";
import F_273b9wxf1a_Update from "./F_273b9wxf1a_Update";

interface IRead {
    id?: number;
    announceTitle?: string;
    action?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: IRead[] = [
    {
        id: 1,
        announceTitle: "Thông báo đăng kí thành công",
        action: "1",
        nguoiCapNhat: "Người cập nhật 1",
        ngayCapNhat: new Date("2024-12-19")
    },
]

export enum ActionList {
    "Đăng kí thành công" = 1,
    "Phục hồi mật khẩu" = 2,
}

export default function F_273b9wxf1a_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const danhSachThongBaoQuery = useQuery({
        queryKey: [`F_273b9wxf1a_Read`],
        queryFn: async () => {
            return mockData;
        },
    })

    const columns = useMemo<MRT_ColumnDef<IRead>[]>(
        () => [
            {
                header: "Tiêu đề thông báo",
                accessorKey: "announceTitle",
            },
            {
                header: "Loại hành động",
                accessorKey: "action",
                accessorFn(row) {
                    return ActionList[row.action as keyof typeof ActionList]
                },
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",
            },
        ], []
    );

    const exportConfig = {
        fields: [
            {
                fieldName: "announceTitle",
                header: "Tiêu đề thông báo"
            },
            {
                fieldName: "action",
                header: "Loại hành động"
            },
        ]
    };

    if (danhSachThongBaoQuery.isLoading) return "Đang tải dữ liệu..."
    if (danhSachThongBaoQuery.isError) return "Không có dữ liệu..."

    return (
        <MyFieldset title="Danh sách mẫu mail thông báo">
            <MyDataTable
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={danhSachThongBaoQuery.data!}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <Group>
                            <F_273b9wxf1a_Create />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form_multiple}
                                onSubmit={() => {
                                    console.log(form_multiple.values);
                                }}
                            />
                            <AQButtonExportData
                                objectName={"danh-sach-mau-mail-thong-bao"}
                                data={danhSachThongBaoQuery.data!}
                                exportConfig={exportConfig}
                            />
                            <MyButtonDeleteList onSubmit={() => { }} />
                        </Group>
                    )
                }}
                renderRowActions={({ row }) =>
                    <F_273b9wxf1a_Update data={row.original} />
                }
            />
        </MyFieldset>
    )
}