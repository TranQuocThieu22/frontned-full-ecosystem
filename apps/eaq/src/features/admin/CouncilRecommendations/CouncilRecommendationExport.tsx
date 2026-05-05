import { limitationTypeEnum, limitationTypeEnumLabel } from "@/shared/constants/enum/LimitationTypeEnum";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
    table: MRT_TableInstance<ILimitation>;
}

export default function CouncilRecommendationExport({ table }: Props) {
    const { data } = useExportData(table);

    const exportConfig = {
        fields: [
            {
                fieldName: "standardCode",
                header: "Mã tiêu chuẩn",
                formatFunction: (value: any, row: any) => row.eaqCriteria?.eaqStandard?.code
            },
            {
                fieldName: "criteriaCode",
                header: "Mã tiêu chí",
                formatFunction: (value: any, row: any) => row.eaqCriteria?.code
            },
            {
                fieldName: "criteriaName",
                header: "Tên tiêu chí",
                size: 400,
                formatFunction: (value: any, row: any) => row.eaqCriteria?.name
            },
            {
                fieldName: "code",
                header: "Mã hạn chế",
            },
            {
                fieldName: "name",
                header: "Hạn chế",
                size: 400
            },
            {
                fieldName: "type",
                header: "Loại hạn chế",
                formatFunction: (value: any, row: any) => limitationTypeEnumLabel[row.limitationType as limitationTypeEnum]
            },
            {
                fieldName: "trainingProgramCode",
                header: "Mã chương trình",
                formatFunction: (value: any, row: any) => row.eaqTrainingProgram?.code
            },
            {
                fieldName: "standardSetCode",
                header: "Mã bộ tiêu chuẩn",
                formatFunction: (value: any, row: any) => row.eaqCriteria?.eaqStandard?.eaqStandardSet?.code
            },
        ],
    };

    return (
        <AQButtonExportData
            objectName="Danh sách hạn chế theo khuyến nghị của Hội đồng kiểm định"
            data={data}
            exportConfig={exportConfig}
        />
    );
}
