"use client";
import { documentService } from "@/APIs/documentService";
import { MyCenterFull } from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { MyButtonViewFileAPI } from "@/core/withAPI/MyButtonViewFileAPI";
import { useMyReactQuery } from "@/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { utils_date } from "../../../../utils-v2";
import { F_securityPolicyDocs_Create } from "./F_securityPolicyDocs_Create";
import { F_securityPolicyDocs_Delete } from "./F_securityPolicyDocs_Delete";
import { F_securityPolicyDocs_Update } from "./F_securityPolicyDocs_Update";

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

export default function F_securityPolicyDocs_Read({ SecurityTypeId }: { SecurityTypeId: number }) {
  // const query = useQuery<I[]>({
  //   queryKey: ["F_securityPolicyDocs_Read"],
  //   queryFn: async () => {
  //     const result = await baseAxios.get(
  //       `/Document/GetByType?documentType=${SecurityTypeId}`
  //     );
  //     return result.data?.data || [];
  //   },
  // });
  const query = useMyReactQuery({
    queryKey: ["F_securityPolicyDocs_Read"],
    axiosFn: () => documentService.GetByType(SecurityTypeId)
  })
  const columns = useMemo<MRT_ColumnDef<I>[]>(
    () => [
      {
        header: "Số quy định",
        accessorKey: "decisionCode",
      },
      {
        header: "Ngày ban hành",
        accessorFn: (row) =>
          utils_date.toDDMMYYYY(new Date(row.promulgateDate!)),
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
      renderTopToolbarCustomActions={() => <F_securityPolicyDocs_Create SecurityTypeId={SecurityTypeId} />}
      renderRowActions={({ row }) => {
        return (
          <MyCenterFull>
            <F_securityPolicyDocs_Update values={row.original} />
            <F_securityPolicyDocs_Delete
              id={row.original.id!}
              contextData={row.original.decisionCode?.toString()!}
            />
          </MyCenterFull>
        );
      }}
    />
  );
}
