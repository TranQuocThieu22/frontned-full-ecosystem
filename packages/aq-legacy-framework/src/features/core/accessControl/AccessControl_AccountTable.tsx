import { accountService } from "@aq-fe/aq-legacy-framework/shared/APIs/accountService";
import { CustomDataTable, CustomDataTableProps, PaginationState } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { User } from "@aq-fe/aq-legacy-framework/shared/interfaces/User";
import { TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

interface Props extends Omit<CustomDataTableProps<User>, 'data' | 'columns'> {
}

export default function AccessControl_AccountTable({ ...rest }: Props) {
    const paggingState = useState<PaginationState>({
        pageSize: 50,
        pageIndex: 0
    })
    const [searchInput, setSearchInput] = useState("");
    const [debouncedSearch] = useDebouncedValue(searchInput, 500);
    const [globalFilter, setGlobalFilter] = useState("");
    const query = useLegacyReactQuery({
        queryKey: ["accounts", paggingState[0], globalFilter],
        axiosFn: () => accountService.getAdminAccountForSetPermission({
            paging: {
                pageNumber: paggingState[0].pageIndex + 1,
                pageSize: paggingState[0].pageSize
            },
            name: globalFilter
        }),
        options: {
            refetchOnWindowFocus: false,
        }
    })
    const columns = useMemo<MRT_ColumnDef<User>[]>(() => [
        {
            header: "Tài khoản",
            accessorKey: "code",
            size: 100

        },
        {
            header: "Họ và tên",
            accessorKey: "fullName",
            size: 250,
        },
        {
            header: "Email",
            accessorKey: "email"
        },
    ], []);
    useEffect(() => {
        if (!query.data) return
        rest.setIdSelectionOne?.(query.data[0]?.id?.toString()!)
    }, [query.data])
    useEffect(() => {
        setGlobalFilter(debouncedSearch);
        paggingState[1]({ pageIndex: 0, pageSize: paggingState[0].pageSize });
    }, [debouncedSearch]);

    return (
        <CustomDataTable
            enableFilters={false}
            enableRowNumbers={false}
            columns={columns}
            pagination={paggingState[0]}
            onPaginationChange={paggingState[1]}
            rowCount={query.dataCount}
            data={query.data || []}
            isLoading={query.isLoading}
            isError={query.isError}
            renderTopToolbarCustomActions={() => (
                <TextInput
                    w={'250'}
                    placeholder="Tìm theo tài khoản hoặc họ tên..."
                    leftSection={<IconSearch size={16} />}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.currentTarget.value)}
                />
            )}
            {...rest}
        />
    )
}
