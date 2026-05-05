import { IReport } from "@/shared/interfaces/report/IReport";
import { MRT_TableInstance } from "mantine-react-table";
import { isNullOrEmptyList, mapAndJoinStrings } from "../PeriodicQualityImprovementReportFunctions";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";


interface Props {
    table: MRT_TableInstance<IReport>
}

export default function CollectedEvidenceExportButton({ table }: Props) {
    const { data } = useExportData(table);

    const exportConfig = {
        fields: [
            {
                fieldName: "eaqTaskDetail.eaqAnalysis.eaqLimitation.eaqCriteria.eaqStandard.code",
                header: "Mã tiêu chuẩn",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.eaqStandard?.code
            },
            {
                fieldName: "eaqTaskDetail.eaqAnalysis.eaqLimitation.eaqCriteria.code",
                header: "Mã tiêu chí",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.code
            },
            {
                fieldName: "eaqTaskDetail.eaqAnalysis.eaqLimitation.name",
                header: "Mã hạn chế",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.code
            },
            {
                fieldName: "eaqTaskDetail.code",
                header: "Mã công việc",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.code
            },
            {
                fieldName: "eaqTaskDetail.name",
                header: "Tên công việc",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.name
            },
            {
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.code",
                header: "Mã minh chứng dự kiến",
                formatFunction: (value: any, row: IReport) => mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.code)
            },
            {
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.name",
                header: "Tên minh chứng dự kiến",
                formatFunction: (value: any, row: IReport) => mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.name)
            },
            {
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.code",
                header: "Mã minh chứng",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.code
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.code)
                }
            },
            {
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.name",
                header: "Tên minh chứng",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.name
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.name)
                }
            },
            {
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.attachFileName",
                header: "Tên file",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.attachFileName
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.eaqEvidenceCurrentVersion?.attachFileName)
                }
            },
            {
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.link",
                header: "Link liên kết",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.link;
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.eaqEvidenceCurrentVersion?.link)
                }
            },
            {
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.versionNumberIssueDateidenceDate",
                header: "Số - ngày ban hành",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.versionNumberIssueDate
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.eaqEvidenceCurrentVersion?.versionNumberIssueDate)
                }
            },
            {
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.department",
                header: "Đơn vị ban hành",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.department?.toString()
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.eaqEvidenceCurrentVersion?.department?.toString())
                }
            },
            {
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.validDate",
                header: "Hiệu lực từ ngày",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return dateUtils.toDDMMYYYY(row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.validDate)
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => dateUtils.toDDMMYYYY(item.eaqEvidence?.eaqEvidenceCurrentVersion?.validDate))
                }
            },
            {
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.expiredDate",
                header: "Hiệu lực đến ngày",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return dateUtils.toDDMMYYYY(row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.expiredDate)
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => dateUtils.toDDMMYYYY(item.eaqEvidence?.eaqEvidenceCurrentVersion?.expiredDate))
                }
            },
            {
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.attachFileDescription",
                header: "Ghi chú phiên bản",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.attachFileDescription
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.eaqEvidenceCurrentVersion?.attachFileDescription)
                }
            },
        ],
    };

    return (
        <AQButtonExportData
            objectName={"Danh sách minh chứng"}
            data={data}
            exportConfig={exportConfig}
        />
    )
};
