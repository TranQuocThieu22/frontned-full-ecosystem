import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { service_EAQEvidenceVersion } from "@/shared/APIs/service_EAQEvidenceVersion";
import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import { Badge, Box, Grid, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconClockCheck, IconClockX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ViewDetailResult from "./ViewDetailResult/ViewDetailResult";
import ViewDetailResultTableEvidenceDetail from "./ViewDetailResult/ViewDetailResultTableEvidenceDetail";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export default function TrackingMidCycleImprovementReportViewDetail({
  data,
}: {
  data: ILimitation;
}) {
  const dis = useDisclosure();
  const editorRef = useRef<HTMLDivElement>(null);
  const htmlTag = "A";
  const folderPath = "minhchung";
  const idName = "evidenceId";
  const [pathFile, setPathFile] = useState<string>("");
  const discViewFile = useDisclosure();

  const evidenceUsageQuery = useCustomReactQuery({
    queryKey: ["evidenceUsageQuery", data.id],
    axiosFn: async () =>
      service_EAQEvidence.getEvidenceUsageByEAQLimitationId({
        eaqLimitationId: data.id,
      }),
    options: { enabled: dis[0] },
  });

  const limitationDetailQuery = useCustomReactQuery({
    queryKey: ["limitationDetailQuery"],
    axiosFn: async () =>
      service_EAQLimitation.getEAQLimitationDetailsById({
        eaqLimitationId: data.id,
      }),
    options: { enabled: dis[0] },
  });

  const [value, setValue] = useState<string>(limitationDetailQuery.data?.limitationReport ?? "");
  useEffect(() => {
    setValue(limitationDetailQuery.data?.limitationReport ?? "");
  }, [limitationDetailQuery.data?.limitationReport]);

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
          const effectiveTo = row.original.eaqEvidenceCurrentVersion?.expiredDate;
          const currentDate = new Date();
          const toDate = effectiveTo ? new Date(effectiveTo) : null;
          const isExpired = !toDate || currentDate > toDate;

          if (!effectiveTo) return null;

          return (
            <Badge
              w="100%"
              h={25}
              leftSection={isExpired ? <IconClockX size={16} /> : <IconClockCheck size={16} />}
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
        accessorFn: (row) => {
          return (
            <CustomCenterFull>
              <CustomThemeIconSquareCheck checked={true} />
            </CustomCenterFull>
          );
        },
      },
    ],
    []
  );

  const mutionGetEvidenceVersion = useMutation({
    mutationFn: async (id: number): Promise<IEnvidenceVersion[]> => {
      const response = await service_EAQEvidenceVersion.getEAQEvidenceVersionByEAQEvidenceId({
        evidenceId: id,
      });
      return response.data.data;
    },
    onSuccess: () => { },
  });

  const parseHrefParams = useCallback((href: string) => {
    try {
      const url = new URL(href, window.location.origin);
      return {
        evidenceId: url.searchParams.get(idName),
        code: url.searchParams.get("code"),
        pathFile: href.split("?")[0]?.split(`/${folderPath}/`)[1],
      };
    } catch {
      return { evidenceId: null, code: null, pathFile: null };
    }
  }, []);

  const handleLinkClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.tagName !== htmlTag) return;

      event.preventDefault();

      const linkElement = target as HTMLAnchorElement;
      const href = linkElement.getAttribute("href");

      if (!href || !href.startsWith(`/${folderPath}/`)) return;

      const { evidenceId } = parseHrefParams(href);

      if (!evidenceId) {
        notifications.show({
          message: "Không tìm thấy file minh chứng",
          color: "red",
        });
        return;
      }

      if (evidenceId) {
        mutionGetEvidenceVersion.mutate(Number(evidenceId), {
          onSuccess: (evidenceVersion) => {
            if (!evidenceVersion) {
              notifications.show({
                message: "Không tìm thấy file minh chứng",
                color: "red",
              });
              return;
            }
            evidenceVersion.forEach((item) => {
              if (item.isCurrent) {
                setPathFile(item.attachFilePath ?? "");
                discViewFile[1].open();
              }
            });
          },
          onError: () => {
            notifications.show({
              message: "Không tìm thấy file minh chứng",
              color: "red",
            });
          },
        });
      }
    },
    [discViewFile, parseHrefParams, mutionGetEvidenceVersion]
  );

  useEffect(() => {
    const editorElement = editorRef.current || document.querySelector(".ProseMirror");

    if (!editorElement) return;

    editorElement.addEventListener("click", handleLinkClick);
    return () => editorElement.removeEventListener("click", handleLinkClick);
  }, [handleLinkClick]);

  const renderViewOnlyContent = () => (
    <Box h={360} p="6" bdrs="xs" style={{ overflow: "auto", border: "1px solid #ccc" }}>
      <Box ref={editorRef} className="html-content">
        <CustomHtmlWrapper html={value} />
      </Box>
    </Box>
  );

  return (
    <CustomButtonModal
      disclosure={dis}
      isActionIcon={true}
      actionIconProps={{
        actionType: "view",
        toolTipProps: { label: "Xem chi tiết" },
      }}
      modalProps={{
        size: "90%",
        title: "Chi tiết Phiếu tự đánh giá",
      }}
    >
      <Grid style={{ minHeight: "75vh", position: "relative" }}>
        <Group gap={2} my={6} mx={8}>
          <Text span fw={500}>
            Hạn chế: <Text span>{data.name}</Text>
          </Text>
        </Group>
        <Grid.Col span={12}>
          <ViewDetailResult data={limitationDetailQuery.data || {}} />
          <CustomFieldset title="Nội dung báo cáo cải tiến hiện tại">
            <CustomButtonViewFileAPI
              filePath={pathFile}
              externalDisc={discViewFile}
              buttonProps={{ hidden: true }}
            />
            {renderViewOnlyContent()}
          </CustomFieldset>
          <CustomFieldset title="Danh sách minh chứng sử dụng">
            <CustomDataTable
              columns={columns}
              data={evidenceUsageQuery.data || []}
              isLoading={evidenceUsageQuery.isLoading}
              isError={evidenceUsageQuery.isError}
              renderRowActions={({ row }) => {
                return (
                  <CustomCenterFull>
                    <ViewDetailResultTableEvidenceDetail
                      evidenceId={row.original.eaqEvidenceCurrentVersion?.eaqEvidenceId!}
                      evidenceCode={row.original.code!}
                      evidenceName={row.original.name!}
                    />
                  </CustomCenterFull>
                );
              }}
            />
          </CustomFieldset>
        </Grid.Col>
      </Grid>
    </CustomButtonModal>
  );
}
