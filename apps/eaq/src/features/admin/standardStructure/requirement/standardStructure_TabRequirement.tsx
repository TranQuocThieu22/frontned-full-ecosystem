'use client';

import { service_EAQRequirement } from '@/shared/APIs/service_EAQRequirement';
import { IRequirement } from '@/shared/interfaces/requirement/Requirement';
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter';
import { Group, Text } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import StandardStructure_CreateRequirement from './standardStructure_CreateRequirement';
import StandardStructure_DeleteListRequirement from './standardStructure_DeleteListRequirement';
import StandardStructure_DeleteRequirement from './standardStructure_DeleteRequirement';
import StandardStructure_ExportRequirements from './standardStructure_ExportRequirements';
import StandardStructure_ImportRequirements from './StandardStructure_ImportRequirements';
import StandardStructure_UpdateRequirement from './standardStructure_UpdateRequirement';
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";

export default function StandardStructure_TabRequirement() {
    const standardSetStore = useS_Shared_Filter();
    const storePermission = usePermissionStore();
    const requirementQuery = useCustomReactQuery({
        queryKey: [
            'requirementQuery',
            'GetEAQRequirementByEAQStandardId',
            standardSetStore.state.StandardSet?.id,
        ],
        axiosFn: () =>
            service_EAQRequirement.GetEAQRequirementByEAQStandardSetId(
                standardSetStore.state.StandardSet?.id
            ),
        options: {
            enabled: !!standardSetStore.state.StandardSet,
        },
    });
    const columns = useMemo<MRT_ColumnDef<IRequirement>[]>(
        () => [
            { header: 'Mã tiêu chuẩn', accessorKey: 'eaqCriteria.eaqStandard.code' },
            { header: 'Mã tiêu chí', accessorKey: 'eaqCriteria.code' },
            {
                header: 'Tên tiêu chí',
                accessorKey: 'eaqCriteriaName',
                size: 600,
                accessorFn: (row) => <Text>{row.eaqCriteria?.name || ''}</Text>
            },
            { header: 'Mã yêu cầu/ mốc chuẩn', accessorKey: 'code' },
            { header: 'Tên yêu cầu/ mốc chuẩn', accessorKey: 'name', size: 600 },
            { header: 'Mô tả', accessorKey: 'description', size: 600 },
            { header: 'Ghi chú', accessorKey: 'note', size: 600 },
        ],
        []
    );

    return (
        <CustomDataTable
            isLoading={requirementQuery.isLoading}
            isError={requirementQuery.isError}
            enableRowSelection={true}
            columns={columns}
            data={requirementQuery.data || []}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <StandardStructure_CreateRequirement />
                    {storePermission.state?.currentPermissionPage?.isCreate && (
                        <StandardStructure_ImportRequirements />
                    )}
                    {storePermission.state?.currentPermissionPage?.isExport && (
                        <StandardStructure_ExportRequirements table={table} />
                    )}

                    <StandardStructure_DeleteListRequirement
                        clearSelection={table.resetRowSelection}
                        values={table
                            .getSelectedRowModel()
                            .flatRows.flatMap((item) => item.original)}
                    />
                </Group>
            )}
            renderRowActions={({ row }) => {
                return (
                    <CustomCenterFull>
                        <StandardStructure_UpdateRequirement value={row.original} />
                        <StandardStructure_DeleteRequirement
                            id={row.original.id || 0}
                            context={row.original.code || ''}
                        />
                    </CustomCenterFull>
                );
            }}
        />
    );
}
