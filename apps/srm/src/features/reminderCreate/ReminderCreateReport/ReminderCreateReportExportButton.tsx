import { SRMContract } from "@/shared/interfaces/SRMContract";
import { SRMContractReportHistory } from "@/shared/interfaces/SRMContractReportHistory";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_TableInstance } from "mantine-react-table";

interface ReminderCreateReportExportButtonProps {
    table: MRT_TableInstance<SRMContractReportHistory>,
    contract: SRMContract
}

export default function ReminderCreateReportExportButton({ table, contract }: ReminderCreateReportExportButtonProps) {
    const { data } = useExportData(table)

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã đề tài" },
            { fieldName: "name", header: "Tên đề tài" },
            { fieldName: "leader", header: "Chủ nhiệm đề tài" },
            { fieldName: "order", header: "Lần báo cáo" },
            { fieldName: "reportDate", header: "Ngày báo cáo" },
            { fieldName: "note", header: "Ghi chú" },
        ],
    };

    const values = data.map((item) => {
        return {
            ...item,
            code: contract?.code,
            name: contract?.name,
            leader: contract?.srmTopic?.srmTopicMembers?.find(member => member?.srmTitle?.isLeader === true)?.user?.fullName,
            reportCount: item?.order,
            reportDate: dateUtils.toDDMMYYYY(item?.reportDate),
        };
    });

    return (
        <AQButtonExportData objectName="Danh_sach_ngay_bao_cao" data={values || []} exportConfig={exportConfig} />
    );
}