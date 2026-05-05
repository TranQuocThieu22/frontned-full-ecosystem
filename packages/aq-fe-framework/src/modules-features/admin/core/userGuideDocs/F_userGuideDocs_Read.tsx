"use client";
import { documentService } from "@/APIs/documentService";
import { MyCenterFull } from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useMyReactQuery } from "@/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { MyButtonViewFileAPI } from "../../../../core/withAPI/MyButtonViewFileAPI";
import { F_userGuideDocs_Create } from "./F_userGuideDocs_Create";
import { F_userGuideDocs_Delete } from "./F_userGuideDocs_Delete";
import { F_userGuideDocs_Update } from "./F_userGuideDocs_Update";

interface I {
  path?: string;
  orderBy?: number;
  documentType?: number;
  promulgateDate?: Date;
  decisionCode?: string;
  departmentName?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  conclusion?: string;
  note?: string;
  documentAttributeId?: number;
  documentAttributeName?: string;
  isCycleCheck?: boolean;
  meetingDate?: Date;
  fileDetail?: {
    fileBase64String?: string;
    fileExtension?: string;
    fileName?: string;
  };
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  ngayChinhSua?: Date;
  nguoiChinhSua?: string;
}

export function F_userGuideDocs_Read({ GuidelineTypeId }: { GuidelineTypeId: number }) {

  const query = useMyReactQuery({
    queryKey: ["F_userGuideDocs_Read"],
    axiosFn: () => documentService.GetByType(GuidelineTypeId)
  })
  const columns = useMemo<MRT_ColumnDef<I>[]>(
    () => [
      {
        header: "Mã tài liệu",
        accessorKey: "code",
      },
      {
        header: "Tên tài liệu",
        accessorKey: "name",
      },
      {
        header: "File",
        accessorFn: (row) => {
          return (
            <MyCenterFull>
              <MyButtonViewFileAPI filePath={row.path} />

            </MyCenterFull>
          );
        },
      },
    ],
    []
  );

  return (
    <MyDataTable
      isLoading={query.isLoading}
      isError={query.isError}
      columns={columns}
      data={query.data || []}
      renderTopToolbarCustomActions={() => <F_userGuideDocs_Create GuidelineTypeId={GuidelineTypeId} />}
      renderRowActions={({ row }) => {
        return (
          <MyCenterFull>
            <F_userGuideDocs_Update values={row.original} />
            <F_userGuideDocs_Delete
              id={row.original.id!}
              contextData={row.original.code!}
            />
          </MyCenterFull>
        );
      }}
    />
  );
}
