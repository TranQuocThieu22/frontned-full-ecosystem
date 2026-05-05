import { EvidenceAvailableStatusEnum, EvidenceAvailableStatusEnumLabel } from "@/shared/constants/enum/EvidenceAvailableStatusEnum";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { MRT_TableInstance } from "mantine-react-table";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
    table: MRT_TableInstance<IEvidence>
}

export default function EvidenceExportButton({ table }: Props) {
    const { data } = useExportData(table);

    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã minh chứng"
            },
            {
                fieldName: "name",
                header: "Tên minh chứng"
            },
            {
                fieldName: "referenceEvidence.code",
                header: "Mã MC trực thuộc (Cha)",
                formatFunction: (value: any, row: IEvidence) => row.referenceEvidence?.code
            },
            {
                fieldName: "eaqEvidenceCurrentVersion.versionNumberIssueDate",
                header: "Số - Ngày ban hành",
                formatFunction: (value: any, row: IEvidence) => row.eaqEvidenceCurrentVersion?.versionNumberIssueDate
            },
            {
                fieldName: "eaqEvidenceCurrentVersion.department",
                header: "Đơn vị ban hành",
                formatFunction: (value: any, row: IEvidence) => row.eaqEvidenceCurrentVersion?.department?.toString()
            },
            {
                fieldName: "eaqEvidenceCurrentVersion.validDate",
                header: "Hiệu lực từ ngày",
                formatFunction: (value: any, row: IEvidence) => dateUtils.toDDMMYYYY(row.eaqEvidenceCurrentVersion?.validDate)
            },
            {
                fieldName: "eaqEvidenceCurrentVersion.expiredDate",
                header: "Hiệu lực đến ngày",
                formatFunction: (value: any, row: IEvidence) => dateUtils.toDDMMYYYY(row.eaqEvidenceCurrentVersion?.expiredDate)
            },
            {
                fieldName: "eaqEvidenceCurrentVersion.status",
                header: "Trạng thái hiệu lực",
                formatFunction: (value: any, row: IEvidence) => {
                    const today = new Date();
                    const expiredDate = row.eaqEvidenceCurrentVersion?.expiredDate ? new Date(row.eaqEvidenceCurrentVersion.expiredDate) : null;

                    let status: number;

                    if (expiredDate && today > expiredDate) {
                        status = EvidenceAvailableStatusEnum.EXPIRED;
                    } else {
                        status = EvidenceAvailableStatusEnum.AVAILABLE;
                    }

                    return EvidenceAvailableStatusEnumLabel[status as EvidenceAvailableStatusEnum];
                }
            },
            {
                fieldName: "eaqEvidenceCurrentVersion.attachFilePath",
                header: "File đính kèm",
                formatFunction: (value: any, row: IEvidence) => row.eaqEvidenceCurrentVersion?.attachFilePath
            },

            {
                fieldName: "link",
                header: "Link liên kết",
                formatFunction: (value: any, row: IEvidence) => row.eaqEvidenceCurrentVersion?.link
            },
            {
                fieldName: "note",
                header: "Ghi chú"
            },
        ],
    };

    return (
        <AQButtonExportData
            objectName="Danh sách minh chứng"
            data={data}
            exportConfig={exportConfig}
        />
    )
};
