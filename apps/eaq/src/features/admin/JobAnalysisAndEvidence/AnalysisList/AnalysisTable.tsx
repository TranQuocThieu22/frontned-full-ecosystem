import { AnalysisFormModal } from "@/features/admin/JobAnalysisAndEvidence/AnalysisList/AnalysisFormModal";
import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { IAnalysis } from "@/shared/interfaces/analysis/IAnalysis";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Group, Stack } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import AnalysisDelete from "./AnalysisDelete";
import AnalysisDeleteList from "./AnalysisDeleteList";
import AnalysisExport from "./AnalysisExport";
import AnalysisImport from "./AnalysisImport";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export default function AnalysisTable() {
  const filterStore = useS_Shared_Filter();

  const analysisQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id!,
        analysisType: analysisTypeEnum.Limitation,
      }),
    queryKey: ["EAQAnalyses", filterStore.state.Phase?.id],
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  const columns = useMemo<MRT_ColumnDef<IAnalysis>[]>(
    () => [
      {
        header: "Mã tiêu chuẩn",
        accessorFn: (row) => row.eaqLimitation?.eaqCriteria?.eaqStandard?.code || "",
      },
      {
        header: "Tên tiêu chuẩn",
        accessorFn: (row) => row.eaqLimitation?.eaqCriteria?.eaqStandard?.name || "",
        size: columnSizeObject.name,
      },
      {
        header: "Mã tiêu chí",
        accessorFn: (row) => row.eaqLimitation?.eaqCriteria?.code || "",
      },
      {
        header: "Tên tiêu chí",
        accessorFn: (row) => row.eaqLimitation?.eaqCriteria?.name || "",
        size: columnSizeObject.description,
      },
      {
        header: "Mã hạn chế",
        accessorFn: (row) => row.eaqLimitation?.code || "",
      },
      {
        header: "Tên hạn chế",
        accessorFn: (row) => row.eaqLimitation?.name || "",
        size: columnSizeObject.description,
      },
      {
        header: "Mã phân tích",
        accessorKey: "code",
      },
      {
        header: "Nội dung phân tích",
        accessorKey: "description",
        size: columnSizeObject.description
      },
      {
        header: "Câu hỏi phân tích",
        accessorKey: "question",
        size: 500,
        Cell: ({ row }) => {
          const questions = row.original.question?.split("\n") || [];
          return (
            <Stack gap={2}>
              {questions.map((question, index) => (
                <p key={index}>{question}</p>
              ))}
            </Stack>
          );
        },
      },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách nội dung phân tích hạn chế tiêu chí">
      <CustomDataTable
        columns={columns}
        data={analysisQuery.data || []}
        enableRowSelection
        enableRowNumbers={false}
        renderTopToolbarCustomActions={({ table }) => {
          const selectedRows =
            table.getSelectedRowModel().flatRows.map((item) => item.original) || [];
          return (
            <Group gap="sm">
              <AnalysisFormModal />
              <AnalysisImport />
              <AnalysisExport table={table} loading={analysisQuery.isLoading} />
              <AnalysisDeleteList data={selectedRows} resetRowSelection={table.resetRowSelection} />
            </Group>
          );
        }}
        renderRowActions={({ row }) => {
          return (
            <Group gap="xs" justify="center" wrap="nowrap">
              <AnalysisFormModal values={row.original} />
              <AnalysisDelete id={row.original.id!} code={row.original.code!} />
            </Group>
          );
        }}
      />
    </CustomFieldset>
  );
}
