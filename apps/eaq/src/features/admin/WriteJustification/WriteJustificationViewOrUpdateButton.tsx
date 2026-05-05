import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { ISubmitEAQRequirementReport, service_EAQRequirement } from "@/shared/APIs/service_EAQRequirement";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Badge, Box, Skeleton, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconClockCheck, IconClockX, } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import ViewDetailResult from "./ViewDetailResult/ViewDetailResult";
import WriteJustificationResultsPresent, {
  WriteJustificationResultsPresentRef,
} from "./WriteJustificationResultsPresent";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import UsedEvidenceTable from "@/features/admin/WriteJustification/Components/UsedEvidenceTable";
import ViewOrUpdateButtonLayout from "@/features/admin/WriteJustification/Components/ViewOrUpdateButtonLayout";
import ViewOrUpdateRequirementLayout from "@/shared/components/ViewOrUpdateRequirementLayout";

interface Props {
  data?: IRequirement;
  viewOnly?: boolean;
  disabled?: boolean;
}

export default function WriteJustificationViewOrUpdateButton({
  data,
  viewOnly = false,
  disabled = false,
}: Props) {
  const dis = useDisclosure();
  const queryClient = useQueryClient();
  const filterStore = useS_Shared_Filter();
  const [evidenceIds, setEvidenceIds] = useState<number[]>([]);
  const presentComponentRef = useRef<WriteJustificationResultsPresentRef>(null);

  const isModalOpen = dis[0];
  const dataId = data?.id;

  const columns = useMemo<MRT_ColumnDef<IEvidence>[]>(
    () => [
      {
        header: "Mã minh chứng",
        accessorKey: "code",
      },
      {
        header: "Tên minh chứng",
        accessorKey: "name",
        size: columnSizeObject.name,
      },
      {
        header: "Trạng thái hiệu lực",
        accessorKey: "status",
        Cell: ({ row }) => {
          const effectiveTo =
            row.original.eaqEvidenceCurrentVersion?.expiredDate;
          const currentDate = new Date();
          const toDate = effectiveTo ? new Date(effectiveTo) : null;
          const isExpired = !toDate || currentDate > toDate;

          // if (!effectiveTo) return null;

          return (
            <Badge
              w="100%"
              h={25}
              leftSection={
                isExpired ? (
                  <IconClockX size={16} />
                ) : (
                  <IconClockCheck size={16} />
                )
              }
              variant="light"
              color={isExpired ? "red" : "green"}
              radius="md"
              fw={700}
            >
              {isExpired ? "Hết hạn" : "Còn hạn"}
            </Badge>
          );
        },
      },
      {
        header: "Đã sử dụng",
        accessorKey: "isUsed",
        accessorFn: () => (
          <CustomCenterFull>
            <CustomThemeIconSquareCheck checked={true} />
          </CustomCenterFull>
        ),
      },
    ],
    []
  );

  // Submit thêm dataa
  const mutationAdd = useMutation({
    mutationFn: (data: ISubmitEAQRequirementReport) => {
      return service_EAQRequirement.submitEAQRequirementReport(data);
    },
  });

  //Submit xóa minh chứng
  const mutationDelete = useMutation({
    mutationFn: (data: { id: number; isEnabled: boolean }[]) => {
      return service_EAQEvidence.deleteListEAQEvidenceUsageHistory(data);
    },
  });

  //Lấy tất cả minh chứng
  const evidenceAllQuery = useCustomReactQuery({
    queryKey: ["Evidence_List"],
    axiosFn: () => service_EAQEvidence.GetAllEvidences(),
    options: {
      enabled: isModalOpen,
    },
  });

  //Lấy minh chứng đã được lưu
  const evidenceViewQuery = useCustomReactQuery({
    queryKey: ["Evidence_usage_list", dataId],
    axiosFn: () =>
      service_EAQEvidence.getEvidenceUsageByEAQRequirementId({
        eaqRequirementId: dataId,
      }),
    options: {
      enabled: isModalOpen && !!dataId,
    },
  });

  const requirementDetailQuery = useCustomReactQuery({
    queryKey: ["requirementDetailQuery", dataId],
    axiosFn: () =>
      service_EAQRequirement.getEAQRequirementDetailsById({
        eaqRequirementId: dataId,
      }),
    options: {
      enabled: isModalOpen && !!dataId,
    },
  });

  //Lọc minh chứng
  const filteredEvidenceData = useMemo(() => {
    let baseData: IEvidence[] = [];

    if (viewOnly) {
      baseData = evidenceViewQuery.data ?? [];
    } else {
      const allEvidence = evidenceAllQuery.data ?? [];

      if (evidenceIds.length === 0) {
        baseData = [];
      } else {
        // Map qua evidenceIds để giữ nguyên thứ tự và số lượng (kể cả trùng)
        baseData = evidenceIds
          .map((id) => allEvidence.find((evidence) => evidence.id === id))
          .filter((evidence): evidence is IEvidence => evidence !== undefined);
      }
    }

    // Thêm index cho các minh chứng có cùng mã
    const codeCountMap = new Map<string, number>();

    return baseData.map((evidence) => {
      const code = evidence.code || "";
      const currentCount = (codeCountMap.get(code) || 0) + 1;
      codeCountMap.set(code, currentCount);

      return {
        ...evidence,
        index: currentCount,
      };
    });
  }, [evidenceAllQuery.data, evidenceViewQuery.data, evidenceIds, viewOnly]);

  const extractEvidenceIds = useCallback(
    (limitationReport?: string) => {
      if (!isModalOpen || !dataId) return;

      const report =
        limitationReport || presentComponentRef.current?.getRequirementReport();

      // Khi report rỗng hoặc không có minh chứng => xóa ngay danh sách minh chứng
      if (!report) {
        setEvidenceIds([]);
        return;
      }

      const extractedEvidenceIds = Array.from(
        report.matchAll(/evidenceId=(\d+)/g)
      ).map((match) => Number(match[1]));

      setEvidenceIds(extractedEvidenceIds);
    },
    [isModalOpen, dataId]
  );

  // Event-driven callback khi limitation report thay đổi
  const handleRequirementReportChange = useCallback(
    (report: string) => {
      extractEvidenceIds(report);
    },
    [extractEvidenceIds]
  );

  const handleSubmit = useCallback(
    async (submit?: boolean, saveEvidence?: boolean) => {
      const requirementReport =
        presentComponentRef.current?.getRequirementReport();
      const evidenceSave = evidenceViewQuery.data?.map((evidence) => ({
        id: evidence.id ?? 0,
        isEnabled: true,
      }));

      await mutationDelete.mutateAsync(evidenceSave ?? []);

      await mutationAdd.mutateAsync({
        eaqRequirementId: dataId,
        requirementReport,
        EAQEvidenceIds: evidenceIds,
        ReportStatus: submit ? 1 : undefined,
      });

      notifications.show({
        message: submit ? "Nộp thành công" : "Lưu thành công",
        color: "green",
        autoClose: 5000,
      });

      if (!saveEvidence) {
        dis[1].close();
      }

      queryClient.invalidateQueries({
        queryKey: ["requirementQuery", filterStore.state.Phase?.id],
      });
      // Invalidate chi tiết hạn chế để cập nhật dữ liệu
      queryClient.invalidateQueries({
        queryKey: ["requirementDetailQuery", dataId],
      });
    },
    [
      mutationAdd,
      mutationDelete,
      dataId,
      evidenceIds,
      dis,
      queryClient,
      filterStore.state.Phase?.id,
      evidenceViewQuery.data
    ]
  );

  // Extract evidence IDs ngay khi modal mở (thay thế setTimeout)
  useLayoutEffect(() => {
    if (!isModalOpen || !dataId) return;

    // Sử dụng requestAnimationFrame để đảm bảo DOM đã được render
    const frameId = requestAnimationFrame(() => {
      extractEvidenceIds();
    });

    return () => cancelAnimationFrame(frameId);
  }, [isModalOpen, dataId, extractEvidenceIds]);

  // Nút xóa minh chứng
  const handleDeleteEvidence = useCallback(
    (evidenceId: number, index: number) => {
      // Xóa evidenceId khỏi array
      setEvidenceIds(evidenceIds.filter((_, i) => i !== index));

      // Cập nhật lại limitationReport để loại bỏ link tương ứng
      const currentReport =
        presentComponentRef.current?.getRequirementReport() || "";

      // Tìm tất cả các link chứa evidenceId trong report
      const linkPattern =
        /<A[^>]*href="[^"]*evidenceId=(\d+)[^"]*"[^>]*>\[([^\]]+)\]\s*(?:\((\d+)\))?<\/A>/gi;
      const matches = Array.from(currentReport.matchAll(linkPattern));

      // Tìm link thứ index cần xóa (dựa vào thứ tự xuất hiện trong evidenceIds)
      let currentIndex = 0;
      let linkToRemove: string | null = null;

      for (const match of matches) {
        const matchedEvidenceId = Number(match[1]);
        // Kiểm tra nếu evidenceId khớp với evidenceIds ở vị trí currentIndex
        if (
          currentIndex < evidenceIds.length &&
          matchedEvidenceId === evidenceIds[currentIndex]
        ) {
          if (currentIndex === index) {
            linkToRemove = match[0]; // Lưu link cần xóa
            break;
          }
          currentIndex++;
        }
      }

      // Xóa link khỏi report nếu tìm thấy
      if (linkToRemove) {
        const updatedReport = currentReport.replace(linkToRemove, "");
        presentComponentRef.current?.setRequirementReport(updatedReport);
      }
    },
    [evidenceIds, evidenceViewQuery.data]
  );

  return (
    <CustomButtonModal
      disclosure={dis}
      isActionIcon={true}
      actionIconProps={{
        actionType: viewOnly ? "view" : "update",
        toolTipProps: viewOnly
          ? { label: "Xem chi tiết" }
          : { label: "Cập nhật" },
        disabled: disabled,
      }}
      modalProps={{
        size: "90%",
        title: "Chi tiết báo cáo",
      }}
    >
      <Stack gap="md" style={{ height: "80vh" }}>
        {/* Content Area */}
        <ViewOrUpdateRequirementLayout data={data} />
        <Box
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Stack gap="lg">
            <ViewDetailResult data={requirementDetailQuery?.data} />
            {requirementDetailQuery.isLoading ? (
              <Skeleton height={500} width={"100%"} />
            ) : (
              <WriteJustificationResultsPresent
                ref={presentComponentRef}
                data={requirementDetailQuery?.data}
                eaqRequirementId={dataId}
                viewOnly={viewOnly}
                onRequirementReportChange={handleRequirementReportChange}
                isLoading={mutationAdd.isPending || mutationDelete.isPending}
              />
            )}

            <UsedEvidenceTable
              columns={columns}
              evidenceAllQuery={evidenceAllQuery}
              filteredEvidenceData={filteredEvidenceData}
              handleDeleteEvidence={handleDeleteEvidence}
              handleSubmit={handleSubmit}
              mutationAdd={mutationAdd}
              mutationDelete={mutationDelete}
              presentComponentRef={presentComponentRef}
              viewOnly={viewOnly}
            />
          </Stack>
        </Box>

        {/* Sticky Button Area */}
        {!viewOnly && (
          <ViewOrUpdateButtonLayout
            handleSubmit={handleSubmit}
            mutationAdd={mutationAdd}
            mutationDelete={mutationDelete}
            presentComponentRef={presentComponentRef}
          />
        )}
      </Stack>
    </CustomButtonModal >
  );
}
