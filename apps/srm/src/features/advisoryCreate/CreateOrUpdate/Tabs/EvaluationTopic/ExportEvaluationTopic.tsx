import { SRMEvaluationTopic } from "@/shared/interfaces/SRMEvaluationTopic";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
    table: MRT_TableInstance<SRMEvaluationTopic>;
    loading?: boolean;
}

export default function ExportEvaluationTopic({ loading, table }: Props) {
    const { data } = useExportData(table);
    const exportConfig = {
        fields: [
            {
                header: 'Mã đăng ký',
                fieldName: 'srmTopicCode',
                formatFunction: (_: any, row: SRMEvaluationTopic) => row.srmTopic?.code,
            },
            {
                fieldName: "srmTopicRegisterName",
                header: "Tên đề tài",
                formatFunction: (_: any, row: SRMEvaluationTopic) => row.srmTopic?.registerName,
            },
            {
                fieldName: "srmTopicMembers",
                header: "Chủ nhiệm đề tài",
                formatFunction: (_: any, row: SRMEvaluationTopic) => row.srmTopic?.srmTopicMembers
                    ?.find(member => member.srmTitle?.isLeader === true)
                    ?.user?.fullName ?? "",
            },
            {
                fieldName: "srmAreaName",
                header: "Lĩnh vực",
                formatFunction: (_: any, row: SRMEvaluationTopic) => row.srmTopic?.srmArea?.name || "",
            },
            {
                fieldName: "srmTopicTotalCost",
                header: "Tổng kinh phí thực hiện (VND)",
                formatFunction: (_: any, row: SRMEvaluationTopic) => currencyUtils.formatWithSuffix(row.srmTopic?.totalCost || 0, ' VNĐ'),
            },
        ],
    };


    return (
        <AQButtonExportData
            loading={loading}
            objectName="DsThanhVien"
            data={data}
            exportConfig={exportConfig}
        />
    );
}
