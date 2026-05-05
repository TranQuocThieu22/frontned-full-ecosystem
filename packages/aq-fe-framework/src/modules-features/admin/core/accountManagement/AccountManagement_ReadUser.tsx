'use client'
import { accountService } from "@/APIs/accountService";
import { CustomDataTableAPI } from "@/core";
import { useMyReactQuery } from "@/hooks";
import { IAccount } from "@/interfaces";
import AccountManagement_CreateUpdateUser from "@/modules-features/admin/core/accountManagement/AccountManagement_CreateUpdateUser";
import AccountManagement_SyncUserFormEdusoftnet from "@/modules-features/admin/core/accountManagement/AccountManagement_SyncUserFormEdusoftnet";
import { Badge, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import AccountManagement_ExportUsers from "./AccountManagement_ExportUsers";
import AccountManagement_Import from "./AccountManagement_Import";
import useStore_AccountManagement from "./useStore_AccountManagement";

export function AccountManagement_ReadUser() {
    //REFACTOR: Cần refactor lại sử dụng chung chức năng paging
    const paginationState = useState({ pageIndex: 0, pageSize: 10 });
    const [searchInput, setSearchInput] = useState("");
    const [debouncedSearch] = useDebouncedValue(searchInput, 500);
    const [globalFilter, setGlobalFilter] = useState("");
    const accountManagementStore = useStore_AccountManagement()
    const AllUserQuery = useMyReactQuery({
        queryKey: ['AllUserQuery', paginationState[0].pageIndex + 1, paginationState[0].pageSize, globalFilter],
        axiosFn: () => {
            return accountService.getAdminAccount({
                paging: {
                    pageNumber: paginationState[0].pageIndex + 1,
                    pageSize: paginationState[0].pageSize
                },
                name: globalFilter || undefined
            })
        },
        mockData: mockUserData,
    });

    const columns = useMemo<MRT_ColumnDef<IAccount>[]>(() => {
        // Create the base columns that are always included
        const baseColumns: MRT_ColumnDef<IAccount>[] = [
            {
                header: "Tên tài khoản",
                accessorKey: "code"
            },
            {
                header: "Họ và tên",
                accessorKey: "fullName"
            },
            {
                header: "Email",
                accessorKey: "email"
            },
            {
                header: "Số điện thoại",
                accessorKey: "phoneNumber"
            },
            {
                header: "Đơn vị",
                accessorKey: "workingUnitName"
            },
            {
                header: "Trạng thái tài khoản",
                accessorKey: "isBlocked",
                accessorFn: (row) => row.isBlocked ? "Khóa tài khoản" : "Đang hoạt động",
                Cell: ({ row }) => {
                    return row.original.isBlocked ? <Badge color="gray">Khóa tài khoản</Badge> : <Badge color="green">Đang hoạt động</Badge>
                }
            },
        ];

        // Conditionally add the skill center column
        if (accountManagementStore.state?.isRequireSkillCenter === true) {
            baseColumns.splice(3, 0, {
                header: "Trung tâm kỹ năng",
                accessorFn: (row) => {
                    return row.userSkillCenters?.map(item => item.name + ", ")
                }
            });
        }

        return baseColumns;
    }, [accountManagementStore.state?.isRequireSkillCenter]);
    useEffect(() => {
        setGlobalFilter(debouncedSearch);
        paginationState[1]({ pageIndex: 0, pageSize: paginationState[0].pageSize });
    }, [debouncedSearch]);
    return (
        <CustomDataTableAPI
            query={AllUserQuery}
            deleteFn={accountService.delete}
            deleteListFn={accountService.deleteListIds}
            enableRowSelection
            enableFilters={false}
            rowCount={AllUserQuery.dataCount}
            pagination={paginationState[0]}
            onPaginationChange={paginationState[1]}
            columns={columns}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <TextInput
                            w={'330'}
                            placeholder="Tìm theo tài khoản, email hoặc họ tên"
                            leftSection={<IconSearch size={16} />}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.currentTarget.value)}
                        />
                        <AccountManagement_CreateUpdateUser />
                        <AccountManagement_Import />
                        <AccountManagement_ExportUsers data={table.getSelectedRowModel().flatRows.map(item => item.original)} />
                        <AccountManagement_SyncUserFormEdusoftnet />
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <>
                        <AccountManagement_CreateUpdateUser values={row.original} />
                    </>
                )
            }}
        />
    )
}

const mockUserData = [
    {
        userName: "nguyenvana",
        fullName: "Nguyễn Văn A",
        email: "vana@example.com",
    },
    {
        userName: "tranthib",
        fullName: "Trần Thị B",
        email: "thib@example.com",
    },
    {
        userName: "leminhc",
        fullName: "Lê Minh C",
        email: "minhc@example.com",
    },
    {
        userName: "phamthid",
        fullName: "Phạm Thị D",
        email: "thid@example.com",
    },
    {
        userName: "doanvanh",
        fullName: "Doãn Văn H",
        email: "vanh@example.com",
    },
];