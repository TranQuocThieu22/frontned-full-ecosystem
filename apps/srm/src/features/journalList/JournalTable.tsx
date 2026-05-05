import { journalService } from "@/shared/APIs/journalService";
import { EnumJournalType, EnumLabelJournalType } from "@/shared/consts/enum/EnumJournalType";
import { SRMJournal } from "@/shared/interfaces/SRMJournal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { JournalCreateOrUpdateButton } from "./JournalCreateOrUpdateButton";
import JournalDeleteButton from "./JournalDeleteButton";
import JournalDeleteListButton from "./JournalDeleteListButton";
import JournalExportButton from "./JournalExportButton";
import JournalImportButton from "./JournalImportButton";


export default function JournalTable() {

    const journalQuery = useCustomReactQuery({
        queryKey: ['journal_list'],
        axiosFn: () => journalService.getAll({ cols: ["SRMPublicationType"] }),
    })

    const columns = useMemo<MRT_ColumnDef<SRMJournal>[]>(() => [
        {
            accessorKey: "code",
            header: "Mã danh mục",
        },
        {
            accessorKey: "name",
            header: "Tên",
            size: 500
        },
        {
            accessorKey: "type",
            header: "Loại",
            accessorFn: (row) => EnumLabelJournalType[row.type as EnumJournalType]
        },
        {
            accessorKey: "codeType",
            header: "Mã loại công bố",
            accessorFn: (row) => row.srmPublicationType?.code
        },
        {
            accessorKey: "isbn",
            header: "Chỉ số ISBN/ISSN",
        },
        {
            accessorKey: "note",
            header: "Ghi chú",
            size: 500
        }
    ], []);

    return (
        <CustomFieldset title="Danh sách tạp chí/ hội thảo/ NXB" >
            <CustomDataTable
                isError={journalQuery.isError}
                isLoading={journalQuery.isLoading}
                columns={columns}
                enableRowSelection
                renderTopToolbarCustomActions={({ table }) => {
                    const dataSelected = table.getSelectedRowModel().flatRows.flatMap(item => item.original);
                    return (
                        <>
                            <JournalCreateOrUpdateButton />
                            <JournalImportButton />
                            <JournalExportButton table={table} />
                            <JournalDeleteListButton
                                values={dataSelected}
                                clearSelection={table.resetRowSelection}
                            />
                        </>
                    )
                }}
                data={journalQuery.data || []}
                renderRowActions={({ row, table }) => {
                    return (
                        <CustomCenterFull>
                            <JournalCreateOrUpdateButton
                                data={row.original}
                                loading={journalQuery.isFetching}
                            />
                            <JournalDeleteButton
                                id={row.original.id}
                                code={row.original.code}
                                clearSelection={table.resetRowSelection}
                                loading={journalQuery.isFetching}
                            />
                        </CustomCenterFull>
                    )
                }}
            />
        </CustomFieldset>
    );
}
