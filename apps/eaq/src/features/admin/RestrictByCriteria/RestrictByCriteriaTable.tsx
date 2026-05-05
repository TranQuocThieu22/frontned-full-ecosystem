import {
  limitationTypeEnum,
  limitationTypeEnumColor,
  limitationTypeEnumIcon,
  limitationTypeEnumLabel
} from "@/shared/constants/enum/LimitationTypeEnum";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import RestrictByCriteriaCreateUpdateModal from "./RestrictByCriteriaCreateUpdateModal";
import RestrictByCriteriaDeleteButton from "./RestrictByCriteriaDeleteButton";
import RestrictByCriteriaDeleteListButton from "./RestrictByCriteriaDeleteListButton";
import RestrictByCriteriaExportButton from "./RestrictByCriteriaExportButton";
import RestrictByCriteriaImportButton from "./RestrictByCriteriaImportButton";
import RestrictByCriteriaSyncButton from "./RestrictByCriteriaSyncButton";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export default function RestrictByCriteriaTable() {
  const filterStore = useS_Shared_Filter();

  const restrictByCriteriaQuery = useCustomReactQuery(
    {
      axiosFn: () => service_EAQLimitation.getLimitationsByEAQPhaseId(
        {
          eaqPhaseId: filterStore.state.Phase?.id,
          limitationType: limitationTypeEnum.SelfAssessment,
        }
      ),
      queryKey: ["RestrictByCriteriaTable", filterStore.state.Phase?.id],
    }
  )

  // Cấu hình cột cho bảng
  const restrictByCriteriaColumns = useMemo<MRT_ColumnDef<ILimitation>[]>(
    () => [
      {
        header: "Mã tiêu chuẩn",
        accessorKey: "eaqCriteria.eaqStandard.code",
      },
      {
        header: "Mã tiêu chí",
        accessorKey: "eaqCriteria.code",
      },
      {
        header: "Tên tiêu chí",
        accessorKey: "eaqCriteria.name",
        size: columnSizeObject.name
      },
      {
        header: "Mã hạn chế",
        accessorKey: "code",
      },
      {
        header: "Hạn chế",
        accessorKey: "name",
        size: columnSizeObject.name
      },
      {
        header: "Loại hạn chế",
        accessorKey: "limitationType",
        size: 250,
        accessorFn: (row) => <CustomEnumBadge
          value={row.limitationType}
          enumLabel={limitationTypeEnumLabel}
          enumColor={limitationTypeEnumColor}
          enumIcon={limitationTypeEnumIcon}
        />,
      },
      {
        header: "Mã chương trình",
        accessorFn: (row) => filterStore.state.TrainingProgram?.code
      },
      {
        header: "Mã bộ tiêu chuẩn",
        accessorFn: (row) => filterStore.state.StandardSet?.code
      },
    ],
    [restrictByCriteriaQuery.data]
  );

  return (
    <CustomFieldset title="Danh sách hạn chế theo báo cáo tự đánh giá">
      <CustomDataTable
        isLoading={restrictByCriteriaQuery.isLoading}
        isError={restrictByCriteriaQuery.isError}
        columns={restrictByCriteriaColumns}
        data={restrictByCriteriaQuery.data || []}
        enableRowSelection
        enableRowNumbers={false}
        renderTopToolbarCustomActions={({ table }) => {
          const selectedRows = table.getSelectedRowModel().flatRows.map(row => row.original);

          return (
            <Group>
              <RestrictByCriteriaCreateUpdateModal />

              <RestrictByCriteriaImportButton />

              <RestrictByCriteriaExportButton
                isLoading={restrictByCriteriaQuery.isFetching}
                allRows={restrictByCriteriaQuery.data || []}
                selectedRows={selectedRows}
              />

              <RestrictByCriteriaDeleteListButton
                values={selectedRows}
                table={table}
                isLoading={restrictByCriteriaQuery.isFetching}
              />

              {/* <RestrictByCriteriaSyncButton /> */}

            </Group>
          )
        }}
        renderRowActions={({ row, table }) => (
          <Group justify="center">
            <RestrictByCriteriaCreateUpdateModal values={row.original} />

            <RestrictByCriteriaDeleteButton
              isLoading={restrictByCriteriaQuery.isFetching}
              value={row.original}
              table={table}
            />
          </Group>
        )}
      />
    </CustomFieldset>
  );
}
