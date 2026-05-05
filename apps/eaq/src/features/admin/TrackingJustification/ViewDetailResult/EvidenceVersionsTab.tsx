import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { Anchor, Text } from "@mantine/core";
import { useMemo } from "react";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";

interface IProps {
  data: IEnvidenceVersion[];
  isLoading?: boolean;
  isError?: boolean;
}

export default function EvidenceVersionsTab({ data, isLoading, isError }: IProps) {
  const columns = useMemo<CustomColumnDef<IEnvidenceVersion>[]>(
    () => [
      {
        header: "ID File",
        accessorKey: "code",
      },
      {
        header: "Tên file",
        accessorKey: "name",
        size: columnSizeObject.name,
      },

      {
        header: "File đính kèm",
        accessorKey: "attachFilePath",
        type: "viewFile",
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
        accessorKey: "department",
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
        type: "squareCheck",
      },
    ],
    []
  );

  return <CustomDataTable columns={columns} data={data} isLoading={isLoading} isError={isError} />;
}
