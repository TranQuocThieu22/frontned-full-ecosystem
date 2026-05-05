import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import { limitationTypeEnum } from "@/shared/constants/enum/LimitationTypeEnum";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";

const config: FieldOption<ILimitation>[] = [
    {
        fieldKey: "criteriaCode",
        fieldName: "Mã tiêu chí",
        isRequired: true,
    },
    {
        fieldKey: "code",
        fieldName: "Mã hạn chế",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Hạn chế",
        isRequired: true,
    },
];

interface IDocumentTypeConfig {
    code: string;
    name: string;
}

const criteriaConfig: IExcelColumnConfig<IDocumentTypeConfig>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã tiêu chí",
    },
    {
        fieldKey: "name",
        fieldName: "Tên tiêu chí",
    },
];

export default function ReviewCriteriaRecommendationsImport() {
    const phaseStore = useS_Shared_Filter();

    const criteriaQuery = useCustomReactQuery({
        queryKey: ["queryTaskDetailsWithCriteria", phaseStore.state.Phase?.id],
        axiosFn: () =>
            service_EAQAnalysis.getCriteriaFilter({
                eaqPhaseId: phaseStore.state.Phase?.id,
            }),
    });

    return (
        <CustomButtonImport
            fields={config}
            fileName="Mẫu Import hạn chế theo kiến nghị của Đoàn đánh giá ngoài"
            onSubmit={(finalValues: any[]) => {
                const values = finalValues.map((item) => {
                    const taskDetail = criteriaQuery.data?.find(
                        (i) =>
                            i.code === item.criteriaCode?.toString().trim()
                    );
                    return {
                        ...item,
                        limitationType: limitationTypeEnum.ExternalAssessment,
                        eaqCriteriaId: Number(taskDetail?.id),
                        eaqPhaseId: Number(phaseStore.state.Phase?.id),
                    };
                });
                return service_EAQLimitation.createList(values);
            }}
            onPrepareWorkbook={(workbook) => {
                excelUtils.addSheet<IDocumentTypeConfig>({
                    workbook: workbook,
                    sheetName: "Danh sách tiêu chí",
                    data:
                        criteriaQuery.data?.map((item) => ({
                            code: item.code ?? "",
                            name: item.name ?? "",
                        })) || [],
                    config: criteriaConfig,
                });
            }}
        />
    );
}
