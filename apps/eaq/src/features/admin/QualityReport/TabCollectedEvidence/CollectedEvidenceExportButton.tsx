import { IReport } from "@/shared/interfaces/report/IReport";
import { MRT_TableInstance } from "mantine-react-table";
import { isNullOrEmptyList, mapAndJoinStrings } from "../QualityReportFunctions";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";


interface Props {
    table: MRT_TableInstance<IReport>
}

export default function CollectedEvidenceExportButton({ table }: Props) {
    const { data } = useExportData(table);

    const exportConfig = {
        fields: [
            {
                header: "Mã tiêu chuẩn",
                fieldName: "eaqTaskDetail.eaqAnalysis.eaqRequirement.eaqCriteria.eaqStandard.code",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.eaqStandard?.code
            },
            {
                header: "Mã tiêu chí",
                fieldName: "eaqTaskDetail.eaqAnalysis.eaqRequirement.eaqCriteria.code",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.code
            },
            {
                header: "Mã yêu cầu",
                fieldName: "eaqTaskDetail.eaqAnalysis.eaqRequirement.code",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.code
            },
            {
                header: "Tên yêu cầu",
                fieldName: "eaqTaskDetail.eaqAnalysis.eaqRequirement.name",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.name
            },
            {
                header: "Mã công việc",
                fieldName: "eaqTaskDetail.code",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.code
            },
            {
                header: "Tên công việc",
                fieldName: "eaqTaskDetail.name",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.name
            },
            {
                header: "Mã minh chứng dự kiến",
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.code",
                formatFunction: (value: any, row: IReport) => mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.code)
            },
            {
                header: "Tên minh chứng dự kiến",
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.name",
                formatFunction: (value: any, row: IReport) => mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.name)
            },
            {
                header: "Mã minh chứng",
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.code",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.code
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.code)
                }
            },
            {
                header: "Tên minh chứng",
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.name",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.name
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.name)
                }
            },
            {
                header: "Tên file",
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.attachFileName",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.attachFileName
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.eaqEvidenceCurrentVersion?.attachFileName)
                }
            },
            {
                header: "Link liên kết",
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.link",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.link;
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.eaqEvidenceCurrentVersion?.link)
                }
            },
            {
                header: "Số - ngày ban hành",
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.versionNumberIssueDateidenceDate",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.versionNumberIssueDate
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.eaqEvidenceCurrentVersion?.versionNumberIssueDate)
                }
            },
            {
                header: "Đơn vị ban hành",
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.department",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.department?.toString()
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.eaqEvidenceCurrentVersion?.department?.toString())
                }
            },
            {
                header: "Hiệu lực từ ngày",
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.validDate",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return dateUtils.toDDMMYYYY(row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.validDate)
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => dateUtils.toDDMMYYYY(item.eaqEvidence?.eaqEvidenceCurrentVersion?.validDate))
                }
            },
            {
                header: "Hiệu lực đến ngày",
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.expiredDate",
                formatFunction: (value: any, row: IReport) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return dateUtils.toDDMMYYYY(row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.expiredDate)
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => dateUtils.toDDMMYYYY(item.eaqEvidence?.eaqEvidenceCurrentVersion?.expiredDate))
                }
            },
            {
                header: "Ghi chú phiên bản",
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.attachFileDescription",
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
