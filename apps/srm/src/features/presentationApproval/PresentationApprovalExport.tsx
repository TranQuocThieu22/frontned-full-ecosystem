import { EnumLabelProposalReviewStatus } from "@/shared/consts/enum/EnumProposalReviewStatus";
import { EnumLabelTopicStatus, EnumTopicStatus } from "@/shared/consts/enum/EnumTopicStatus";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";

export default function PresentationApprovalExport(
  {
    loading,
    data
  }: {
    loading?: boolean,
    data: SRMTopic[]
  }
) {

  const formattedData = data.map(item => {
    return {
      ...item,
      srmTypeName: item.srmType?.name,
      areaName: item.srmArea?.name,
      SRMTopicLeader: item.srmTopicMembers?.find(item => item.srmTitle?.isLeader == true)?.user?.fullName,
      status: EnumLabelTopicStatus[item.status as EnumTopicStatus],
      proposalStatus: converterUtils.getLabelByValue(EnumLabelProposalReviewStatus, item.proposalStatus ?? 1),
      proposalReview: item.proposalReview,
      proposalIsSentMail: item.proposalIsSentMail ? "Đã gửi mail" : "Chưa gửi mail",
      totalCost: currencyUtils.formatWithSuffix(item.totalCost, " VNĐ"),
    }
  })

  const exportConfig = {
    fields: [
      { header: "Mã đăng ký", fieldName: "code", }, // f
      { header: "Tên đề tài", fieldName: "registerName", },
      { header: "Thời gian thực hiện", fieldName: "duration", },
      { header: "Đơn vị chủ trì", fieldName: "hostOrganization", },
      { header: "Đơn vị quản lý", fieldName: "managingOrganization", },
      { header: "Tổng kinh phí thực hiện", fieldName: "totalCost", }, //
      { header: "Loại hình đề tài", fieldName: "srmTypeName" }, //
      { header: "Lĩnh vực", fieldName: "areaName" }, //
      { header: "Chủ nhiệm đề tài", fieldName: "SRMTopicLeader" },
      { header: "Tình trạng của đề tài", fieldName: "status", }, //
      { header: "Trạng thái duyệt", fieldName: "proposalStatus" }, //
      { header: "Nhận xét", fieldName: "proposalReview" }, //
      { header: "Đã gửi thông báo", fieldName: "proposalIsSentMail" }, //
    ],
  };

  return (
    <AQButtonExportData
      objectName="Danh_sach_phe_duyet_thuyet_minh"
      exportConfig={exportConfig}
      data={formattedData}
      loading={loading}
    />
  )
}
