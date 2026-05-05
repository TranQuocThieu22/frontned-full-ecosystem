import { IReport } from "@/shared/interfaces/report/IReport";
import { Accordion, Group, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { lazy, memo, Suspense, useMemo } from "react";
import ViewDetailResultTableEvidenceUsed from "./ViewDetailResultTableEvidenceUsed";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
const TABLE_CONTAINER_STYLES = {
  style: { height: "300px", overflowY: "auto" as const },
}
const TABLE_CONTAINER_INIT_STATE = {
  columnSizing: {
    "mrt-row-numbers": 60,
  },
}
function ViewDetailResultRow({

  reports,
  index,
}: {
  reports: IReport[];
  index: number;
}) {
  console.log(1);
  const columns = useMemo<MRT_ColumnDef<IReport>[]>(
    () => [
      {
        header: "Mã tiêu chí",
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.eaqCriteria.code",
      },
      {
        header: "Mã yêu cầu",
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.code",
      },
      {
        header: "Tên yêu cầu",
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.name",
        size: columnSizeObject.name,
      },
      {
        header: "Mã công việc",
        accessorKey: "eaqTaskDetail.code",
      },
      {
        header: "Tên công việc",
        accessorKey: "eaqTaskDetail.name",
        size: columnSizeObject.name,
      },
      {
        header: "Kết quả cải tiến",
        accessorKey: "eaqTaskDetail.expectedResult",
        size: columnSizeObject.name,
      },
      {
        header: "Mã minh chứng",
        accessorKey: "eaqEvidenceUsageHistories.code",
        Cell({ row }) {
          return (
            <Text fz={"sm"} style={{ whiteSpace: "pre-line" }}>
              {row.original.eaqEvidenceUsageHistories
                ?.map((v, index) => v.code)
                .join(", \n")}
            </Text>
          );
        },
      },
      {
        header: "Tên minh chứng",
        accessorKey: "eaqEvidenceUsageHistories.name",
        size: columnSizeObject.name,
        Cell({ row }) {
          return (
            <Text fz={"sm"} style={{ whiteSpace: "pre-line" }}>
              {row.original.eaqEvidenceUsageHistories
                ?.map((v, index) => v.name)
                .join(", \n")}
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

  const EvidenceHistory = useMemo(() => {
    if (!reports) return [];

    const allEvidence = Object.values(reports)
      .flat()
      .map((report) => report.eaqEvidenceUsageHistories)
      .flat()
      .filter((evidence) => evidence !== undefined);

    // Lọc trùng lặp dựa trên id
    const uniqueEvidence = allEvidence.filter(
      (evidence, index, self) =>
        index === self.findIndex((e) => e.id === evidence.id)
    );

    return uniqueEvidence;
  }, [reports]);

  return (
    <Accordion.Item value={reports[0]?.id?.toString() ?? "1"}>
      <Accordion.Control>
        <Group gap="md" grow>
          <Text size="sm" fw={500} c={"green"}>
            {"Lần " + index}
          </Text>
          <Text size="sm" fw={500}>
            Ngày cập nhật:{" "}
            {reports[0]?.modifiedWhen == null ||
              reports[0]?.modifiedWhen == undefined
              ? "Chưa được cập nhật"
              : dateUtils.toDateTime(reports[0]?.modifiedWhen ?? "", true)}
          </Text>
          <Text size="sm" fw={500}>
            Người cập nhật:{" "}
            {reports[0]?.modifiedFullName == null ||
              reports[0]?.modifiedFullName == undefined
              ? "Chưa được cập nhật"
              : reports[0]?.modifiedFullName ?? ""}
          </Text>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <CustomDataTable
          data={reports}
          columns={columns}
          enableRowNumbers={false}
          initialState={TABLE_CONTAINER_INIT_STATE}
          mantineTableContainerProps={TABLE_CONTAINER_STYLES}
        />

        {/* <ViewDetailResultTableEvidenceUsed data={EvidenceHistory} /> */}
      </Accordion.Panel>
    </Accordion.Item>
  );
}
export default memo(ViewDetailResultRow);
