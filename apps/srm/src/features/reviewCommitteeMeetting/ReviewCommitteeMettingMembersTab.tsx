import { reviewCommitteeService } from "@/shared/APIs/reviewCommitteeService"
import { EnumEvaluationType } from "@/shared/consts/enum/EnumEvaluationType"
import { SRMProposalMember } from "@/shared/interfaces/SRMProposalMember"
import { SRMProposalMemberCriteria } from "@/shared/interfaces/SRMProposalMemberCriteria"
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton"
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable"
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox"
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput"
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea"
import { CustomComboboxAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomComboboxAPI"
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject"
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"
import { Center, Stack, Text } from "@mantine/core"
import { UseDisclosureReturnValue } from "@mantine/hooks"
import { useEffect, useMemo, useState } from "react"


export const EvaluationTypeColumnSize: Record<EnumEvaluationType, number> = {
    [EnumEvaluationType.Score]: 150,
    [EnumEvaluationType.YesNo]: 50,
    [EnumEvaluationType.Text]: 500,
};

export default function ReviewCommitteeMettingMembersTab({
    reviewProposalId,
    disc
}: {
    reviewProposalId?: number,
    disc?: UseDisclosureReturnValue
}) {
    const infoReviewProposalQuery = useCustomReactQuery({
        queryKey: ['info_review_proposal', reviewProposalId],
        axiosFn: async () => reviewCommitteeService.getSRMProposalMemberByReviewProposal({ SRMReviewProposalId: reviewProposalId }),
        options: {
            enabled: reviewProposalId != undefined
        }
    })

    const conclusionQuery = useCustomReactQuery({
        queryKey: ['conclusion_list', infoReviewProposalQuery.data?.srmReviewCommitteeId],
        axiosFn: () => reviewCommitteeService.getConclusionByReivewCommittee({ SRMReviewCommitteeId: infoReviewProposalQuery.data?.srmReviewCommitteeId }),
        options: {
            enabled: infoReviewProposalQuery.data?.srmReviewCommitteeId != undefined
        }
    })

    const criteriaQuery = useCustomReactQuery({
        queryKey: ['criteria_list', reviewProposalId],
        axiosFn: () => reviewCommitteeService.getSRMCriteriaByReviewProposal({ SRMReviewProposalId: reviewProposalId }),
        options: {
            enabled: reviewProposalId != undefined
        }
    })
    const [SRMProposalMember, setSRMProposalMember] = useState<SRMProposalMember[]>([]);

    const updateSRMProposalMemberMutation = useCustomReactMutation({
        axiosFn: (values: SRMProposalMember[]) => {
            return reviewCommitteeService.updateSRMProposalMember(values.map(item => {
                const { srmConclusion, srmTitle, user, ...rest } = item
                return {
                    ...rest
                }
            }))
        },
        mutationType: "update",
        options: {
            onSuccess: () => {
                setSRMProposalMember([]);
                disc?.[1].close()
            }
        }
    })
    const updateMemberCriteria = (
        memberId: number,
        criteriaId: number,
        updater: (item: SRMProposalMemberCriteria) => SRMProposalMemberCriteria
    ) => {
        setSRMProposalMember(prev =>
            prev.map(member => {
                if (member.id !== memberId) return member;

                return {
                    ...member,
                    srmMemberCriterias: member.srmMemberCriterias?.map(c =>
                        c.srmCriteriaId === criteriaId
                            ? updater(c)
                            : c
                    )
                };
            })
        );
    };

    useEffect(() => {
        if (!infoReviewProposalQuery.data?.srmProposalMembers) return
        setSRMProposalMember(infoReviewProposalQuery.data.srmProposalMembers)
    }, [infoReviewProposalQuery.data?.srmProposalMembers])

    const columns = useMemo<CustomColumnDef<SRMProposalMember>[]>(() => {
        const baseCols: CustomColumnDef<SRMProposalMember>[] = [
            {
                accessorKey: "user",
                header: "Viên chức",
                accessorFn: (row) => row.user?.code + " - " + row.user?.fullName,
                size: columnSizeObject.name
            },
            {
                accessorKey: "srmTitleName",
                header: "Vai trò",
                Cell: ({ row }) => row.original.srmTitle?.name ?? "",
            },
        ];

        const dynamicCols: CustomColumnDef<SRMProposalMember>[] = criteriaQuery.data?.map(criteria => ({
            id: `criteria-${criteria.name}`,
            header: criteria.code ?? "Tiêu chí",
            size: EvaluationTypeColumnSize[criteria.evaluationType as EnumEvaluationType],
            Header: () => {
                const maxScore = criteria.maxScore;
                return (
                    <Text fz="h6" fw={700}>
                        {criteria.isRequired && <Text c="red" fz="h6" fw={700} span>(*)</Text>}
                        {criteria.name}
                        {maxScore ? `(≤${maxScore})` : ""}
                    </Text>
                )
            },
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
            },
            Cell: ({ row }) => {
                const memberCriteriaFind = row.original.srmMemberCriterias
                    ?.find(item => item.srmCriteriaId === criteria.id)
                if (criteria.evaluationType === EnumEvaluationType.Score) {
                    return (
                        <CustomNumberInput
                            max={criteria.maxScore}
                            defaultValue={memberCriteriaFind?.point}
                            onBlur={(event) => {
                                if (!memberCriteriaFind) return
                                const value = Number(event.currentTarget.value);
                                updateMemberCriteria(
                                    row.original.id!,
                                    criteria.id!,
                                    (c) => ({ ...c, point: value })
                                );
                            }}
                        />
                    )
                }
                if (criteria.evaluationType === EnumEvaluationType.Text) {
                    return (
                        <CustomTextArea
                            p="xs"
                            label=""
                            maxRows={10}
                            defaultValue={memberCriteriaFind?.comment}
                            onBlur={(event) => {
                                if (!memberCriteriaFind) return
                                const value = event.currentTarget.value;

                                updateMemberCriteria(
                                    row.original.id!,
                                    criteria.id!,
                                    (c) => ({ ...c, comment: value })
                                );

                            }}
                        />
                    )
                }
                if (criteria.evaluationType === EnumEvaluationType.YesNo) {
                    return (
                        <Center>
                            <CustomCheckbox
                                defaultChecked={memberCriteriaFind?.isResult}
                                onChange={(event) => {
                                    if (!memberCriteriaFind) return
                                    const checked = event.currentTarget.checked;

                                    updateMemberCriteria(
                                        row.original.id!,
                                        criteria.id!,
                                        (c) => ({ ...c, isResult: checked })
                                    );
                                }}
                            />
                        </Center>
                    )
                }
            },
        })) ?? [];
        const conclusionCols: CustomColumnDef<SRMProposalMember> = {
            accessorKey: "srmConclusion.name",
            size: 200,
            header: "Kết luận",
            Cell: ({ row }) => {
                return (
                    <CustomComboboxAPI
                        query={conclusionQuery}
                        enableColorView
                        defaultValue={row.original.srmConclusionId}
                        onChange={(id) => {
                            setSRMProposalMember(prev =>
                                prev.map(member =>
                                    member.id === row.original.id
                                        ? { ...member, srmConclusionId: id }
                                        : member
                                )
                            );
                        }}
                    />
                )
            }

        }
        return [...baseCols, ...dynamicCols, conclusionCols]
    }, [criteriaQuery.data, conclusionQuery.data, SRMProposalMember])
    return (
        <Stack>
            <CustomDataTable
                pinningRightColumns={["srmConclusion.name"]}
                data={SRMProposalMember}
                columns={columns}
            />
            <CustomButton actionType="save" onClick={() => {
                // Gọi api update những thứ đã chỉnh sửa
                updateSRMProposalMemberMutation.mutate(SRMProposalMember.map(item => ({
                    ...item,
                    srmMemberCriterias: item.srmMemberCriterias?.map(memberCriteria => {
                        const { srmCriteria, ...rest } = memberCriteria
                        return {
                            ...rest
                        }
                    })
                })));

            }} />
        </Stack>
    )
}
