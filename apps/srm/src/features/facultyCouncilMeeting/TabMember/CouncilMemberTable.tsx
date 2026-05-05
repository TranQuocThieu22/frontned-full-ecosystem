"use client";

import DisplayConclusionStatus from "@/features/councilConclusionList/DisplayConclusionStatus";
import DeleteListOnClientButton from "@/features/reviewCommitteeSetup/ComponentShared/DeleteListOnClientButton";
import { acceptanceCouncilService } from "@/shared/APIs/acceptanceCouncilService";
import ConclusionSelectShared from "@/shared/features/ConclusionSelectShared";
import { SRMAcceptanceContractMember } from "@/shared/interfaces/SRMAcceptanceContractMember";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { MutableRefObject, useMemo } from "react";
import CouncilMemberExport from "./CouncilMemberExport";

interface Props {
    memberList: SRMAcceptanceContractMember[];
    hasChange: MutableRefObject<boolean>;
    acceptanceCouncilId?: number
    contractCode?: string;
}

export default function CouncilMemberTable({ memberList, hasChange, acceptanceCouncilId, contractCode }: Props) {

    const conclusionQuery = useCustomReactQuery({
        queryKey: ['conclusion_list'],
        axiosFn: () => acceptanceCouncilService.getConclusionByAcceptanceCouncilId({ AcceptanceCouncilId: acceptanceCouncilId }),
    })

    const conclusionOptions = useMemo(() => {
        return conclusionQuery.data?.map(item => ({
            value: String(item.id),
            label: String(item.name),
            color: item.color
        })) ?? [];
    }, [conclusionQuery.data]);

    // Xóa thông tin nhận xét của 1 thành viên
    const handleDeleteMember = (reviewMember: SRMAcceptanceContractMember) => {
        reviewMember.srmConclusionId = undefined;
        reviewMember.srmConclusion = undefined;
        if (reviewMember.id === 0) reviewMember.isEnabled = false;
    }

    // Xóa thông tin nhận xét của nhiều thành viên
    const handleDeleteListMember = (listMember: SRMAcceptanceContractMember[]) => {
        listMember.map((item) => {
            handleDeleteMember(item);
        })
        hasChange.current = true;
    }

    const columns = useMemo<MRT_ColumnDef<SRMAcceptanceContractMember>[]>(() => [
        {
            accessorKey: 'memberCode',
            header: 'Mã thành viên',
            accessorFn: (row) => row.srmAcceptanceMember?.user?.code
        },
        {
            accessorKey: 'memberFullName',
            header: 'Họ và Tên',
            accessorFn: (row) => row.srmAcceptanceMember?.user?.fullName
        },
        {
            accessorKey: 'srmTitleId',
            header: 'Vai trò',
            accessorFn: (row) => row.srmAcceptanceMember?.srmTitle?.name
        },
        {
            accessorKey: "srmConclusion",
            header: "Kết luận",
            size: 300,
            Cell({ row }) {
                const member = row.original;
                return (
                    <ConclusionSelectShared
                        data={conclusionOptions}
                        isLoading={conclusionQuery.isFetching}
                        isError={conclusionQuery.isError}
                        defaultColor={member.srmConclusion?.color}
                        variant="light"
                        key={`${member.srmAcceptanceMemberId}-${member.id}-${member.srmConclusionId}`}
                        defaultValue={String(member.srmConclusionId ?? '')}
                        renderOption={(comboboxItem) =>
                            <DisplayConclusionStatus
                                title={comboboxItem.option.label}
                                color={(comboboxItem.option as any).color}
                                fz={13}
                            />
                        }
                        allowDeselect={false}
                        comboboxProps={{ dropdownPadding: 10 }}
                        onChange={(value, option) => {
                            member.srmConclusionId = !value ? undefined : Number(value);
                            !member.srmConclusion && (member.srmConclusion = {})
                            member.srmConclusion.color = (option as any).color;
                            member.srmConclusion.name = option.label;
                            member.isEnabled = true;
                            hasChange.current = true;
                        }}
                    />
                );
            },
        }
    ], [conclusionOptions, conclusionQuery.isError, conclusionQuery.isFetching]);

    return (
        <CustomDataTable
            enableRowSelection
            columns={columns}
            data={memberList}
            getRowId={(row) => `${row.id}${row.srmAcceptanceMemberId}`}
            renderTopToolbarCustomActions={({ table }) => {
                const dataSelected = table.getSelectedRowModel().flatRows.flatMap((item) => item.original);
                return (
                    <>
                        <CouncilMemberExport
                            contractCode={contractCode}
                            data={dataSelected?.length > 0 ? dataSelected : memberList}
                        />
                        <DeleteListOnClientButton
                            values={dataSelected}
                            handleDeleteList={handleDeleteListMember}
                            handlResetSelection={table.resetRowSelection}
                            formatContextData={(item) => item.srmAcceptanceMember?.user?.code ?? ""}
                            customMessage={(contextData) => <Text>
                                Bạn sắp xóa dữ liệu đánh giá của thành viên <Text c="red" fw={700} span>{contextData || ""}</Text>. Bạn có chắc chắn muốn tiếp tục?
                            </Text>}
                        />
                    </>
                );
            }}
        />
    );
}