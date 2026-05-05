import { WriteJustificationResultsPresentRef } from '@/features/admin/WriteJustification/WriteJustificationResultsPresent';
import { ISubmitEAQRequirementReport } from '@/shared/APIs/service_EAQRequirement';
import { IEvidence } from '@/shared/interfaces/evidence/IEvidence';
import IRequirementDetail from '@/shared/interfaces/requirement/IRequirementDetail';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';
import { Group, Paper } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React, { RefObject } from 'react'
interface Props {
    presentComponentRef: RefObject<WriteJustificationResultsPresentRef | null>
    handleSubmit: (submit?: boolean | undefined, saveEvidence?: boolean | undefined) => Promise<void>
    mutationAdd: UseMutationResult<AxiosResponse<CustomApiResponse<IRequirementDetail>, any>, Error, ISubmitEAQRequirementReport, unknown>
    mutationDelete: UseMutationResult<AxiosResponse<CustomApiResponse<IEvidence>, any>, Error, {
        id: number;
        isEnabled: boolean;
    }[], unknown>

}
export default function ViewOrUpdateButtonLayout({
    presentComponentRef,
    handleSubmit,
    mutationAdd,
    mutationDelete
}: Props) {
    return (
        <Paper
            withBorder
            p="md"
            radius="md"
            style={{
                flexShrink: 0,
                borderTop: "2px solid #e9ecef",
            }}
        >
            <Group gap="sm" justify="flex-end">
                <CustomButton
                    color="yellow"
                    leftSection={<IconDeviceFloppy size={18} />}
                    onClick={async () => {
                        await presentComponentRef.current?.handleSaveReport();
                        await handleSubmit(true, false);
                    }}
                    size="md"
                    fw={600}
                    loading={mutationAdd.isPending || mutationDelete.isPending}
                >
                    Nộp
                </CustomButton>

                <CustomButton
                    loading={mutationAdd.isPending || mutationDelete.isPending}
                    actionType="save"
                    onClick={async () => {
                        await presentComponentRef.current?.handleSaveReport();
                        await handleSubmit(false, false);
                    }}
                    size="md"
                    fw={600}
                />
            </Group>
        </Paper>
    )
}
