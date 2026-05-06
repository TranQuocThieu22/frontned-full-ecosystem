"use client";
import { documentService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentService";
import {
  CustomColumnDef,
  CustomDataTable,
} from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { Document } from "@aq-fe/aq-legacy-framework/shared/interfaces/Document";
import { useMemo } from "react";
import { F_userGuideDocs_CreateUpdate } from "./F_userGuideDocs_CreateUpdate";
import { F_userGuideDocs_Delete } from "./F_userGuideDocs_Delete";
import F_userGuideDocs_DeleteList from "./F_userGuideDocs_DeleteList";
import F_userGuideDocs_Export from "./F_userGuideDocs_Export";
import F_userGuideDocs_Import from "./F_userGuideDocs_Import";

export function F_userGuideDocs_Read({ GuidelineTypeId }: { GuidelineTypeId: number }) {
  const query = useLegacyReactQuery({
    queryKey: ["F_userGuideDocs_Read"],
    axiosFn: () => documentService.getByType(GuidelineTypeId),
  });
  const columns = useMemo<CustomColumnDef<Document>[]>(
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
        accessorKey: "path",
        type: "viewFile",
      },
    ],
    []
  );

  return (
    <CustomDataTable
      isLoading={query.isLoading}
      isError={query.isError}
      columns={columns}
      data={query.data || []}
      enableRowSelection
      renderTopToolbarCustomActions={({ table }) => (
        <>
          <F_userGuideDocs_CreateUpdate GuidelineTypeId={GuidelineTypeId} isUpdate={false} />
          <F_userGuideDocs_Import GuidelineTypeId={GuidelineTypeId} />
          <F_userGuideDocs_Export table={table} />
          <F_userGuideDocs_DeleteList
            data={table.getSelectedRowModel().rows.map((row) => row.original)}
          />
        </>
      )}
      renderRowActions={({ row }) => {
        return (
          <CustomCenterFull>
            <F_userGuideDocs_CreateUpdate values={row.original} isUpdate={true} />
            <F_userGuideDocs_Delete id={row.original.id!} contextData={row.original.code!} />
          </CustomCenterFull>
        );
      }}
    />
  );
}
