import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import {
    limitationTypeEnum,
    limitationTypeEnumColor,
    limitationTypeEnumIcon,
    limitationTypeEnumLabel
} from "@/shared/constants/enum/LimitationTypeEnum";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import CouncilRecommendationDelete from "@/features/admin/CouncilRecommendations/CouncilRecommendationDelete";
import CouncilRecommendationDeleteList from "@/features/admin/CouncilRecommendations/CouncilRecommendationDeleteList";
import {
    CouncilRecommendationsCreateOrUpdate
} from "@/features/admin/CouncilRecommendations/CouncilRecommendationsCreateOrUpdate";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CouncilRecommendationExport from "./CouncilRecommendationExport";
import CouncilRecommendationImport from "./CouncilRecommendationImport";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";


export default function CouncilRecommendationsTable() {
    const filterStore = useS_Shared_Filter();

    const query = useCustomReactQuery({
        queryKey: ["limitation_type_assessment_council_list", filterStore.state.Phase?.id, 3],
        axiosFn: () => service_EAQLimitation.getLimitationsByEAQPhaseId({
            eaqPhaseId: filterStore.state.Phase?.id,
            limitationType: limitationTypeEnum.AssessmentCouncil
        })
    });

    const columns = useMemo<MRT_ColumnDef<ILimitation>[]>(
        () => [
            {
                accessorKey: "eaqStandard.code",
                header: "Mã tiêu chuẩn",
                accessorFn: (row) => row.eaqCriteria?.eaqStandard?.code
            },
            {
                accessorKey: "eaqCriteria.code",
                header: "Mã tiêu chí",
                accessorFn: (row) => row.eaqCriteria?.code
            },
            {
                accessorKey: "eaqCriteria.name",
                header: "Tên tiêu chí",
                size: 400,
                accessorFn: (row) => row.eaqCriteria?.name
            },
            {
                accessorKey: "code",
                header: "Mã hạn chế",
            },
            {
                accessorKey: "name",
                header: "Hạn chế",
                size: 800
            },
            {
                accessorKey: "type",
                header: "Loại hạn chế",
                size: 350,
                accessorFn: (row) => <CustomEnumBadge
                    value={row.limitationType}
                    enumLabel={limitationTypeEnumLabel}
                    enumColor={limitationTypeEnumColor}
                    enumIcon={limitationTypeEnumIcon}
                />
            },
            {
                accessorKey: "eaqTrainingProgram.code",
                header: "Mã chương trình",
                accessorFn: (row) => row.eaqPhase?.eaqTrainingProgram?.code
            },
            {
                accessorKey: "eaqStandardSets.code",
                header: "Mã bộ tiêu chuẩn",
                accessorFn: (row) => row.eaqCriteria?.eaqStandard?.eaqStandardSet?.code
            }
        ],
        []
    );
    return (
        <CustomFieldset title="Danh sách hạn chế theo khuyến nghị của Hội đồng kiểm định">
            <CustomDataTable
                isLoading={query.isLoading}
                isError={query.isError}
                enableRowSelection
                columns={columns}
                data={query.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows = table.getSelectedRowModel().flatRows.map((item) => item.original) || [];
                    return (
                        <Group>
                            <CouncilRecommendationsCreateOrUpdate />
                            <CouncilRecommendationImport />
                            <CouncilRecommendationExport table={table} />
                            <CouncilRecommendationDeleteList
                                values={selectedRows}
                                resetRowSelection={table.resetRowSelection}
                            />
                        </Group>
                    );
                }}
                renderRowActions={({ row, table }) => (
                    <CustomCenterFull>
                        <CouncilRecommendationsCreateOrUpdate data={row.original} />
                        <CouncilRecommendationDelete
                            id={row.original.id}
                            code={row.original.code || ""}
                            resetRowSelection={table.resetRowSelection}
                        />
                    </CustomCenterFull>
                )}
            />
        </CustomFieldset>
    );
}
