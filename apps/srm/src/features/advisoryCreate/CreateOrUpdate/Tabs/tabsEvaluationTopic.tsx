import ExportEvaluationTopic from "@/features/advisoryCreate/CreateOrUpdate/Tabs/EvaluationTopic/ExportEvaluationTopic";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { SRMEvaluationTopic } from "../../../../shared/interfaces/SRMEvaluationTopic";
import { SRMTopic } from "../../../../shared/interfaces/SRMTopic";
import ChoseEvaluationTopic from "./EvaluationTopic/ChoseEvaluationTopic";
import DeleteEvaluationTopic from "./EvaluationTopic/DeleteEvaluationTopic";
import DeleteListEvaluationTopic from "./EvaluationTopic/DeleteListEvaluationTopic";

interface TopicProps {
    Topics: SRMEvaluationTopic[];
    onChange: (Topics: SRMEvaluationTopic[]) => void;
}

export default function TabsEvaluationTopic({ Topics, onChange }: TopicProps) {
    // filter out soft-deleted topics for display (optimistic UI)
    const visibleTopics = Topics.filter(topic => topic.isEnabled !== false);

    const columns = useMemo<MRT_ColumnDef<SRMEvaluationTopic>[]>(() => [
        {
            accessorKey: "srmTopic.code",
            header: "Mã đăng ký",
            accessorFn: (row) => row.srmTopic?.code || ""
        },
        {
            accessorKey: "srmTopic.registerName",
            header: "Tên đề tài",
            size: 500,
            accessorFn: (row) => row.srmTopic?.registerName || ""
        },
        // {
        //     accessorKey: "srmTopic.fromDate",
        //     header: "Từ tháng / năm",
        //     accessorFn: (row) => row.srmTopic?.fromDate ? utils_date.toMMYYYY(row.srmTopic.fromDate) : ""
        // },
        // {
        //     accessorKey: "srmTopic.toDate",
        //     header: "Đến tháng / năm",
        //     accessorFn: (row) => row.srmTopic?.toDate ? utils_date.toMMYYYY(row.srmTopic.toDate) : ""
        // },

        {
            accessorKey: "srmTopic.srmTopicMembers",
            header: "Chủ nhiệm đề tài",
            accessorFn: (row) => row.srmTopic?.srmTopicMembers
                ?.find(member => member.srmTitle?.isLeader === true)
                ?.user?.fullName ?? ""
        },
        {
            accessorKey: "srmTopic.srmArea.name",
            header: "Lĩnh vực",
            accessorFn: (row) => row.srmTopic?.srmArea?.name || ""
        },
        {
            accessorKey: "srmTopic.totalCost",
            header: "Tổng kinh phí thực hiện (VND)",
            size: 270,
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.srmTopic?.totalCost || 0, ' VNĐ')
        },

    ], []);

    // Convert ITopic[] to IEvaluationTopic[] when adding new topics
    const handleAddTopic = (newTopics: SRMTopic[]) => {
        const updatedTopics = [...Topics];

        newTopics.forEach(topic => {
            // Check if this topic already exists in the array (including soft-deleted ones)
            const existingTopicIndex = updatedTopics.findIndex(t =>
                (t.srmTopicId === topic.id) || (t.srmTopic?.id === topic.id)
            );

            if (existingTopicIndex !== -1) {
                // Case 4: Re-enable a previously soft-deleted topic
                updatedTopics[existingTopicIndex] = {
                    ...updatedTopics[existingTopicIndex],
                    isEnabled: true, // Re-enable the topic
                    srmTopic: topic, // Update topic menuData in case it changed
                };
            } else {
                // Case 1: Add completely new topic
                const newEvaluationTopic: SRMEvaluationTopic = {
                    id: 0, // New topic, will be assigned by backend
                    srmTopicId: topic.id,
                    srmTopic: topic,
                    order: 0,
                    srmEvaluationCommitteeId: 0, // Will be set when saving
                    isEnabled: true, // New topics are enabled by default
                };
                updatedTopics.push(newEvaluationTopic);
            }
        });

        onChange(updatedTopics);
    };

    const handleRemoveTopic = (selectedRows: SRMEvaluationTopic[]) => {
        const updatedTopics = Topics.map(topic => {
            const shouldRemove = selectedRows.some(selected => {
                // Check if this topic should be removed
                return (selected.id && topic.id === selected.id) ||
                    (selected.srmTopicId && topic.srmTopicId === selected.srmTopicId) ||
                    (selected.srmTopic?.id && topic.srmTopic?.id === selected.srmTopic.id);
            });

            if (shouldRemove) {
                if (topic.id && topic.id > 0) {
                    // Case 3: Existing topic - soft delete (set isEnabled = false)
                    return { ...topic, isEnabled: false };
                } else {
                    // Case 2: New topic - mark for removal (will be filtered out)
                    return null;
                }
            }
            return topic;
        }).filter(topic => topic !== null) as SRMEvaluationTopic[];

        onChange(updatedTopics);
    };

    // Extract current topics for ChoseSubmitRegistration component (only visible ones)
    const selectedTopics: SRMTopic[] = visibleTopics
        .map(evaluationTopic => evaluationTopic.srmTopic)
        .filter((topic): topic is SRMTopic => topic !== undefined);

    return (
        <CustomDataTable
            columns={columns}
            data={visibleTopics} // Show only enabled topics
            enableRowSelection={visibleTopics.length > 0}
            renderTopToolbarCustomActions={({ table }) => {
                const selectedRows = table.getSelectedRowModel().flatRows.map(row => row.original);

                return (
                    <>
                        <ChoseEvaluationTopic
                            onSelect={handleAddTopic}
                            selectedEvaluationTopic={selectedTopics}
                        />
                        <ExportEvaluationTopic table={table} />
                        <DeleteListEvaluationTopic
                            handleRemoveTopic={handleRemoveTopic}
                            currentDatas={selectedRows}
                            clearSelection={table.resetRowSelection}
                        />
                    </>
                );
            }}
            renderRowActions={({ row }) => (
                <CustomCenterFull>
                    <DeleteEvaluationTopic
                        handleRemoveTopic={handleRemoveTopic}
                        currentData={row.original}
                    />
                </CustomCenterFull>
            )}
        />
    );
}
