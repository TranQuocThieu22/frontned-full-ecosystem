"use client";

import { academicYearService } from "@/shared/APIs/academicYearService";
import { taskProposalService } from "@/shared/APIs/taskProposalService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { Badge, Grid } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import ProposalListExport from "./ProposalListExport";

export default function ProposalListTable() {
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<string | null>(null);
  const academicYearStore = useAcademicYearStore();

  const academicYear = useCustomReactQuery({
    queryKey: ["academicYear"],
    axiosFn: () => academicYearService.getAll(),
  });

  const taskProposalsQuery = useCustomReactQuery({
    queryKey: selectedAcademicYear === "all"
      ? ["proposalList", "all"]
      : ["proposalList", "academicYear", selectedAcademicYear],
    axiosFn: selectedAcademicYear === "all"
      ? () => taskProposalService.getTaskProposalFilter({})
      : () => taskProposalService.getTaskProposalFilter({
        academicYearId: parseInt(selectedAcademicYear || "0")
      }),
  });

  useEffect(() => {
    if (academicYearStore.state.academicYear?.id && !selectedAcademicYear) {
      setSelectedAcademicYear(academicYearStore.state.academicYear.id.toString());
    }
  }, [academicYearStore.state.academicYear?.id, selectedAcademicYear]);

  const academicYearSelectData = useMemo(() => {
    const data = academicYear.data?.map(item => ({
      value: item.id?.toString() ?? "",
      label: item.name ?? ""
    })) ?? [];

    // add "Tất cả" vào đầu danh sách
    return [
      { value: "all", label: "Tất cả" },
      ...data
    ];
  }, [academicYear.data]);

  const columns = useMemo<MRT_ColumnDef<SRMTaskProposal>[]>(() => [
    {
      header: "Mã đề xuất",
      accessorKey: "code",
    },
    {
      header: "Tên đề tài",
      accessorKey: "name",
      size: 300
    },
    {
      accessorKey: "file",
      header: 'File phiếu đề xuất',
      accessorFn: (row) => (
        <CustomCenterFull>
          <CustomButtonViewFileAPI filePath={row.attachmentPath} />
        </CustomCenterFull>
      )
    },
    {
      header: 'Lĩnh vực',
      accessorKey: 'srmArea.name'
    },
    {
      header: 'Mục tiêu',
      accessorKey: 'objective',
      size: 300
    },
    {
      header: "Tổng kinh phí dự kiến",
      accessorKey: "estimatedBudget",
      accessorFn: (row) => {
        return currencyUtils.formatWithSuffix(row.estimatedBudget ?? 0, "")
      }
    },
    {
      header: "Yêu cầu đối với kết quả",
      accessorKey: "requirement",
      size: 300
    },
    {
      header: "Loại đề tài",
      accessorKey: "srmType.name",
    },
    {
      header: "Kết quả chính",
      accessorKey: "result",
      size: 300
    },
    {
      header: "Phương án ứng dụng",
      accessorKey: "expectedOutput",
      size: 300
    },
    {
      header: "Thời gian thực hiện (tháng)",
      accessorKey: "duration",
    },
    {
      header: "Mã viên chức đăng ký",
      accessorKey: "user.code",
    },
    {
      header: "Tên viên chức đăng ký",
      accessorKey: "user.fullName",
    },
    {
      header: "Đơn vị đăng ký",
      accessorKey: "user.workingUnitName",
    },
    {
      header: "Kết luận của hội đồng",
      accessorKey: "srmConclusion.name",
      accessorFn: (row) => {
        return <Badge
          w="100%"
          variant="light"
          color={row.srmConclusion?.color || "gray"}
          radius="sm"
        >
          {row.srmConclusion?.name}
        </Badge>
      },
      size: 240,
    }
  ], []);

  return (
    <CustomFieldset
      title="Danh sách đề xuất"
    >
      <Grid mb="md">
        <Grid.Col span={3}>
          <CustomSelect
            label="Chọn năm kết xuất đề xuất"
            placeholder="Chọn năm học"
            data={academicYearSelectData}
            value={selectedAcademicYear}
            onChange={setSelectedAcademicYear}
          />
        </Grid.Col>
      </Grid>

      <CustomDataTable
        columns={columns}
        isLoading={taskProposalsQuery.isLoading}
        isError={taskProposalsQuery.isError}
        enableRowSelection={true}
        enableRowNumbers={true}
        data={taskProposalsQuery.data ?? []}
        initialState={{
          columnPinning: {
            right: ['proposalStatus'],
          },
        }}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <ProposalListExport
                data={table.getSelectedRowModel().rows.map(row => row.original).length > 0
                  ? table.getSelectedRowModel().rows.map(row => row.original)
                  : taskProposalsQuery.data || []}
              />
            </>
          )
        }}
      />
    </CustomFieldset>
  );
}