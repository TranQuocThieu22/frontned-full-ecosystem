import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { ISubmitEAQLimitationReport, service_EAQLimitation, } from "@/shared/APIs/service_EAQLimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Badge, Box, Grid, Group, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconClockCheck, IconClockX, IconDeviceFloppy, } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import SummaryMidCycleImprovementResultsPresent, {
  SummaryMidCycleImprovementResultsPresentRef,
} from "./SummaryMidCycleImprovementResultsPresent";
import ViewDetailResult from "./ViewDetailResult/ViewDetailResult";
import ViewDetailResultTableEvidenceDetail from "./shared/ViewDetailEvidence";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";

interface Props {
  data?: ILimitation;
  viewOnly?: boolean;
  disabled?: boolean
}

export default function SummaryMidCycleImprovementResultsViewOrUpdate({
  data,
  viewOnly = false,
  disabled
}: Props) {
  const dis = useDisclosure();
  const queryClient = useQueryClient();
  const filterStore = useS_Shared_Filter();
  const [evidenceIds, setEvidenceIds] = useState<number[]>([]);
  const presentComponentRef =
    useRef<SummaryMidCycleImprovementResultsPresentRef>(null);

  const isModalOpen = dis[0];
  const dataId = data?.id;

  const columns = useMemo<MRT_ColumnDef<IEvidence>[]>(
    () => [
      {
        header: "Mã minh chứng",
        accessorKey: "code",
      },
      // {
      //   header: "Thứ tự",
      //   accessorKey: "index",
      // },
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
    mutationFn: (data: ISubmitEAQLimitationReport) => {
      return service_EAQLimitation.submitEAQLimitationReport(data);
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
      service_EAQEvidence.getEvidenceUsageByEAQLimitationId({
        eaqLimitationId: dataId,
      }),
    options: {
      enabled: isModalOpen && !!dataId,
    },
  });

  //Chi tiết hạn chế này
  const limitationsDetailQuery = useCustomReactQuery({
    queryKey: ["limitationsDetailQuery", dataId],
    axiosFn: () =>
      service_EAQLimitation.getEAQLimitationDetailsById({
        eaqLimitationId: dataId,
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
        limitationReport || presentComponentRef.current?.getLimitationReport();

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
  const handleLimitationReportChange = useCallback(
    (report: string) => {
      extractEvidenceIds(report);
    },
    [extractEvidenceIds]
  );

  const handleSubmit = useCallback(
    async (submit?: boolean, saveEvidence?: boolean) => {
      const limitationReport =
        presentComponentRef.current?.getLimitationReport();
      const evidenceSave = evidenceViewQuery.data?.map((evidence) => ({
        id: evidence.id ?? 0,
        isEnabled: true,
      }));

      await mutationDelete.mutateAsync(evidenceSave ?? []);

      await mutationAdd.mutateAsync({
        eaqLimitationId: dataId,
        limitationReport,
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
        queryKey: ["limitationQuery", filterStore.state.Phase?.id],
      });
      // Invalidate chi tiết hạn chế để cập nhật dữ liệu
      queryClient.invalidateQueries({
        queryKey: ["limitationsDetailQuery", dataId],
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
        presentComponentRef.current?.getLimitationReport() || "";

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
        presentComponentRef.current?.setLimitationReport(updatedReport);
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
        disabled: disabled,
        toolTipProps: viewOnly
          ? { label: "Xem chi tiết" }
          : { label: "Cập nhật" },
      }}
      modalProps={{
        size: "90%",
        title: "Chi tiết báo cáo",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          position: "relative",
        }}
      >
        {/* Content Area */}
        <Box
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            paddingBottom: "10px",
          }}
        >
          <Group gap={2} mb="md" mt={6}>
            <Text span fw={500}>
              Hạn chế: <Text span>{data?.name}</Text>
            </Text>
          </Group>

          <Grid>
            <Grid.Col span={12}>
              <ViewDetailResult data={limitationsDetailQuery?.data} />

              {limitationsDetailQuery.isLoading ? (
                <Skeleton height={500} width={"100%"} />
              ) : (
                <SummaryMidCycleImprovementResultsPresent
                  ref={presentComponentRef}
                  data={limitationsDetailQuery?.data}
                  eaqLimitationId={dataId}
                  viewOnly={viewOnly}
                  onLimitationReportChange={handleLimitationReportChange}
                  isLoading={mutationAdd.isPending || mutationDelete.isPending}
                />
              )}

              <CustomFieldset title="Danh sách minh chứng sử dụng">
                <CustomDataTable
                  columns={columns}
                  data={filteredEvidenceData ?? []}
                  enableRowNumbers={false}
                  isLoading={
                    evidenceAllQuery.isLoading ||
                    mutationAdd.isPending ||
                    mutationDelete.isPending
                  }
                  isError={evidenceAllQuery.isError}
                  renderTopToolbarCustomActions={() => {
                    if (viewOnly) return null;
                    return (
                      <CustomButton
                        actionType="save"
                        loading={
                          mutationAdd.isPending || mutationDelete.isPending
                        }
                        onClick={async () => {
                          await presentComponentRef.current?.handleSaveReport();
                          await handleSubmit(false, true);
                        }}
                      />
                    );
                  }}
                  renderRowActions={({ row, table }) => {
                    return (
                      <CustomCenterFull>
                        <ViewDetailResultTableEvidenceDetail
                          evidence={row.original}
                          evidenceId={
                            row.original.eaqEvidenceCurrentVersion
                              ?.eaqEvidenceId!
                          }
                        />
                        {!viewOnly && (
                          <CustomActionIcon
                            actionType="delete"
                            onClick={() =>
                              handleDeleteEvidence(
                                row.original.id ?? 0,
                                row.index
                              )
                            }
                          />
                        )}
                      </CustomCenterFull>
                    );
                  }}
                />
              </CustomFieldset>
            </Grid.Col>
          </Grid>
        </Box>

        {/* Sticky Button Area */}
        {!viewOnly && (
          <Box
            style={{
              borderTop: "1px solid #e9ecef",
              paddingTop: "12px",
              backgroundColor: "white",
              flexShrink: 0,
            }}
          >
            <Group gap={4} justify="flex-end">
              <CustomButton
                color="yellow"
                leftSection={<IconDeviceFloppy />}
                onClick={async () => {
                  await presentComponentRef.current?.handleSaveReport();
                  await handleSubmit(true, false);
                }}
                w={150}
                loading={mutationAdd.isPending || mutationDelete.isPending}
              >
                Nộp
              </CustomButton>

              <CustomButton
                loading={mutationAdd.isPending || mutationDelete.isPending}
                actionType="save"
                onClick={async () => {
                  await presentComponentRef.current?.handleSaveReport();
                  await handleSubmit(false, false);
                }}
                w={150}
              />
            </Group>
          </Box>
        )}
      </Box>
    </CustomButtonModal>
  );
}
