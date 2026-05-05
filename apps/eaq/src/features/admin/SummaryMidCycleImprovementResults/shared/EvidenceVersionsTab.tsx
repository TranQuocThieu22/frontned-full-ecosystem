import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { Anchor, Text } from "@mantine/core";
import { useMemo } from "react";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";

export default function EvidenceVersionsTab({
  versions,
}: {
  versions: IEnvidenceVersion[];
}) {
  const columns = useMemo<CustomColumnDef<IEnvidenceVersion>[]>(
    () => [
      {
        header: "ID File",
        accessorKey: "code",
        size: columnSizeObject.name,
      },
      {
        header: "Tên file",
        accessorKey: "name",
        size: 300,
      },
      {
        header: "File đính kèm",
        accessorKey: "attachFilePath",
        size: 120,
        accessorFn: (row) => {
          if (row?.attachFilePath) {
            return <CustomButtonViewFileAPI filePath={row.attachFilePath} />;
          }
        },
      },
      {
        header: "Link liên kết",
        accessorKey: "link",
        size: columnSizeObject.name,
        accessorFn: (row) => {
          return (
            <Anchor href={row.link ?? ""} target="_blank">
              <Text>{row.link ?? ""}</Text>
            </Anchor>
          );
        },
      },
      {
        header: "Số - Ngày ban hành",
        accessorKey: "versionNumberIssueDate",
        size: columnSizeObject.name,
      },
      {
        header: "Đơn vị ban hành/ cấp",
        accessorKey: "department.name",
        size: columnSizeObject.name,
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
      {
        header: "Ghi chú phiên bản",
        accessorKey: "attachFileDescription",
        size: columnSizeObject.name,
      },
      {
        header: "Hiện hành",
        accessorKey: "isCurrent",
        size: 100,
        accessorFn: (row) => (
          <CustomCenterFull>
            <CustomThemeIconSquareCheck checked={true} />
          </CustomCenterFull>
        ),
      },
    ],
    []
  );

  return <CustomDataTable columns={columns} data={versions} />;
}