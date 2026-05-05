import { EnumLabelProposalReviewStatus, EnumProposalReviewStatus } from "@/shared/consts/enum/EnumProposalReviewStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

interface Props {
    dataSelected: SRMTopic[],
    disabled?: boolean
}

export default function ReviewCompleteTopicExportButton({ dataSelected, disabled }: Props) {
    const academicStore = useAcademicYearStore();

    const convertDataExport = (values: SRMTopic[]) => {
        return values.map(item => ({
            ...item,
            fromDate: dateUtils.toMMYYYY(item.fromDate),
            toDate: dateUtils.toMMYYYY(item.toDate),
            totalCost: currencyUtils.formatWithSuffix(item.totalCost, " VNĐ"),
            typeName: item.srmType?.name,
            areaName: item.srmArea?.name,
            leader: item.srmTopicMembers?.flatMap((m) => (m.srmTitle?.isLeader ? [m.user?.fullName ?? ""] : [])).join(", ") ?? "",
            proposalStatus: EnumLabelProposalReviewStatus[item.proposalStatus as EnumProposalReviewStatus],
            completeStatus: EnumLabelProposalReviewStatus[item.completeStatus as EnumProposalReviewStatus],
        }))
    }

    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã đăng ký",
            },
            {
                fieldName: "registerName",
                header: "Tên đề tài",
            },
            {
                fieldName: "duration",
                header: "Thời gian thực hiện",
            },
            {
                fieldName: "fromDate",
                header: "Từ tháng/năm",
            },
            {
                fieldName: "toDate",
                header: "Đến tháng/năm",
            },
            {
                fieldName: "hostOrganization",
                header: "Đơn vị chủ trì",
            },
            {
                fieldName: "managingOrganization",
                header: "Đơn vị quản lý",
            },
            {
                fieldName: "totalCost",
                header: "Tổng kinh phí thực hiện",
            },
            {
                fieldName: "typeName",
                header: "Loại đề tài",
            },
            {
                fieldName: "areaName",
                header: "Lĩnh vực",
            },
            {
                fieldName: "leader",
                header: "Chủ nhiệm đề tài",
            },
            {
                fieldName: "proposalStatus",
                header: "Trạng thái duyệt",
            },
            {
                fieldName: "proposalReview",
                header: "Nhận xét duyệt",
            },
            {
                fieldName: "proposalIsSentMail",
                header: "Gửi thông báo",
            },
            {
                fieldName: "attachmentPath",
                header: "File thuyết minh hoàn thiện",
            },
            {
                fieldName: "completeStatus",
                header: "Trạng thái kiểm tra hoàn thiện",
            },
            {
                fieldName: "completeReview",
                header: "Nhận xét hoàn thiện",
            },
            {
                fieldName: "completeIsSentMail",
                header: "Đã gửi thông báo",
            },
        ],
    };

    return (
        <AQButtonExportData
            objectName={`Danh_sach_thuyet_minh_de_tai_hoan_thien${academicStore.state.academicYear?.name}`}
            data={convertDataExport(dataSelected)}
            exportConfig={exportConfig}
            disabled={disabled}
        />
    )
}