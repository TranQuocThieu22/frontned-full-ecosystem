"use client";

import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { IEvidenceUsageHistory } from "@/shared/interfaces/evidence/IEvidenceUsageHistory";
import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { Anchor, Text } from "@mantine/core";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";

interface Props {
  values?: IEvidence;
  modalDisc: UseDisclosureReturnValue;
}

export default function EvidenceUsageTable({ values, modalDisc }: Props) {

  const evidenceUsageQuery = useCustomReactQuery({
    queryKey: ["EvidenceUsage_GetAll"],
    axiosFn: () =>
      service_EAQEvidence.GetEvidenceUsageHistories({
        eaqEvidenceId: values?.id,
      }),
    options: {
      enabled: modalDisc[0],
    },
  });

  const evidenceUsageHistoryColumns = useMemo<MRT_ColumnDef<IEvidenceUsageHistory>[]>(
    () => [
      {
        header: "Mã Kế hoạch TDG",
        accessorKey: "eaqEvaluationPlan.code",
      },
      {
        header: "Mã CTĐT",
        accessorKey: "eaqTrainingProgram.code",
      },
      {
        header: "Khoá",
        accessorKey: "eaqGrade.code",
      },
      {
        header: "Mã Tiêu chuẩn",
        accessorKey: "eaqStandard.code",
      },
      {
        header: "Mã Tiêu chí",
        accessorKey: "eaqCriteria.code",
      },
      {
        header: "Mã Minh chứng",
        accessorKey: "eaqEvidence.code",
      },
      {
        header: "ID File (Hệ thống)",
        accessorKey: "usedVersion.code",
      },
      {
        header: "Tên file hiển thị",
        accessorKey: "usedVersion.attachFileName",
        size: columnSizeObject.name,
      },
      {
        header: "File đính kèm",
        accessorKey: "usedVersion.attachFilePath",
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
        accessorKey: "usedVersion.link",
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
        header: "Đơn vị ban hành / cấp",
        accessorKey: "usedVersion.department",
        size: 200,
      },
      {
        header: "Hiệu lực Từ ngày",
        accessorKey: "usedVersion.validDate",
        Cell: ({ cell }) =>
          dateUtils.toDDMMYYYY(cell.getValue<string>()),
      },
      {
        header: "Hiệu lực Đến ngày",
        accessorKey: "usedVersion.expiredDate",
        Cell: ({ cell }) =>
          dateUtils.toDDMMYYYY(cell.getValue<string>()),
      },
    ],
    [evidenceUsageQuery.data],
  );

  return (
    <CustomDataTable
      isLoading={evidenceUsageQuery.isLoading}
      isError={evidenceUsageQuery.isError}
      columns={evidenceUsageHistoryColumns}
      enableRowSelection={true}
      data={evidenceUsageQuery.data || []}
    />
  );
}
