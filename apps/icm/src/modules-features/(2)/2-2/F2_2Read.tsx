'use client'
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Accordion, Blockquote } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import baseAxios from "@/api/baseAxios";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { C0DocumentTypes } from "@/constants/documentTypes";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F2_2Delete from "./F2_2Delete";
import F2_2Update from "./F2_2Update";
interface I {
    documentType?: number;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export default function F2_2Read() {
    const query = useQuery<I[]>({
        queryKey: ['F2_2Read', C0DocumentTypes.Workflow],
        queryFn: async () => {
            const result = await baseAxios.get("/DocumentAttribute/GetByType?", { params: { documentType: C0DocumentTypes.Workflow } })
            return result.data?.data || []
        },
    })
    if (query.isLoading) return "Loading..."
    if (query.isError) return "có lỗi xảy ra!"
    if (query.data?.length == 0) return (
        <Blockquote color="yellow">
            Chưa có loại văn bản
        </Blockquote>
    )
    return (
        <MyFlexColumn>
            <Accordion defaultValue={query.data?.map(item => item.id?.toString()!)} multiple>
                {query.data?.map((item, idx) => (
                    <SubRead key={idx} name={item.name!} documentType={item.id!} />
                ))}
            </Accordion>
        </MyFlexColumn>
    )
}




function SubRead({ name, documentType }: { name: string, documentType: number }) {
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
    const query = useQuery<I[]>({
        queryKey: ["SubRead" + documentType],
        queryFn: async () => {
            const result = await baseAxios.get(`/Document/GetByDocumentAttribute?id=${documentType}`);
            return result.data.data
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
    if (query.isError) return "Error!"
    return (
        <Accordion.Item value={documentType.toString()}>
            <Accordion.Control>{name}</Accordion.Control>
            <Accordion.Panel>
                <MyDataTable
                    columns={columns}
                    data={query.data!}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <F2_2Update values={row.original!} />
                            <F2_2Delete id={row.original.id!} />
                        </MyCenterFull>
                    )}
                />
            </Accordion.Panel>
        </Accordion.Item>

    )
}