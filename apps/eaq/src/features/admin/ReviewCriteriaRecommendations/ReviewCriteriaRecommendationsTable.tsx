import {
  limitationTypeEnumColor,
  limitationTypeEnumIcon,
  limitationTypeEnumLabel,
} from "@/shared/constants/enum/LimitationTypeEnum";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ReviewCriteriaRecommendationsCreateUpdate from "./ReviewCriteriaRecommendationsCreateUpdate";
import ReviewCriteriaRecommendationsDelete from "./ReviewCriteriaRecommendationsDelete";
import ReviewCriteriaRecommendationsDeleteList from "./ReviewCriteriaRecommendationsDeleteList";
import ReviewCriteriaRecommendationsExport from "./ReviewCriteriaRecommendationsExport";
import ReviewCriteriaRecommendationsImport from "./ReviewCriteriaRecommendationsImport";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export default function ReviewCriteriaRecommendationsTable() {
  const phaseStore = useS_Shared_Filter();

  const queryLimitations = useCustomReactQuery({
    queryKey: ["queryLimitations", phaseStore.state.Phase?.id],
    axiosFn: () =>
      service_EAQLimitation.getLimitationsByEAQPhaseId({
        eaqPhaseId: phaseStore.state.Phase?.id,
        limitationType: 2,
      }),
  });

  const columns = useMemo<MRT_ColumnDef<ILimitation>[]>(
    () => [
      {
        accessorKey: "eaqCriteria.eaqStandard.code",
        header: "Mã tiêu chuẩn",
      },
      {
        accessorKey: "eaqCriteria.code",
        header: "Mã tiêu chí",
      },
      {
        accessorKey: "eaqCriteria.name",
        header: "Tên tiêu chí",
        size: columnSizeObject.name,
      },
      {
        accessorKey: "code",
        header: "Mã hạn chế",
      },
      {
        accessorKey: "name",
        header: "Hạn chế",
        size: columnSizeObject.name,
      },
      {
        accessorKey: "loaiHanChe",
        header: "Loại hạn chế",
        Cell: ({ row }) => {
          return (
            <CustomEnumBadge
              value={row.original.limitationType}
              enumLabel={limitationTypeEnumLabel}
              enumColor={limitationTypeEnumColor}
              enumIcon={limitationTypeEnumIcon}
            />
          );
        },
        size: 300,
      },
      {
        accessorKey: "eaqPhase.eaqTrainingProgram.code",
        header: "Mã chương trình",
        accessorFn: (row) => row.eaqPhase?.eaqTrainingProgram?.code
      },
      {
        accessorKey: "eaqCriteria.eaqStandard.eaqStandardSet.code",
        header: "Mã bộ tiêu chuẩn",
      },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách hạn chế theo kiến nghị của Đoàn đánh giá ngoài">
      <CustomDataTable
        columns={columns}
        data={queryLimitations.data || []}
        isLoading={queryLimitations.isLoading}
        isError={queryLimitations.isError}
        enableRowSelection
        enableColumnFilters
        enableRowNumbers={false}
        renderTopToolbarCustomActions={({ table }) => {
          const selectedRows = table
            .getSelectedRowModel()
            .flatRows.map((row) => row.original);
          return (
            <Group>
              <ReviewCriteriaRecommendationsCreateUpdate />
              <ReviewCriteriaRecommendationsImport />
              <ReviewCriteriaRecommendationsExport table={table} />
              <ReviewCriteriaRecommendationsDeleteList table={table} />
            </Group>
          );
        }}
        renderRowActions={({ row }) => (
          <CustomCenterFull>
            <ReviewCriteriaRecommendationsCreateUpdate values={row.original} />
            <ReviewCriteriaRecommendationsDelete data={row.original || ""} />
          </CustomCenterFull>
        )}
      />
    </CustomFieldset>
  );
}
