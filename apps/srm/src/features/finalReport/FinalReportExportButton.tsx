import { EnumContractExecutionStatus, EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_TableInstance } from "mantine-react-table";

export default function AdjustRequestExportButton({ table }: { table: MRT_TableInstance<SRMContract>; }) {
    const { data } = useExportData(table)
    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã đề tài" },
            { fieldName: "name", header: "Tên đề tài" },
            { fieldName: "leader", header: "Chủ nhiệm đề tài" },
            { fieldName: "duration", header: "Thời gian thực hiện" },
            { fieldName: "fromDate", header: "Từ tháng/năm" },
            { fieldName: "toDate", header: "Đến tháng/năm" },
            { fieldName: "totalCost", header: "Tổng kinh phí dự đoán" },
            { fieldName: "usedTotalCost", header: "Tổng kinh phí thanh toán" },
            { fieldName: "isAcceptanceSubmitted", header: "Đã nộp báo cáo tổng kết" },
            { fieldName: "executionStatus", header: "Trạng thái thực hiện" },
        ],
    };
    const mapData = data.map((item) => {
        return {
            ...item,
            leader: item.srmTopic?.srmTopicMembers
                ?.find((itm) => itm?.srmTitle?.isLeader === true)?.user?.fullName || "",
            fromDate: dateUtils.toMMYYYY(item.fromDate),
            toDate: dateUtils.toMMYYYY(item.toDate),
            totalCost: currencyUtils.formatWithSuffix(item.totalCost || 0, " VNĐ"),
            usedTotalCost: currencyUtils.formatWithSuffix(item.usedTotalCost || 0, " VNĐ"),
            isAcceptanceSubmitted: item.isAcceptanceSubmitted ? "Có" : "Không",
            executionStatus: EnumLabelContractExecutionStatus[(item.executionStatus ?? 1) as EnumContractExecutionStatus] || "",
        };
    });

    return (
        <AQButtonExportData
            objectName="Danh sách báo cáo tổng kết đề tài"
            data={mapData || []}
            exportConfig={exportConfig}
        />
    );
}
