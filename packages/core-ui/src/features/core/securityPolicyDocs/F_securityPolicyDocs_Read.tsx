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
import { F_securityPolicyDocs_CreateUpdate } from "./F_securityPolicyDocs_CreateUpdate";
import { F_securityPolicyDocs_Delete } from "./F_securityPolicyDocs_Delete";
import F_securityPolicyDocs_DeleteList from "./F_securityPolicyDocs_DeleteList";
import F_securityPolicyDocs_Export from "./F_securityPolicyDocs_Export";
import F_securityPolicyDocs_Import from "./F_securityPolicyDocs_Import";

export default function c_Read({ SecurityTypeId }: { SecurityTypeId: number }) {
  // const query = useQuery<I[]>({
  //   queryKey: ["F_securityPolicyDocs_Read"],
  //   queryFn: async () => {
  //     const result = await baseAxios.get(
  //       `/Document/GetByType?documentType=${SecurityTypeId}`
  //     );
  //     return result.data?.data || [];
  //   },
  // });
  const query = useCustomReactQuery({
    queryKey: ["F_securityPolicyDocs_Read"],
    axiosFn: () => documentService.GetByType(SecurityTypeId),
  });
  const columns = useMemo<CustomColumnDef<Document>[]>(
    () => [
      {
        header: "Số quy định",
        accessorKey: "decisionCode",
      },
      {
        header: "Ngày ban hành",
        accessorFn: (row) => dateUtils.toDDMMYYYY(new Date(row.promulgateDate!)),
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
          <F_securityPolicyDocs_CreateUpdate SecurityTypeId={SecurityTypeId} isUpdate={false} />
          <F_securityPolicyDocs_Import SecurityTypeId={SecurityTypeId} />
          <F_securityPolicyDocs_Export table={table} />
          <F_securityPolicyDocs_DeleteList
            data={table.getSelectedRowModel().rows.map((row) => row.original)}
          />
        </>
      )}
      renderRowActions={({ row }) => {
        return (
          <CustomCenterFull>
            <F_securityPolicyDocs_CreateUpdate values={row.original} isUpdate={true} />
            <F_securityPolicyDocs_Delete
              id={row.original.id!}
              contextData={row.original.decisionCode?.toString()!}
            />
          </CustomCenterFull>
        );
      }}
    />
  );
}
