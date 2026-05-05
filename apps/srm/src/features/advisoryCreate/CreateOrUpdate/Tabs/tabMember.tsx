import ExportMember from "@/features/advisoryCreate/CreateOrUpdate/Tabs/member/ExportMember";
import { titleService } from "@/shared/APIs/titleService";
import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import { SRMEvaluationMember } from "@/shared/interfaces/SRMEvaluationMember";
import { SRMLecturer } from "@/shared/interfaces/SRMLecturer";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Select } from "@mantine/core";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { useMemo } from "react";
import ChoseMember from "./member/ChoseMember";
import DeleteListMember from "./member/DeleteListMember";
import DeleteMember from "./member/DeleteMember";

interface MemberListProps {
    srmEvaluationMembers: SRMEvaluationMember[];
    onChange: (members: SRMEvaluationMember[]) => void;
    disc: UseDisclosureReturnValue;
}

export default function MemberList({ srmEvaluationMembers, onChange, disc }: MemberListProps) {
    const councilRoleQuery = useCustomReactQuery({
        queryKey: ['councilRoleList'],
        axiosFn: () => titleService.GetAllByType(EnumTitleType.Council),
        options: {
            enabled: disc[0]
        }
    });

    // filter out soft-deleted members for display (optimistic UI)
    const visibleMembers = srmEvaluationMembers.filter(member => member.isEnabled !== false);

    // Handle srmTitleId change for a specific member
    const handleRoleChange = (memberId: number, roleId: string) => {
        const updatedMembers = srmEvaluationMembers.map(member =>
            member.user?.id === memberId
                ? { ...member, srmTitleId: parseInt(roleId) }
                : member
        );
        onChange(updatedMembers);
    };

    // Define columns for the member table (now working with IEvaluationMember)
    const columns = useMemo<CustomColumnDef<SRMEvaluationMember>[]>(() => [
        {
            accessorKey: "user.code",
            header: "Mã viên chức",
            accessorFn: (row) => row.user?.code || ""
        },
        {
            accessorKey: "user.fullName",
            header: "Họ và tên",
            accessorFn: (row) => row.user?.fullName || ""
        },
        {
            accessorKey: "user.dateOfBirth",
            header: "Ngày sinh",
            accessorFn: (row) => row.user?.dateOfBirth ? dateUtils.toDDMMYYYY(row.user.dateOfBirth) : ""
        },
        {
            accessorKey: "user.gender",
            header: "Giới tính",
            type: "gender"
        },
        {
            accessorKey: "user.workingUnit.name",
            header: "Đơn vị",
            accessorFn: (row) => row.user?.workingUnit?.name || ""
        },
        {
            accessorKey: "user.email",
            header: "Email",
            accessorFn: (row) => row.user?.email || ""
        },
        {
            accessorKey: "user.phoneNumber",
            header: "Số điện thoại",
            accessorFn: (row) => row.user?.phoneNumber || ""
        },
        {
            accessorKey: "srmTitleId",
            header: "Vai trò",
            Cell: ({ row }) => (
                <Select
                    placeholder="Chọn vai trò..."
                    value={row.original.srmTitleId ? String(row.original.srmTitleId) : ''}
                    data={councilRoleQuery?.data?.map((item) => ({
                        value: String(item.id),
                        label: item.name ?? '',
                    }))}
                    onChange={(value) => {
                        if (value && row.original.user?.id) {
                            handleRoleChange(row.original.user.id, value);
                        }
                    }}
                    size="sm"
                />
            )
        },
    ], [srmEvaluationMembers, onChange, councilRoleQuery.data]);

    // Convert ILecturer[] to IEvaluationMember[] when adding new members
    const handleAddMembers = (newLecturers: SRMLecturer[]) => {
        const updatedMembers = [...srmEvaluationMembers];

        newLecturers.forEach(lecturer => {
            // Check if this lecturer already exists in the array (including soft-deleted ones)
            const existingMemberIndex = updatedMembers.findIndex(m =>
                (m.userId === lecturer.id) || (m.user?.id === lecturer.id)
            );

            if (existingMemberIndex !== -1) {
                // Case 4: Re-enable a previously soft-deleted member
                updatedMembers[existingMemberIndex] = {
                    ...updatedMembers[existingMemberIndex],
                    isEnabled: true, // Re-enable the member
                    user: lecturer, // Update user menuData in case it changed
                };
            } else {
                // Case 1: Add completely new member
                const newEvaluationMember: SRMEvaluationMember = {
                    id: 0, // New member, will be assigned by backend
                    userId: lecturer.id,
                    user: lecturer,
                    srmTitleId: undefined, // Initialize as undefined
                    order: 0,
                    srmEvaluationCommitteeId: 0, // Will be set when saving
                    isEnabled: true, // New members are enabled by default
                };
                updatedMembers.push(newEvaluationMember);
            }
        });

        onChange(updatedMembers);
    };

    const handleRemoveMembers = (selectedRows: SRMEvaluationMember[]) => {
        const updatedMembers = srmEvaluationMembers.map(member => {
            const shouldRemove = selectedRows.some(selected => {
                // Check if this member should be removed
                return (selected.id && member.id === selected.id) ||
                    (selected.userId && member.userId === selected.userId) ||
                    (selected.user?.id && member.user?.id === selected.user.id);
            });

            if (shouldRemove) {
                if (member.id && member.id > 0) {
                    // Case 3: Existing member - soft delete (set isEnabled = false)
                    return { ...member, isEnabled: false };
                } else {
                    // Case 2: New member - mark for removal (will be filtered out)
                    return null;
                }
            }
            return member;
        }).filter(member => member !== null) as SRMEvaluationMember[];

        onChange(updatedMembers);
    };

    // Extract current lecturers for ChoseMember component (only visible ones)
    const selectedLecturers: SRMLecturer[] = visibleMembers
        .map(member => member.user)
        .filter((user): user is SRMLecturer => user !== undefined && user !== null && user.id !== undefined);

    return (
        <CustomDataTable
            columns={columns}
            data={visibleMembers} // Show only enabled members
            enableRowSelection={visibleMembers.length > 0}
            initialState={{
                columnPinning: {
                    right: ['srmTitleId']
                }
            }}
            renderTopToolbarCustomActions={({ table }) => {
                const selectedRows = table.getSelectedRowModel().flatRows.map(row => row.original);

                return (
                    <>
                        <ChoseMember
                            onSelect={handleAddMembers}
                            selectedMembers={selectedLecturers}
                        />
                        <ExportMember councilRoleData={councilRoleQuery.data} table={table} />
                        < DeleteListMember
                            handleRemoveMembers={handleRemoveMembers}
                            currentDatas={selectedRows}
                            clearSelection={table.resetRowSelection}
                        />
                    </>
                );
            }}
            renderRowActions={({ row }) => (
                <CustomCenterFull>
                    <DeleteMember
                        handleRemoveMembers={handleRemoveMembers}
                        currentData={row.original}
                    />
                </CustomCenterFull>
            )}
        />
    );
}
