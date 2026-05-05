import Form04CurrentSituationDetail from '@/features/admin/ModuleSelfAssessmentForm04/Form04CurrentSituation/Form04CurrentSituationDetail';
import MyCustomTitleGroup from '@/features/admin/ModuleSelfAssessmentForm04/Shared/MyCustomTitleGroup';
import { IEvidenceUsageHistories } from '@/shared/interfaces/selfAssessment/IEvidenceUsageHistories';
import { ISelfAssessment } from '@/shared/interfaces/selfAssessment/ISelfAssessment';
import { CustomActionIcon } from '@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { MRT_ColumnDef } from 'mantine-react-table';
import React from 'react'
interface EvidenceTableProps {
    columns: MRT_ColumnDef<IEvidenceUsageHistories>[],
    filteredEvidenceData: IEvidenceUsageHistories[],
    editMode?: boolean,
    handleSave: () => ISelfAssessment | undefined,
    handleDeleteEvidence: (uniqueId: string) => void


}
export default function Form04CurrentSituationEvidenceTable({
    columns,
    filteredEvidenceData,
    editMode,
    handleSave,
    handleDeleteEvidence
}: EvidenceTableProps) {
    return (
        <>
            <MyCustomTitleGroup my={7} title="Danh sách minh chứng đã sử dụng" />
            <CustomDataTable
                columns={columns}
                data={filteredEvidenceData || []}
                enableRowNumbers={false}
                mantineTableContainerProps={{
                    style: { height: "320px", overflowY: "auto" },
                }}
                renderTopToolbarCustomActions={() => (
                    <Stack>
                        {editMode && (
                            <CustomButton
                                onClick={() => {
                                    // Kiểm tra nếu không có minh chứng nào
                                    if (
                                        !filteredEvidenceData ||
                                        filteredEvidenceData.length === 0
                                    ) {
                                        notifications.show({
                                            message: "Không tìm thấy minh chứng đã sử dụng",
                                            color: "red",
                                        });
                                        return;
                                    }
                                    handleSave();
                                }}
                                type="button"
                                actionType="save"
                            />
                        )}
                    </Stack>
                )}
                renderRowActions={({ row }) => {
                    return (
                        <CustomCenterFull>
                            <Form04CurrentSituationDetail
                                evidence={row.original}
                                evidenceId={row.original.eaqEvidenceId ?? 0}
                            />
                            {editMode && (
                                <CustomActionIcon
                                    actionType="delete"
                                    onClick={() =>
                                        handleDeleteEvidence(row.original.uniqueId ?? "")
                                    }
                                />
                            )}
                        </CustomCenterFull>
                    );
                }}
            />
        </>)
}
