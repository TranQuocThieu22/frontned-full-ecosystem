'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { Text, Center, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButton, MyCenterFull, MyCheckbox, MyDataTable, MyFieldset, MyFlexColumn, MySelect } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import AppraisalCouncilDelete from "./AppraisalCouncilDelete";
import AppraisalCouncilUpdate from "./AppraisalCouncilUpdate";
import AppraisalCouncilCreate from "./AppraisalCouncilCreate";
import { U0DateToDDMMYYYString } from "@/utils/date";

export interface I_AppraisalCouncil {
    id?: number;
    code?: string;                   // Mã Hội đồng
    name?: string;                   // Tên Hội đồng thẩm định
    documentTitle?: string;          // Tài liệu/Nội dung thẩm định
    evaluationPurpose?: string;      // Mục tiêu Thẩm định
    meetingDate?: string;            // Ngày họp dự kiến (ISO string hoặc định dạng tùy bạn)
    meetingLocation?: string;               // Địa điểm họp
    members?: string;                // Danh sách thành viên Hội đồng (Vai trò)
    attachedFileData?: string;       // Tài liệu đính kèm (hiển thị tên)
    note?: string;                   // Ghi chú
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedBy?: string;
    modifiedAt?: string;
}

export default function AppraisalCouncilTable() {
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    // Query to fetch mock data
    const query = useQuery<I_AppraisalCouncil[]>({
        queryKey: ["AppraisalCouncilRead"],
        queryFn: async () => mockData
    });

    const columns = useMemo<MRT_ColumnDef<I_AppraisalCouncil>[]>(() => [
        {
            header: "Mã hội đồng",
            accessorKey: "code",
        },
        {
            header: "Tên hội đồng",
            accessorKey: "name",
        },
        {
            header: "Tài liệu/Nội dung thẩm định",
            accessorKey: "documentTitle",
            size: 250
        },
        {
            header: "Mục tiêu thẩm định",
            accessorKey: "evaluationPurpose",
            size: 250
        },
        {
            header: "Ngày họp dự kiến",
            accessorKey: "meetingDate",
            accessorFn: (row) =>
                row.meetingDate ? <Center>{(new Date(row.meetingDate)).toLocaleString()}</Center> : "",

        },
        {
            header: "Địa điểm họp",
            accessorKey: "meetingLocation",
        },
        {
            header: "Danh sách thành viên Hội đồng (Vai trò)",
            accessorKey: "members",
            size: 250
        },
        {
            header: "Tài liệu đính kèm cho Hội đồng",
            accessorKey: "attachedFileData",
            size: 500,
            accessorFn: (row) => (
                <Group>
                    {row.attachedFileData != undefined ? (
                        <>
                            <MyButtonViewPDF />
                            <Text>{row.attachedFileData}</Text>
                        </>
                    ) : null}
                </Group>
            ),
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
            size: 180,
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
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Mã thông báo" },
            { fieldName: "name", header: "Tên thông báo" },
            { fieldName: "description", header: "Mô tả chi tiết" },
            { fieldName: "evaluationPurpose", header: "Đối tượng áp dụng" },
            { fieldName: "meetingDate", header: "Bắt đầu đăng ký" },
            { fieldName: "attachedFileData", header: "Tệp đính kèm" },
            { fieldName: "status", header: "Trạng thái" },
            { fieldName: "emailNotification", header: "Gửi thông báo email" },
            { fieldName: "modifiedBy", header: "Người cập nhật" },
            { fieldName: "modifiedAt", header: "Ngày cập nhật" },
        ],
    };

    if (query.isLoading) return "Loading...";
    if (query.isError) return 'Không có dữ liệu...';

    return (
        <MyFieldset title={"Danh sách hội đồng thẩm định"}>
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={false}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <AppraisalCouncilCreate />
                            <AQButtonCreateByImportFile
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                                Import
                            </AQButtonCreateByImportFile>
                            <AQButtonExportData
                                objectName="dsUnit"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                            <MyButton crudType="delete" onSubmit={() => { }}>Xóa</MyButton>
                        </Group>
                    )}
                    initialState={{
                        columnPinning: { right: ['mrt-row-actions'] },
                        columnVisibility: {
                            modifiedBy: false,
                            modifiedAt: false,
                        }
                    }}
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <AppraisalCouncilUpdate data={row.original} />
                            <AppraisalCouncilDelete id={row.original.id!} code={row.original.code!} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

const samplePDFdata: string = 'https://cdn.vectorstock.com/i/2000v/73/95/clean-application-form-for-admission-document-vector-31097395.avif'

const mockData: I_AppraisalCouncil[] = [
    {
        code: "HDTD-LG-001",
        name: "Hội đồng Thẩm định CTĐT ngành Logistics (Phiên bản 1)",
        documentTitle: "Chương trình đào tạo ngành Logistics và Quản lý chuỗi cung ứng (V1.2)",
        evaluationPurpose: "Đánh giá tính phù hợp của chuẩn đầu ra. Đóng góp ý kiến về cấu trúc chương trình",
        meetingDate: "2025-12-01T08:00:00",
        meetingLocation: "Phòng họp A201",
        members: "TS. Nguyễn Văn M (Chủ tịch); PGS. Lê Thị N (ủy viên phản biện); ThS. Trần Văn P (Thư ký)",
        attachedFileData: "",
        note: ""
    },
    {
        code: "HDTD-QTKD-002",
        name: "Hội đồng Thẩm định ĐCCTHP môn Quản trị chiến lược (V2.1)",
        documentTitle: "Đề cương chi tiết học phần môn Quản trị chiến lược",
        evaluationPurpose: "Đánh giá nội dung cập nhật với Digital Transformation. Đảm bảo tính khả thi triển khai",
        meetingDate: "2025-10-25T14:00",
        meetingLocation: "Trực tuyến qua Zoom",
        members: "GS. Trần Văn Q (Chủ tịch); TS. Phan Thị R (Ủy viên)",
        attachedFileData: "Hướng dẫn đánh giá ĐCCTHP.pdf",
        note: ""
    },
    {
        code: "HDTD-KTPM-003",
        name: "Hội đồng Thẩm định CTĐT ngành Kỹ thuật phần mềm (Rà soát)",
        documentTitle: "Chương trình đào tạo ngành Kỹ thuật phần mềm (V3.0)",
        evaluationPurpose: "Kiểm tra sự tuân thủ chuẩn AUN-QA. Đánh giá hiệu quả rà soát",
        meetingDate: "2025-06-10T10:00",
        meetingLocation: "Phòng họp B305",
        members: "TS. Đào Thị H (Chủ tịch); ThS. Bùi Văn K (Thư ký); TS. Hoàng Văn X (Ủy viên)",
        attachedFileData: "",
        note: "Đã hoàn thành buổi họp thẩm định"
    }
];
