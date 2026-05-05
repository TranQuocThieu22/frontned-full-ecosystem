import { titleService } from "@/shared/APIs/titleService";
import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import { SRMReviewMember } from "@/shared/interfaces/SRMReviewMember";
import { accountService } from "@aq-fe/core-ui/shared/APIs/accountService";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomSelectAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomSelectAPI";
import CustomTableSelect from "@aq-fe/core-ui/shared/components/withAPI/CustomTableSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { TempStatus } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { useMemo } from "react";

export default function ReviewCommitteeSetupMemberTab({ values, onChange }: {
    values: SRMReviewMember[],
    onChange: (row: SRMReviewMember[]) => void
}) {
    const rolesQuery = useCustomReactQuery({
        queryKey: ['titles_type_council'],
        axiosFn: () => titleService.GetAllByType(EnumTitleType.Council)
    });


    const relationColumns = useMemo<CustomColumnDef<SRMReviewMember>[]>(() => [
        {
            accessorKey: 'user.code',
            header: 'Mã viên chức',
            Cell: ({ row }) => row.original.user?.code ?? '',
        },
        {
            accessorKey: 'user.fullName',
            header: 'Họ và Tên',
            Cell: ({ row }) => row.original.user?.fullName ?? '',
        },
        {
            accessorKey: 'user.dateOfBirth',
            header: 'Ngày sinh',
            type: "ddMMyyyy"
        },
        {
            accessorKey: 'user.gender',
            header: 'Giới tính',
            type: "gender"
        },
        {
            accessorKey: 'user.workingUnitName',
            header: 'Đơn vị',
            Cell: ({ row }) => row.original.user?.workingUnitName ?? ''
        },
        {
            accessorKey: 'user.jobTitle',
            header: 'Chức vụ',
            Cell: ({ row }) => row.original.user?.jobTitle ?? ''
        },
        {
            accessorKey: 'srmTitleId',
            header: 'Vai trò',
            size: 250,
            Cell({ row }) {
                if (!rolesQuery.data) return null;
                return (
                    <CustomSelectAPI
                        query={rolesQuery}
                        autoSelectFirst
                        getLabel={(item) => item.name || ""}
                        value={row.original.srmTitleId}
                        onChange={(value) => {
                            const newValues = values.map((item, index) => {
                                if (index !== row.index) return item;

                                // Nếu là bản ghi mới tạo thì giữ nguyên "created"
                                if (item.tempStatus === "created") {
                                    return {
                                        ...item,
                                        srmTitleId: value,
                                    };
                                }

                                // Nếu bản ghi có sẵn thì đánh dấu "updated"
                                return {
                                    ...item,
                                    srmTitleId: value,
                                    tempStatus: "updated" as TempStatus,
                                };
                            });

                            onChange(newValues);
                        }}
                    />
                );
            },
        },
    ], [rolesQuery]);

    const accountQuery = useCustomReactQuery({
        axiosFn: () => accountService.getAdminAccount(),
        queryKey: ['accounts'],

    })
    const entityColumns = useMemo<CustomColumnDef<Account>[]>(() => [
        {
            header: "Mã viên chức",
            accessorKey: "code"
        },
        {
            header: "Họ và tên",
            accessorKey: "fullName"
        }
    ], [])
    return (
        <CustomTableSelect<SRMReviewMember, Account>
            pinningRightColumns={['srmTitleId']}
            getChildrenValue={(reviewMember) => reviewMember.user || {}}
            createRelationValue={(account) => ({ user: account, userId: account.id })}
            columns={relationColumns}
            onChange={onChange}
            values={values}
            customButtonSelectTableProps={{
                customDataTableAPIProps: {
                    query: accountQuery,
                    columns: entityColumns
                }
            }}
        />
    )
}
