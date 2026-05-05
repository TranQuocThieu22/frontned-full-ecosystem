"use client";

import DisplayConclusionStatus from "@/features/councilConclusionList/DisplayConclusionStatus";
import DeleteListOnClientButton from "@/features/reviewCommitteeSetup/ComponentShared/DeleteListOnClientButton";
import { reviewCommitteeService } from "@/shared/APIs/reviewCommitteeService";
import { EnumEvaluationType, EnumLabelEvaluationType } from "@/shared/consts/enum/EnumEvaluationType";
import ConclusionSelectShared from "@/shared/features/ConclusionSelectShared";
import { SRMCriteria } from "@/shared/interfaces/SRMCriteria";
import { SRMProposalMember } from "@/shared/interfaces/SRMProposalMember";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Center, Checkbox, NumberInput, Text, Textarea, Tooltip } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { MutableRefObject, useMemo } from "react";

interface Props {
    memberList: SRMProposalMember[];
    criteriaList: SRMCriteria[];
    srmReviewCommitteeId?: number;
    proposalCode?: string
    hasChange: MutableRefObject<boolean>
}

const columnSizeMap: Record<EnumEvaluationType, number> = {
    [EnumEvaluationType.Score]: 200,
    [EnumEvaluationType.YesNo]: 200,
    [EnumEvaluationType.Text]: 400,
}

export default function ReviewMemberTableOld({ memberList, criteriaList, srmReviewCommitteeId, proposalCode, hasChange }: Props) {

    const conclusionQuery = useCustomReactQuery({
        queryKey: ['conclusion_list', srmReviewCommitteeId],
        axiosFn: () => reviewCommitteeService.getConclusionByReivewCommittee({ SRMReviewCommitteeId: srmReviewCommitteeId }),
        options: {
            enabled: !!srmReviewCommitteeId
        }
    })

    const conclusionOptions = useMemo(() => {
        return conclusionQuery.data?.map(item => ({
            value: String(item.id),
            label: String(item.name),
            color: item.color
        })) ?? [];
    }, [conclusionQuery.data]);

    const columns = useMemo<MRT_ColumnDef<SRMProposalMember>[]>(() => {
        const baseCols: MRT_ColumnDef<SRMProposalMember>[] = [
            {
                accessorKey: "user.code",
                header: "Mã viên chức",
                Cell: ({ row }) => row.original.user?.code ?? "",
            },
            {
                accessorKey: "user.fullName",
                header: "Họ và Tên",
                Cell: ({ row }) => row.original.user?.fullName ?? "",
            },
            {
                accessorKey: "srmTitleName",
                header: "Vai trò",
                Cell: ({ row }) => row.original.srmTitle?.name ?? "",
            },
        ];

        const dynamicCols: MRT_ColumnDef<SRMProposalMember>[] = criteriaList?.map(criteria => ({
            id: `criteria-${criteria.id}`,
            accessorKey: `criteria-${criteria.id}`,
            header: criteria.code ?? "Tiêu chí",
            Header: () => {
                const maxScore = criteria.maxScore;
                return (
                    <Tooltip
                        label={
                            <>
                                <p>Mã: {criteria.code}</p>
                                <p>Loại đánh giá: {EnumLabelEvaluationType[criteria.evaluationType as EnumEvaluationType]}{maxScore ? ` (Tối đa ${maxScore})` : ""}</p>
                                <p>Bắt buộc đánh giá: {criteria.isRequired ? "Có" : "Không"}</p>
                            </>
                        }
                        withArrow
                    >
                        <Text fz="h6" fw={700}>
                            {criteria.isRequired && <Text c="red" fz="h6" fw={700} span>(*)</Text>} {criteria.name} {maxScore ? `(≤${maxScore})` : ""}
                        </Text>
                    </Tooltip>
                )
            },
            enableColumnActions: false,
            size: columnSizeMap[criteria.evaluationType as EnumEvaluationType],
            accessorFn: (row) => {
                const memberCriteria = row.srmMemberCriterias?.find(item => item.srmCriteriaId === criteria.id);
                if (criteria.evaluationType === EnumEvaluationType.Score) {
                    return memberCriteria?.point
                }
                if (criteria.evaluationType === EnumEvaluationType.Text) {
                    return memberCriteria?.comment
                }
                if (criteria.evaluationType === EnumEvaluationType.YesNo) {
                    return memberCriteria?.isResult
                }
                return ""
            },
            Cell: ({ row }) => {
                const currentTime = Date.now();
                const memberCriteria = row.original.srmMemberCriterias?.find(item => item.srmCriteriaId === criteria.id);
                if (criteria.evaluationType === EnumEvaluationType.Score) {
                    return <NumberInput
                        max={criteria.maxScore}
                        min={0}
                        hideControls
                        key={`${currentTime}${memberCriteria?.srmCriteriaId}${row.original.userId}${criteria.evaluationType}`}
                        defaultValue={memberCriteria?.point}
                        onChange={(value) => {
                            if (!memberCriteria) return;
                            memberCriteria.point = value ? Number(value) : undefined;
                            memberCriteria.isEnabled = true;
                            row.original.isEnabled = true;
                            hasChange.current = true;
                        }}
                    />
                }
                if (criteria.evaluationType === EnumEvaluationType.Text) {
                    return <Textarea
                        p="xs"
                        label=""
                        maxRows={10}
                        minRows={10}
                        defaultValue={memberCriteria?.comment}
                        key={`${currentTime}${memberCriteria?.srmCriteriaId}${row.original.userId}${criteria.evaluationType}`}
                        onChange={(event) => {
                            if (!memberCriteria) return;
                            memberCriteria.comment = event.target?.value ?? undefined;
                            memberCriteria.isEnabled = true;
                            row.original.isEnabled = true;
                            hasChange.current = true;
                        }}
                    />;
                }
                if (criteria.evaluationType === EnumEvaluationType.YesNo) {
                    return <Center>
                        <Checkbox
                            defaultChecked={memberCriteria?.isResult}
                            key={`${currentTime}${memberCriteria?.srmCriteriaId}${row.original.userId}${criteria.evaluationType}`}
                            onChange={(event) => {
                                if (!memberCriteria) return;
                                memberCriteria.isResult = event.target?.checked;
                                memberCriteria.isEnabled = true;
                                row.original.isEnabled = true;
                                hasChange.current = true;
                            }}
                        />
                    </Center>
                }
                return ""
            },
        }));

        const conclusionCols: MRT_ColumnDef<SRMProposalMember> = {
            accessorKey: "srmConclusion",
            header: "Kết luận",
            size: 300,
            accessorFn: (row) => row.srmConclusion?.name,
            Cell({ row }) {
                const member = row.original;
                return (
                    <ConclusionSelectShared
                        data={conclusionOptions}
                        isError={conclusionQuery.isError}
                        isLoading={conclusionQuery.isFetching}
                        defaultColor={member.srmConclusion?.color}
                        variant="light"
                        key={`${member.userId}-${member.id}-${member.srmConclusionId}`}
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

        dynamicCols?.length > 0 && dynamicCols.push(conclusionCols)

        return [...baseCols, ...dynamicCols];
    }, [conclusionOptions, conclusionQuery.isError, conclusionQuery.isFetching, criteriaList]);

    // Delete menuData on rows selected
    const handleResetListData = (dataSelected: SRMProposalMember[]) => {
        for (const member of dataSelected) {
            if (member.id === 0) member.isEnabled = false;
            member.srmConclusionId = undefined;
            member.srmConclusion = undefined;
            for (const criteria of member.srmMemberCriterias || []) {
                criteria.point = undefined;
                criteria.comment = undefined;
                criteria.isResult = false;
            }
        }
        hasChange.current = true;
    }

    return (
        <CustomDataTable
            enableRowSelection
            columns={columns}
            data={memberList}
            getRowId={(row) => `${row.id}-${row.userId}`}
            renderTopToolbarCustomActions={({ table }) => {
                const dataSelected = table.getSelectedRowModel().flatRows.flatMap((item) => item.original);
                return (
                    <>
                        <DeleteListOnClientButton
                            values={dataSelected}
                            handleDeleteList={() => handleResetListData(dataSelected)}
                            handlResetSelection={table.resetRowSelection}
                            formatContextData={(item) => item.user?.code ?? ""}
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
