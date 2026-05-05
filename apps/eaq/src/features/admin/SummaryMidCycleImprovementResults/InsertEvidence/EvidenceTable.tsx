import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { Badge } from "@mantine/core";
import { IconCheck, IconClockCheck, IconClockX } from "@tabler/icons-react";
import { useMemo } from "react";
import ViewDetailEvidence from "../shared/ViewDetailEvidence";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";

interface EvidenceTableProps {
  handleUse: (id: number, code: string, pathFile: string) => void;
  data: IEvidence[];
}

export default function EvidenceTable({ handleUse, data }: EvidenceTableProps) {
  const columns = useMemo<CustomColumnDef<IEvidence>[]>(
    () => [
      {
        header: "Mã minh chứng",
        accessorKey: "code",
      },
      {
        header: "Tên minh chứng",
        accessorKey: "name",
      },
      {
        header: "Số - Ngày ban hành",
        accessorKey: "eaqEvidenceCurrentVersion.versionNumberIssueDate",
        size: 200,
      },
      {
        header: "Đơn vị ban hành",
        accessorKey: "eaqEvidenceCurrentVersion.department.name",
      },
      {
        header: "Hiệu lực Từ ngày",
        accessorKey: "eaqEvidenceCurrentVersion.validDate",
        type: "ddMMyyyy",
      },
      {
        header: "Hiệu lực Đến ngày",
        accessorKey: "eaqEvidenceCurrentVersion.expiredDate",
        type: "ddMMyyyy",
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
        Cell: ({ row }) => {
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
    <CustomDataTable
      columns={columns}
      data={data}
      mantineTableContainerProps={{
        style: { height: "500px", overflowY: "auto" },
      }}
      renderRowActions={({ row }) => {
        return (
          <CustomCenterFull>
            <ViewDetailEvidence evidence={row.original} evidenceId={row.original.id!} />
            {/* {row.original.eaqEvidenceCurrentVersion?.attachFilePath && ( */}
            <CustomActionIcon
              onClick={() => {
                handleUse(
                  row.original.id ?? 0,
                  row.original.code || "",
                  row.original.eaqEvidenceCurrentVersion?.attachFilePath || ""
                );
              }}
              c={"green"}
              bg={"green.1"}
            >
              <IconCheck />
            </CustomActionIcon>
            {/* )} */}
          </CustomCenterFull>
        );
      }}
    />
  );
}
