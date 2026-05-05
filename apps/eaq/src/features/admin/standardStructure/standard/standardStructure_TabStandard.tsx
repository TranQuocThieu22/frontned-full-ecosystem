'use client';
import { service_EAQStandard } from '@/shared/APIs/service_EAQStandard';
import { IStandard } from '@/shared/interfaces/standard/Standard';
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter';
import { Group } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import StandardStructure_CreateStandard from './standardStructure_CreateStandard';
import StandardStructure_DeleteListStandard from './standardStructure_DeleteListStandard';
import StandardStructure_DeleteStandard from './standardStructure_DeleteStandard';
import StandardStructure_ExportStandards from './standardStructure_ExportStandards';
import StandardStructure_ImportStandards from './StandardStructure_ImportStandards';
import StandardStructure_UpdateStandard from './standardStructure_UpdateStandard';
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";

export default function StandardStructure_TabStandard() {
    const storePermission = usePermissionStore();

    const standardSetStore = useS_Shared_Filter();

    const standardQuery = useCustomReactQuery({
        queryKey: [
            'standardQuery',
            'GetAllByEAQStandardId',
            standardSetStore.state.StandardSet?.id,
        ],
        axiosFn: () =>
            service_EAQStandard.GetAllByEAQStandardSetId({
                eaqStandardSetId: standardSetStore.state.StandardSet?.id,
            }),
        options: {
            enabled: !!standardSetStore.state.StandardSet,
        },
    });

    const columns = useMemo<MRT_ColumnDef<IStandard>[]>(
        () => [
            { header: 'Mã tiêu chuẩn', accessorKey: 'code' },
            { header: 'Tên tiêu chuẩn', accessorKey: 'name', size: 300 },
            { header: 'Tên tiêu chuẩn Eg', accessorKey: 'nameEg', size: 300 },
            { header: 'Ghi chú', accessorKey: 'note', size: 500 },

        ],
        []
    );


    return (
        <CustomDataTable
            isLoading={standardQuery.isLoading}
            isError={standardQuery.isError}
            enableRowSelection={true}
            columns={columns}
            data={standardQuery.data || []}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <StandardStructure_CreateStandard />
                    {storePermission.state?.currentPermissionPage?.isCreate && (
                        <StandardStructure_ImportStandards />
                    )}
                    {storePermission.state?.currentPermissionPage?.isExport && (
                        <StandardStructure_ExportStandards table={table} />
                    )}


                    <StandardStructure_DeleteListStandard
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
                        <StandardStructure_UpdateStandard value={row.original} />
                        <StandardStructure_DeleteStandard
                            id={row.original.id || 0}
                            context={row.original.code || ''}
                        />
                    </CustomCenterFull>
                );
            }}
        />
    );
}
