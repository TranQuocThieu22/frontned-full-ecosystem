import { EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import { EnumLabelEnumSubmittedType } from "@/shared/consts/enum/EnumSubmittedType";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

export default function StopRequestChoiceExportButton({ data }: { data: SRMContract[] }) {
    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã đề tài" },
            { fieldName: "name", header: "Tên đề tài" },
            { fieldName: "custom_leaderName", header: "Chủ nhiệm đề tài" },
            { fieldName: "srmTopicHostOrganization", header: "Đơn vị chủ trì" },
            { fieldName: "duration", header: "Thời gian thực hiện (tháng)" },
            { fieldName: "fromDate", header: "Từ tháng/năm" },
            { fieldName: "toDate", header: "Đến tháng/năm" },
            { fieldName: "totalCost", header: "Tổng kinh phí (VNĐ)" },
            { fieldName: "srmTypeName", header: "Loại đề tài" },
            { fieldName: "submittedType", header: "Trạng thái báo cáo" },
            { fieldName: "reportDate", header: "Ngày báo cáo" },
            { fieldName: "executionStatus", header: "Trạng thái thực hiện" },
        ],
    };

    const values = data.map((item) => {
        return {
            ...item,
            srmTopicHostOrganization: item.srmTopic?.hostOrganization,
            srmTypeName: item.srmType?.name,
            custom_leaderName: item?.srmTopic?.srmTopicMembers
                ?.filter((item) => item.srmTitle?.isLeader === true)
                .map((item) => item.user?.fullName)
                .join(", "),
            fromDate: dateUtils.toMMYYYY(item.fromDate),
            toDate: dateUtils.toMMYYYY(item.toDate),
            totalCost: currencyUtils.formatWithSuffix(item.totalCost),
            reportDate: item?.srmContractReportHistories?.[0]?.reportDate ? dateUtils.toDDMMYYYY(item?.srmContractReportHistories?.[0]?.reportDate) : "",
            submittedType: item?.srmContractReportHistories?.[0] ? converterUtils.getLabelByValue(EnumLabelEnumSubmittedType, item?.srmContractReportHistories?.[0]?.submittedType) : "",
            executionStatus: converterUtils.getLabelByValue(EnumLabelContractExecutionStatus, item.executionStatus),
        };
    });

    return (
        <AQButtonExportData objectName="Danh_sach_de_tai" data={values || []} exportConfig={exportConfig} />
    );
}