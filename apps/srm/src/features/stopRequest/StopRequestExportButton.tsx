import { EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import { EnumLabelContractSuppendType } from "@/shared/consts/enum/EnumContractSuppendType";
import { SRMContractSuspend } from "@/shared/interfaces/SRMContractSuspend";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_TableInstance } from "mantine-react-table";

export default function StopRequestExportButton({ table }: { table: MRT_TableInstance<SRMContractSuspend> }) {
    const { data } = useExportData(table)

    const exportConfig = {
        fields: [
            { fieldName: "srmContractCode", header: "Mã đề tài" },
            { fieldName: "srmContractName", header: "Tên đề tài" },
            { fieldName: "custom_leaderName", header: "Chủ nhiệm đề tài" },
            { fieldName: "srmContractContractNumber", header: "Số hợp đồng" },
            { fieldName: "srmContractDuration", header: "Thời gian thực hiện" },
            { fieldName: "srmContractFromDate", header: "Từ tháng/năm" },
            { fieldName: "srmContractToDate", header: "Đến tháng/năm" },
            { fieldName: "reason", header: "Lý do hủy" },
            { fieldName: "srmContractExecutionStatus", header: "Trạng thái thực hiện" },
            { fieldName: "type", header: "Loại yêu cầu dừng thực hiện" },
            { fieldName: "attachmentPath", header: "File tờ trình xin tạm dừng/đình chỉ" },
        ],
    };

    const values = data.map((item) => {
        return {
            ...item,
            srmContractCode: item.srmContract?.code,
            srmContractName: item.srmContract?.name,
            srmContractContractNumber: item.srmContract?.contractNumber,
            srmContractDuration: item.srmContract?.duration,
            srmContractFromDate: dateUtils.toMMYYYY(item.srmContract?.fromDate),
            srmContractToDate: dateUtils.toMMYYYY(item.srmContract?.toDate),
            custom_leaderName: item.srmContract?.srmTopic?.srmTopicMembers?.find(member => member?.srmTitle?.isLeader === true)?.user?.fullName,
            attachmentPath: item.attachmentPath,
            srmContractExecutionStatus: converterUtils.getLabelByValue(EnumLabelContractExecutionStatus, item.srmContract?.executionStatus),
            type: converterUtils.getLabelByValue(EnumLabelContractSuppendType, item.type),
            reason: item.reason,
        };
    });

    return (
        <AQButtonExportData objectName="Danh_sach_de_tai" data={values || []} exportConfig={exportConfig} />
    );
}