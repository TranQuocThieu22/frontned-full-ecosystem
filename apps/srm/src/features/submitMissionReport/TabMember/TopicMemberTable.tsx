"use client";

import DeleteListOnClientButton from "@/features/reviewCommitteeSetup/ComponentShared/DeleteListOnClientButton";
import DeleteOnClientButton from "@/features/reviewCommitteeSetup/ComponentShared/DeleteOnClientButton";
import { formatListMessage } from "@/features/reviewCommitteeSetup/ComponentShared/ReviewCommitteeFunction";
import CreateMemberFromLecturerButton from "@/features/reviewCommitteeSetup/TabMember/CreateMemberFromLecturerButton";
import { titleService } from "@/shared/APIs/titleService";
import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import { SRMLecturer } from "@/shared/interfaces/SRMLecturer";
import { SRMTopicMember } from "@/shared/interfaces/SRMTopicMember";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { genderEnum, genderLabel } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Select } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { Dispatch, MutableRefObject, SetStateAction, useMemo } from "react";
import TopicMemberExportButton from "./TopicMemberExportButton";

interface Props {
    memberList: SRMTopicMember[];
    setTopicMemberList: Dispatch<SetStateAction<SRMTopicMember[]>>
    memberDisableList?: MutableRefObject<SRMTopicMember[]>;
    hasChange?: MutableRefObject<boolean>;
    topicCode?: string;
    readonly?: boolean;
}

export default function TopicMemberTable({ memberList, memberDisableList, hasChange, topicCode = "", readonly, setTopicMemberList }: Props) {

    const rolesQuery = useCustomReactQuery({
        queryKey: ['titles_type_research_project'],
        axiosFn: () => titleService.GetAllByType(EnumTitleType.ResearchProject),
        options: {
            enabled: !readonly
        }
    });

    // Xóa 1 thành viên
    const handleDeleteMember = (reviewMember: SRMTopicMember) => {
        hasChange && (hasChange.current = true);
        // nếu chưa có id thì xóa nó luôn
        if (!reviewMember.id) {
            setTopicMemberList((prev) => prev.filter((i) => i !== reviewMember));
            return;
        }
        // nếu có id thì đưa nó qua mảng disable để khi lưu gửi lên server
        setTopicMemberList((prev) => prev.filter((i) => i !== reviewMember));
        reviewMember.isEnabled = false;
        memberDisableList?.current.push(reviewMember);
    }

    // Xóa nhiều thành viên
    const handleDeleteListMember = (listMember: SRMTopicMember[]) => {
        setTopicMemberList((prev) => prev.filter((i) => !listMember.includes(i)));
        listMember.map((item) => {
            item.isEnabled = false;
            item.id && memberDisableList?.current.push(item);
        })
        hasChange && (hasChange.current = true);
    }

    // Thêm thành viên
    const handleAddMember = (listUser: SRMLecturer[]) => {
        const arrayCouncilMemberAddSuccess: string[] = [];

        listUser.map((item) => {
            const newMember = {
                code: item.code,
                name: item.fullName,
                user: item,
                userId: item.id,
                isEnabled: true
            } as SRMTopicMember;
            memberList.push(newMember);
            arrayCouncilMemberAddSuccess.push(item.fullName || "");
        })
        const messageSuccess = arrayCouncilMemberAddSuccess.length > 0
            ? (
                <>
                    Thêm viên chức{" "}
                    {formatListMessage(arrayCouncilMemberAddSuccess, "#1971c2")}
                    {" "}thành công
                </>
            ) : undefined
        hasChange && (hasChange.current = true);
        setTopicMemberList((prev) => [...prev]);
        return { messageSuccess };
    }

    const roleOptions = useMemo(() => {
        return rolesQuery.data?.map(item => ({
            value: String(item.id),
            label: String(item.name),
        })) ?? [];
    }, [rolesQuery.data]);

    const columns = useMemo<MRT_ColumnDef<SRMTopicMember>[]>(() => [
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
            Cell: ({ row }) => row.original.user?.dateOfBirth ? dateUtils.toDDMMYYYY(row.original.user?.dateOfBirth) : '',
        },
        {
            accessorKey: 'user.gender',
            header: 'Giới tính',
            Cell: ({ row }) => genderLabel[row.original.user?.gender as genderEnum]
        },
        {
            accessorKey: 'user.workingUnitName',
            header: 'Đơn vị',
            Cell: ({ row }) => row.original.user?.workingUnit?.name ?? ''
        },
        {
            accessorKey: 'user.jobTitle',
            header: 'Chức vụ',
            Cell: ({ row }) => row.original.user?.jobTitle ?? ''
        },
        {
            accessorKey: 'srmTitleId',
            header: 'Vai trò',
            size: 400,
            Cell({ row }) {
                if (readonly) {
                    return row.original.srmTitle?.name
                }
                return (
                    <Select
                        key={`${row.original.userId}-${row.original.id}`}
                        defaultValue={String(row.original.srmTitleId ?? '')}
                        data={roleOptions}
                        onChange={(value) => {
                            const member = row.original;
                            member.srmTitleId = !value ? undefined : Number(value);
                            hasChange && (hasChange.current = true);
                        }}
                    />
                );
            },
        },
    ], [hasChange, roleOptions]);

    return (
        <CustomDataTable
            enableRowSelection
            columns={columns}
            data={memberList}
            getRowId={(row) => `${row.id}${row.userId}`}
            initialState={{
                columnPinning: { right: ['srmTitleId'] }
            }}
            renderTopToolbarCustomActions={({ table }) => {
                const dataSelected = table.getSelectedRowModel().flatRows.flatMap((item) => item.original);
                if (!readonly) {
                    return (
                        <>
                            <CreateMemberFromLecturerButton
                                handleCreateMember={handleAddMember}
                                isDisableRow={(rowOriginal) => memberList?.some((item) => item.userId === rowOriginal.id) || false}
                            />
                            <TopicMemberExportButton dataSelected={dataSelected?.length > 0 ? dataSelected : memberList || []} topicCode={topicCode} />
                            <DeleteListOnClientButton
                                values={dataSelected}
                                handleDeleteList={handleDeleteListMember}
                                handlResetSelection={table.resetRowSelection}
                                formatContextData={(item: any) => item.user?.code}
                            />
                        </>
                    );
                }
            }}
            renderRowActions={
                !readonly
                    ? ({ row, table }) => (
                        <CustomCenterFull>
                            <DeleteOnClientButton
                                contextData={row.original.user?.code || ""}
                                handleDelete={() => {
                                    handleDeleteMember(row.original);
                                }}
                                handlResetSelection={table.resetRowSelection}
                            />
                        </CustomCenterFull>
                    )
                    : undefined
            }
        />
    );
}