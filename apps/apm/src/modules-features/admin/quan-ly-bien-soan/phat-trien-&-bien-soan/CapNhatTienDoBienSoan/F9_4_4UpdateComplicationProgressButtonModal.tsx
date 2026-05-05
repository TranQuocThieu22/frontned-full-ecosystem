'use client'
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
    MyButtonModal,
    MyButtonViewPDF,
    MyCenterFull,
    MyDataTable,
    MyFieldset
} from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F9_4_4UpdateOfComplicationProgressModal from "./F9_4_4UpdateOfComplicationProgressModal";
import { mockDataReadModal } from "./mockData";
export interface IF9_4_4UpdateComplicationProgressButtonModal {
    phaseCode?: string; // Mã giai đoạn
    numberOfPhase?: number; // Số thứ tự giai đoạn
    phaseName?: string; // Tên giai đoạn
    responsibleMember?: string; //Ng chịu trách nhiệm chính
    estimateStartDate?: string; // Ngày bắt đầu dự kiến
    estimateEndDate?: string; // Ngày kết thúc dự kiến
    percentageOfCompletion?: number; // Tỷ lệ hoàn thành
    phaseStatus?: string; // Trạng thái giai đoạn
    actualEndDate?: string; // Ngày kết thúc thực tế
    progressNote?: string; // Ghi chú tiến độ/Vướng mắc
    progressStatus?: string; // Trạng thái tiến độ
    fileAttachment?: string; // File đính kèm
}
export enum progressStatusEnum {
    "Hoàn thành" = "Hoàn thành",
    "Chưa hoàn thành" = "Chưa hoàn thành",
}
export default function F9_4_4UpdateComplicationProgressButtonModal() {
    const disc = useDisclosure();
    const query = useQuery<IF9_4_4UpdateComplicationProgressButtonModal[]>({
        queryKey: ['F9_4_4UpdateComplicationProgressButtonModal'],
        queryFn: async () => mockDataReadModal
    });
    const columns= useMemo<MRT_ColumnDef<IF9_4_4UpdateComplicationProgressButtonModal>[]>(
        () =>[
            {
                header: "Mã giai đoạn",
                accessorKey: "phaseCode",
            },
            {
                header:"Thứ tự ",
                accessorKey: "numberOfPhase",
                Cell: ({ cell }) => <>{cell.getValue<number>()}</>,
            },
            {
                header:"Tên giai đoạn",
                accessorKey: "phaseName",
            },
            {  
                header: "Người chịu trách nhiệm chính",
                accessorKey: "responsibleMember",
            },
            {
                header:"Ngày bắt đầu dự kiến",
                accessorKey: "estimateStartDate",
                Cell: ({ cell }) =>
                    utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>())),

            },
            {
                header:"Ngày kết thúc dự kiến",
                accessorKey: "estimateEndDate",
                Cell: ({ cell }) =>
                    utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>())),
            },
            {
                header:"Tỷ lệ hoàn thành",
                accessorKey: "percentageOfCompletion",
            },
            {
                header:"Trạng thái Giai đoạn",
                accessorKey: "progressStatus",
                accessorFn: (row) =>
                    row.progressStatus
                ?Object.keys(progressStatusEnum).find(
                    (key) => progressStatusEnum[key as keyof typeof progressStatusEnum] === row.progressStatus
                ): "",
            },
            {
                header:"Ngày kết thúc thực tế",
                accessorKey: "actualEndDate",
            },
            {
                header:"Ghi chú tiến độ/Vướng mắc",
                accessorKey: "progressNote",
            },
            {
                header:"Tài liệu sản phẩm trung gian",
                accessorKey: "fileAttachment",
                Cell: ({ cell }) =>(
                    <MyButtonViewPDF/>
                )
            },
            
        ],
        []
    );
    return(
        <MyButtonModal label="Cập nhật" color="blue" modalSize={"90%"} disclosure={disc}>
            <MyFieldset title="Danh sách công việc"> 
                <MyDataTable
                    isError={query.isError}
                    isLoading={query.isLoading}
                    columns={columns}
                    enableRowSelection={true}
                    enableRowNumbers= {false}
                    exportAble
                    data={query.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <F9_4_4UpdateOfComplicationProgressModal values={row.original}/>
                        </MyCenterFull>
                    )}
                />
            </MyFieldset>
        </MyButtonModal>
    )
}