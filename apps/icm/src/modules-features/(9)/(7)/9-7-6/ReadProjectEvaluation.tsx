'use client'
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ProjectEvaluationUpdate from "./UpdateProjectEvaluation";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";

export interface ProjectEvaluation {
    id: number;
    core: string;
    name: string;
    partner: string;
    concurrent: String;
    startDate: string;
    endDate: string;
    specialize: string;
    exepectedPrice: string;
    summary: string;
    representative: string;
    status: string;
    completionDate: string;
    results: string;
    assessment: string;
}

export default function ProjectEvaluationLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<ProjectEvaluation>[]>(() => [
        {
            header: "Mã dự án",
            accessorKey: "core",
        },
        {
            header: "Tên dự án",
            accessorKey: "name",
        },
        {
            header: "Đối tác",
            accessorKey: "partner",
        },
        {
            header: "Thỏa thuận",
            accessorKey: "concurrent",
        },
        {
            header: "Thời gian bắt đầu",
            accessorKey: "startDate",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.startDate)),
        },
        {
            header: "Thời gian kết thúc dự kiến",
            accessorKey: "endDate",
        },
        {
            header: "Lĩnh vực chuyên môn",
            accessorKey: "specialize",
        },
        {
            header: "Kinh phí dự kiến (VND)",
            accessorKey: "exepectedPrice",
        },
        {
            header: "Tóm tắt dự án",
            accessorKey: "summary",
        },
        {
            header: "Người đại diện trường",
            accessorKey: "representative",
        },
        {
            header: "Trạng thái dự án",
            accessorKey: "status",
        },
        {
            header: "Ngày hoàn thành",
            accessorKey: "completionDate",
        },
        {
            header: "Kết quả đạt được",
            accessorKey: "results",
        },
        {
            header: "Đánh giá tổng kết",
            accessorKey: "assessment",
        },
    ], []);


    return (
        <MyFieldset title="Danh sách dự án hợp tác" >
            <MyDataTable
                columns={columns}
                enableRowNumbers={false}
                data={mockOpportunities || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <MyButton crudType="export" />
                        </>
                    );
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <ProjectEvaluationUpdate values={row.original} />
                        </MyCenterFull>
                    );
                }} />
        </MyFieldset>
    )
}


export const mockOpportunities: ProjectEvaluation[] = [
    {
        id: 1,
        core: "DAQT-2024-001",
        name: "Nghiên cứu chung về trí tuệ nhân tạo ứng dụng trong Y tế",
        partner: "DTQT-002",
        concurrent: "THTQT-20240002",
        startDate: "2024-09-01",
        endDate: "2027-08-31",
        specialize: "Y sinh, trí tuệ nhận tạo",
        exepectedPrice: "5.000.000.000đ",
        summary: "Phát triển mô hình AI học sâu để phát hiện sơms bệnh ung thư phổi",
        representative: "DV005 - TS. Trần Bình",
        status: "Hoàn thành",
        completionDate: "2027-08-25",
        results: "2 bài báo quốc tế; 1 bằng sáng chế; 1 phần mềm prototype; đào tạo 3 NCS",
        assessment: "Dự án thành công vượt mong đợi; mô hình AI đạt độ chính xác cao; tạo tiền đề cho các hợp tác tiếp theo"
    },
];
