"use client";
import { IAssessmentCouncilDecision } from "@/shared/interfaces/assessmentCouncilDecision/IAssessmentCouncilDecision";
import { service_EAQAssessmentCouncilDecision } from "@/shared/APIs/service_EAQAssessmentCouncilDecision";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import AssessmentCouncilDecisionDeleteButton from "./AssessmentCouncilDecisionDeleteButton";
import AssessmentCouncilDecisionDeleteListButton from "./AssessmentCouncilDecisionDeleteListButton";
import AssessmentCouncilDecisionExport from "./AssessmentCouncilDecisionExport";
import AssessmentCouncilDecisionImport from "./AssessmentCouncilDecisionImport";
import AssessmentCouncilDecisionCreateButton from "./AssessmentCouncilDecisionlCreateButton";
import AssessmentCouncilDecisionUpdateButton from "./AssessmentCouncilDecisionUpdateButton";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";


export default function AssessmentCouncilDecisionTable() {

  const standardSetStore = useS_Shared_Filter();

  const dics = useDisclosure();
  const dicsView = useDisclosure();
  const [valueUpdate, setValueUpdate] = useState<IAssessmentCouncilDecision>();

  const decisionEstablishCouncilsQuery = useCustomReactQuery({
    queryKey: ['decision_establish_councils', standardSetStore.state.Phase?.id],
    axiosFn: () => service_EAQAssessmentCouncilDecision.GetEAQAssessmentCouncilDecisionsByEAQPhaseId({ eaqPhaseId: standardSetStore.state.Phase?.id }),
  })

  const columns = useMemo<MRT_ColumnDef<IAssessmentCouncilDecision>[]>(
    () => [
      {
        accessorKey: 'code',
        header: 'Số Quyết định'
      },
      {
        accessorKey: 'decisionDate',
        header: 'Ngày Quyết định',
        Cell: ({ row }) => dateUtils.toDDMMYYYY(row.original.decisionDate)
      },
      {
        accessorKey: 'name',
        header: 'Tên Quyết định',
        size: 600
      },
      {
        accessorKey: 'appliedProgram',
        header: 'Chương trình Đào tạo áp dụng',
        Cell: ({ row }) => row.original.eaqPhase?.eaqStandardSetTrainingProgram?.eaqTrainingProgram?.name,
        size: 400
      },
      {
        accessorKey: 'stageCode',
        header: 'Mã giai đoạn',
        Cell: ({ row }) => row.original.eaqPhase?.code
      },
      {
        accessorKey: 'signerName',
        header: 'Người ký'
      },
      {
        accessorKey: 'imagePath',
        header: 'File đính kèm',
        Cell: ({ cell }) =>
          <CustomCenterFull>
            <CustomButtonViewFileAPI filePath={cell.getValue<string>()} />
          </CustomCenterFull>
      },
    ],
    []
  )
  return (
    <>
      <CustomFieldset title="Danh sách quyết định thành lập hội đồng">
        <CustomDataTable
          isLoading={decisionEstablishCouncilsQuery.isLoading}
          isError={decisionEstablishCouncilsQuery.isError}
          enableRowSelection
          columns={columns}
          data={decisionEstablishCouncilsQuery.data || []}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <Group>
                <AssessmentCouncilDecisionCreateButton />
                <AssessmentCouncilDecisionImport />
                <AssessmentCouncilDecisionExport table={table} />
                <AssessmentCouncilDecisionDeleteListButton
                  values={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)}
                  clearSelection={table.resetRowSelection}
                />
              </Group>
            );
          }}
          renderRowActions={({ row, table }) => {
            return (
              <CustomCenterFull>
                <CustomActionIcon
                  actionType="view"
                  loading={decisionEstablishCouncilsQuery.isFetching}
                  onClick={() => {
                    setValueUpdate(row.original);
                    dicsView[1].open();
                  }}
                />
                <CustomActionIcon
                  actionType="update"
                  loading={decisionEstablishCouncilsQuery.isFetching}
                  onClick={() => {
                    setValueUpdate(row.original);
                    dics[1].open();
                  }}
                />
                <AssessmentCouncilDecisionDeleteButton
                  id={row.original.id || 0}
                  code={row.original.code || ""}
                  clearSelection={table.resetRowSelection}
                />
              </CustomCenterFull>
            );
          }}
        />
      </CustomFieldset>
      {dicsView[0] && <AssessmentCouncilDecisionUpdateButton disclosure={dicsView} values={valueUpdate} viewOnly={true} />}
      {dics[0] && <AssessmentCouncilDecisionUpdateButton disclosure={dics} values={valueUpdate} />}
    </>
  );
}
