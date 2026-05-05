"use client";
import { documentService } from "@/APIs/documentService";
import { MyCenterFull } from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useMyReactQuery } from "@/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { MyButtonViewFileAPI } from "../../../../core/withAPI/MyButtonViewFileAPI";
import { utils_date } from "../../../../utils-v2";
import { F_systemUpdateDocs_Create } from "./F_systemUpdateDocs_Create";
import { F_systemUpdateDocs_Delete } from "./F_systemUpdateDocs_Delete";
import { F_systemUpdateDocs_Update } from "./F_systemUpdateDocs_Update";

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

export function F_systemUpdateDocs({ RefinementTypeId }: { RefinementTypeId: number }) {

  const query = useMyReactQuery({
    queryKey: ["F_systemUpdateDocs_Read"],
    axiosFn: () => documentService.GetByType(RefinementTypeId)
  })
  const columns = useMemo<MRT_ColumnDef<I>[]>(
    () => [
      {
        header: "Đơn vị yêu cầu",
        accessorKey: "departmentName",
      },
      {
        header: "Nội dung cải tiến",
        accessorKey: "description",
      },
      {
        header: "Ngày bắt đầu",
        accessorFn: (row) => utils_date.toDDMMYYYY(new Date(row.startDate!)),
      },
      {
        header: "Ngày kết thúc",
        accessorFn: (row) => utils_date.toDDMMYYYY(new Date(row.endDate!)),
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
      renderTopToolbarCustomActions={() => <F_systemUpdateDocs_Create RefinementTypeId={RefinementTypeId} />}
      renderRowActions={({ row }) => {
        return (
          <MyCenterFull>
            <F_systemUpdateDocs_Update values={row.original} />
            <F_systemUpdateDocs_Delete
              id={row.original.id!}
              contextData={row.original.departmentName!}
            />
          </MyCenterFull>
        );
      }}
    />
  );
}
