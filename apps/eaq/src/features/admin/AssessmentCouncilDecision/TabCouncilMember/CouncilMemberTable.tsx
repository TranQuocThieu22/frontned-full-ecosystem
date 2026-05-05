"use client";

import { service_EAQRule } from "@/shared/APIs/service_EAQRule";
import { ICouncilMemberCreate } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilMemberCreate";
import { Select } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { MutableRefObject, useMemo, useReducer } from "react";
import { formatListMessage } from "../ComponentShared/CouncilFunction";
import CreateMemberFromListStaffButton from "../ComponentShared/CreateMemberFromListStaffButton";
import DeleteListOnClientButton from "../ComponentShared/DeleteListOnClientButton";
import DeleteOnClientButton from "../ComponentShared/DeleteOnClientButton";
import { IUseArrayRefController } from "../hooks/useArrayRef";
import { councilMemberTypeEnum } from "@/shared/constants/enum/CouncilMemberTypeEnum";
import { IAccount } from "@/shared/interfaces/account/IAccount";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";

interface Props {
    councilMembers: IUseArrayRefController<ICouncilMemberCreate>;
    councilMembersDisable?: MutableRefObject<ICouncilMemberCreate[]>;
    hasChange: MutableRefObject<boolean>;
    viewOnly?: boolean;
}

export default function CouncilMemberTable({ councilMembers, councilMembersDisable, hasChange, viewOnly }: Props) {
    // Hàm để chủ động re-render component
    const [, reRender] = useReducer(x => !x, true);

    // Query danh mục vai trò trong hội đồng
    const rolesQuery = useCustomReactQuery({
        queryKey: ['roles'],
        axiosFn: () => service_EAQRule.getAll(),
    });

    // Xóa 1 thành viên hội đồng
    const handleDeleteCouncilMember = (councilMember: ICouncilMemberCreate) => {
        // nếu chưa có id thì xóa nó luôn
        if (!councilMember.id) {
            councilMembers.removeItem(councilMember);
            return;
        }
        const memberToDelete = councilMembers.removeItem(councilMember);
        memberToDelete && (memberToDelete.isEnabled = false, councilMembersDisable?.current.push(memberToDelete));
    }

    // Xóa nhiều thành viên hội đồng
    const handleDeleteListCouncilMember = (listMember: ICouncilMemberCreate[]) => {
        listMember.map((item) => {
            handleDeleteCouncilMember(item);
        })
        reRender();
        hasChange.current = true;
    }

    // Thêm thành viên hội đồng
    const handleAddCouncilMember = (listAccount: IAccount[]) => {
        const arrayCouncilMemberAddSuccess: string[] = [];

        listAccount.map((item) => {
            const councilMember = {
                eaqRuleId: undefined,
                code: `HD${item.code}`,
                name: item.fullName,
                user: item,
                userId: item.id,
                type: councilMemberTypeEnum.CouncilMember,
                isEnabled: true
            } as ICouncilMemberCreate;
            councilMembers.addItem(councilMember);
            arrayCouncilMemberAddSuccess.push(item.fullName || "");
        })

        // message success
        const messageSuccess =
            arrayCouncilMemberAddSuccess.length > 0 ? (
                <>
                    Thêm viên chức{" "}
                    {formatListMessage(arrayCouncilMemberAddSuccess, "#1971c2")} vào hội đồng thành công
                </>
            ) : undefined;

        reRender();
        hasChange.current = true;
        return { messageSuccess };
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
            accessorKey: 'eaqRuleId',
            header: 'Vai trò',
            size: 400,
            Cell({ row }) {
                return (
                    <CustomSelect
                        key={`${row.original.userId}${row.original.id}`}
                        defaultValue={String(row.original.eaqRuleId ?? '')}
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
    ], [hasChange, roleOptions]);

    return (
        <CustomDataTable
            enableRowSelection={!viewOnly}
            enableRowActions
            columns={columns}
            data={councilMembers.values()}
            getRowId={(row) => `${row.userId}${row.id}`}
            renderTopToolbarCustomActions={({ table }) => {
                if (viewOnly) return null;
                return (
                    <>
                        <CreateMemberFromListStaffButton
                            handleCreateMember={handleAddCouncilMember}
                            councilMembers={councilMembers}
                        />
                        <DeleteListOnClientButton
                            values={table.getSelectedRowModel().rows.map(row => row.original)}
                            handleDeleteList={handleDeleteListCouncilMember}
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
                                handleDeleteCouncilMember(row.original);
                                reRender();
                                hasChange.current = true;
                            }}
                            handlResetSelection={table.resetRowSelection}
                        />
                    </CustomCenterFull>
                );
            }}
        />
    );
}
