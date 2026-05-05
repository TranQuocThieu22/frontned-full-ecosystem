import { accountService } from "@/APIs/accountService";
import { MyDataTable, MyDataTableProps, PaginationState } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useMyReactQuery } from "@/hooks";
import { IAccount } from "@/interfaces";
import { TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

interface Props extends Omit<MyDataTableProps<IAccount>, 'data' | 'columns'> {
}

export default function AccessControl_AccountTable({ ...rest }: Props) {
    const paggingState = useState<PaginationState>({
        pageSize: 50,
        pageIndex: 0
    })
    const [searchInput, setSearchInput] = useState("");
    const [debouncedSearch] = useDebouncedValue(searchInput, 500);
    const [globalFilter, setGlobalFilter] = useState("");
    const query = useMyReactQuery({
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
    const columns = useMemo<MRT_ColumnDef<IAccount>[]>(() => [
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
        <MyDataTable
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
