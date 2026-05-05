import { CustomActionIconDelete, CustomActionIconDeleteProps } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { CustomColumnDef, CustomDataTable, CustomDataTableProps } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomButtonModalSync, CustomButtonModalSyncProps } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonModalSync";
import { SafeOmitType } from "@aq-fe/core-ui/shared/types/safeOmitType";
import { Group } from "@mantine/core";
import { PaginationState } from "@tanstack/react-table";
import { AxiosResponse } from "axios";
import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { useState } from "react";
import { CustomReactQueryProps, useCustomReactQuery } from "../../hooks/useCustomReactQuery";
import { CustomAPIResponse } from "../../interfaces/CustomAPIResponse";
import { PagingParams } from "../../libs/createBaseAPI";
import { CustomButtonDeleteListAPI } from "./CustomDeleteListAPI";

export interface CustomDataTableAPIProps<TData extends MRT_RowData, IReq = any, TImport = TData>
    extends SafeOmitType<CustomDataTableProps<TData, TImport>, "data" | "columns" | "pagination" | "onPaginationChange"> {
    deleteFn?: (id: string) => Promise<any> | void
    disableDelete?: (row: TData) => boolean | undefined
    syncButtonProps?: CustomButtonModalSyncProps<any>
    deleteListFn?: (ids: string[]) => Promise<any> | void
    customActionIconDeleteProps?: (row: TData) => SafeOmitType<CustomActionIconDeleteProps<TData>, "onSubmit">
    columns: CustomColumnDef<TData, TImport>[]
    getInitValues?: (rowData: TData) => IReq
    initialPageSize?: number;
    customReactQueryProps: SafeOmitType<CustomReactQueryProps<TData[]>, "serviceFn"> & {
        serviceFn: (paging: PagingParams) => Promise<AxiosResponse<CustomAPIResponse<TData[]>>>;
    }
}

export function CustomDataTableAPI<TData extends MRT_RowData, IReq = any, TImport = TData>({
    deleteFn,
    disableDelete,
    deleteListFn,
    buttonImportProps,
    syncButtonProps,
    getInitValues,
    exportProps,
    columns,
    customActionIconDeleteProps,
    initialPageSize = 15,
    customReactQueryProps,
    ...rest
}: CustomDataTableAPIProps<TData, IReq, TImport>) {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: initialPageSize,
    });

    const query = useCustomReactQuery({
        ...customReactQueryProps,
        queryKey: [...customReactQueryProps.queryKey, pagination],
        serviceFn: () => customReactQueryProps.serviceFn({
            PageNumber: pagination.pageIndex + 1,
            PageSize: pagination.pageSize,
        }),
    });

    const hasRowActions = deleteFn || rest.renderRowActions;

    const isDisableDeleteList = (table: MRT_TableInstance<TData>) => {
        const selectedRows = table.getSelectedRowModel().rows;
        if (selectedRows.length == 0) return true;
        return selectedRows.some(row => disableDelete?.(row.original));
    };

    return (
        <CustomDataTable<TData, TImport>
            isError={query.isError}
            isLoading={query.isLoading}
            data={query.data || []}
            columns={columns}
            rowCount={query.paging?.totalItemCount}
            pagination={pagination}
            onPaginationChange={setPagination}
            {...rest}
            exportProps={exportProps}
            buttonImportProps={buttonImportProps}
            renderTopToolbarCustomActions={({ table, importButton, exportButton }) => (
                <Group>
                    {rest.renderTopToolbarCustomActions?.({ table, importButton, exportButton })}
                    {syncButtonProps && <CustomButtonModalSync {...syncButtonProps} />}
                    {buttonImportProps && importButton}
                    {exportProps && exportButton}
                    {deleteListFn && (
                        <CustomButtonDeleteListAPI
                            deleteListFn={deleteListFn}
                            table={table}
                            buttonProps={{ disabled: isDisableDeleteList(table), loading: query.isLoading }}
                        />
                    )}
                </Group>
            )}
            {...(hasRowActions && {
                renderRowActions: (props: any) => (
                    <CustomCenterFull>
                        {rest.renderRowActions?.(props)}
                        {deleteFn && (
                            <CustomActionIconDelete
                                actionIconProps={{ disabled: disableDelete?.(props.row.original), loading: query.isLoading }}
                                contextData={props.row.original.code}
                                onSubmit={() => deleteFn(props.row.original.id)}
                                {...(customActionIconDeleteProps?.(props.row.original) ?? {})}
                            />
                        )}
                    </CustomCenterFull>
                )
            })}
        />
    );
}