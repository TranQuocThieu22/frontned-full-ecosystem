'use client'
import { useForm } from "@mantine/form";
import { MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ProtectionRegistrationLayout from "./ReadProtectionRegistration";

export interface TrackProgress {
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

}

export default function ProjectEvaluationLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<TrackProgress>[]>(() => [
        {
            header: "Mã dự án",
            accessorKey: "core",
        },
        {
            header: "Tên dự án",
            accessorKey: "name",
        },
        {
            header: "Đối tác (Mã đối tác FK)",
            accessorKey: "partner",
        },
        {
            header: "Thỏa thuận (Mã thỏa thuận FK)",
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
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.endDate)),

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
    ], []);


    return (

        <MyFieldset title="Danh sách dự án hợp tác" >
            <MyDataTable
                enableRowNumbers={false}
                columns={columns}
                data={mockData || []}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <MyButton crudType="export" />
                        </>
                    );
                }}
                renderRowActions={() => {
                    return (
                        <MyCenterFull>
                            <ProtectionRegistrationLayout />
                        </MyCenterFull>
                    );
                }} />
        </MyFieldset>
    )
}


export const mockData: TrackProgress[] = [
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

    },
];
