"use client";

import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { Accordion, Flex, Group, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { StatusRow } from "../components/StatusRow";
import { IForm04ActionPlanRowHistoryViewModel } from "./interface";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export default function Form04ActionPlanRow({
  data,
}: {
  data: ISelfAssessment;
}) {
  const columns = useMemo<
    MRT_ColumnDef<IForm04ActionPlanRowHistoryViewModel>[]
  >(
    () => [
      { header: "Mục tiêu", accessorKey: "target", size: 200 },
      { header: "Nội dung chi tiết", accessorKey: "detail", size: 350 },
      { header: "Đơn vị; Người thực hiện", accessorKey: "unit" },
      {
        header: "Thời gian thực hiện hoặc hoàn thành",
        accessorKey: "actionTime",
      },
      { header: "Ghi chú", accessorKey: "note", size: 120 },
    ],
    []
  );
  return (
    <Accordion.Item value={`${data?.id?.toString() ?? "1"}`}>
      <Accordion.Control>
        <Group gap="md" grow>
          <Text size="sm" fw={500} c={"green"}>
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
        <CustomDataTable
          data={data?.eaqActions as IForm04ActionPlanRowHistoryViewModel[]}
          columns={columns}
          initialState={{
            columnSizing: {
              "mrt-row-numbers": 60,
            },
          }}
          mantineTableContainerProps={{
            style: { height: "300px", overflowY: "auto" },
          }}
        />
      </Accordion.Panel>
    </Accordion.Item>
  );
}
