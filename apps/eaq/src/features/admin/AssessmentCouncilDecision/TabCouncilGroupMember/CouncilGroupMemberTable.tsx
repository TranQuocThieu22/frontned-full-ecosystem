"use client";

import { ICouncilGroup } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroup";
import { ICouncilGroupMemberCreate } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroupMemberCreate";
import { service_EAQRule } from "@/shared/APIs/service_EAQRule";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { Select, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { MRT_ColumnDef } from "mantine-react-table";
import { forwardRef, RefObject, useImperativeHandle, useMemo, useReducer } from "react";
import { formatListMessage } from "../ComponentShared/CouncilFunction";
import CreateMemberFromListStaffButton from "../ComponentShared/CreateMemberFromListStaffButton";
import DeleteListOnClientButton from "../ComponentShared/DeleteListOnClientButton";
import DeleteOnClientButton from "../ComponentShared/DeleteOnClientButton";
import { IUseArrayRefController } from "../hooks/useArrayRef";
import CouncilGroupMemberImportButton from "./CouncilGroupMemberImportButton";

interface Props {
    councilGroups: IUseArrayRefController<ICouncilGroup>;
    councilGroupMembersNoGroup: IUseArrayRefController<ICouncilGroupMemberCreate>;
    showValidate: RefObject<boolean>;
    hasChange: RefObject<boolean>;
    viewOnly?: boolean;
}

interface ICouncilGroupMemberRow {
    member: ICouncilGroupMemberCreate
    group?: ICouncilGroup
}

const CouncilGroupMemberTable = forwardRef(({ hasChange, councilGroups, councilGroupMembersNoGroup, showValidate, viewOnly }: Props, ref) => {

    // Hàm để chủ động re-render component
    const [render, reRender] = useReducer(x => !x, true);

    // Query danh mục vai trò trong hội đồng
    const rolesQuery = useCustomReactQuery({
        queryKey: ['roles'],
        axiosFn: () => service_EAQRule.getAll(),
    });

    // Định nghĩa ref
    useImperativeHandle(ref, () => ({
        reRenderComponent: () => reRender(),
    }));

    // Thêm thành viên nhóm công tác
    const handleCreateCouncilGroupMember = (listAccount: Account[]) => {
        const arrayCouncilMemberAddSuccess: string[] = [];

        listAccount.map((item) => {
            const councilGroupMember = {
                eaqRuleId: undefined,
                code: `NCT${item.code}`,
                name: item.fullName,
                user: item,
                userId: item.id,
                isEnabled: true,
                timestampCreateOnUI: Date.now(),
            } as ICouncilGroupMemberCreate;
            councilGroupMembersNoGroup.addItem(councilGroupMember);
            arrayCouncilMemberAddSuccess.push(item.fullName || "");
        })

        // message success
        const messageSuccess =
            arrayCouncilMemberAddSuccess.length > 0 ? (
                <>
                    Đã thêm viên chức{" "}
                    {formatListMessage(arrayCouncilMemberAddSuccess, "#1971c2")} thành công
                </>
            ) : undefined;

        showValidate.current = false;
        reRender();
        hasChange.current = true;
        return { messageSuccess };
    }

    // Xóa 1 thành viên nhóm công tác
    const handleDeleteCouncilGroupMember = (groupMemberRow: ICouncilGroupMemberRow) => {
        // nếu chưa là thành viên của bất kỳ nhóm nào, xóa nó trong danh sách chưa phân nhóm
        if (!groupMemberRow.group) {
            councilGroupMembersNoGroup.removeItem(groupMemberRow.member);
            return;
        }
        // nếu đã là thành viên của nhóm nào đó
        /// nếu mới vừa thêm local, xóa nó trong nhóm đó luôn
        if (!groupMemberRow.member.id) {
            councilGroups.arrayHelpers.removeItem(groupMemberRow.group.eaqCouncilGroupMembers || [], groupMemberRow.member)
            return;
        }
        /// nếu đã lưu database
        groupMemberRow.member.isEnabled = false;
    }

    // Xóa nhiều thành viên nhóm công tác
    const handleDeleteListCouncilGroupMember = (listMember: ICouncilGroupMemberRow[]) => {
        listMember.map((item) => {
            handleDeleteCouncilGroupMember(item);
        })
        hasChange.current = true;
        reRender();
    }

    // check user exsiting in group
    /** - if user existing return undefined
     * - if user not existing return group */
    function checkUserNotExistingInGroup(groupCode: string, groupId?: number, userId?: number) {
        const groupToAddMember = councilGroups.getItem(group => group.code === groupCode && group.id === groupId);
        const memberExistingInGroup = groupToAddMember?.eaqCouncilGroupMembers?.find(member => member.userId === userId && member.isEnabled === true);
        if (memberExistingInGroup) { // nếu đã tồn tại trong nhóm mới thì cấm lưu
            notifications.show({
                color: "red",
                title: "Thất bại, thành viên đã tồn tại",
                message: (
                    <>
                        Viên chức{" "}
                        <Text fw={700} c="#c21919c2" span>
                            {memberExistingInGroup.user?.fullName}
                        </Text>{" "}
                        đã tồn tại trong nhóm{" "}
                        <Text fw={700} c="#c21919c2" span>
                            {groupCode}
                        </Text>.
                    </>
                ),
            });
            return undefined;
        }
        return groupToAddMember;
    }

    // Handle select council group for member
    function handleSelectCouncilGroup(memberRow: ICouncilGroupMemberRow, groupCode: string, groupId?: number) {
        // nếu user này chưa có nhóm
        if (!memberRow.group) {
            const groupToAddMember = checkUserNotExistingInGroup(groupCode, groupId, memberRow.member.userId);
            /// nếu chưa tồn tại trong nhóm mới
            if (groupToAddMember) {
                !groupToAddMember.eaqCouncilGroupMembers && (groupToAddMember.eaqCouncilGroupMembers = []);
                groupToAddMember.eaqCouncilGroupMembers.push(memberRow.member);
                councilGroupMembersNoGroup.removeItem(memberRow.member);
                return;
            }
            /// nếu đã tồn tại trong nhóm mới thì không thêm
            memberRow.member.timestampCreateOnUI = Date.now(); // để render lại cho đúng dữ liệu hiển thị trong select
            return;
        }
        // nếu user này có nhóm rồi (chuyển nhóm)
        const newCouncilGroupToAdd = councilGroups.getItem(group => group.code === groupCode && group.id === groupId);
        if (!newCouncilGroupToAdd) return;
        const memberExistingInGroup = newCouncilGroupToAdd?.eaqCouncilGroupMembers?.some(member => member.userId === memberRow.member.userId && member.isEnabled === true);
        /// nếu không tồn tại trong nhóm mới thì set nó vào nhóm mới
        if (!memberExistingInGroup) {
            !newCouncilGroupToAdd.eaqCouncilGroupMembers && (newCouncilGroupToAdd.eaqCouncilGroupMembers = []);
            newCouncilGroupToAdd.eaqCouncilGroupMembers.push(memberRow.member);
            councilGroups.arrayHelpers.removeItem(memberRow.group.eaqCouncilGroupMembers || [], memberRow.member);
            return;
        }
        /// nếu đã tồn tại trong nhóm mới thì cấm lưu
        memberRow.member.timestampCreateOnUI = Date.now();// để render lại cho đúng dữ liệu hiển thị trong select
        notifications.show({
            color: "red",
            title: "Thất bại, thành viên đã tồn tại",
            message: (
                <>
                    Viên chức{" "}
                    <Text fw={700} c="#c21919c2" span>
                        {memberRow.member?.user?.fullName}
                    </Text>{" "}
                    đã tồn tại trong nhóm{" "}
                    <Text fw={700} c="#c21919c2" span>
                        {groupCode}
                    </Text>.
                </>
            ),
        });
        hasChange.current = true;
    }

    const dataGroupOptions = useMemo(() => {
        return councilGroups.mapTo(item => ({
            value: `${item.id}-${item.code}`,
            label: `${item.code}`,
            groupCode: item.code,
            groupId: item.id
        })) || []
    }, [councilGroups, render])


    const roleOptions = useMemo(() => {
        return rolesQuery.data?.map(item => ({
            value: String(item.id),
            label: String(item.name)
        })) || []
    }, [rolesQuery.data])


    const memberRowData: ICouncilGroupMemberRow[] = useMemo(() => {
        return councilGroups.flatMapTo((group) =>
            group.eaqCouncilGroupMembers?.flatMap(member =>
                member.isEnabled ? [{ member, group }] : []
            ) ?? []
        )
    }, [councilGroups, render]);

    const memberNoGroupData: ICouncilGroupMemberRow[] = useMemo(() => {
        return councilGroupMembersNoGroup.mapTo(item => ({
            member: item,
            group: undefined,
        }))
    }, [councilGroupMembersNoGroup, render]);

    const columns = useMemo<MRT_ColumnDef<ICouncilGroupMemberRow>[]>(() => [
        {
            accessorKey: "councilGroupCode",
            header: "Mã nhóm",
            size: 200,
            Cell: ({ row, table }) => {
                const rowData = row.original;
                return (
                    <CustomSelect
                        key={`${rowData.member.userId}-${rowData.member.id}-${rowData.group?.id}-${rowData.group?.code}-${rowData.member.timestampCreateOnUI}-GroupSelect`}
                        defaultValue={`${rowData.group?.id}-${rowData.group?.code}`}
                        placeholder={dataGroupOptions.length === 0 ? "DS nhóm trống" : "Chọn nhóm"}
                        data={dataGroupOptions}
                        error={(!rowData.group && showValidate.current) && "Vui lòng chọn nhóm"}
                        onChange={(value, option) => {
                            if (!value) return;
                            const groupId = (option as any).groupId || undefined;
                            const groupCode = (option as any).groupCode || "";
                            handleSelectCouncilGroup(rowData, groupCode, groupId);
                            table.resetRowSelection();
                            reRender();
                        }}
                        readOnly={viewOnly}
                    />
                )
            },
        },
        {
            accessorKey: "councilGroupName",
            header: "Tên nhóm",
            size: 200,
            Cell({ row }) {
                return row.original.group?.name ?? ""
            },
        },
        {
            accessorKey: "code",
            header: "Mã Thành viên",
            Cell({ row }) {
                return row.original.member.code
            },
        },
        {
            accessorFn: (row) => row.member?.user?.fullName ?? '',
            accessorKey: "user.fullName",
            header: "Họ và Tên",
        },
        {
            accessorKey: "academicTitle",
            header: "Học hàm/Học vị",
            size: 210,
        },
        {
            accessorKey: "position",
            header: "Chức danh",
        },
        {
            accessorFn: (row) => row.member?.user?.workingUnitName ?? '',
            accessorKey: "user.workingUnitName",
            header: "Đơn vị công tác",
            size: 220
        },
        {
            accessorKey: 'role',
            header: 'Vai trò',
            size: 400,
            Cell({ row }) {
                return (
                    <CustomSelect
                        key={`${row.original.member.userId}-${row.original.member.id}-${row.original.group?.id}-${row.original.group?.code}-${row.original.member.timestampCreateOnUI}-RoleSelect`}
                        defaultValue={String(row.original.member?.eaqRuleId)}
                        placeholder="Chọn vai trò"
                        data={roleOptions}
                        readOnly={viewOnly}
                        onChange={(value) => {
                            const member = row.original.member;
                            member.eaqRuleId = value ? Number(value) : undefined;
                        }}
                    />
                );
            },
        },
    ], [dataGroupOptions, roleOptions]);

    return (
        <CustomDataTable
            enableRowSelection={!viewOnly}
            columns={columns}
            data={memberNoGroupData.concat(memberRowData)}
            getRowId={(row) => `${row.member.userId}-${row.member.id}-${row.group?.id}-${row.group?.code}`}
            renderTopToolbarCustomActions={({ table }) => {
                if(viewOnly) return null;
                return (
                    <>
                        <CreateMemberFromListStaffButton
                            handleCreateMember={handleCreateCouncilGroupMember}
                            councilGroupMembersNoGroup={councilGroupMembersNoGroup}
                        />
                        <CouncilGroupMemberImportButton
                            groupList={councilGroups.values()}
                            roleList={rolesQuery.data || []}
                            reRenderComponent={reRender}
                            councilGroupMembersNoGroup={councilGroupMembersNoGroup}
                            hasChange={hasChange}
                        />
                        <DeleteListOnClientButton
                            values={table.getSelectedRowModel().rows.map(row => row.original)}
                            handleDeleteList={handleDeleteListCouncilGroupMember}
                            handlResetSelection={table.resetRowSelection}
                            tranformContextData={(item) => item.member?.code || ""}
                        />
                    </>
                );
            }}
            renderRowActions={({ row, table }) => {
                if(viewOnly) return null;
                return (
                    <CustomCenterFull>
                        <DeleteOnClientButton
                            code={row.original.member?.code || ""}
                            handleDelete={() => {
                                handleDeleteCouncilGroupMember(row.original);
                                hasChange.current = true;
                                reRender();
                            }}
                            handlResetSelection={table.resetRowSelection}
                        />
                    </CustomCenterFull>
                );
            }}
        />
    );
});

CouncilGroupMemberTable.displayName = "CouncilGroupMemberTable";
export default CouncilGroupMemberTable;
