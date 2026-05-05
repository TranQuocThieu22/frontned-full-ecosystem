import { limitationTypeEnum, limitationTypeEnumLabel } from "@/shared/constants/enum/LimitationTypeEnum";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";


interface Props {
    table: any
}

export default function ImprovementReportingCycleExportButton({ table }: Props) {
    const { data } = useExportData(table);

    const exportConfig = {
        fields: [
            {
                fieldName: "criteriaCode",
                header: "Mã tiêu chí",
                formatFunction: (value: any, row: any) => row.eaqAnalysis?.eaqLimitation?.eaqCriteria?.code
            },
            {
                fieldName: "criteriaName",
                header: "Tên tiêu chí",
                formatFunction: (value: any, row: any) => row.eaqAnalysis?.eaqLimitation?.eaqCriteria?.name
            },
            {
                fieldName: "weaknessCode",
                header: "Mã hạn chế",
                formatFunction: (value: any, row: any) => row.eaqAnalysis?.eaqLimitation?.code
            },
            {
                fieldName: "weakness",
                header: "Hạn chế",
                formatFunction: (value: any, row: any) => row.eaqAnalysis?.eaqLimitation?.name
            },
            {
                fieldName: "weaknessType",
                header: "Loại hạn chế",
                formatFunction: (value: any, row: any) => limitationTypeEnumLabel[row.eaqAnalysis?.eaqLimitation?.limitationType as limitationTypeEnum]
            },
            {
                fieldName: "code",
                header: "Mã công việc",
            },
            {
                fieldName: "name",
                header: "Tên công việc",
            },
            {
                fieldName: "evidenceCode",
                header: "Mã minh chứng dự kiến",
                formatFunction: (value: any, row: any) => row.eaqTaskDetailEvidences?.map((i: any) => i.code)?.join(", ")
            },
            {
                fieldName: "evidenceName",
                header: "Tên minh chứng dự kiến",
                size: 500,
                formatFunction: (value: any, row: any) => row.eaqTaskDetailEvidences?.map((i: any) => i.name)?.join(", ")
            },
            {
                fieldName: "duration",
                header: "Thời hạn"
            },
            {
                fieldName: "expectedResult",
                header: "Kết quả dự kiến",
                size: 500
            },
            {
                fieldName: "hostUnit",
                header: "Tên đơn vị chủ trì",
                formatFunction: (value: any, row: any) => row.hostUnit ? `${row.hostUnit?.code} - ${row.hostUnit?.name}` : ""
            },
            {
                fieldName: "supportUnit",
                header: "Đơn vị phối hợp"
            },
            {
                fieldName: "assignedPerson",
                header: "Nhân sự phụ trách",
                formatFunction: (value: any, row: any) => row.user?.fullName
            },
            {
                fieldName: "reportCount",
                header: "Số lần báo cáo"
            }
        ],
    };

    return (
        <AQButtonExportData
            objectName="Danh sách hạn chế"
            data={data}
            exportConfig={exportConfig}
        />
    )
};
