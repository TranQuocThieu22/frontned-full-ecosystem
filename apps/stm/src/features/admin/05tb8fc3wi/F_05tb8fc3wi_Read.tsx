"use client"

import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButton, MyCenterFull } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_05tb8fc3wi_Create from "./F_05tb8fc3wi_Create";
import F_05tb8fc3wi_Delete from "./F_05tb8fc3wi_Delete";
import F_05tb8fc3wi_UpdateActionIcon from "./F_05tb8fc3wi_UpdateActionIcon";

interface IDiscountCombo {
    id?: number
    comboName?: string,
    startDate?: string,
    expireDate?: string,
    comboType?: string,
    buyAmount: number,
    discountAmount: number,
    applyingCourseIds: number[],
    isEnded?: boolean
}

export default function F_05tb8fc3wi_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const comboKhuyenMaiQuery = useQuery<IDiscountCombo[]>({
        queryKey: [`F_05tb8fc3wi_Read`],
        queryFn: async () => {
            return [
                {
                    id: 1,
                    comboName: "Mua 3 tiếng Anh giảm 1 triệu",
                    startDate: "2023-01-01",
                    expireDate: "2023-12-31",
                    comboType: "Giảm giá theo số tiền",
                    buyAmount: 3,
                    discountAmount: 1000000,
                    applyingCourseIds: [1, 2, 3]
                },
            ]
        }
    })


    const columns = useMemo<MRT_ColumnDef<IDiscountCombo>[]>(() => [
        {
            header: "Tên combo khuyến mãi",
            accessorKey: "comboName"
        },
        {
            header: "Ngày bắt đầu",
            accessorKey: "startDate",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.startDate!))
        },
        {
            header: "Ngày kết thúc",
            accessorKey: "expireDate",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.expireDate!))
        },
        {
            header: "Loại combo",
            accessorKey: "comboType"
        },
        {
            header: "Số lượng áp dụng",
            accessorFn: (row) => row.buyAmount?.toLocaleString('vi-VN')
        },
        {
            header: "Mức áp dụng",
            accessorFn: (row) => row.discountAmount?.toLocaleString('vi-VN')
        },
    ], [])


    const exportConfig = {
        fields: [
            {
                header: "Tên combo khuyến mãi",
                fieldName: "comboName"
            },
            {
                header: "Ngày bắt đầu",
                fieldName: "startDate",
            },
            {
                header: "Ngày kết thúc",
                fieldName: "expireDate",
            },
            {
                header: "Loại combo",
                fieldName: "comboType"
            },
            {
                header: "Số lượng áp dụng",
                fieldName: "buyAmount"
            },
            {
                header: "Mức áp dụng",
                fieldName: "buyAmount"
            },
        ]
    };


    if (comboKhuyenMaiQuery.isLoading) return "Đang tải dữ liệu..."
    if (comboKhuyenMaiQuery.isError) return "Không có dữ liệu..."

    return (
        <MyFieldset title="Danh sách combo khuyến mãi">
            <MyDataTable
                columns={columns}
                data={comboKhuyenMaiQuery.data || []}
                enableRowSelection={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <F_05tb8fc3wi_Create />
                                <AQButtonCreateByImportFile
                                    onSubmit={() => { }}
                                    form={form_multiple}
                                    setImportedData={setImportData}
                                />
                                <AQButtonExportData
                                    objectName={"danh-sach-combo-khuyen-mai"}
                                    data={comboKhuyenMaiQuery.data!}
                                    exportConfig={exportConfig}
                                />
                                <MyButton crudType="delete">Xóa</MyButton>
                            </Group>
                        </>
                    )
                }}
                renderRowActions={({ row }) =>
                    <MyCenterFull>
                        <F_05tb8fc3wi_UpdateActionIcon comboValues={row.original} />
                        <F_05tb8fc3wi_Delete id={row.original.id!} code={row.original.comboName!} />
                    </MyCenterFull>
                }
            />
        </MyFieldset>
    )
}