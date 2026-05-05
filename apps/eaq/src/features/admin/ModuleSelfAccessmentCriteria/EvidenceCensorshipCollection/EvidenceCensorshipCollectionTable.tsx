"use client";
import { CriteriaAssignmentStatusEnumColor, CriteriaAssignmentStatusEnumIcon, CriteriaAssignmentStatusEnumLabel } from "@/shared/constants/enum/CriteriaAssignmentStatusEnum";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Anchor, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import EvidenceCollectionCensorshipApprovalModal from "./EvidenceCensorshipCollectionApprovalModal";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

export default function EvidenceCollectionCensorshipTable() {
  const phaseStore = useS_Shared_Filter();

  const query = useCustomReactQuery({
    queryKey: ["CriteriaAssignmentRead", phaseStore.state.Phase?.id],
    axiosFn: async () =>
      service_EAQEvaluationPlan.GetEAQTaskDetailEvidencesByEAQPhaseId({
        eaqPhaseId: phaseStore.state.Phase?.id,
      }),
    options: {
      enabled: !!phaseStore.state.Phase?.id,
    }
  });

  const columns = useMemo<MRT_ColumnDef<ITaskDetailEvidence>[]>(
    () => [
      {
        header: "Mã kế hoạch TDG",
        accessorKey: "eaqTaskDetail.eaqTask.eaqEvaluationPlan.code",
        size: 180,
      },
      {
        header: "Chương trình đào tạo",
        accessorKey: "eaqTaskDetail.eaqTask.eaqEvaluationPlan.eaqPhase.eaqStandardSetTrainingProgram.name",
        size: 400,
      },
      {
        header: "Mã giai đoạn",
        accessorKey: "eaqTaskDetail.eaqTask.eaqEvaluationPlan.eaqPhase.code",
        size: 180,
      },
      {
        header: "Mã nhóm CT", accessorKey: "eaqTaskDetail.eaqTask.eaqCouncilGroup.code",
        size: 150,
      },
      { header: "Thành viên phụ trách", accessorKey: "eaqTaskDetail.user.fullName" },
      { header: "Mã Tiêu chuẩn", accessorKey: "eaqTaskDetail.eaqCriteria.eaqStandard.code", size: 100, },
      { header: "Mã Tiêu chí", accessorKey: "eaqTaskDetail.eaqCriteria.code", size: 100 },
      { header: "Mã MC Dự kiến", accessorKey: "eaqExpectedEvidenceCode", size: 100 },
      { header: "Tên MC Dự kiến", accessorKey: "eaqExpectedEvidenceName", size: 600 },
      { header: "Mã MC Thực tế", accessorKey: "eaqEvidence.code", size: 100 },
      { header: "Tên MC", accessorKey: "eaqEvidence.name" },
      {
        header: "Số - Ngày ban hành",
        accessorKey: "eaqExpectedEvidenceDate",
      },
      { header: "Đơn vị ban hành", accessorKey: "eaqExpectedEvidenceUnitRelease" },
      {
        header: "File đính kèm",
        accessorKey: "eaqEvidence.eaqEvidenceCurrentVersion.attachFilePath",
        accessorFn: (row) => {
          const filePath = row.eaqEvidence?.eaqEvidenceCurrentVersion?.attachFilePath;

          return (filePath?.length ?? 0 > 0) && (
            <CustomCenterFull>
              <CustomButtonViewFileAPI filePath={filePath!} />
            </CustomCenterFull>
          )
        }
      },
      {
        header: "Link liên kết",
        accessorKey: "eaqEvidence.eaqEvidenceCurrentVersion",
        accessorFn: (row) => {
          const link = row.eaqEvidence?.eaqEvidenceCurrentVersion?.link;

          return (link?.length ?? 0 > 0) && (
            <CustomCenterFull>
              <Anchor href={link} target="_blank">
                <Text truncate maw={200}>
                  {link}
                </Text>
              </Anchor>
            </CustomCenterFull>
          )
        }
      },
      { header: "Ghi chú", accessorKey: "eaqExpectedEvidenceNote", size: 400 },
      {
        header: "Trạng thái Kiểm duyệt MC",
        accessorKey: "verificationStatus",
        size: 230,
        accessorFn(row) {
          return <CustomEnumBadge
            value={row.verificationStatus ?? 1}
            enumLabel={CriteriaAssignmentStatusEnumLabel}
            enumColor={CriteriaAssignmentStatusEnumColor}
            enumIcon={CriteriaAssignmentStatusEnumIcon}
          />;
        },
      },
      {
        accessorKey: "review",
        header: "Nhận xét",
        size: 400
      },
    ],
    [query.data]
  );

  return (
    <CustomFieldset title="Danh sách minh chứng dự kiến">
      <CustomDataTable
        enableRowSelection
        enableRowNumbers
        isLoading={query.isLoading}
        isError={query.isError}
        columns={columns}
        data={query.data || []}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            ""
            // <Button
            //   leftSection={<IconTableExport />}
            //   color="teal"
            //   size="sm"
            //   radius="sm"
            //   onClick={() => {
            //     notifications.show({
            //       title: "Thông báo",
            //       message:
            //         "Chức năng này đang được phát triển, vui lòng quay lại sau.",
            //       color: "blue",
            //       autoClose: 5000,
            //     });
            //   }}
            // >
            //   Export
            // </Button>
            // <CustomButton actionType="export" />
          );
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <EvidenceCollectionCensorshipApprovalModal values={row.original} />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFieldset>
  );
}
