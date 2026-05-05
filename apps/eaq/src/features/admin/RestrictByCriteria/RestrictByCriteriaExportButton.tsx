import { limitationTypeEnum, limitationTypeEnumLabel } from "@/shared/constants/enum/LimitationTypeEnum";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
    selectedRows: ILimitation[];
    allRows: ILimitation[];
    isLoading: boolean
}

export default function RestrictByCriteriaExportButton({ selectedRows, allRows, isLoading }: Props) {
    const filterStore = useS_Shared_Filter();

    const exportConfig = {
        fields: [
            {
                header: "Mã tiêu chuẩn", fieldName: "eaqCriteria.eaqStandard.code",
                formatFunction: (value: any, row: ILimitation) => row?.eaqCriteria?.eaqStandard?.code
            },
            {
                header: "Mã tiêu chí", fieldName: "eaqCriteria.code",
                formatFunction: (value: any, row: ILimitation) => row?.eaqCriteria?.code
            },
            {
                header: "Tên tiêu chí", fieldName: "eaqCriteria.name",
                formatFunction: (value: any, row: ILimitation) => row?.eaqCriteria?.name
            },
            {
                header: "Mã hạn chế", fieldName: "code",
                formatFunction: (value: any, row: ILimitation) => row?.code
            },
            {
                header: "Hạn chế", fieldName: "name",
                formatFunction: (value: any, row: ILimitation) => row?.name
            },
            {
                header: "Loại hạn chế", fieldName: "limitationType",
                formatFunction: (value: any, row: ILimitation) => limitationTypeEnumLabel[row.limitationType as limitationTypeEnum],
            },
            {
                header: "Mã chương trình", fieldName: "trainingProgramCode",
                formatFunction: () => filterStore.state.TrainingProgram?.code
            },
            {
                header: "Mã bộ tiêu chuẩn", fieldName: "standardSetCode",
                formatFunction: () => filterStore.state.StandardSet?.code
            },
        ]
    }

    return (
        <AQButtonExportData
            loading={isLoading}
            objectName={'Danh sách ngoài hạn chế theo báo cáo tự đánh giá'}
            data={selectedRows.length > 0 ? selectedRows : allRows || []}
            exportConfig={exportConfig}
        />
    )
}
