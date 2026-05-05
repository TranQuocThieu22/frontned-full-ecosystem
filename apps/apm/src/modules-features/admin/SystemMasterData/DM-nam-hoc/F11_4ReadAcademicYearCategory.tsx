'use client'

import baseAxios from "@/api/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F11_4DeleteAcademicYearCategory from "./F11_4DeleteAcademicYearCategory";
import F11_4UpdateAcademicYearCategory from "./F11_4UpdateAcademicYearCategory";
import F11_4CreateAcademicYearCategory from "./F11_4CreateAcademicYearCategory";

export interface IAcademicYear {
    id?: number,
    code?: string,
    name?: string,
    administrativeYearStart?: Date,
    administrativeYearEnd?: Date,
    academicYearStart: Date,
    academicYearEnd: Date,
    isCurrent: boolean
}

export default function F11_4ReadAcademicYearCategory() {

    const AllAcademicYearQuery = useQuery({
        queryKey: [`F11_4ReadAcademicYearCategory`],
        // queryFn: async () => await baseAxios.get("systemCatalogAcademicYears"),
        queryFn: async () => {
            const result = await baseAxios.get("/AcademicYear/GetAll", {
                params: {
                    "cols": "null"
                }
            });
            return result.data.data
        },
    })

    const columns = useMemo<MRT_ColumnDef<IAcademicYear>[]>(
        () => [
            {
                header: "Mã",
                accessorKey: "code"
            },
            {
                header: "Tên",
                accessorKey: "name"
            },
            {

                header: "Ngày bắt đầu hành chính",
                accessorKey: "administrativeYearStart",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.administrativeYearStart!))
                },
            },
            {
                header: "Ngày kết thúc hành chính",
                accessorKey: "administrativeYearEnd",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.administrativeYearEnd!))
                },
            },
            {
                header: "Ngày bắt đầu năm học",
                accessorKey: "academicYearStart",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.academicYearStart!))
                },
            },
            {
                header: "Ngày kết thúc năm học",
                accessorKey: "academicYearEnd",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.academicYearEnd!))
                },
            },
            {
                header: "Năm hiện hành",
                accessorKey: "isCurrent",
                accessorFn(originalRow) {
                    return (
                        <MyCenterFull>
                            <Checkbox
                                readOnly
                                checked={originalRow.isCurrent}
                                color="green"
                            />
                        </MyCenterFull>
                    )
                },
            }
        ],
        []
    );

    if (AllAcademicYearQuery.isLoading) return "Đang tải dữ liệu..."
    return (
        <MyDataTable
            columns={columns}
            enableRowNumbers={true}
            data={AllAcademicYearQuery.data!}
            renderTopToolbarCustomActions={() => {
                return (
                    <>
                        <F11_4CreateAcademicYearCategory />
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F11_4UpdateAcademicYearCategory values={row.original} />
                        <F11_4DeleteAcademicYearCategory academicYearId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
