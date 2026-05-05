'use client';

import { AwardLevelService } from "@/shared/APIs/awardLevelService";
import { SRMAwardLevel } from "@/shared/interfaces/SRMAwardLevel";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import SRMAwardLevelCreateOrUpdate from "./SRMAwardLevelCreateOrUpdate";
import SRMAwardLevelDelete from "./SRMAwardLevelDelete";
import SRMAwardLevelDeleteList from "./SRMAwardLevelDeleteList";
import SRMAwardLevelExportButton from "./SRMAwardLevelExportButton";
import SRMAwardLevelImportButton from "./SRMAwardLevelImportButton";

export default function SRMAwardLevelTable() {
     const columns = useMemo<MRT_ColumnDef<SRMAwardLevel>[]>(() => [
          {
               header: "Mã cấp giải thưởng",
               accessorKey: "code",
          },
          {
               header: "Tên cấp giải thưởng",
               accessorKey: "name",
          },
          {
               accessorKey: "isDeactivate",
               header: "Không sử dụng",
               Cell: ({ row }) =>
                    <CustomCenterFull>
                         <CustomThemeIconSquareCheck checked={row.original.isDeactivate} />
                    </CustomCenterFull>,
               size: 30,
          },
          {
               header: "Ghi chú",
               accessorKey: "note",
          },
     ], [])
     const SRMAwardLevelQuery = useCustomReactQuery({
          queryKey: ['SRMAwardLevelQuery'],
          axiosFn: () => AwardLevelService.getAll() //{ params: `?cols=SRMAwardLevel` }
     })
     return (
          <CustomFieldset
               title="Danh mục cấp giải thưởng Sinh viên Nghiên cứu khoa học "
          >
               <CustomDataTable
                    columns={columns}
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    isLoading={SRMAwardLevelQuery.isLoading}
                    isError={SRMAwardLevelQuery.isError}
                    renderTopToolbarCustomActions={({ table }) => {
                         return (
                              <>
                                   <SRMAwardLevelCreateOrUpdate />
                                   <SRMAwardLevelImportButton />
                                   <SRMAwardLevelExportButton data={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)} />
                                   <SRMAwardLevelDeleteList data={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)} />
                              </>
                         )
                    }}
                    renderRowActions={({ row }) => {
                         return (
                              <CustomCenterFull>
                                   <SRMAwardLevelCreateOrUpdate initValues={row.original} />
                                   <SRMAwardLevelDelete id={row.original.id ?? 0} code={row.original.code ?? ""} />
                              </CustomCenterFull>
                         )
                    }}
                    data={SRMAwardLevelQuery.data || []}
               />
          </CustomFieldset>
     )
}