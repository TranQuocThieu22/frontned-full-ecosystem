'use client';
import { service_EAQCriteria } from '@/shared/APIs/service_EAQCriteria';
import { ICriteria } from '@/shared/interfaces/criteria/Criteria';
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter';
import { Group, Text } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import StandardStructure_CreateCriteria from './standardStructure_CreateCriteria';
import StandardStructure_DeleteCriteria from './standardStructure_DeleteCriteria';
import StandardStructure_DeleteListCriteria from './standardStructure_DeleteListCriteria';
import StandardStructure_ExportCriterias from './standardStructure_ExportCriterias';
import StandardStructure_ImportCriterias from './StandardStructure_ImportCriterias';
import StandardStructure_UpdateCriteria from './standardStructure_UpdateCriteria';
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";

export default function StandardStructure_TabCriteria() {
    const storePermission = usePermissionStore();

    const standardSetStore = useS_Shared_Filter();
    const criteriaQuery = useCustomReactQuery({
        queryKey: [
            'criteriaQuery',
            'GetEAQCriteriaByEAQStandardId',
            standardSetStore.state.StandardSet?.id,
        ],

        axiosFn: () =>
            service_EAQCriteria.GetEAQCriteriaByEAQStandardSetId(
                standardSetStore.state.StandardSet?.id
            ),
        options: {
            enabled: !!standardSetStore.state.StandardSet,
        },
    });
    const columns = useMemo<MRT_ColumnDef<ICriteria>[]>(
        () => [
            { header: 'Mã tiêu chuẩn', accessorKey: 'eaqStandard.code' },
            { header: 'Mã tiêu chí', accessorKey: 'code' },
            { header: 'Tên tiêu chí', accessorKey: 'name', size: 600 },
            {
                header: 'Minh chứng gợi ý', accessorKey: 'evidence', size: 600,
                accessorFn: (row) => <Text style={{ whiteSpace: 'pre-wrap' }}>{row.evidence}</Text>
            },
            { header: 'Ghi chú', accessorKey: 'note', size: 600 },
        ],
        []
    );

    return (
        <CustomDataTable
            isLoading={criteriaQuery.isLoading}
            isError={criteriaQuery.isError}
            enableRowSelection={true}
            columns={columns}
            data={criteriaQuery.data || []}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <StandardStructure_CreateCriteria />
                    {storePermission.state?.currentPermissionPage?.isCreate && (
                        <StandardStructure_ImportCriterias />
                    )}
                    {storePermission.state?.currentPermissionPage?.isExport && (
                        <StandardStructure_ExportCriterias table={table} />
                    )}

                    <StandardStructure_DeleteListCriteria
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
                        <StandardStructure_UpdateCriteria value={row.original} />
                        <StandardStructure_DeleteCriteria
                            id={row.original.id || 0}
                            context={row.original.code || ''}
                        />
                    </CustomCenterFull>
                );
            }}
        />
    );
}
