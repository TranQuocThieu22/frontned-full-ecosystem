'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Center, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyCheckbox, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CompilationProgressMonitoringUpdate from "./CompilationProgressMonitoringUpdate";

export enum MonitoringStatus {
    Reminder = 1,      // Cần nhắc nhở
    Checked = 2,       // Đã kiểm tra
    Completed = 3      // Hoàn thành
}

export const MonitoringStatusLabel: Record<MonitoringStatus, string> = {
    [MonitoringStatus.Reminder]: "Cần nhắc nhở",
    [MonitoringStatus.Checked]: "Đã kiểm tra",
    [MonitoringStatus.Completed]: "Hoàn thành"
}

export interface I_CompilationProgress {
    id?: number;
    code?: string;                       // Mã nhiệm vụ/Ban
    name?: string;                       // Tên Ban Biên soạn
    relatedProposalCode?: string;        // Đề xuất liên quan
    deadline?: string;                   // Thời hạn hoàn thành nhiệm vụ (ISO date string)
    progressPercent?: number;            // Tiến độ hoàn thành (%)
    status: string;                     // Trạng thái Ban Biên soạn
    fileData?: string;                   // Đường dẫn xem file biên soạn
    monitoringStatus: MonitoringStatus; // Trạng thái giám sát
    monitoringNote?: string;            // Ghi chú giám sát
    lastMonitoringDate?: string;        // Ngày giám sát gần nhất (ISO date string)
    monitoredBy?: string;               // Người/Phòng giám sát
    requiresReportSupplement?: boolean; // Yêu cầu báo cáo bổ sung
    modifiedBy?: number;                // Người cập nhật
    modifiedAt?: string;               // Ngày cập nhật
}

export default function CompilationProgressMonitoringTable() {
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    // Query to fetch mock data
    const query = useQuery<I_CompilationProgress[]>({
        queryKey: ["CompilationProgressRead"],
        queryFn: async () => mockData
    });

    const columns = useMemo<MRT_ColumnDef<I_CompilationProgress>[]>(() => [
        {
            header: "Mã nhiệm vụ/Ban",
            accessorKey: "code",
        },
        {
            header: "Tên Ban biên soạn",
            accessorKey: "name",
        },
        {
            header: "Đề xuất liên quan",
            accessorKey: "relatedProposalCode",
        },
        {
            header: "Thời hạn hoàn thành nhiệm vụ",
            accessorKey: "deadline",
            accessorFn: (row) =>
                row.deadline ? U0DateToDDMMYYYString(new Date(row.deadline)) : "",
        },
        {
            header: "Tiến độ hoàn thành (%)",
            accessorKey: "progressPercent",
        },
        {
            header: "Trạng thái Ban biên soạn",
            accessorKey: "status",
        },
        {
            header: "File biên soạn",
            accessorKey: "fileData",
            Cell: ({ cell }) => (
                <Center>
                    <MyButtonViewPDF />
                </Center>
            ),
        },
        {
            header: "Trạng thái giám sát",
            accessorKey: "monitoringStatus",
            accessorFn: (row) => MonitoringStatusLabel[row.monitoringStatus],
        },
        {
            header: "Ghi chú giám sát",
            accessorKey: "monitoringNote",
        },
        {
            header: "Ngày giám sát gần nhất",
            accessorKey: "lastMonitoringDate",
            accessorFn: (row) =>
                row.lastMonitoringDate ? U0DateToDDMMYYYString(new Date(row.lastMonitoringDate)) : "",
        },
        {
            header: "Người giám sát",
            accessorKey: "monitoredBy",
        },
        {
            header: "Yêu cầu báo cáo bổ sung",
            accessorKey: "requiresReportSupplement",
            accessorFn: (row) => {
                return <Center>
                    <MyCheckbox checked={row.requiresReportSupplement} readOnly={true} />
                </Center>;
            }
        },
        {
            header: "Người cập nhật",
            accessorKey: "modifiedBy",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "modifiedAt",
            accessorFn: (row) =>
                row.modifiedAt ? U0DateToDDMMYYYString(new Date(row.modifiedAt)) : "",
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã nhiệm vụ/Ban" },
            { fieldName: "name", header: "Tên Ban biên soạn" },
            { fieldName: "relatedProposalCode", header: "Đề xuất liên quan" },
            { fieldName: "deadline", header: "Thời hạn hoàn thành nhiệm vụ" },
            { fieldName: "progressPercent", header: "Tiến độ hoàn thành (%)" },
            { fieldName: "status", header: "Trạng thái Ban biên soạn" },
            { fieldName: "monitoringStatus", header: "Trạng thái giám sát" },
            { fieldName: "monitoringNote", header: "Ghi chú giám sát" },
            { fieldName: "lastMonitoringDate", header: "Ngày giám sát gần nhất" },
            { fieldName: "monitoredBy", header: "Người giám sát" },
            { fieldName: "requiresReportSupplement", header: "Yêu cầu báo cáo bổ sung" },
            { fieldName: "modifiedBy", header: "Người cập nhật" },
            { fieldName: "modifiedAt", header: "Ngày cập nhật" },
        ],
    };

    if (query.isLoading) return <div>Loading...</div>;
    if (query.isError) return <div>Không có dữ liệu...</div>;

    return (
        <MyFieldset title={"Danh sách nội dung biên soạn"}>
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={false}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <AQButtonExportData
                                objectName="compilationProgress"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                        </Group>
                    )}
                    initialState={{
                        columnVisibility: {
                            modifiedBy: false,
                            modifiedAt: false,
                        }
                    }}
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <CompilationProgressMonitoringUpdate data={row.original} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

const mockData: I_CompilationProgress[] = [
    {
        code: "BBCTDT-LG-001",
        name: "Ban Biên soạn CTĐT ngành Logistics và Quản lý chuỗi cung ứng",
        relatedProposalCode: "DXCTDT-KHDT-001",
        deadline: "2026-03-31",
        progressPercent: 65,
        status: "Cần nhắc nhở",
        fileData: "",
        monitoringStatus: 1,
        monitoringNote: "Tiến độ đang chậm so với kế hoạch: Yêu cầu họp gấp để tìm giải pháp.",
        lastMonitoringDate: "2025-12-20",
        monitoredBy: "Phòng Đào tạo (Anh Tùng)",
        requiresReportSupplement: true
    },
    {
        code: "BBDCHP-QTKD-002",
        name: "Ban Biên soạn DCCTHP môn Quản trị chiến lược",
        relatedProposalCode: "DXDCHP-QTKD-002",
        deadline: "2025-12-31",
        progressPercent: 80,
        status: "Đang hoạt động",
        fileData: "",
        monitoringStatus: 2,
        monitoringNote: "Tiến độ tốt: Nội dung cập nhật phù hợp.",
        lastMonitoringDate: "2025-12-18",
        monitoredBy: "Phòng Khoa học & CN (Chị Hoa)",
        requiresReportSupplement: false
    },
    {
        code: "BBCTDT-KTPM-003",
        name: "Ban Rà soát CTĐT ngành Kỹ thuật phần mềm (năm 2024)",
        relatedProposalCode: "DXDCHP-QTKD-002",
        deadline: "2025-12-31",
        progressPercent: 100,
        status: "Hoàn thành",
        fileData: "",
        monitoringStatus: 3,
        monitoringNote: "Đã nghiệm thu và bàn giao sản phẩm",
        lastMonitoringDate: "2025-06-15",
        monitoredBy: "Phòng Đào tạo (Anh Tùng)",
        requiresReportSupplement: false
    }
];