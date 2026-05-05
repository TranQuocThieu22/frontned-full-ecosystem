"use client";

import { IUseArrayRefController } from "@/features/reviewCommitteeSetup/hooks/useArrayRef";
import { titleService } from "@/shared/APIs/titleService";
import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import { SRMLecturer } from "@/shared/interfaces/SRMLecturer";
import { SRMReviewMember } from "@/shared/interfaces/SRMReviewMember";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { genderEnum, genderLabel } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Select } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { MutableRefObject, useMemo, useState } from "react";
import DeleteListOnClientButton from "../ComponentShared/DeleteListOnClientButton";
import DeleteOnClientButton from "../ComponentShared/DeleteOnClientButton";
import { formatListMessage } from "../ComponentShared/ReviewCommitteeFunction";
import CreateMemberFromLecturerButton from "./CreateMemberFromLecturerButton";
import ReviewMemberExportButton from "./ReviewMemberExportButton";

interface Props {
    memberList: IUseArrayRefController<SRMReviewMember>;
    memberDisableList?: MutableRefObject<SRMReviewMember[]>;
    hasChange: MutableRefObject<boolean>;
    reviewCommitteeCode?: string;
}

export default function ReviewMemberTable({ memberList, memberDisableList, hasChange, reviewCommitteeCode = "" }: Props) {
    const [, reRenderComponent] = useState(false);

    const rolesQuery = useCustomReactQuery({
        queryKey: ['titles_type_council'],
        axiosFn: () => titleService.GetAllByType(EnumTitleType.Council)
    });

    // Xóa 1 thành viên hội đồng
    const handleDeleteMember = (reviewMember: SRMReviewMember) => {
        // nếu chưa có id thì xóa nó luôn
        if (!reviewMember.id) {
            memberList.removeItem(reviewMember);
            return;
        }
        // nếu có id thì đưa nó qua mảng disable để khi lưu gửi lên server
        const memberRemoved = memberList.removeItem(reviewMember);
        memberRemoved && (memberRemoved.isEnabled = false, memberDisableList?.current.push(memberRemoved));
    }

    // Xóa nhiều thành viên hội đồng
    const handleDeleteListMember = (listMember: SRMReviewMember[]) => {
        listMember.map((item) => {
            handleDeleteMember(item);
        })
        reRenderComponent(prev => !prev);
        hasChange.current = true;
    }

    // Thêm thành viên hội đồng
    const handleAddMember = (listUser: SRMLecturer[]) => {
        const arrayCouncilMemberAddSuccess: string[] = [];

        listUser.map((item) => {
            const newMember = {
                code: item.code,
                name: item.fullName,
                user: item,
                userId: item.id,
                isEnabled: true
            } as SRMReviewMember;
            memberList.addItem(newMember);
            arrayCouncilMemberAddSuccess.push(item.fullName || "");
        })

        const messageSuccess = arrayCouncilMemberAddSuccess.length > 0
            ? (
                <>
                    Thêm viên chức{" "}
                    {formatListMessage(arrayCouncilMemberAddSuccess, "#1971c2")}
                    {" "}vào hội đồng thành công
                </>
            ) : undefined

        reRenderComponent(prev => !prev);
        hasChange.current = true;
        return { messageSuccess };
    }

    const roleOptions = useMemo(() => {
        return rolesQuery.data?.map(item => ({
            value: String(item.id),
            label: String(item.name),
        })) ?? [];
    }, [rolesQuery.data]);

    const columns = useMemo<MRT_ColumnDef<SRMReviewMember>[]>(() => [
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
            size: 400,
            Cell({ row }) {
                return (
                    <Select
                        key={`${row.original.userId}-${row.original.id}`}
                        defaultValue={String(row.original.srmTitleId ?? '')}
                        data={roleOptions}
                        onChange={(value) => {
                            const member = row.original;
                            member.srmTitleId = !value ? undefined : Number(value);
                            hasChange.current = true;
                        }}
                    />
                );
            },
        },
    ], [hasChange, roleOptions]);

    return (
        <CustomDataTable
            enableRowSelection
            enableRowActions
            columns={columns}
            data={memberList.values()}
            getRowId={(row) => `${row.id}-${row.userId}`}
            initialState={{
                columnPinning: { right: ['srmTitleId'] }
            }}
            renderTopToolbarCustomActions={({ table }) => {
                const dataSelected = table.getSelectedRowModel().flatRows.flatMap((item) => item.original);
                return (
                    <>
                        <CreateMemberFromLecturerButton
                            handleCreateMember={handleAddMember}
                            isDisableRow={(rowOriginal) => memberList?.hasItem((item) => item.userId === rowOriginal.id)}
                        />
                        <ReviewMemberExportButton
                            dataSelected={dataSelected?.length > 0 ? dataSelected : memberList?.values() || []}
                            councilCode={reviewCommitteeCode}
                            roleList={rolesQuery.data}
                        />
                        <DeleteListOnClientButton
                            values={dataSelected}
                            handleDeleteList={handleDeleteListMember}
                            handlResetSelection={table.resetRowSelection}
                        />
                    </>
                );
            }}
            renderRowActions={({ row, table }) => {
                return (
                    <CustomCenterFull>
                        <DeleteOnClientButton
                            contextData={row.original.code || ""}
                            handleDelete={() => {
                                handleDeleteMember(row.original);
                                reRenderComponent(prev => !prev);
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