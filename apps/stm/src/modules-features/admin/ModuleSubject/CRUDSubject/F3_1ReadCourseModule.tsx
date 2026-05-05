'use client'
import baseAxios from "@/api/config/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F3_1CreateCourseModule from "./F3_1CreateCourseModule";
import F3_1DeleteCourseModule from "./F3_1DeleteCourseModule";
import F3_1DeleteListCourseModule from "./F3_1DeleteListCourseModule";
import F3_1UpdateCourseModule from "./F3_1UpdateCourseModule";

interface ICourseModuleViewModel {
    id?: number;
    code?: string;
    name?: string;
    roomTypeId?: number;
    roomType?: IroomType;
    classPeriodNumber?: number;
    hours?: number;
    note?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
interface IroomType {
    id: number;
    note?: string;
    name?: string;
    code?: string;
}

export default function F3_3ReadCourseModule() {

    const AllCourseModule = useQuery<ICourseModuleViewModel[]>({
        queryKey: [`F3_3ReadCourseModule`],
        queryFn: async () => {
            const response = await baseAxios.get("/subject/getall?cols=roomType");
            const result = response.data.data;
            return result
        },
    })

    const columns = useMemo<MRT_ColumnDef<ICourseModuleViewModel>[]>(
        () => [
            {
                header: "Mã môn học",
                accessorKey: "code"
            },
            {
                header: "Tên môn học",
                accessorKey: "name"
            },
            {
                header: "Số tiết",
                accessorKey: "classPeriodNumber"
            },
            {
                header: "Số giờ",
                accessorKey: "hours"
            },
            {
                header: "Tính chất phòng",
                accessorKey: "roomType.name"
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat"
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },
            }
        ]
        ,
        []
    );

    return (
        <MyDataTable
            data={AllCourseModule.data || []}
            columns={columns}
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F3_1CreateCourseModule />
                            <Button
                                color="green"
                            >
                                Import
                            </Button>
                            <Button
                                color="teal"
                            >
                                Export
                            </Button>
                            <F3_1DeleteListCourseModule values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F3_1UpdateCourseModule courseModuleValues={row.original} />
                        <F3_1DeleteCourseModule DeleteCourseId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
