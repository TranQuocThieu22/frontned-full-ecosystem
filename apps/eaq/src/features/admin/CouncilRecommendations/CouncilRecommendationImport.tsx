import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import { limitationTypeEnum } from "@/shared/constants/enum/LimitationTypeEnum";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";

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

interface ICriteriaConfig {
    code: string;
    name: string;
}

const phaseConfig: IExcelColumnConfig<ICriteriaConfig>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã tiêu chí",
    },
    {
        fieldKey: "name",
        fieldName: "Tên tiêu chí",
    },
];

export default function CouncilRecommendationImport() {
    const phaseStore = useS_Shared_Filter();
    
    const taskDetailQuery = useCustomReactQuery({
        queryKey: ["task_detail_list", phaseStore.state.Phase?.id],
        axiosFn: () => service_EAQAnalysis.getCriteriaFilter({
            eaqPhaseId: phaseStore.state.Phase?.id,
        }),
        options: {
            enabled: !!phaseStore.state.Phase?.id,
        },
    });

    return (
        <CustomButtonImport
            fields={config}
            fileName="Mẫu Import hạn chế theo khuyến nghị của Hội đồng kiểm định"
            onSubmit={(values: any[]) => {
                const finalValues = values.map(item => {
                    const taskDetail = taskDetailQuery.data?.find(i => i.code === item.criteriaCode?.trim());
                    return {
                        eaqCriteriaId: taskDetail?.id,
                        eaqPhaseId: Number(phaseStore.state.Phase?.id),
                        code: item.code,
                        name: item.name,
                        limitationType: limitationTypeEnum.AssessmentCouncil
                    };
                });
                
                return service_EAQLimitation.createList(finalValues);
            }}
            onPrepareWorkbook={(workbook) => {
                excelUtils.addSheet<ICriteriaConfig>({
                    workbook: workbook,
                    sheetName: "Danh sách tiêu chí",
                    data: taskDetailQuery.data?.map(item => ({
                        code: item.code ?? "",
                        name: item.name ?? ""
                    })) || [],
                    config: phaseConfig,
                });
            }}
        />
    );
}
