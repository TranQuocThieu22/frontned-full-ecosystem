import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { Badge } from "@mantine/core";
import { IconClockCheck, IconClockX } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ViewDetailEvidence from "../shared/ViewDetailEvidence";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

export default function ViewDetailResultTableEvidenceUsed({
  data,
}: {
  data: IEvidence[];
}) {
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
        data={data}
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
          return <ViewDetailEvidence evidence={row.original} evidenceId={row.original.id!} />;
        }}
      />
    </CustomFieldset>
  );
}
