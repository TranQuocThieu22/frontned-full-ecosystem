"use client";

import { taskProposalService } from "@/shared/APIs/taskProposalService";
import { EnumIconProposalStatus, EnumProposalStatusColors, EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ScientificTaskProposalExport from "./ScientificTaskProposalExport";

export default function ScientificTaskProposalTable() {

  const academicYearStore = useAcademicYearStore()

  const taskProposal = useCustomReactQuery({
    queryKey: ['taskProposal', academicYearStore.state.academicYear?.id],
    axiosFn: () => taskProposalService.getTaskProposalFilter({
      academicYearId: academicYearStore.state.academicYear?.id ?? 0,
    }),
    options: {
      enabled: !!academicYearStore.state.academicYear?.id
    }
  })

  const columns = useMemo<MRT_ColumnDef<SRMTaskProposal>[]>(() => [
    {
      header: "Mã đề xuất",
      accessorKey: "code",
    },
    {
      header: "Tên đề tài",
      accessorKey: "name",
      size: 260
    },
    {
      header: 'Lĩnh vực',
      accessorKey: 'srmArea.name'
    },
    {
      header: "Mục tiêu",
      accessorKey: "objective",
      size: 300
    },
    {
      header: "Tổng chi phí dự kiến",
      accessorKey: "estimatedBudget",
      accessorFn: (row) => {
        return currencyUtils.formatWithSuffix(row.estimatedBudget ?? 0, "")
      }
    },
    {
      header: "Kết quả chính",
      accessorKey: "result",
    },
    {
      header: "Phương án ứng dụng",
      accessorKey: "expectedOutput",
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
      header: "Loại đề tài",
      accessorKey: "srmType.name",
    },
    {
      header: "Trạng thái đề xuất",
      accessorKey: "proposalStatus",
      size: 240,
      accessorFn(originalRow) {
        return (
          <CustomEnumBadge
            value={originalRow.proposalStatus}
            enumLabel={EnumProposalStatusLabels}
            enumColor={EnumProposalStatusColors}
            enumIcon={EnumIconProposalStatus}
          />
        )
      },
    }
  ], []);

  return (
    <CustomFieldset
      title="Danh sách đề xuất"
    >
      <CustomDataTable
        columns={columns}
        enableRowSelection={true}
        isLoading={taskProposal.isLoading}
        isError={taskProposal.isError}
        initialState={{
          columnPinning: {
            right: ['proposalStatus'],
          },
        }}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <ScientificTaskProposalExport
                table={table}
              />
            </>
          )
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <CustomButtonViewFileAPI filePath={row.original.attachmentPath} />
            </CustomCenterFull>
          )
        }}
        data={taskProposal.data || []}
      />
    </CustomFieldset>
  );
}