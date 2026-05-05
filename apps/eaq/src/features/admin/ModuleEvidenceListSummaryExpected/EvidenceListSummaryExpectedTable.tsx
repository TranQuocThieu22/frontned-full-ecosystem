"use client";

import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

export default function EvidenceListSummaryExpectedTable() {
  const phaseStore = useS_Shared_Filter();

  const EvidenceExpected_GetAll = useCustomReactQuery({
    queryKey: [
      "EvidenceListSummaryExpectedTable_GetEAQTaskDetailEvidencesByEAQPhaseId",
      phaseStore.state.Phase?.id,
    ],
    axiosFn: () =>
      service_EAQEvaluationPlan.GetEAQTaskDetailEvidencesByEAQPhaseId({
        eaqPhaseId: phaseStore.state.Phase?.id,
      }),
  });

  const columns = useMemo<MRT_ColumnDef<ITaskDetailEvidence>[]>(
    () => [
      {
        header: "Mã kế hoạch TDG",
        accessorKey: "eaqTaskDetail.eaqTask.eaqEvaluationPlan.code",
      },
      {
        header: "Chương trình đào tạo",
        accessorKey:
          "eaqTaskDetail.eaqTask.eaqEvaluationPlan.eaqPhase.eaqStandardSetTrainingProgram.name",
        size: 400,
      },
      {
        header: "Mã giai đoạn",
        accessorKey:
          "eaqTaskDetail.eaqTask.eaqEvaluationPlan.eaqPhase.code",
      },
      {
        header: "Mã nhóm CT",
        accessorKey: "eaqTaskDetail.eaqTask.eaqCouncilGroup.code",
      },
      {
        header: "Mã Tiêu chuẩn",
        accessorKey: "eaqTaskDetail.eaqCriteria.eaqStandard.code",
      },
      { header: "Mã Tiêu chí", accessorKey: "eaqTaskDetail.eaqCriteria.code" },
      {
        header: "Tên Tiêu chí",
        accessorKey: "eaqTaskDetail.eaqCriteria.name",
        size: 600,
      },
      { header: "Mã MC dự kiến", accessorKey: "eaqExpectedEvidenceCode" },
      {
        header: "Tên MC dự kiến",
        accessorKey: "eaqExpectedEvidenceName",
        size: 600,
      },
      {
        header: "Số - Ngày ban hành (dự kiến)",
        accessorKey: "eaqExpectedEvidenceDate",
        size: 400,
      },
      {
        header: "Đơn vị ban hành (dự kiến)",
        accessorKey: "eaqExpectedEvidenceUnitRelease",
      },
      {
        header: "Thành viên phụ trách",
        accessorKey: "eaqTaskDetail.user.fullName",
      },

      {
        header: "Ngày bắt đầu nhiệm vụ",
        id: "startDate",
        accessorFn: (row) =>
          row.eaqTaskDetail?.startDate
            ? dateUtils.toDDMMYYYY(
              new Date(row.eaqTaskDetail.startDate)
            )
            : "",
      },
      {
        header: "Ngày kết thúc nhiệm vụ",
        id: "endDate",
        accessorFn: (row) =>
          row.eaqTaskDetail?.endDate
            ? dateUtils.toDDMMYYYY(
              new Date(row.eaqTaskDetail.endDate)
            )
            : "",
      },
      {
        header: "Người cập nhật", accessorKey: "modifiedFullName",
      },
      {
        header: "Ngày cập nhật", accessorKey: "modifiedWhen",
        accessorFn: row => row.modifiedWhen ? dateUtils.toDDMMYYYY(new Date(row.modifiedWhen)) : "",
      }
    ],
    []
  );

  return (
    <CustomFieldset title={"Danh sách phân công tiêu chí"}>
      <CustomFlexColumn>
        <CustomDataTable
          isLoading={EvidenceExpected_GetAll.isLoading}
          isError={EvidenceExpected_GetAll.isError}
          enableRowSelection={true}
          enableRowNumbers={true}
          renderTopToolbarCustomActions={({ table }) => (
            <Group>
              {/* <CustomButton actionType="export" /> */}

              {/* <CustomButton
                leftSection={<IconTableExport />}
                color="teal"
                size="sm"
                radius="sm"
                onClick={() => {
                  notifications.show({
                    title: "Thông báo",
                    message:
                      "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                    color: "blue",
                    autoClose: 5000,
                  });
                }}
              >
                Export
              </CustomButton> */}
            </Group>
          )}
          columns={columns}
          data={EvidenceExpected_GetAll.data ?? []}
        />
      </CustomFlexColumn>
    </CustomFieldset>
  );
}
