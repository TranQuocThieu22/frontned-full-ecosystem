import { IEvidenceUsageHistory } from "@/shared/interfaces/evidence/IEvidenceUsageHistory";
import { Anchor, Text } from "@mantine/core";
import { useMemo } from "react";
import {
  CustomColumnDef,
  CustomDataTable,
} from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";

export default function EvidenceUsageTab({
  usage,
}: {
  usage: IEvidenceUsageHistory[];
}) {
  const columns = useMemo<CustomColumnDef<IEvidenceUsageHistory>[]>(
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
        header: "ID File (Hệ thống)",
        accessorKey: "usedVersion.code",
        size: 120,
      },
      {
        header: "Tên file hiện thị",
        accessorKey: "usedVersion.attachFileName",
        size: 300,
      },
      {
        header: "File đính kèm",
        accessorKey: "attachedFile",
        size: 120,
        accessorFn: (row) => {
          if (row?.usedVersion?.attachFilePath) {
            return (
              <CustomButtonViewFileAPI
                filePath={row.usedVersion.attachFilePath}
              />
            );
          }
        },
      },
      {
        header: "Link liên kết",
        accessorKey: "link",
        size: columnSizeObject.name,
        accessorFn: (row) => {
          if (row?.usedVersion?.link) {
            return (
              <Anchor href={row.usedVersion.link} target="_blank">
                <Text fz={"sm"}>{row.usedVersion.link}</Text>
              </Anchor>
            );
          }
        },
      },
      {
        header: "Số - Ngày ban hành",
        accessorKey: "usedVersion.versionNumberIssueDate",
        size: columnSizeObject.name,
      },
      {
        header: "Đơn vị ban hành/ cấp",
        accessorKey: "usedVersion.department.name",
        size: 200,
      },
      {
        header: "Hiệu lực Từ ngày",
        accessorKey: "validDate",
        type: "ddMMyyyy",
      },
      {
        header: "Hiệu lực Đến ngày",
        accessorKey: "expiredDate",
        type: "ddMMyyyy",
      },
    ],
    []
  );

  return <CustomDataTable columns={columns} data={usage} />;
}
