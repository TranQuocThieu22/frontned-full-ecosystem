import ViewDetailResultTableEvidenceDetail from "../shared/ViewDetailEvidence";
import { WriteJustificationResultsPresentRef } from '@/features/admin/WriteJustification/WriteJustificationResultsPresent';
import { ISubmitEAQRequirementReport } from '@/shared/APIs/service_EAQRequirement';
import { IEnvidenceVersion } from "@/shared/interfaces/evidence/IEnvidenceVersion";
import { IEvidence } from '@/shared/interfaces/evidence/IEvidence';
import IRequirementDetail from '@/shared/interfaces/requirement/IRequirementDetail';
import { CustomActionIcon } from '@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { CustomFieldset } from '@aq-fe/core-ui/shared/components/layout/CustomFieldset';
import { TempStatus } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { MRT_ColumnDef } from 'mantine-react-table';
import React, { RefObject } from 'react'

interface Props {
    columns: MRT_ColumnDef<IEvidence>[]
    filteredEvidenceData: filteredEvidenceData[]
    evidenceAllQuery: UseQueryResult<IEvidence[], Error> & {
        dataCount: number;
        rawData: CustomApiResponse<IEvidence[]> | null;
    }
    mutationAdd: UseMutationResult<AxiosResponse<CustomApiResponse<IRequirementDetail>, any>, Error, ISubmitEAQRequirementReport, unknown>
    mutationDelete: UseMutationResult<AxiosResponse<CustomApiResponse<IEvidence>, any>, Error, {
        id: number;
        isEnabled: boolean;
    }[], unknown>
    viewOnly: boolean
    presentComponentRef: RefObject<WriteJustificationResultsPresentRef | null>
    handleSubmit: (submit?: boolean | undefined, saveEvidence?: boolean | undefined) => Promise<void>
    handleDeleteEvidence: (evidenceId: number, index: number) => void

}
export default function UsedEvidenceTable({
    columns,
    filteredEvidenceData,
    evidenceAllQuery,
    mutationAdd,
    mutationDelete,
    viewOnly,
    presentComponentRef,
    handleSubmit,
    handleDeleteEvidence
}: Props) {
    return (
        <CustomFieldset title="Danh sách minh chứng sử dụng" mt={4}>
            <CustomDataTable
                columns={columns}
                data={filteredEvidenceData ?? []}
                enableRowNumbers={false}
                isLoading={
                    evidenceAllQuery.isLoading ||
                    mutationAdd.isPending ||
                    mutationDelete.isPending
                }
                isError={evidenceAllQuery.isError}
                renderTopToolbarCustomActions={() => {
                    if (viewOnly) return null;
                    return (
                        <CustomButton
                            actionType="save"
                            loading={
                                mutationAdd.isPending || mutationDelete.isPending
                            }
                            onClick={async () => {
                                await presentComponentRef.current?.handleSaveReport();
                                await handleSubmit(false, true);
                            }}
                        />
                    );
                }}
                renderRowActions={({ row, table }) => {
                    return (
                        <CustomCenterFull>
                            <ViewDetailResultTableEvidenceDetail
                                evidence={row.original}
                                evidenceId={
                                    row.original.eaqEvidenceCurrentVersion
                                        ?.eaqEvidenceId!
                                }
                            />
                            {!viewOnly && (
                                <CustomActionIcon
                                    actionType="delete"
                                    onClick={() =>
                                        handleDeleteEvidence(
                                            row.original.id ?? 0,
                                            row.index
                                        )
                                    }
                                />
                            )}
                        </CustomCenterFull>
                    );
                }}
            />
        </CustomFieldset>
    )
}
interface filteredEvidenceData {

    index: number;
    isExpired?: boolean | undefined;
    referenceEvidenceId?: number | undefined;
    referenceEvidence?: IEvidence | undefined;
    eaqEvidenceCurrentVersion?: IEnvidenceVersion;
    eaqCriteriaId?: number;
    note?: string;
    eaqEvidenceId?: number;
    id?: number;
    tempId?: string;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedFullName?: string;
    createdBy?: number;
    createWhen?: string;
    createdAt?: string;
    tempStatus?: TempStatus;

}
