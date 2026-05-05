'use client'
import { accountService } from "@aq-fe/core-ui/shared/APIs/accountService";
import { AQDataSynchronizationService } from "@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService";
import { departmentService } from "@aq-fe/core-ui/shared/APIs/departmentService";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import CustomButtonModalSync from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonModalSync";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { useProjectInfoStore } from "@aq-fe/core-ui/shared/stores/useProjectInfoStore";
import { excelUtils } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Badge, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { PaginationState } from "@tanstack/table-core";
import { useMemo, useState } from "react";
import AccountManagement_CreateUpdateUser from "./AccountManagement_CreateUpdateUser";
import useAccountManagementStore from "./useAccountManagementStore";

export function AccountManagementUserTable({
    showSyncFromEdusoftButton = true,
    isRequireSkillCenter
}: {
    showSyncFromEdusoftButton?: boolean,
    isRequireSkillCenter?: boolean
}) {
    //REFACTOR: Cần refactor lại sử dụng chung chức năng paging
    const projectInfoStore = useProjectInfoStore()
    const paginationState = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });
    const searchInputState = useState("");
    const [debouncedSearch] = useDebouncedValue(searchInputState[0], 500);
    const accountManagementStore = useAccountManagementStore()
    const AllUserQuery = useCustomReactQuery({
        queryKey: ['AllUserQuery', paginationState[0].pageIndex + 1, paginationState[0].pageSize, debouncedSearch],
        axiosFn: () => {
            return accountService.getAdminAccount({
                paging: {
                    pageNumber: paginationState[0].pageIndex + 1,
                    pageSize: paginationState[0].pageSize
                },
                name: debouncedSearch
            })
        },
        mockData: mockUserData,
    });

    const columns = useMemo<CustomColumnDef<Account>[]>(() => [
        {
            header: "Tên tài khoản",
            accessorKey: "code",
            importFieldProps: {},
        },
        {
            header: "Họ và tên",
            accessorKey: "fullName",
            importFieldProps: {}
        },
        {
            header: "Email",
            accessorKey: "email",
            importFieldProps: {
                isRequired: true,
                isUnique: true
            }
        },
        {
            header: "Mật khẩu",
            accessorKey: "password",
            importFieldProps: {
                isRequired: true,
            },
            isExcluded: true
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber",
            importFieldProps: {}
        },
        {
            header: "Đơn vị",
            accessorKey: "workingUnitName",
        },

        {
            header: "Mã đơn vị",
            accessorKey: "workingUnitId",
            importFieldProps: {
                parseType: "number",
            },
            isExcluded: true
        },
        {
            header: "Trạng thái tài khoản",
            accessorKey: "isBlocked",
            accessorFn: (row) => row.isBlocked ? "Khóa tài khoản" : "Đang hoạt động",
            Cell: ({ row }) => {
                return (
                    row.original.isBlocked
                        ? <Badge color="gray">Khóa tài khoản</Badge>
                        : <Badge color="green">Đang hoạt động</Badge>
                )
            },
            importFieldProps: {
                parseType: "boolean"
            }
        },
        {
            header: "Trung tâm kỹ năng",
            accessorFn: (row) => {
                return row.userSkillCenters?.map(item => item.name + ", ")
            },
            isExcluded: isRequireSkillCenter == false
        }
    ], []);

    const workingUnitQuery = useCustomReactQuery({
        queryKey: ['workingUnit'],
        axiosFn: () => departmentService.getWorkingUnit()
    })
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
            buttonImportProps={{
                onPrepareWorkbook: (workbook) => {
                    excelUtils.addSheet({
                        workbook, config: [
                            {
                                fieldKey: "id",
                                fieldName: "Id đơn vị",
                            },
                            {
                                fieldKey: "code",
                                fieldName: "Mã đơn vị",
                            },
                            {
                                fieldKey: "name",
                                fieldName: "Tên đơn vị",
                            },

                        ],
                        data: workingUnitQuery.data || [],
                        sheetName: "Danh sách đơn vị"
                    })
                },
                onSubmit: (values) => {
                    return accountService.createList(values.map(item => ({
                        ...item,
                        password: item.password,
                        userName: item.code,
                        aqModuleId: projectInfoStore.state.aqModuleId,
                        isBlocked: false
                    })))
                }
            }}
            exportProps={{
                fileName: "Danh sách tài khoản"
            }}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <TextInput
                            w={'330'}
                            placeholder="Tìm theo tài khoản, email hoặc họ tên"
                            leftSection={<IconSearch size={16} />}
                            value={searchInputState[0]}
                            onChange={(e) => searchInputState[1](e.currentTarget.value)}
                        />
                        <AccountManagement_CreateUpdateUser />
                        {showSyncFromEdusoftButton && (
                            <CustomButtonModalSync
                                buttonProps={{
                                    children: "Đồng bộ từ Edusoft.Net"
                                }} axiosFn={() => AQDataSynchronizationService.AQDataManager()}
                            />
                        )}
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