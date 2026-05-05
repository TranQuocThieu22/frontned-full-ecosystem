'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import useQ_Branch_GetAll from "@/hooks/query-hooks/Branch/useQ_Branch_GetAll";
import useQ_PriceConfig_GetByType, { IPriceConfig } from "@/hooks/query-hooks/PriceConfig/useQ_PriceConfig_GetByType";
import useHGetProgram from "@/hooks/query-hooks/Program/useQ_Program_GetAll";
import { ComboboxItem, Group, Select } from "@mantine/core";
import { MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_z5bc0yuwug_Delete from "./F_z5bc0yuwug_Delete";
import F_z5bc0yuwug_DeleteMultiple from "./F_z5bc0yuwug_DeleteMultiple";
import F_z5bc0yuwug_Form from "./F_z5bc0yuwug_Form";

const loaiThuData = [
    { id: 1, name: "Học phí" },
    { id: 2, name: "Lệ phí thi" }
]

export default function F_z5bc0yuwug_Read() {
    const [loaiThu, setLoaiThu] = useState<ComboboxItem | null>({
        value: loaiThuData[0]?.id.toString() || "",
        label: loaiThuData[0]?.name || ""
    })
    const programQuery = useHGetProgram()
    const branchQuery = useQ_Branch_GetAll()
    const priceConfigQuery = useQ_PriceConfig_GetByType({ type: parseInt(loaiThu?.value!) })

    const columns = useMemo<MRT_ColumnDef<IPriceConfig>[]>(() => [
        {
            header: "Mã chương trình",
            accessorKey: "program.code",
        },
        {
            header: "Tên chương trình",
            accessorKey: "program.name",

        },
        {
            header: "Mã chi nhánh",
            accessorKey: "branch.code",
        },
        {
            header: "Tên chi nhánh",
            accessorKey: "branch.name",

        },

        {
            header: loaiThu?.value == "1" ? "Mã khóa học" : "Mã khóa thi",
            accessorKey: loaiThu?.value == "1" ? "course.code" : "exam.code",
        },
        {
            header: loaiThu?.value == "1" ? "Tên khóa học" : "Tên khóa thi",
            accessorKey: loaiThu?.value == "1" ? "course.name" : "exam.name",
        },

        {
            header: "Đơn giá",
            accessorKey: "price",
            Cell: ({ cell }) => {
                return <MyNumberFormatter value={cell.getValue<number>()}></MyNumberFormatter>
            }
        }
        // { header: currentLoaiThu.headerMa, accessorKey: currentLoaiThu.keyMa },
        // { header: currentLoaiThu.headerTen, accessorKey: currentLoaiThu.keyTen },

    ], [loaiThu, programQuery.data, branchQuery.data])

    if (priceConfigQuery.isLoading) return "Đang tải dữ liệu..."
    if (priceConfigQuery.isError) return "Có lỗi xảy ra"
    return (
        <MyFlexColumn>
            <Select
                clearable={false}
                allowDeselect={false}
                label="Chọn loại thu"
                data={loaiThuData.map(item => ({
                    value: item.id.toString(),
                    label: item.name
                }))}
                value={loaiThu?.value}
                onChange={(value, option) => setLoaiThu(option)}
            />
            <MyFieldset title={"Danh sách công thức thu"}>
                <MyDataTable
                    columns={columns}
                    data={priceConfigQuery.data!}
                    enableRowSelection
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <F_z5bc0yuwug_Form type={parseInt(loaiThu?.value!)} />
                            <F_z5bc0yuwug_DeleteMultiple ids={table.getSelectedRowModel().rows.map(item => item.original!)} />
                        </Group>
                    )}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <F_z5bc0yuwug_Form type={parseInt(loaiThu?.value!)} values={row.original!} />
                                <F_z5bc0yuwug_Delete id={row.original.id!} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFieldset>
        </MyFlexColumn>
    )
}
