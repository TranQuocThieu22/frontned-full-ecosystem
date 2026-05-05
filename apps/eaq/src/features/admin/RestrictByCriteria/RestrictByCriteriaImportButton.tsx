import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import { limitationTypeEnum } from "@/shared/constants/enum/LimitationTypeEnum";
import { ICriteria } from "@/shared/interfaces/criteria/Criteria";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";

const limitationConfig: FieldOption<ILimitation>[] = [
    {
        fieldKey: "eaqCriteriaCode",
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
        fieldName: "Nội dung hạn chế",
        isRequired: true,
    },
];

const taskDetailConfig: IExcelColumnConfig<ICriteria>[] = [
    {
        fieldKey: "eaqCriteriaCode",
        fieldName: "Mã tiêu chí",
        formatter(value, row) {
            return row.code
        },
    },
    {
        fieldKey: "eaqCriteriaName",
        fieldName: "Tên tiêu chí",
        formatter(value, row) {
            return row.name
        },
    },

];

export default function RestrictByCriteriaImportButton() {
    const filterStore = useS_Shared_Filter();

    const taskDetailQuery = useCustomReactQuery({
        axiosFn: () => service_EAQAnalysis.getCriteriaFilter(
            { eaqPhaseId: filterStore.state.Phase?.id }
        ),
        queryKey: ["CriteriaOptions", filterStore.state.Phase?.id],
        options: {
            enabled: !!filterStore.state.Phase?.id
        }
    });

    return (
        <CustomButtonImport
            fields={limitationConfig}
            fileName="Mẫu Import hạn chế theo tiêu chí từ Báo cáo tự đánh giá"
            onSubmit={(finalValues: ILimitation[]) => {
                 const mappedValues: ILimitation[] = finalValues.map((item) => {
                    const mappedTaskDetail = taskDetailQuery.data?.find(
                        (taskDetail) => taskDetail.code === item.eaqCriteriaCode
                    );
                    return {
                        ...item,
                        limitationType: limitationTypeEnum.SelfAssessment,
                        eaqCriteriaId: mappedTaskDetail?.id,
                        eaqPhaseId: filterStore.state.Phase?.id
                    }
                 });

                return service_EAQLimitation.createOrUpdateList(mappedValues);
            }}
            onPrepareWorkbook={(workbook) => {
                excelUtils.addSheet<ICriteria>({
                    workbook: workbook,
                    sheetName: "Danh sách tiêu chí",
                    data: (taskDetailQuery.data || []),
                    config: taskDetailConfig,
                });
            }}
        />
    );
}
