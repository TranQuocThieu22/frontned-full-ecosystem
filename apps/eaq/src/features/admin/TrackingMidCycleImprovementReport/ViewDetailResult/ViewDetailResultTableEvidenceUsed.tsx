import { IEvidenceUsageHistory } from "@/shared/interfaces/evidence/IEvidenceUsageHistory";
import { IReport } from "@/shared/interfaces/report/IReport";
import { Badge } from "@mantine/core";
import { IconClockCheck, IconClockX } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ViewDetailResultTableEvidenceDetail from "./ViewDetailResultTableEvidenceDetail";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

interface IProps {
  data: IReport[];
}
export default function ViewDetailResultTableEvidenceUsed({ data }: IProps) {
  const allEvidenceUsageHistories = useMemo(() => {
    const allHistories = data.flatMap((report) => report.eaqEvidenceUsageHistories || []);
    const uniqueHistories = allHistories.filter(
      (history, index, self) => index === self.findIndex((h) => h.id === history.id)
    );
    return uniqueHistories;
  }, [data]);

  const columns = useMemo<MRT_ColumnDef<IEvidenceUsageHistory>[]>(
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
        header: "Số - Ngày ban hành",
        accessorKey: "eaqEvidenceCurrentVersion.versionNumberIssueDate",
        size: columnSizeObject.name,
      },
      {
        header: "Đơn vị ban hành",
        accessorKey: "eaqEvidenceCurrentVersion.department",
      },
      {
        header: "Trạng thái hiệu lực",
        accessorKey: "status",
        Cell: ({ row }) => {
          const effectiveTo = row.original.eaqEvidenceCurrentVersion?.expiredDate;

          const currentDate = new Date();
          const toDate = effectiveTo ? new Date(effectiveTo) : null;
          const isLate = !toDate || currentDate > toDate;

          return (
            <Badge
              w="100%"
              h={25}
              leftSection={isLate ? <IconClockX size={16} /> : <IconClockCheck size={16} />}
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

  return (
    <CustomFieldset mt={6} title="Danh sách minh chứng đã sử dụng">
      <CustomDataTable
        data={allEvidenceUsageHistories}
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
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <ViewDetailResultTableEvidenceDetail evidenceId={row.original.id!} evidenceCode={row.original.code!} evidenceName={row.original.name!} />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFieldset>
  );
}
