'use client'
import { evaluationCriteriaSetService } from "@/shared/APIs/evaluationCriteriaSetService";
import { EnumLabelCouncilType } from "@/shared/consts/enum/EnumCouncilType";
import { EnumLabelEvaluationType } from "@/shared/consts/enum/EnumEvaluationType";
import { EnumLabelGradingSystem } from "@/shared/consts/enum/EnumGradingSystem";
import { SRMEvaluationCriteriaSet } from "@/shared/interfaces/SRMEvaluationCriteriaSet";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { useMemo } from "react";
import CouncilCriteriaListCreateOrUpdate from "./CouncilCriteriaListCreateOrUpdate";
import CouncilCriteriaListImportButton from "./CouncilCriteriaListImportButton";

export default function CouncilCriteriaListTable() {

    const columns = useMemo<CustomColumnDef<SRMEvaluationCriteriaSet>[]>(() => [
        {
            header: "Mã bộ tiêu chí",
            accessorKey: "code",
        },
        {
            header: "Tên bộ tiêu chí",
            accessorKey: "name",
            size: columnSizeObject.name
        },
        {
            header: "Cách đánh giá",
            accessorKey: "srmCriterias.code",
            accessorFn: (row) => {
                const uniqueEvaluationTypes = [...new Set(row.srmCriterias?.map((item) => item.evaluationType) || [])];
                return uniqueEvaluationTypes.map((type) => converterUtils.getLabelByValue(EnumLabelEvaluationType, type));
            },
            type: "list"
        },
        {
            header: "Hệ điểm đánh giá",
            accessorKey: "srmCriterias.gradingSystem",
            accessorFn: (row) => {
                const uniqueGradingSystems = [...new Set(row.srmCriterias?.filter(item => item.gradingSystem !== null).map((item) => item.gradingSystem) || [])];
                return uniqueGradingSystems.map((type) => converterUtils.getLabelByValue(EnumLabelGradingSystem, type));
            },
            type: "list"
        },
        {
            header: "Loại hội đồng",
            accessorKey: "councilType",
            accessorFn: (row) => converterUtils.getLabelByValue(EnumLabelCouncilType, row.councilType),
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
            size: columnSizeObject.description
        },
    ], [])


    const evaluationCriteriaQuery = useCustomReactQuery({
        queryKey: ['evaluationCriteriaQuery'],
        axiosFn: () => evaluationCriteriaSetService.getAll({ params: `?cols=SRMConclusionSet,SRMCriterias` })
    })

    return (
        <CustomFieldset
            title="Danh mục bộ tiêu chí đánh giá"
        >
            <CustomDataTableAPI
                query={evaluationCriteriaQuery}
                columns={columns}
                enableRowSelection={true}
                enableRowNumbers={false}
                deleteFn={evaluationCriteriaSetService.delete}
                deleteListFn={evaluationCriteriaSetService.deleteListIds}
                exportProps={{
                    fileName: "Danh mục bộ tiêu chí đánh giá"
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <CouncilCriteriaListCreateOrUpdate />
                            <CouncilCriteriaListImportButton />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <>
                            <CouncilCriteriaListCreateOrUpdate initValues={row.original} />
                        </>
                    )
                }}
            />
        </CustomFieldset>
    );
}
