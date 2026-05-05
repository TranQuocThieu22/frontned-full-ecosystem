"use client";
import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import {
  CustomColumnDef,
  CustomDataTable,
} from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useMemo } from "react";
import { F_systemUpdateDocs_CreateUpdate } from "./F_systemUpdateDocs_CreateUpdate";
import { F_systemUpdateDocs_Delete } from "./F_systemUpdateDocs_Delete";
import F_systemUpdateDocs_DeleteList from "./F_systemUpdateDocs_DeleteList";
import F_systemUpdateDocs_Export from "./F_systemUpdateDocs_Export";
import F_systemUpdateDocs_Import from "./F_systemUpdateDocs_Import";

export function F_systemUpdateDocs({ RefinementTypeId }: { RefinementTypeId: number }) {
  const documentQuery = useCustomReactQuery({
    queryKey: ["F_systemUpdateDocs_Read"],
    axiosFn: () => documentService.getByType(RefinementTypeId),
  });

  const documentColumns = useMemo<CustomColumnDef<Document>[]>(
    () => [
      {
        header: "Ngày họp",
        accessorFn: (row) => row.meetingDate ? dateUtils.toDDMMYYYY(new Date(row.meetingDate!)) : "",
      },
      {
        header: "Đơn vị yêu cầu",
        accessorKey: "departmentName",
      },
      {
        header: "Nội dung cải tiến",
        accessorKey: "description",
      },
      {
        header: "Kết luận",
        accessorKey: "conclusion",
      },
      {
        header: "Ngày bắt đầu",
        accessorFn: (row) => dateUtils.toDDMMYYYY(new Date(row.startDate!)),
      },
      {
        header: "Ngày kết thúc",
        accessorFn: (row) => dateUtils.toDDMMYYYY(new Date(row.endDate!)),
      },
      {
        header: "Ghi chú",
        accessorKey: "note",
      },
      {
        header: "File",
        accessorKey: "path",
        type: "viewFile",
      },
    ],
    []
  );

  return (
    <CustomDataTable
      isLoading={documentQuery.isLoading}
      isError={documentQuery.isError}
      columns={documentColumns}
      data={documentQuery.data || []}
      enableRowSelection
      renderTopToolbarCustomActions={({ table }) => (
        <>
          <F_systemUpdateDocs_CreateUpdate RefinementTypeId={RefinementTypeId} isUpdate={false} />
          <F_systemUpdateDocs_Import RefinementTypeId={RefinementTypeId} />
          <F_systemUpdateDocs_Export table={table} />
          <F_systemUpdateDocs_DeleteList
            data={table.getSelectedRowModel().rows.map((row) => row.original)}
          />
        </>
      )}
      renderRowActions={({ row }) => {
        return (
          <CustomCenterFull>
            <F_systemUpdateDocs_CreateUpdate values={row.original} isUpdate={true} />
            <F_systemUpdateDocs_Delete
              id={row.original.id!}
              contextData={row.original.departmentName!}
            />
          </CustomCenterFull>
        );
      }}
    />
  );
}
