import { IReport } from "@/shared/interfaces/report/IReport";
import { Accordion, Group, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ViewDetailResultTableEvidenceUsed from "./ViewDetailResultTableEvidenceUsed";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

interface IProps {
  reportKey: string;
  data: IReport[];
}

export default function ViewDetailResultRow({ data, reportKey }: IProps) {
  const columns = useMemo<MRT_ColumnDef<IReport>[]>(
    () => [
      {
        header: "Mã tiêu chí",
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.eaqCriteria.code",
      },
      { header: "Mã yêu cầu", accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.code" },
      { header: "Tên yêu cầu", accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.name" },
      { header: "Mã công việc", accessorKey: "eaqTaskDetail.code" },
      {
        header: "Tên công việc",
        accessorKey: "eaqTaskDetail.name",
        size: columnSizeObject.name,
      },
      {
        header: "Công việc đã thực hiện",
        accessorKey: "result",
        size: columnSizeObject.name,
      },
      {
        header: "Mã minh chứng",
        accessorKey: "evidenceCode",
        accessorFn(originalRow) {
          return (
            <Text fz={"sm"} style={{ whiteSpace: "pre-line" }}>
              {originalRow.eaqEvidenceUsageHistories?.map((v, index) => v.code).join(", \n")}
            </Text>
          );
        },
      },
      {
        header: "Tên minh chứng",
        accessorKey: "evidenceName",
        size: columnSizeObject.name,
        accessorFn(originalRow) {
          return (
            <Text fz={"sm"} style={{ whiteSpace: "pre-line" }}>
              {originalRow.eaqEvidenceUsageHistories?.map((v, index) => v.name).join(", \n")}
            </Text>
          );
        },
      },
      {
        header: "Đơn vị chủ trì",
        accessorKey: "eaqTaskDetail.hostUnit.name",
        size: columnSizeObject.name,
      },
    ],
    []
  );

  return (
    <Accordion.Item value={reportKey?.toString() ?? "1"}>
      <Accordion.Control>
        <Group gap="md" grow>
          <Text size="sm" fw={500} c={"green"}>
            Lần {reportKey ?? "1"}
          </Text>
          <Text size="sm" fw={500}>
            Ngày cập nhật:{" "}
            {data[0]?.modifiedWhen == null || data[0]?.modifiedWhen === undefined
              ? "Chưa được cập nhật"
              : dateUtils.toDateTime(data[0]?.modifiedWhen ?? "", true)}
          </Text>
          <Text size="sm" fw={500}>
            Người cập nhật: {data[0]?.modifiedFullName}
          </Text>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <CustomDataTable
          data={data || []}
          columns={columns}
          enableRowNumbers={false}
          initialState={{
            columnSizing: {
              "mrt-row-numbers": 60,
            },
          }}
          mantineTableContainerProps={{
            style: { height: "300px", overflowY: "auto" },
          }}
        />

        {/* <ViewDetailResultTableEvidenceUsed data={data} /> */}
      </Accordion.Panel>
    </Accordion.Item>
  );
}
