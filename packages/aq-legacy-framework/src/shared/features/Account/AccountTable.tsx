import { accountService } from "@aq-fe/aq-legacy-framework/shared/APIs/accountService";
import { CustomDataTableAPI, CustomDataTableAPIProps } from "@aq-fe/aq-legacy-framework/shared/components/withAPI/CustomDataTableAPI";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { Account } from "@aq-fe/aq-legacy-framework/shared/interfaces/Account";
import { Group, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { User } from "@aq-fe/aq-legacy-framework/shared/interfaces/User";

export interface AccountTableProps extends Omit<CustomDataTableAPIProps<User>, "query" | "columns"> { }

export default function AccountTable({
    ...rest
}: AccountTableProps) {
    const paginationState = useState({ pageIndex: 0, pageSize: 50 })
    const [searchInput, setSearchInput] = useState("");
    const [globalFilter, setGlobalFilter] = useState("");
    const [debouncedSearch] = useDebouncedValue(searchInput, 500);
    const adminAccountQuery = useLegacyReactQuery({
        queryKey: ['accounts', paginationState[0], globalFilter],
        axiosFn: () => {
            return accountService.getAdminAccount({
                paging: {
                    pageNumber: paginationState[0].pageIndex + 1,
                    pageSize: paginationState[0].pageSize
                },
                name: globalFilter || undefined
            })
        }
    })
    const columns = useMemo<MRT_ColumnDef<Account>[]>(() => [
        {
            header: "Mã tài khoản",
            accessorKey: "code",
            size: 40,
        },
        {
            header: "Họ tên",
            accessorKey: "fullName",
        },
        {
            header: "Đơn vị",
            accessorKey: "workingUnitName",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber",
        },
    ], []);
    useEffect(() => {
        setGlobalFilter(debouncedSearch);
        paginationState[1]({ pageIndex: 0, pageSize: paginationState[0].pageSize });
    }, [debouncedSearch]);
    return (
        <CustomDataTableAPI
            rowCount={adminAccountQuery.dataCount}
            pagination={paginationState[0]}
            onPaginationChange={paginationState[1]}
            query={adminAccountQuery}
            columns={columns}
            renderTopToolbarCustomActions={(table) => (
                <Group>
                    {rest?.renderTopToolbarCustomActions?.(table)}
                    <TextInput
                        w={'250'}
                        placeholder="Tìm theo tài khoản hoặc họ tên..."
                        leftSection={<IconSearch size={16} />}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.currentTarget.value)}
                    />
                </Group>
            )}
            {...rest}
        />
    )
}
