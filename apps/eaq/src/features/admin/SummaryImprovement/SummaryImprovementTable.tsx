'use client'

import { service_EAQLimitation } from '@/shared/APIs/service_EAQLimitation'
import {
  limitationTypeEnum,
  limitationTypeEnumColor,
  limitationTypeEnumIcon,
  limitationTypeEnumLabel
} from '@/shared/constants/enum/LimitationTypeEnum'
import ILimitation from '@/shared/interfaces/limitation/ILimitation'
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter'
import { useMemo } from 'react'
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from '@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI'

export const SummaryImprovementTable = () => {
  const store = useS_Shared_Filter();
  const query = useCustomReactQuery({
    queryKey: ['SummaryImprovementTable_GetLimitationsByEAQPhaseId', store.state.Phase?.id],
    axiosFn: () => service_EAQLimitation.getLimitationsByEAQPhaseId({ eaqPhaseId: store.state.Phase?.id }),
  })

  const columns = useMemo<CustomColumnDef<ILimitation>[]>(
    () => [
      {
        header: 'Mã tiêu chuẩn',
        accessorKey: 'eaqCriteria.eaqStandard.code',
        size: 180
      },
      {
        header: 'Mã tiêu chí',
        accessorKey: 'eaqCriteria.code',
        size: 180
      },
      {
        header: 'Tên tiêu chí',
        accessorKey: 'eaqCriteria.name',
        size: 500
      },
      {
        header: 'Mã hạn chế',
        accessorKey: 'code',
        size: 180
      },
      {
        header: 'Hạn chế',
        accessorKey: 'name',
        size: 500,
      },
      {
        header: 'Loại hạn chế',
        accessorKey: 'limitationType',
        type: 'statusBadge',
        statusBadgeProps: {
          enumColor: limitationTypeEnumColor,
          enumLabel: limitationTypeEnumLabel,
          enumIcon: limitationTypeEnumIcon,
          enumObject: limitationTypeEnum
        },
        size: 340,
      },
      {
        header: 'Mã chương trình đào tạo',
        accessorFn: (row) => row.eaqPhase?.eaqStandardSetTrainingProgram?.code
      },
      {
        header: 'Mã bộ tiêu chuẩn',
        accessorFn: (row) => row.eaqCriteria?.eaqStandard?.eaqStandardSet?.code
      },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách tổng hợp hạn chế">
      <CustomDataTableAPI
        enableRowSelection
        columns={columns}
        isError={query.isError}
        isLoading={query.isLoading}
        query={query}
        exportProps={{
          fileName: "Danh sách tổng hợp hạn chế"
        }}
      />
    </CustomFieldset>
  )
}
