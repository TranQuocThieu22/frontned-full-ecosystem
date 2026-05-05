import { IEvidenceUsageHistories } from "@/shared/interfaces/selfAssessment/IEvidenceUsageHistories";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { Accordion, Badge, Box, Flex, Group, Text } from "@mantine/core";
import { IconClockCheck, IconClockX } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { StatusRow } from "../components/StatusRow";
import MyCustomTitleGroup from "../Shared/MyCustomTitleGroup";
import Form04CurrentSituationDetail from "./Form04CurrentSituationDetail";
import { useEvidenceClickHandler } from "./hooks/useEvidenceClickHandler";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export default function Form04CurrentSituationRowHistory({
  data,
}: {
  data?: ISelfAssessment;
}) {
  const { editorRef, pathFile, discViewFile } = useEvidenceClickHandler();

  const columns = useMemo<MRT_ColumnDef<IEvidenceUsageHistories>[]>(
    () => [
      {
        header: "Mã minh chứng báo cáo",
        accessorKey: "reportName",
      },
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
        header: "Trạng thái",
        accessorKey: "status",
        Cell: ({ row }) => {
          const effectiveTo =
            row.original.eaqEvidenceCurrentVersion?.expiredDate;

          const currentDate = new Date();
          const toDate = effectiveTo ? new Date(effectiveTo) : null;
          const isLate = !toDate || currentDate > toDate;

          return (
            <Badge
              w="100%"
              h={25}
              leftSection={
                isLate ? <IconClockX size={16} /> : <IconClockCheck size={16} />
              }
              variant="light"
              color={isLate ? "red" : "green"}
              radius="md"
              fw={700}
            >
              {isLate ? "Hết hạn" : "Còn hạn"}
            </Badge>
          );
        },
      },
      // {
      //   header: "Đã sử dụng",
      //   accessorKey: "used",
      //   accessorFn: (row) => {
      //     return (
      //       <CustomCenterFull>
      //         <CustomThemeIconSquareCheck checked={true} />
      //       </CustomCenterFull>
      //     );
      //   },
      // },
    ],
    []
  );

  // link click handling moved to useHandleLickEvidence hook

  return (
    <Accordion.Item value={data?.id?.toString() ?? "1"}>
      <Accordion.Control>
        <Group gap="md" grow>
          <Text size="sm" fw={500} color={"green"}>
            {data?.name}
          </Text>
          <Text size="sm" fw={500}>
            Ngày cập nhật:{" "}
            {data?.createdWhen == null || data?.createdWhen == undefined
              ? "Chưa được cập nhật"
              : dateUtils.toDateTime(data?.createdWhen ?? "", true)}
          </Text>
          <Text size="sm" fw={500}>
            Người cập nhật:{" "}
            {data?.createdBy == null || data?.createdBy == undefined
              ? "Chưa được cập nhật"
              : data?.createdBy?.toString() ?? ""}
          </Text>
          <Flex gap="xs" fw={500}>
            <Text size="sm" fw={500}>
              Tự đánh giá:
            </Text>
            <StatusRow status={data?.status} />
          </Flex>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Box
          h={360}
          p="6"
          bdrs={"xs"}
          style={{
            overflow: "auto",
            border: "1px solid #ccc",
            background: "var(--mrt-base-background-color)",
            marginBottom: 4,
          }}
          ref={editorRef}
        >
          <CustomButtonViewFileAPI
            filePath={pathFile}
            externalDisc={discViewFile}
            buttonProps={{ hidden: true }}
          />
          <CustomHtmlWrapper html={data?.description ?? ""} />
        </Box>
        <CustomDataTable
          renderTopToolbarCustomActions={() => (
            <MyCustomTitleGroup title="Danh sách minh chứng đã sử dụng" />
          )}
          columns={columns}
          data={data?.eaqEvidenceUsageHistories ?? []}
          enableRowNumbers={false}
          renderRowActions={({ row }) => {
            return (
              <CustomCenterFull>
                <Form04CurrentSituationDetail
                  evidence={row.original}
                  evidenceId={row.original.eaqEvidenceId ?? 0}
                />
              </CustomCenterFull>
            );
          }}
        />
      </Accordion.Panel>
    </Accordion.Item>
  );
}
