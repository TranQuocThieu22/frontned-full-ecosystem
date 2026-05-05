'use client'
import { useQuery } from "@tanstack/react-query";
import {
    MyButtonViewPDF,
    MyCenterFull,
    MyDataTable,
    MyFieldset
} from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F9_4_5UpdateTrackProgressButtonModal from "./F9_4_5UpdateTrackProgressButtonModal";
import { mockDataRead } from "./mockData";
export interface IF9_4_5ReadTrackProgress {
    planCode?: string; // Mã kế hoạch
    editorialBoardCode?: string //Mã ban biên soạn 
    suggestionCode?: string; //Mã đề xuất
    suggestionCurriculumName?: string; //Tên giáo trình đề xuất
    dateOfPlan?: string; //Ngày lập kế hoạch
    estimateStartDateOfPlan?: string; //Ngày bắt đầu dự kiến
    estimateEndDateOfPlan?: string; //Ngày kết thúc dự kiến
    planExecutioner: string; //Người thực hiện kế hoạch
    planStatus?: string; //Trạng thái kế hoạch
    fileAttachment?: string; //File đính kèm
}
export enum planStatusEnum {
    "Đang chờ duyệt"= "Đang chờ duyệt",
    "Đã phê duyệt" = "Đã phê duyệt",
}
export default function F9_5_4ReadTrackProgress(){
    const query=  useQuery<IF9_4_5ReadTrackProgress[]>({
        queryKey: ['F9_5_4ReadTrackProgress'],
        queryFn: async () => mockDataRead
    });
    const columns = useMemo<MRT_ColumnDef<IF9_4_5ReadTrackProgress>[]>(
    ()=>[
        {
                header: "Mã kế hoạch",
                accessorKey: "planCode",
            },
            {
                header: "Mã ban biên soạn",
                accessorKey: "editorialBoardCode",
            },
            {
                header: "Mã đề xuất",
                accessorKey: "suggestionCode",
            },
            {
                header: "Tên giáo trình đề xuất",
                accessorKey: "suggestionCurriculumName",
            },
            {
                header:"Ngày Lập kế hoạch",
                accessorKey: "dateOfPlan",
                Cell: ({ cell }) =>
                    utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>())),
            },
            {
                header: "Ngày Bắt đầu dự kiến",
                accessorKey: "estimateStartDateOfPlan",
                Cell: ({ cell }) =>
                    utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>())),
            },
            {
                header:"Ngày Kết thúc dự kiến",
                accessorKey: "estimateEndDateOfPlan",
                Cell: ({ cell }) =>
                    utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>())),
            },
            {
                header: "Người Lập Kế hoạch",
                accessorKey: "planExecutioner",
            },
            {
                header: "Trạng thái kế hoạch",
                accessorKey: "planStatus",
                accessorFn: (row) =>
                    row.planStatus
                    ? Object.keys(planStatusEnum).find(
                        (key) => planStatusEnum[key as keyof typeof planStatusEnum] === row.planStatus
                    ): "",
            },
            {
                header: "File đính kèm Kế Hoạch",
                accessorKey: "fileAttachment",
                Cell: ({ cell }) => (
                    <MyButtonViewPDF/>
                ),
            },
        ],
        []
    );
    return(
        <MyFieldset title="Danh sách kế hoạch">
            <MyDataTable
                data={query.data || []}
                columns={columns}
                isLoading={query.isLoading}
                isError={query.isError}
                exportAble
                enableRowSelection={true}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F9_4_5UpdateTrackProgressButtonModal/>
                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    )
}