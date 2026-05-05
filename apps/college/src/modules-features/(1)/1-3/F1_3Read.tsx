'use client'
import baseAxios from "@/api/baseAxios";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { C0DocumentTypes } from "@/constants/documentTypes";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F1_3Create from "./F1_3Create";
import F1_3Delete from "./F1_3Delete";
import F1_3Update from "./F1_3Update";

interface I {
    path?: string;
    orderBy?: number;
    documentType?: number;
    promulgateDate?: Date;
    decisionCode?: string;
    departmentName?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    conclusion?: string;
    note?: string;
    documentAttributeId?: number;
    documentAttributeName?: string;
    isCycleCheck?: boolean;
    meetingDate?: Date;
    fileDetail?: {
        fileBase64String?: string,
        fileExtension?: string,
        fileName?: string
    };
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    ngayChinhSua?: Date;
    nguoiChinhSua?: string;
}

export default function F1_3Read() {
    const query = useQuery<I[]>({
        queryKey: ["F1_3Read"],
        queryFn: async () => {
            const result = await baseAxios.get(`/Document/GetByType?documentType=${C0DocumentTypes.Security}`);
            return result.data?.data || []
        }
    })
    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Số quy định",
                accessorKey: "decisionCode"
            },
            {
                header: "Ngày ban hành",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.promulgateDate!))
            },
            {
                header: "Tên tài liệu",
                accessorKey: "name"
            },
            {
                header: "File",
                accessorFn: (row) => {
                    return (
                        <MyCenterFull>
                            <MyButtonViewPDF id={row.id} />
                        </MyCenterFull>
                    )
                }
            },
        ],
        []
    );

    if (query.isLoading) return "Loading..."
    if (query.isError) return "có lỗi xảy ra!"
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F1_3Create />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F1_3Update values={row.original} />
                        <F1_3Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

