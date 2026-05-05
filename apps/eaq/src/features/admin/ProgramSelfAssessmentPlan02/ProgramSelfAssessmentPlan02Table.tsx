import { IEvaluationPlan } from "@/shared/interfaces/evaluationPlan/IEvaluationPlan";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { UseFormReturnType } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ProgramSelfAssessmentCreateOrUpdate from "./ProgramSelfAssessmentPlan02CreateOrUpdate";
import ProgramSelfAssessmentDelete from "./ProgramSelfAssessmentPlan02Delete";
import ProgramSelfAssessmentDeleteList from "./ProgramSelfAssessmentPlan02DeleteList";
import ProgramSelfAssessmentPlan02Export from "./ProgramSelfAssessmentPlan02Export";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export default function ProgramSelfAssessmentPlan02Table() {
  const queryClient = useQueryClient();
  const store = useS_Shared_Filter();

  const selfAssessmentPlanQuery = useCustomReactQuery({
    queryKey: [
      "selfAssessmentPlanQuery_GetByStandardSetId",
      store.state.Phase?.id,
    ],
    axiosFn: () =>
      service_EAQEvaluationPlan.GetEAQEvaluationPlansByEAQPhaseId(
        { eaqPhaseId: store.state.Phase?.id }
      ),
    options: {
      enabled: store.state.Phase?.id !== undefined
    }
  })

  const columns = useMemo<MRT_ColumnDef<IEvaluationPlan>[]>(() => [
    {
      header: "Mã Kế hoạch",
      accessorKey: "code"
    },
    {
      header: "Tên Kế hoạch",
      accessorKey: "name",
      size: 500
    },
    {
      header: "Chương trình Đào tạo áp dụng",
      accessorFn: row => row?.eaqPhase?.eaqStandardSetTrainingProgram?.code ?? '',
      id: "trainingProgram"
    },
    {
      header: "Mã giai đoạn",
      id: "eaqPhase",
      accessorFn: row => row.eaqPhase?.code ?? "",
    },
    {
      header: "Bộ Tiêu chuẩn áp dụng",
      id: "standardSet",
      accessorFn: row => row?.eaqPhase?.eaqStandardSetTrainingProgram?.eaqStandardSet?.code ?? '',
      size: 250
    },
    {
      header: "Phiên bản Bộ Tiêu chuẩn",
      id: "standardSetVersion",
      accessorFn: row => row?.eaqPhase?.eaqStandardSetTrainingProgram?.eaqStandardSet?.version ?? '',
    },
    {
      header: "Mục tiêu tự đánh giá",
      accessorKey: "assessmentObjective",
      size: 600
    },
    {
      header: "Phạm vi tự đánh giá",
      accessorKey: "evaluationScope",
      size: 600
    },
    {
      header: "Ngày Bắt đầu",
      accessorFn: row => row.startDate ? dateUtils.toDDMMYYYY(row.startDate) : "",
      id: "startDate"
    },
    {
      header: "Ngày Kết thúc",
      accessorFn: row => row.endDate ? dateUtils.toDDMMYYYY(row.endDate) : "",
      id: "endDate"
    },
    {
      header: "Người ký",
      accessorKey: "signer"
    },
    {
      header: "File Kế hoạch",
      Cell: ({ row }) => {
        if (row.original.attachmentPath) {
          return (<CustomButtonViewFileAPI filePath={row.original.attachmentPath} />)
        }
      },
      id: "attachmentPath"
    },
    {
      header: "Quyết định Thành lập Hội đồng",
      id: "AssessmentCouncilDecision",
      accessorFn: row => row.eaqAssessmentCouncilDecision?.code ?? "",
    },
  ], [selfAssessmentPlanQuery]);

  async function handleCreateMainForm(data: IEvaluationPlan, mainForm?: UseFormReturnType<IEvaluationPlan>) {

    await service_EAQEvaluationPlan.create(data).then((res) => {
      if (res.data.isSuccess === 1) {
        queryClient.invalidateQueries({ queryKey: ["selfAssessmentPlanQuery_GetByStandardSetId"] });
        // setevaluationPlan([...evaluationPlan, res.menuData.menuData]);
        mainForm?.reset();
        mainForm?.clearErrors();
      } else {
        utils_notification_show({
          crudType: "error", message: "Có lỗi xảy ra, vui lòng thử lại!!"
        });
        return res;
      }
    });

  }

  // Sửa
  async function handleUpdateMainForm(data: IEvaluationPlan, mainForm?: UseFormReturnType<IEvaluationPlan>) {
    const { eaqAssessmentCouncilDecision, ...payload } = data
    await service_EAQEvaluationPlan.update(payload).then((res) => {
      if (res.data.isSuccess === 1) {
        utils_notification_show({
          crudType: "update", message: "Cập nhật thành công!!"
        });
        queryClient.invalidateQueries({ queryKey: ["selfAssessmentPlanQuery_GetByStandardSetId"] });
        // setevaluationPlan(evaluationPlan.map(item => item.id === menuData.id ? res.menuData.menuData : item));
        mainForm?.reset();
        mainForm?.clearErrors();
      } else {
        utils_notification_show({
          crudType: "error", message: "Có lỗi xảy ra, vui lòng thử lại!!"
        });
        return res;
      }
    });

  }

  return (
    <CustomFieldset title={"Danh sách kế hoạch tự đánh giá"}>
      <CustomDataTable
        isError={selfAssessmentPlanQuery.isError}
        isLoading={selfAssessmentPlanQuery.isLoading}
        columns={columns}
        data={selfAssessmentPlanQuery.data || []}
        enableRowSelection
        enableColumnFilters
        enableRowNumbers
        renderTopToolbarCustomActions={({ table }) => (
          <>
            <ProgramSelfAssessmentCreateOrUpdate
              onSubmit={handleCreateMainForm}
              loading={selfAssessmentPlanQuery.isFetching}
            />
            {/* <ProgramSelfAssessmentPlan02Import loading={selfAssessmentPlanQuery.isFetching}/> */}
            <ProgramSelfAssessmentPlan02Export table={table} isLoading={selfAssessmentPlanQuery.isFetching} />
            <ProgramSelfAssessmentDeleteList
              table={table}
              loading={selfAssessmentPlanQuery.isFetching}
            />
          </>
        )}
        renderRowActions={({ row }) => (
          <CustomCenterFull>
            <ProgramSelfAssessmentCreateOrUpdate
              data={row.original}
              onSubmit={handleUpdateMainForm}
              loading={selfAssessmentPlanQuery.isFetching}
              viewOnly={true}
            />
            <ProgramSelfAssessmentCreateOrUpdate
              data={row.original}
              onSubmit={handleUpdateMainForm}
              loading={selfAssessmentPlanQuery.isFetching}
            />
            <ProgramSelfAssessmentDelete
              data={row.original}
              loading={selfAssessmentPlanQuery.isFetching}
            />

          </CustomCenterFull>
        )}
      />
    </CustomFieldset>
  )
}
