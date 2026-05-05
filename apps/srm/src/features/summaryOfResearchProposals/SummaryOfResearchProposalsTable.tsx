"use client";

import { taskProposalService } from "@/shared/APIs/taskProposalService";
import { EnumIconProposalStatus, EnumProposalStatusColors, EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import { EnumTaskProposalType } from "@/shared/consts/enum/EnumTaskProposalType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { useMemo } from "react";
import SummaryOfResearchProposalsDetail from "./SummaryOfResearchProposalsDetail";
import SummaryOfResearchProposalsExport from "./SummaryOfResearchProposalsExport";

export default function SummaryOfResearchProposalsTable() {

  const academicYearStore = useAcademicYearStore();

  const TaskProposalQuery = useCustomReactQuery({
    queryKey: [
      "SummaryOfResearchProposalsQuery",
      academicYearStore.state.academicYear?.id,
    ],
    axiosFn: () => taskProposalService.getAllByAcademicYear({
      academicYearId: academicYearStore.state.academicYear?.id!,
      type: EnumTaskProposalType.StudentProposal
    }),
  });

  const columns = useMemo<CustomColumnDef<SRMTaskProposal>[]>(() => [
    {
      header: "Mã đề xuất",
      accessorKey: "code",
    },
    {
      header: "Tên đề tài",
      accessorKey: "name",
      size: columnSizeObject.name
    },
    {
      header: 'Lĩnh vực',
      accessorKey: 'srmArea.name'
    },
    {
      header: "Mục tiêu",
      accessorKey: "objective",
      size: columnSizeObject.description
    },
    {
      header: "Tổng kinh phí dự kiến",
      accessorKey: "estimatedBudget",
      accessorFn: (row) => {
        return currencyUtils.formatWithSuffix(row.estimatedBudget ?? 0, '')
      }
    },
    {
      header: "Kết quả chính",
      accessorKey: "result",
      size: columnSizeObject.description
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
      header: "Mã sinh viên đăng ký",
      accessorKey: "user.code",
    },
    {
      header: "Họ tên sinh viên đăng ký",
      accessorKey: "user.fullName",
    },
    {
      header: "Mã khoa",
      accessorKey: "user.faculty.code",
    },
    {
      header: "Trạng thái đề xuất",
      accessorKey: "proposalStatus",
      size: 250,
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
    },
    {
      accessorKey: "attachmentPath",
      header: 'File phiếu đề xuất',
      type: 'viewFile',
    },
  ], []);

  return (
    <CustomFieldset
      title="Danh sách đề xuất"
    >
      <CustomDataTable
        columns={columns}
        enableRowSelection={true}
        isLoading={TaskProposalQuery.isLoading}
        isError={TaskProposalQuery.isError}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <SummaryOfResearchProposalsExport table={table} />
          )
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <SummaryOfResearchProposalsDetail values={row.original} />
            </CustomCenterFull>
          )
        }}
        data={TaskProposalQuery.data ?? []}
      />
    </CustomFieldset>
  );
}