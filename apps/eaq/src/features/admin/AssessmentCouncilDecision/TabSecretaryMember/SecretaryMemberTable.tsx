"use client";

import { service_EAQRule } from "@/shared/APIs/service_EAQRule";
import { ICouncilMemberCreate } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilMemberCreate";
import { MRT_ColumnDef } from "mantine-react-table";
import { MutableRefObject, RefObject, useMemo, useReducer } from "react";
import DeleteListOnClientButton from "../ComponentShared/DeleteListOnClientButton";
import DeleteOnClientButton from "../ComponentShared/DeleteOnClientButton";
import { IUseArrayRefController } from "../hooks/useArrayRef";
import SecretaryMemberCreateButton from "./SecretaryMemberCreateButton";
import { councilMemberTypeEnum } from "@/shared/constants/enum/CouncilMemberTypeEnum";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

interface Props {
    secretaryMembers: IUseArrayRefController<ICouncilMemberCreate>;
    councilMembers: IUseArrayRefController<ICouncilMemberCreate>;
    councilMembersDisable?: RefObject<ICouncilMemberCreate[]>;
    hasChange: RefObject<boolean>;
    viewOnly?: boolean;
}

export default function SecretaryMemberTable({ secretaryMembers, councilMembers, councilMembersDisable, hasChange, viewOnly }: Props) {
    // Hàm để chủ động re-render component
    const [, reRender] = useReducer(x => !x, true);

    // Query danh mục vai trò trong ban thư ký
    const rolesQuery = useCustomReactQuery({
        queryKey: ['roles'],
        axiosFn: () => service_EAQRule.getAll(),
    });

    // Xóa 1 thành viên ban thư ký
    const handleDeleteSecretaryMember = (secretaryMember: ICouncilMemberCreate) => {
        // nếu chưa có id thì xóa nó luôn
        if (!secretaryMember.id) {
            secretaryMembers.removeItem(secretaryMember);
            return;
        }
        // nếu có id thì đưa nó qua mảng disable để khi lưu gửi lên server
        const memberToDelete = secretaryMembers.removeItem(secretaryMember);
        memberToDelete && (memberToDelete.isEnabled = false, councilMembersDisable?.current.push(memberToDelete));
    }

    // Xóa nhiều thành viên ban thư ký
    const handleDeleteListSecretaryMember = (listMember: ICouncilMemberCreate[]) => {
        listMember.map((item) => {
            handleDeleteSecretaryMember(item);
        })
        reRender();
        hasChange.current = true;
    }

    // Thêm thành viên ban thư ký
    const handleCreateSecretaryMember = (listMember: ICouncilMemberCreate[]) => {
        const arrayCouncilMemberAddSuccess: string[] = [];
        listMember.map((item) => {
            const newSecretaryMember = {
                eaqRuleId: undefined,
                code: `BTK${item.user?.code}`,
                name: item.name,
                user: item.user,
                userId: item.userId,
                type: councilMemberTypeEnum.Secretariat,
                isEnabled: true
            } as ICouncilMemberCreate;
            secretaryMembers.addItem(newSecretaryMember);
            arrayCouncilMemberAddSuccess.push(item.name || "");
        })
        reRender();
        hasChange.current = true;
        return { arrayCouncilMemberAddSuccess };
    }

    const roleOptions = useMemo(() => {
        return rolesQuery.data?.map(item => ({
            value: String(item.id),
            label: String(item.name)
        })) || []
    }, [rolesQuery.data])

    const columns = useMemo<MRT_ColumnDef<ICouncilMemberCreate>[]>(() => [
        {
            accessorKey: 'code',
            header: 'Mã Thành viên',
        },
        {
            accessorFn: (row) => row.user?.fullName ?? '',
            accessorKey: 'user.fullName',
            header: 'Họ và Tên'
        },
        {
            accessorKey: 'academicTitle',
            header: 'Học hàm/Học vị',
            size: 210
        },
        { accessorKey: 'position', header: 'Chức danh' },
        {
            accessorFn: (row) => row.user?.workingUnitName ?? '',
            accessorKey: 'user.workingUnitName',
            header: 'Đơn vị công tác',
            size: 220
        },
        {
            accessorKey: 'role',
            header: 'Vai trò',
            size: 400,
            Cell({ row }) {
                return (
                    <CustomSelect
                        key={`${row.original.userId}${row.original.id}`}
                        defaultValue={String(row.original.eaqRuleId)}
                        data={roleOptions}
                        readOnly={viewOnly}
                        onChange={(value) => {
                            if (!value) return;
                            const member = row.original;
                            member.eaqRuleId = Number(value);
                            hasChange.current = true;
                        }}
                    />
                );
            },
        },
    ], [roleOptions, hasChange]);

    return (
        <CustomDataTable
            enableRowSelection={!viewOnly}
            enableRowActions
            columns={columns}
            data={secretaryMembers.values()}
            getRowId={(row) => `${row.userId}${row.id}`}
            renderTopToolbarCustomActions={({ table }) => {
                if (viewOnly) return null;
                return (
                    <>
                        <SecretaryMemberCreateButton
                            handleCreateSecretaryMember={handleCreateSecretaryMember}
                            councilMembers={councilMembers}
                            secretaryMembers={secretaryMembers}
                        />
                        <DeleteListOnClientButton
                            values={table.getSelectedRowModel().rows.map(row => row.original)}
                            handleDeleteList={handleDeleteListSecretaryMember}
                            handlResetSelection={table.resetRowSelection}
                        />
                    </>
                );
            }}
            renderRowActions={({ row, table }) => {
                if (viewOnly) return null;
                return (
                    <CustomCenterFull>
                        <DeleteOnClientButton
                            code={row.original.code || ""}
                            handleDelete={() => {
                                handleDeleteSecretaryMember(row.original);
                                reRender();
                            }}
                            handlResetSelection={table.resetRowSelection}
                        />
                    </CustomCenterFull>
                );
            }}
        />
    );
}
