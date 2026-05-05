import { accountService } from "@/APIs/accountService";
import { CustomDataTableAPI, CustomDataTableAPIProps } from "@/core";
import { useMyReactQuery } from "@/hooks/custom-hooks/useMyReactQuery";
import { IAccount, IUser } from "@/interfaces";
import { Group, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

export interface AccountTableProps extends Omit<CustomDataTableAPIProps<IAccount>, "query" | "columns"> { }

export default function AccountTable({
    ...rest
}: AccountTableProps) {
    const paginationState = useState({ pageIndex: 0, pageSize: 50 })
    const [searchInput, setSearchInput] = useState("");
    const [globalFilter, setGlobalFilter] = useState("");
    const [debouncedSearch] = useDebouncedValue(searchInput, 500);
    const adminAccountQuery = useMyReactQuery({
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
    const columns = useMemo<MRT_ColumnDef<IUser>[]>(() => [
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
