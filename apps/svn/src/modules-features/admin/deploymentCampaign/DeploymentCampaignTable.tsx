'use client'
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DeploymentCampaignDelete from "./DeploymentCampaignDelete";
import DeploymentCampaignCreate from "./DeploymentCampaignCreate";
import ApproveProposalUpdate from "./DeploymentCampaignUpdate";
import { Group } from "@mantine/core";

export interface SurveyCampaign {
    id?: number;
    surveyCycle: string;
    campaignCode: string;
    campaignName: string;
    originalScriptCode: string;
    originalScriptName: string;
    originalFormCode: string;
    originalFormName: string;
    startDate: string;
    endDate: string;
    leadUnit: string;
    responsiblePerson: string;
    expectedResponseRate: string;
    status: string;
    respondentCount: number;
    actualResponseRate: string;
    notes: string;
    describe: string;
}


export default function DeploymentCampaignTable() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<SurveyCampaign>[]>(
        () => [
            { accessorKey: "surveyCycle", header: "Chu kỳ khảo sát", enableGrouping: true },
            { accessorKey: "campaignCode", header: "Mã Chiến dịch" },
            { accessorKey: "campaignName", header: "Tên Chiến dịch" },
            { accessorKey: "originalScriptCode", header: "Mã Kịch bản Gốc" },
            { accessorKey: "originalScriptName", header: "Tên Kịch bản Gốc" },
            { accessorKey: "originalFormCode", header: "Mã Phiếu Gốc" },
            { accessorKey: "originalFormName", header: "Tên Phiếu Gốc" },
            { accessorKey: "startDate", header: "Ngày Bắt đầu" },
            { accessorKey: "endDate", header: "Ngày Kết thúc" },
            { accessorKey: "leadUnit", header: "Đơn vị Chủ trì" },
            { accessorKey: "responsiblePerson", header: "Người phụ trách" },
            { accessorKey: "expectedResponseRate", header: "Ngưỡng Tỷ lệ Phản hồi" },
            { accessorKey: "status", header: "Trạng thái" },
            { accessorKey: "respondentCount", header: "Số lượng Đáp viên" },
            { accessorKey: "actualResponseRate", header: "Tỷ lệ Phản hồi Thực tế" },
        ],
        []
    );



    return (
        <MyFieldset title="Danh sách chiến dịch triển khai" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers
                enableGrouping
                initialState={{
                    grouping: ['surveyCycle'],
                    expanded: true,
                    columnPinning: { left: ['mrt-row-select', 'mrt-row-numbers'], right: ["mrt-row-actions"]  },
                }}
                displayColumnDefOptions={{
                    'mrt-row-numbers': {
                        mantineTableBodyCellProps: ({ row }) => ({
                            children: row.depth === 0 ? '' : row.index + 1,
                        }),
                        Header: "STT",
                        size: 1
                    },
                    "mrt-row-actions": {
                        header: "Thao tác",
                        size: 110,
                    },
                }}
                isError={false}
                isLoading={false}
                columns={columns}
                data={mockSurveyCampaigns || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <DeploymentCampaignCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <Group>
                            <ApproveProposalUpdate values={row.original} />
                            <DeploymentCampaignDelete id={row.original.id || 0} code={row.original.campaignCode} />
                        </Group>
                    )
                }}
            />
        </MyFieldset>
    )
}

const mockSurveyCampaigns: SurveyCampaign[] = [
    {
        id: 1,
        surveyCycle: 'Học kỳ 1 - năm học 2025 - 2026',
        campaignCode: "CD-HK1-SV-CBGD-2025",
        campaignName: '"Khảo sát Đánh giá GV & MH HK1 (2025-2026)"',
        originalScriptCode: "KB-HK-CHUAN",
        originalScriptName: "Kịch bản Khảo sát Chuẩn Cuối Học kỳ",
        originalFormCode: "MP-SV-CBGD",
        originalFormName: '"01. Sinh viên đánh giá CBGD & Môn học"',
        startDate: "2025-12-01",
        endDate: "2025-12-15",
        leadUnit: "Phòng Đào tạo",
        responsiblePerson: "Nguyễn Thị K",
        expectedResponseRate: "85%",
        status: "Đang diễn ra",
        respondentCount: 1500,
        actualResponseRate: "75%",
        notes: "",
        describe: ""
    },
    {
        id: 2,
        surveyCycle: 'Học kỳ 2 - năm học 2025 - 2026',
        campaignCode: "CD-HK2-SV-CSVC-2026",
        campaignName: '"Khảo sát Đánh giá CSVC HK2 (2025-2026)"',
        originalScriptCode: "KB-HK-CHUAN",
        originalScriptName: '"Kịch bản Khảo sát Chuẩn Cuối Học kỳ"',
        originalFormCode: "MP-SV-CSVC",
        originalFormName: "07. Sinh viên đánh giá trường",
        startDate: "2026-05-01",
        endDate: "2026-05-15",
        leadUnit: "Phòng Hành chính - Quản trị",
        responsiblePerson: "Lê Văn L",
        expectedResponseRate: "70%",
        status: "Chưa bắt đầu",
        respondentCount: 2500,
        actualResponseRate: "0%",
        notes: "",
        describe: ""
    },
    {
        id: 3,
        surveyCycle: 'Năm học 2025 - 2026',
        campaignCode: "CD-CTDT-RV-2026",
        campaignName: '"Rà soát CTĐT Ngành CNTT (2026)"',
        originalScriptCode: "KB-CTDT-RV",
        originalScriptName: '"Kịch bản Rà soát Chương trình Đào tạo Hàng năm"',
        originalFormCode: "MP-CTDT-SV",
        originalFormName: "06. Sinh viên đánh giá CTĐT",
        startDate: "2026-03-01",
        endDate: "2026-03-31",
        leadUnit: "Phòng Đảm bảo Chất lượng",
        responsiblePerson: "Trần Văn M",
        expectedResponseRate: "75%",
        status: "Đã hoàn thành",
        respondentCount: 800,
        actualResponseRate: "88%",
        notes: "",
        describe: ""
    },
    {
        id: 4,
        surveyCycle: 'Không chu kỳ',
        campaignCode: "CD-NV-DVHT-2025",
        campaignName: '"Khảo sát Hài lòng Dịch vụ Hỗ trợ (CB)"',
        originalScriptCode: "KB-AD-DBCL",
        originalScriptName: '"Kịch bản Đánh giá Đảm bảo Chất lượng Nội bộ"',
        originalFormCode: "MP-CB-VANHOA",
        originalFormName: "04. Cán bộ lớp đánh giá sinh viên",
        startDate: "2025-11-01",
        endDate: "2025-11-15",
        leadUnit: "Phòng Tổ chức Cán bộ",
        responsiblePerson: "Phạm Thị N",
        expectedResponseRate: "55%",
        status: "Tạm dừng",
        respondentCount: 300,
        actualResponseRate: "30%",
        notes: "",
        describe: ""
    },
];
