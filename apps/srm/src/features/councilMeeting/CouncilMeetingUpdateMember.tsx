import { EnumEvaluationType } from "@/shared/consts/enum/EnumEvaluationType";
import { SRMConclusion } from "@/shared/interfaces/SRMConclusion";
import { SRMCriteria } from "@/shared/interfaces/SRMCriteria";
import { IEvaluationTopicMembers, SRMEvaluationTopic } from "@/shared/interfaces/SRMEvaluationTopic";
import { SRMTopicMember } from "@/shared/interfaces/SRMTopicMember";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { MRT_ColumnDef } from "mantine-react-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CouncilMeetingDeleteMember from "./CouncilMeetingDeleteMember";
import CouncilMeetingExportMember from "./CouncilMeetingExportMember";


interface CouncilMeetingUpdateMemberProps {
    topicDetail?: SRMEvaluationTopic;
    members: IEvaluationTopicMembers[];
    onChangeMembers: (members: IEvaluationTopicMembers[]) => void;
    conclusions: SRMConclusion[];
    criteriaSet: SRMCriteria[];
}

export default function CouncilMeetingUpdateMember({
    topicDetail,
    members,
    criteriaSet,
    onChangeMembers,
    conclusions
}: CouncilMeetingUpdateMemberProps) {
    const membersRef = useRef<IEvaluationTopicMembers[]>(members || []);
    const [deletedMemberIds, setDeletedMemberIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        membersRef.current = members || [];
    }, [members]);

    const getMemberFromState = useCallback((memberId: number) => {
        return members?.find(item => item.srmEvaluationMemberId === memberId);
    }, [members]);

    const getMemberFromTopic = useCallback((memberId: number) => {
        return topicDetail?.srmEvaluationTopicMembers?.find(item => item.srmEvaluationMemberId === memberId);
    }, [topicDetail]);

    //Kiểm tra trạng thái của tiêu chí
    const handleStatusCriteria = useCallback((memberId: number, criteriaId: number): boolean => {
        const pendingMember = getMemberFromState(memberId);
        const pendingCriteria = pendingMember?.srmEvaluationTopicMemberCriterias?.find(c => c.srmCriteriaId === criteriaId);

        if (pendingCriteria) {
            return pendingCriteria.isResult || false;
        }

        const member = getMemberFromTopic(memberId);
        const criteria = member?.srmEvaluationTopicMemberCriterias?.find(c => c.srmCriteriaId === criteriaId);
        return criteria?.isResult || false;
    }, [getMemberFromState, getMemberFromTopic]);

    //Lấy điểm số của tiêu chí
    const getCriteriaPoint = useCallback((memberId: number, criteriaId: number): number | undefined => {
        const pendingMember = getMemberFromState(memberId);
        const pendingCriteria = pendingMember?.srmEvaluationTopicMemberCriterias?.find(c => c.srmCriteriaId === criteriaId);

        if (pendingCriteria) {
            return pendingCriteria.point;
        }

        const member = getMemberFromTopic(memberId);
        const criteria = member?.srmEvaluationTopicMemberCriterias?.find(c => c.srmCriteriaId === criteriaId);
        return criteria?.point;
    }, [getMemberFromState, getMemberFromTopic]);

    //Lấy nhận xét của tiêu chí
    const getCriteriaComment = useCallback((memberId: number, criteriaId: number): string | undefined => {
        const pendingMember = getMemberFromState(memberId);
        const pendingCriteria = pendingMember?.srmEvaluationTopicMemberCriterias?.find(c => c.srmCriteriaId === criteriaId);

        if (pendingCriteria) {
            return pendingCriteria.comment;
        }

        const member = getMemberFromTopic(memberId);
        const criteria = member?.srmEvaluationTopicMemberCriterias?.find(c => c.srmCriteriaId === criteriaId);
        return criteria?.comment;
    }, [getMemberFromState, getMemberFromTopic]);

    //Kiểm tra trạng thái của kết luận
    const handleStatusConclusion = useCallback((memberId: number): string | null => {
        const pendingMember = getMemberFromState(memberId);
        if (pendingMember && pendingMember.srmConclusionId != null) {
            return pendingMember.srmConclusionId.toString();
        }

        const member = getMemberFromTopic(memberId);
        return member?.srmConclusionId?.toString() || null;
    }, [getMemberFromState, getMemberFromTopic]);

    //Xử lý thay đổi kết luận
    const handleOnChangeConclusion = useCallback((memberId: number, conclusionId: number) => {
        const currentMembers = membersRef.current || [];
        const index = currentMembers.findIndex(item => item.srmEvaluationMemberId === memberId);

        let nextMembers: IEvaluationTopicMembers[];
        if (index === -1) {
            nextMembers = [
                ...currentMembers,
                {
                    srmEvaluationMemberId: memberId,
                    srmConclusionId: conclusionId,
                },
            ];
        } else {
            nextMembers = currentMembers.map((item, idx) =>
                idx === index ? { ...item, srmConclusionId: conclusionId } : item
            );
        }

        onChangeMembers(nextMembers);
    }, [onChangeMembers]);

    //Xử lý thay đổi tiêu chí
    const handleChangeCriteria = useCallback((memberId: number, criteriaId: number, isResult?: boolean, point?: number, comment?: string) => {
        const currentMembers = membersRef.current || [];
        const memberIndex = currentMembers.findIndex(item => item.srmEvaluationMemberId === memberId);

        let nextMembers: IEvaluationTopicMembers[];
        if (memberIndex === -1) {
            nextMembers = [
                ...currentMembers,
                {
                    srmEvaluationMemberId: memberId,
                    srmEvaluationTopicMemberCriterias: [
                        {
                            srmEvaluationTopicMemberId: memberId,
                            srmCriteriaId: criteriaId,
                            isResult: isResult,
                            point: point,
                            comment: comment,
                        },
                    ],
                },
            ];
        } else {
            const targetMember = currentMembers[memberIndex];
            const existingCriterias = targetMember?.srmEvaluationTopicMemberCriterias || [];
            const criteriaIndex = existingCriterias.findIndex(c => c.srmCriteriaId === criteriaId);

            let updatedCriterias: IEvaluationTopicMembers["srmEvaluationTopicMemberCriterias"] = [];
            if (criteriaIndex === -1) {
                updatedCriterias = [
                    ...existingCriterias,
                    {
                        srmCriteriaId: criteriaId,
                        srmEvaluationTopicMemberId: memberId,
                        isResult: isResult,
                        point: point,
                        comment: comment,
                    },
                ];
            } else {
                updatedCriterias = existingCriterias.map((c, idx) =>
                    idx === criteriaIndex ? {
                        ...c,
                        isResult: isResult !== undefined ? isResult : c.isResult,
                        point: point !== undefined ? point : c.point,
                        comment: comment !== undefined ? comment : c.comment
                    } : c
                );
            }

            nextMembers = currentMembers.map((m, idx) =>
                idx === memberIndex ? { ...m, srmEvaluationTopicMemberCriterias: updatedCriterias } : m
            );
        }
        onChangeMembers(nextMembers);
    }, [onChangeMembers]);

    const displayMembers = useMemo(() => {
        const allMembers = topicDetail?.srmEvaluationCommittee?.srmEvaluationMembers || [];
        return allMembers.filter(member => !deletedMemberIds.has(member.id || 0));
    }, [topicDetail, deletedMemberIds]);

    // Tạo cột tiêu chí
    const createCriteriaColumns = useCallback(() => {
        if (!criteriaSet?.length) return [];

        return criteriaSet.map((criteria, index) => ({
            header: `${criteria.name} ${criteria?.evaluationType === EnumEvaluationType.Score ? `(${criteria?.maxScore})` : ''}`,
            accessorKey: `criteria_${criteria.id}`,
            size: criteria?.evaluationType === EnumEvaluationType.Text ? 300 : 200,
            accessorFn: (originalRow: SRMTopicMember) => {
                const isChecked = handleStatusCriteria(originalRow.id || 0, criteria.id || 0);
                const currentPoint = getCriteriaPoint(originalRow.id || 0, criteria.id || 0);
                const currentComment = getCriteriaComment(originalRow.id || 0, criteria.id || 0);

                if (criteria?.evaluationType === EnumEvaluationType.Score) {
                    return (
                        <CustomNumberInput
                            min={0}
                            max={criteria?.maxScore || 10}
                            defaultValue={currentPoint || 0}
                            onChange={(value) => {
                                handleChangeCriteria(originalRow.id || 0, criteria.id || 0, undefined, Number(value), undefined);
                            }}
                        />
                    )
                }
                if (criteria?.evaluationType === EnumEvaluationType.Text) {
                    return (
                        <CustomTextArea
                            label=""
                            defaultValue={currentComment || ''}
                            onChange={(e) => {
                                handleChangeCriteria(originalRow.id || 0, criteria.id || 0, undefined, undefined, e.target.value);
                            }}
                        />
                    )
                }
                return (
                    <CustomCheckbox
                        defaultChecked={isChecked}
                        onChange={(e) => {
                            handleChangeCriteria(originalRow.id || 0, criteria.id || 0, e.target.checked);
                        }}
                    />
                );
            },
        }));
    }, [criteriaSet, handleStatusCriteria, handleChangeCriteria, getCriteriaPoint, getCriteriaComment]);

    // Tạo cột kết luận
    const createConclusionColumn = useCallback(() => ({
        header: "Kết luận",
        accessorKey: "conclusion",
        size: 250,
        accessorFn: (originalRow: SRMTopicMember) => {
            const conclusion = handleStatusConclusion(originalRow.id || 0);
            const conclusionOptions = conclusions?.map((item: SRMConclusion) => ({
                value: item.id?.toString() || '',
                label: item.name || ''
            })) || [];

            return (
                <CustomSelect
                    key={`select-${originalRow.id}-${conclusion ?? 'none'}`}
                    defaultValue={conclusion ?? undefined}
                    data={conclusionOptions}
                    onChange={(value) => {
                        const numeric = value ? Number(value) : 0;
                        handleOnChangeConclusion(originalRow.id || 0, Number.isFinite(numeric) ? numeric : 0);
                    }}
                />
            );
        },
    }), [conclusions, handleStatusConclusion, handleOnChangeConclusion]);

    const baseColumns: CustomColumnDef<SRMTopicMember>[] = useMemo(() => [
        {
            header: "Mã thành viên",
            accessorKey: "code",
        },
        {
            header: "Họ tên",
            accessorKey: "user.fullName",
        },
        {
            header: "Vai trò",
            accessorKey: "srmTitle.name",
        },
    ], []);

    const columns = useMemo<MRT_ColumnDef<SRMTopicMember>[]>(() => {
        const criteriaColumns = createCriteriaColumns();
        const conclusionColumn = createConclusionColumn();

        return [
            ...baseColumns,
            ...criteriaColumns,
            conclusionColumn
        ];
    }, [baseColumns, createCriteriaColumns, createConclusionColumn]);

    const handleDeleteMembers = useCallback((ids: number[]) => {
        if (!ids?.length) return;

        setDeletedMemberIds(prev => {
            const newSet = new Set(prev);
            ids.forEach(id => newSet.add(id));
            return newSet;
        });

        const currentMembers = membersRef.current || [];
        const nextMembers = currentMembers.filter(member =>
            !ids.includes(member.srmEvaluationMemberId || 0)
        );

        onChangeMembers(nextMembers);
    }, [onChangeMembers]);

    const renderTopToolbar = useCallback(({ table }: any) => (
        <>
            <CouncilMeetingExportMember
                members={topicDetail?.srmEvaluationCommittee?.srmEvaluationMembers ?? []}
                criteriaSet={criteriaSet}
                topicMembers={members}
                conclusions={conclusions}
            />
            <CouncilMeetingDeleteMember
                table={table}
                onDelete={handleDeleteMembers}
            />
        </>
    ), [topicDetail, criteriaSet, members, conclusions, handleDeleteMembers]);

    if (!criteriaSet || !topicDetail) {
        return <div>Đang tải...</div>;
    }
    return (
        <CustomDataTable
            columns={columns}
            data={displayMembers}
            enableRowSelection
            enableRowNumbers={false}
            renderTopToolbarCustomActions={renderTopToolbar}
            mantineTableContainerProps={{
                style: { height: "100%", overflowY: "auto" },
            }}
        />
    );
}
