import { documentTypeEnumLabel } from '@/shared/constants/enum/DocumentTypeEnum'
import { IExternalAssessment } from '@/shared/interfaces/externalAssessment/IExternalAssessment'
import { service_EAQExternalAssessment } from '@/shared/APIs/service_EAQExternalAssessment'
import { Group } from '@mantine/core'
import { MRT_ColumnDef } from 'mantine-react-table'
import { useMemo } from 'react'
import { ExternalAssessmentManagementCreateUpdate } from './ExternalAssessmentManagementCreateUpdate'
import ExternalAssessmentManagementDelete from './ExternalAssessmentManagementDelete'
import ExternalAssessmentManagementDeleteList from './ExternalAssessmentManagementDeleteList'
import ExternalAssessmentManagementExport from './ExternalAssessmentManagementExport'
import ExternalAssessmentManagementImport from './ExternalAssessmentManagementImport'
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { dateUtils } from '@aq-fe/core-ui/shared/utils/dateUtils'
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable'
import { converterUtils } from '@aq-fe/core-ui/shared/utils/converterUtils'

export default function ExternalAssessmentManagementTable() {

  const query = useCustomReactQuery({
    queryKey: ["ExternalAssessmentManagementTable_Read"],
    axiosFn: async () => service_EAQExternalAssessment.getAll(),
  });

  const columns = useMemo<MRT_ColumnDef<IExternalAssessment>[]>(
    () => [
      {
        header: 'Số văn bản',
        accessorKey: 'code',
      },
      {
        header: 'Ngày văn bản',
        accessorKey: 'documentDate',
        accessorFn: row => dateUtils.toDDMMYYYY(row.documentDate),
      },
      {
        header: 'Mã CTĐT',
        accessorKey: 'eaqPhase.eaqStandardSetTrainingProgram.code',
      },
      {
        header: 'Tên CTĐT',
        accessorKey: 'eaqPhase.eaqStandardSetTrainingProgram.name',
        size: 300,
      },
      {
        header: 'Mã giai đoạn đánh giá',
        accessorKey: 'eaqPhase.code',
        size: 200,
      },
      {
        header: 'Tên văn bản',
        accessorKey: 'name',
        size: 300,
      },
      {
        header: 'Loại văn bản',
        accessorKey: 'documentType',
        size: 350,
        accessorFn: row => converterUtils.getLabelByValue(documentTypeEnumLabel, row.documentType),
      },
      {
        header: 'File đính kèm',
        accessorKey: 'documentFilePath',
        accessorFn: row => <CustomButtonViewFileAPI filePath={row.documentFilePath === "" ? undefined : row.documentFilePath} />,
      },
    ],
    []
  )

  return (
    <CustomFieldset title="Danh sách hồ sơ liên quan đánh giá ngoài">
      <CustomDataTable
        enableRowSelection
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <Group gap="sm">
              <ExternalAssessmentManagementCreateUpdate loading={query.isFetching} />
              <ExternalAssessmentManagementImport  />
              <ExternalAssessmentManagementExport table={table} loading={query.isFetching} />
              <ExternalAssessmentManagementDeleteList
                table={table} loading={query.isFetching}
              />
            </Group>
          )
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <ExternalAssessmentManagementCreateUpdate data={row.original} loading={query.isFetching} />
              <ExternalAssessmentManagementDelete data={row.original} loading={query.isFetching} />
            </CustomCenterFull>
          )
        }}
      />
    </CustomFieldset>
  )
}
