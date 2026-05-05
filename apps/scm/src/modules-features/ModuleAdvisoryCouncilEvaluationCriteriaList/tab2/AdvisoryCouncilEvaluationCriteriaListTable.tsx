"use client";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { appliedCouncilEnum, appliedCouncilLabel, IAdvisoryCouncilEvaluationCriteriaListViewModel } from "../interfaces/AdvisoryCouncilEvaluationCriteriaListViewModel";

import { Group } from "@mantine/core";
import AdvisoryCouncilEvaluationCriteriaListCreate from "./AdvisoryCouncilEvaluationCriteriaListCreate";
import AdvisoryCouncilEvaluationCriteriaListDelete from "./AdvisoryCouncilEvaluationCriteriaListDelete";
import AdvisoryCouncilEvaluationCriteriaListDeleteList from "./AdvisoryCouncilEvaluationCriteriaListDeleteList";
import AdvisoryCouncilEvaluationCriteriaListUpdate from "./AdvisoryCouncilEvaluationCriteriaListUpdate";



export default function AdvisoryCouncilEvaluationCriteriaListTable() {
    const form= useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    const AdvisoryCouncilEvaluationCriteriaList
    = useQuery<IAdvisoryCouncilEvaluationCriteriaListViewModel[]>({
        queryKey: ["AdvisoryCouncilEvaluationCriteriaListData"],
        queryFn: async () => {
            return sampleData;
        },
        refetchOnWindowFocus: false,
    });
    const coulumns:MRT_ColumnDef<IAdvisoryCouncilEvaluationCriteriaListViewModel>[] = useMemo(() => [
        { header: "Mã tiêu chí", accessorKey: "criteriaID" },
        { header: "Nội dung tiêu chí", accessorKey: "criteriaDescription" },
        { header: "Loại đối tượng áp dụng", accessorKey: "appliedCouncil",accessorFn: (row) => appliedCouncilLabel[row.appliedCouncil as appliedCouncilEnum]}, 
    ], []);
    return(
        <MyFieldset title={`Danh sách tiêu chí hội đồng tư vấn`}>
        <MyDataTable
                isLoading={AdvisoryCouncilEvaluationCriteriaList.isLoading}
                isError={AdvisoryCouncilEvaluationCriteriaList.isError}
                data={AdvisoryCouncilEvaluationCriteriaList.data || []}
                enableRowSelection={true}
                enableRowNumbers={false}
                columns={coulumns}
                renderTopToolbarCustomActions={(table) => (
                    <Group>
                        <AdvisoryCouncilEvaluationCriteriaListCreate/>
                        <MyButton crudType="import">Import</MyButton>
                        <MyButton crudType="export">Export</MyButton>
                        <AdvisoryCouncilEvaluationCriteriaListDeleteList values={table.table.getSelectedRowModel().rows.map(row => row.original)} />
                    </Group>
                )}
                renderRowActions={({row})=>(
                    <MyCenterFull>
                        <AdvisoryCouncilEvaluationCriteriaListUpdate values={row.original} />
                        <AdvisoryCouncilEvaluationCriteriaListDelete criteriaID={row.original.criteriaID || ''} />
                    </MyCenterFull>
                )}

        />
        </MyFieldset>
    )
}
export const sampleData : IAdvisoryCouncilEvaluationCriteriaListViewModel[] = [
    {
        criteriaID: "I.2",
        criteriaDescription: "Quy mô của vấn đề khoa học đặt\n ra có trong đề xuất",
        appliedCouncil:Object.values(appliedCouncilEnum)[0]!,
        checkbox: false,
        note: ""
    },
    {
        criteriaID: "I.4",
        criteriaDescription: "Khả năng ứng dụng hoặc sử dụng\n kết quả tạo ra sản xuất\n và đời sống",
        appliedCouncil: Object.values(appliedCouncilEnum)[0]!,
        checkbox: false,
        note: ""
    },
    {
        criteriaID: "I.5",
        criteriaDescription: "Về xuất xứ công nghệ (áp dụng\n đối với dự án KH&CN/ dự án \n sản xuất thử nghiệm)",
        appliedCouncil: Object.values(appliedCouncilEnum)[0]!,
        checkbox: false,
        note: ""
    },
    {
        criteriaID: "I.6",
        criteriaDescription: "Khả năng huy động được nguồn kinh \n phí ngoài ngân sách để thực hiện \n (áp dụng đối với dự án KH&CN/\n dự án sản xuất thử nghiệm)",
        appliedCouncil: Object.values(appliedCouncilEnum)[0]!,
        checkbox: false,
        note: ""
    },
    {
        criteriaID: "II.1",
        criteriaDescription: "Năng lực của tổ chức chủ trì\n và chủ nhiệm đề tài",
        appliedCouncil: Object.values(appliedCouncilEnum)[0]!,
        checkbox: false,
        note: ""
    },
    {
        criteriaID: "II.2",
        criteriaDescription: "Sản phẩm khoa học công nghệ",
        appliedCouncil:Object.values(appliedCouncilEnum)[0]!,
        checkbox: false,
        note: ""
    },
    {
        criteriaID: "III.1",
        criteriaDescription: "Tính mới và sáng tạo",
        appliedCouncil: Object.values(appliedCouncilEnum)[0]!,
        checkbox: false,
        note: ""
    },
    {
        criteriaID: "III.2",
        criteriaDescription: "Hiệu quả kinh tế - xã hội",
        appliedCouncil:Object.values(appliedCouncilEnum)[0]!,
        checkbox: false,
        note: ""
    },
]