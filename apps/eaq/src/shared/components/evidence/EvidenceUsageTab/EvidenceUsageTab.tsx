"use client";

import { IEvidenceUsageHistory } from "@/shared/interfaces/evidence/IEvidenceUsageHistory";
import { Anchor, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomButtonViewFile } from "@aq-fe/core-ui/shared/components/button/CustomButtonViewFile";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export default function EvidenceUsageTab({
  usage,
}: {
  usage: IEvidenceUsageHistory[];
}) {
  const columns = useMemo<MRT_ColumnDef<IEvidenceUsageHistory>[]>(
    () => [
      {
        header: "Mã Kế hoạch TDG",
        accessorKey: "eaqEvaluationPlan.code",
        size: 150,
      },
      {
        header: "Mã CTĐT",
        accessorKey: "eaqTrainingProgram.code",
        size: 100,
      },
      {
        header: "Khoá",
        accessorKey: "eaqGrade.code",
        size: 80,
      },
      {
        header: "Mã Tiêu chuẩn",
        accessorKey: "eaqStandard.code",
        size: 120,
      },
      {
        header: "Mã Tiêu chí",
        accessorKey: "eaqCriteria.code",
        size: 120,
      },
      {
        header: "Mã Minh chứng",
        accessorKey: "eaqEvidence.code",
        size: 120,
      },
      {
        header: "ID File",
        accessorKey: "usedVersion.code",
        size: 120,
      },
      {
        header: "Tên file hiển thị",
        accessorKey: "usedVersion.attachFileName",
        size: 300,
      },
      {
        header: "File đính kèm",
        accessorKey: "attachedFile",
        size: 120,
        accessorFn: (row) => {
          return (
            <CustomCenterFull>
              <CustomButtonViewFileAPI filePath={row.usedVersion?.attachFilePath} />
            </CustomCenterFull>
          );
        },
      },
      {
        header: "Link liên kết",
        accessorKey: "link",
        size: 120,
        accessorFn: (row) => {
          return (
            <Anchor href={row.usedVersion?.link} target="_blank">
              <Text truncate maw={200}>
                {row.usedVersion?.link}
              </Text>
            </Anchor>
          );
        },
      },
      {
        header: "Số - Ngày ban hành",
        accessorKey: "usedVersion.versionNumberIssueDate",
        size: 200,
      },
      {
        header: "Đơn vị ban hành/ cấp",
        accessorKey: "usedVersion.department.name",
        size: 200,
      },
      {
        header: "Hiệu lực Từ ngày",
        accessorKey: "usedVersion.validDate",
        size: 130,
        Cell: ({ cell }) =>
          dateUtils.toDDMMYYYY(new Date(cell.getValue<string>())),
      },
      {
        header: "Hiệu lực Đến ngày",
        accessorKey: "usedVersion.expiredDate",
        size: 130,
        Cell: ({ cell }) =>
          dateUtils.toDDMMYYYY(new Date(cell.getValue<string>())),
      },
    ],
    []
  );

  return (
    <CustomDataTable
      columns={columns}
      enableRowSelection={true}
      data={usage || []}
    />
  );
}
