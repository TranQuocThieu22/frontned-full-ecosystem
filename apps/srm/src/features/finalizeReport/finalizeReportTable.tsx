import { EnumColorProposalReviewStatus, EnumIconProposalReviewStatus, EnumLabelProposalReviewStatus } from "@/shared/consts/enum/EnumProposalReviewStatus";
import { EnumColorTopicStatus, EnumIconTopicStatus, EnumLabelTopicStatus } from "@/shared/consts/enum/EnumTopicStatus";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomNumberFormatter } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomNumberFormatter";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Button, Center, FileButton } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { evaluationCommitteeService } from "../../shared/APIs/evaluationCommitteeService";
import { topicService } from "../../shared/APIs/topicService";
import useAcademicYearStore from "../../shared/features/AcademicYear/useAcademicYearStore";
import { SRMTopic } from "../../shared/interfaces/SRMTopic";
import { DisplayEnumBadge } from "../submitMissionReport/DisplayEnumBadge";
import FinalizeReportExportButton from "./ExportButton";

export default function FinalizeReportTable() {
    const academicYearStore = useAcademicYearStore()
    const finalizeReportQuery = useCustomReactQuery({
        queryKey: ['councilRoleList'],
        axiosFn: () => evaluationCommitteeService.GetSRMEvaluationTopicProposal({
            AcademicYearId: academicYearStore.state.academicYear?.id || 0
        }),
    });

    // Function to handle file change for a specific row
    const handleFileChange = async (file: File | null, topicId: number) => {
        if (!file || !topicId) return;
        try {
            // Convert file to AQ document type (like in your form example)
            const attachmentDetail = await fileUtils.fileToAQDocumentType(file);
            // Update the topic's attachment
            await topicService.UpdateAttachment({
                id: topicId,
                attachmentDetail: attachmentDetail
                // attachmentPath: attachmentDetail.fileName // Store the filename as attachmentPath
            });
            utils_notification_show({ crudType: "create", "message": 'Đổi file minh chứng thành công' })
            // Refresh the menuData to show the updated attachment
            finalizeReportQuery.refetch();

        } catch (error) {
            console.error('Error updating file:', error);
            utils_notification_show({ crudType: "error", "message": 'Đã có lỗi xảy ra' })

            // You might want to show a toast notification here
        }
    };
    const columns = useMemo<MRT_ColumnDef<SRMTopic>[]>(() => [
        {
            accessorKey: "code",
            header: "Mã đăng ký",
        },
        {
            accessorKey: "registerName",
            header: "Tên đề tài",
            size: 300,
        },
        {
            accessorKey: "duration",
            header: "Thời gian thực hiện",
        },
        {
            accessorKey: "fromDate",
            header: "Từ tháng/năm",
            accessorFn: (row) => dateUtils.toMMYYYY((row.fromDate || ''))
        },
        {
            accessorKey: "toDate",
            header: "Đến tháng/năm",
            accessorFn: (row) => dateUtils.toMMYYYY((row.toDate || ''))
        },
        {
            accessorKey: "hostOrganization",
            header: "Đơn vị chủ trì",
        },
        {
            accessorKey: "managingOrganization",
            header: "Đơn vị quản lý",
        },
        {
            accessorKey: "totalCost",
            header: "Tổng kinh phí thực hiện",
            accessorFn: (row) => <CustomNumberFormatter value={row.totalCost || 0} />
        },
        {
            accessorKey: "srmType",
            header: "Loại đề tài",
            accessorFn: (row) => row.srmType?.name
        },
        {
            accessorKey: "srmArea",
            header: "Linh vực",
            accessorFn: (row) => row.srmArea?.name

        },
        {
            accessorKey: "chairman",
            header: "Chủ nhiệm đề tài",
            accessorFn: (row) =>
                row.srmTopicMembers
                    ?.filter(member => member.srmTitle?.isLeader === true)
                    .map(member => member.user?.fullName)
        },
        {
            accessorKey: "status",
            header: "Tình trạng của đề tài",
            size: 400,
            Cell: ({ row }) =>
                <Center>
                    <DisplayEnumBadge
                        enumStatus={row.original.status}
                        enumLabel={EnumLabelTopicStatus}
                        enumColor={EnumColorTopicStatus}
                        enumIcon={EnumIconTopicStatus}
                    />
                </Center>
        },
        {
            accessorKey: "proposalStatus",
            header: "Trạng thái duyệt",
            size: 200,
            accessorFn: (row) =>
                <Center>
                    <DisplayEnumBadge
                        enumStatus={row.completeStatus || 1}
                        enumLabel={EnumLabelProposalReviewStatus}
                        enumColor={EnumColorProposalReviewStatus}
                        enumIcon={EnumIconProposalReviewStatus}
                    />
                </Center>
        },
        {
            accessorKey: "proposalReview",
            header: "Nhận xét",
            size: 300,
        },
        {
            accessorKey: "proposalIsSentMail",
            header: "Đã gửi thông báo",
            accessorFn: (row) => (
                <CustomCenterFull>
                    <CustomThemeIconSquareCheck checked={row.proposalIsSentMail} />
                </CustomCenterFull>
            )
        },
        {
            accessorKey: "attachFilePath",
            header: "File thuyết minh",
            accessorFn: (row) => <CustomButtonViewFileAPI filePath={row.attachmentPath} />
        },
        // {
        //     header: "Người cập nhật", accessorKey: "modifiedFullName",
        // },
        // {
        //     header: "Ngày cập nhật", accessorKey: "modifiedWhen",
        //     accessorFn: row => row.modifiedWhen ? utils_date_dateToDDMMYYYString(new Date(row.modifiedWhen)) : "",
        // }
    ], []);
    return (
        <CustomFieldset title="Danh sách thuyết minh đề tài" >
            <CustomDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={finalizeReportQuery.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows =
                        table
                            .getSelectedRowModel()
                            .flatRows.map((item) => item.original) || [];

                    return (
                        <>
                            <FinalizeReportExportButton
                                table={table}
                                // menuData={selectedRows.length > 0 ? selectedRows : finalizeReportQuery.menuData.menuData || []}
                                data={selectedRows.length > 0 ? selectedRows : finalizeReportQuery.data || []}
                            />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {

                    return (
                        <CustomCenterFull>
                            <FileButton
                                onChange={(file) => handleFileChange(file, row.original.id || 0)}
                                accept="image/png,image/jpeg,application/pdf">
                                {(props) => <Button {...props}>Cập nhật file thuyết minh</Button>}
                            </FileButton>
                        </CustomCenterFull>
                    )
                }}
            />
        </CustomFieldset>
    )
}


export const typeList = [
    {
        value: '1',
        label: 'Nghiên cứu ứng dụng'
    },
    {
        value: '2',
        label: 'Triển khai thực nghiệm'
    },
    {
        value: '3',
        label: 'Nghiên cứu cơ bản'
    },
]
export const workTypeList = [
    {
        value: '1',
        label: 'Công nghệ thông tin'
    },
    {
        value: '2',
        label: 'Khoa học môi trường, Kỹ thuật điện tử'
    },
    {
        value: '3',
        label: 'Khoa học môi trường, Sinh học'
    },
]
export const statusList = [
    {
        value: '1',
        label: 'Đồng ý'
    },
    {
        value: '2',
        label: 'Yêu cầu hiệu chỉnh'
    },
    {
        value: '3',
        label: 'Không đồng ý'
    },
]
export const isPassList = [
    {
        value: '1',
        label: 'Mới'
    },

]



// Sample menuData from your table
// export const mockData: IProposalApproval[] = [
//     {
//         id: 1,
//         code: 'DKNCKH2025001',
//         name: 'Nghiên cứu ứng dụng Blockchain trong quản lý tài sản số',
//         workTime: "12 tháng",
//         host: { id: 1, name: "Khoa Công nghệ phần mềm" },
//         management: { id: 2, name: "Cấp trường" },
//         cost: 150_000_000,
//         type: 1, // Nghiên cứu ứng dụng
//         workField: 1, // Công nghệ thông tin
//         attachFilePath: "file1.pdf",
//         status: 1, // Đang duyệt
//         isSentMail: true,
//         chairman: { id: 1, fullName: "Nguyễn Văn A" },
//         isPass: 1, // Mới
//         startDate: "2025-01-15",
//         endDate: "2026-01-15",
//         note: "Đề tài có tính khả thi cao, phù hợp với định hướng nghiên cứu của trường",
//     },
//     {
//         id: 2,
//         code: 'DKNCKH2025002',
//         name: 'Phát triển hệ thống IoT giám sát chất lượng không khí đô thị thông minh',
//         workTime: "18 tháng",
//         host: { id: 3, name: "Viện Khoa học & Công nghệ" },
//         management: { id: 4, name: "Cấp Bộ GD&ĐT" },
//         cost: 500_000_000,
//         type: 2, // Triển khai thực nghiệm
//         workField: 2, // Khoa học môi trường, Kỹ thuật điện tử
//         attachFilePath: "file2.pdf",
//         status: 2, // Yêu cầu hiệu chỉnh
//         isSentMail: false,
//         chairman: { id: 2, fullName: "Trần Thị B" },
//         isPass: 1, // Mới
//         startDate: "2025-03-01",
//         endDate: "2026-09-01",
//         note: "Bộ Tài chính phải chỉnh hợp chi tiết một vài khoản mục, yêu cầu điều chỉnh lại",
//     },
//     {
//         id: 3,
//         code: 'DKNCKH2025003',
//         name: 'Nghiêm cứu tác động của biến đổi khí hậu đến đa dạng sinh học tại khu vực Tây Nguyên',
//         workTime: "24 tháng",
//         host: { id: 5, name: "Khoa Môi trường & Tài nguyên" },
//         management: { id: 4, name: "Cấp Bộ GD&ĐT" },
//         cost: 350_000_000,
//         type: 3, // Nghiên cứu cơ bản
//         workField: 3, // Khoa học môi trường, Sinh học
//         attachFilePath: "file3.pdf",
//         status: 3, // Không đồng ý
//         isSentMail: true,
//         chairman: { id: 3, fullName: "Lê Thị C" },
//         isPass: 0, // Không đồng ý
//         startDate: "2025-05-10",
//         endDate: "2027-05-10",
//         note: "Đã bổ sung thêm chi tiết về tính cấp thiết và khả năng ứng dụng trong bối cảnh thực tế của khu vực Tây Nguyên",
//     },
// ];
