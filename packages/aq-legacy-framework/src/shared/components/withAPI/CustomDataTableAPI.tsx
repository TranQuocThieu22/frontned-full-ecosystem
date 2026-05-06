import { CustomColumnDef, CustomDataTable, CustomDataTableProps } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { useCustomReactQuery, CustomReactQueryProps } from "@aq-fe/aq-legacy-framework/shared/hooks/useCustomReactQuery";
import { SafeOmitType } from "@aq-fe/core-ui/shared/types/safeOmitType";
import { Group } from "@mantine/core";
import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { CustomActionIconDelete, CustomActionIconDeleteProps } from "../button/CustomActionIconDelete";
import { CustomActionIconSafeDelete } from "../button/CustomActionIconSafeDelete";
import { CustomButtonDeleteListAPI } from "./CustomDeleteListAPI";
import { CustomButtonSafeDeleteListAPI } from "./CustomSafeDeleteListAPI";
import { CustomButtonModalSync, CustomButtonModalSyncProps } from "./CustomButtonModalSync";

export interface CustomDataTableAPIProps<TData extends MRT_RowData, IReq = any, IResQuery = TData[], TImport = TData>
    extends SafeOmitType<CustomDataTableProps<TData, TImport>, "data" | "columns"> {
    query?: any; // Allow any for now to support both hook return types
    customReactQueryProps?: CustomReactQueryProps<any>;
    deleteFn?: (id: any) => Promise<any> | void
    disableDelete?: (row: TData) => boolean | undefined
    syncButtonProps?: CustomButtonModalSyncProps<any>
    deleteListFn?: (ids: any[]) => Promise<any> | void
    safeDeleteFn?: (value: TData) => Promise<any>
    safeDeleteListFn?: (values: TData[]) => Promise<any>
    customActionIconDeleteProps?: (row: TData) => SafeOmitType<CustomActionIconDeleteProps<TData>, "onSubmit">
    customActionIconSafeDeleteProps?: (row: TData) => SafeOmitType<CustomActionIconDeleteProps<TData>, "onSubmit">
    columns: CustomColumnDef<TData, TImport>[]
    getInitValues?: (rowData: TData) => IReq
}

export function CustomDataTableAPI<TData extends MRT_RowData, IReq = any, IResQuery = TData[], TImport = TData>(props: CustomDataTableAPIProps<TData, IReq, IResQuery, TImport>) {
    if (props.customReactQueryProps) {
        return <CustomDataTableAPIREST {...props} />
    }
    return <CustomDataTableAPILegacy {...props} />
}

function CustomDataTableAPIREST<TData extends MRT_RowData, IReq = any, IResQuery = TData[], TImport = TData>({
    customReactQueryProps,
    ...rest
}: CustomDataTableAPIProps<TData, IReq, IResQuery, TImport>) {
    const query = useCustomReactQuery(customReactQueryProps!);
    
    // Transform REST query to look like Legacy query for the internal component
    const transformedQuery = {
        ...query,
        dataCount: (query as any).paging?.totalCount || query.data?.length || 0,
        rawData: null
    };

    return <CustomDataTableAPIInner query={transformedQuery} {...rest} />
}

function CustomDataTableAPILegacy<TData extends MRT_RowData, IReq = any, IResQuery = TData[], TImport = TData>({
    query,
    ...rest
}: CustomDataTableAPIProps<TData, IReq, IResQuery, TImport>) {
    return <CustomDataTableAPIInner query={query} {...rest} />
}

function CustomDataTableAPIInner<TData extends MRT_RowData, IReq = any, IResQuery = TData[], TImport = TData>({
    deleteFn,
    disableDelete,
    deleteListFn,
    safeDeleteFn,
    safeDeleteListFn,
    buttonImportProps,
    query,
    syncButtonProps,
    getInitValues,
    exportProps,
    columns,
    customActionIconDeleteProps,
    customActionIconSafeDeleteProps,
    ...rest
}: CustomDataTableAPIProps<TData, IReq, IResQuery, TImport>) {
    const hasRowActions =
        deleteFn ||
        safeDeleteFn ||
        rest.renderRowActions

    const isDisableDeleteList = (table: MRT_TableInstance<TData>) => {
        const selectedRows = table.getSelectedRowModel().rows
        if (selectedRows.length == 0) return true
        return selectedRows.some(row => disableDelete?.(row.original))
    }

    return (
        <CustomDataTable<TData, TImport >
            isError={query.isError}
            isLoading={query.isLoading}
            data={query.data || []}
            columns={columns}
            {...rest}
            exportProps={exportProps}
            buttonImportProps={buttonImportProps}
            renderTopToolbarCustomActions={({ table, importButton, exportButton }) => {
                return (
                    <Group>
                        {rest.renderTopToolbarCustomActions?.({ table, importButton, exportButton })}
                        {syncButtonProps && (
                            <CustomButtonModalSync
                                {...syncButtonProps}
                            />
                        )}
                        {buttonImportProps && importButton}
                        {exportProps && exportButton}
                        {deleteListFn && (
                            <CustomButtonDeleteListAPI
                                deleteListFn={deleteListFn}
                                table={table}
                                buttonProps={{
                                    disabled: isDisableDeleteList(table),
                                    loading: query.isLoading
                                }}
                            />
                        )}
                        {safeDeleteListFn && (
                            <CustomButtonSafeDeleteListAPI
                                safeDeleteListFn={safeDeleteListFn}
                                table={table}
                                buttonProps={{
                                    disabled: isDisableDeleteList(table),
                                    loading: query.isLoading
                                }}
                            />
                        )}
                    </Group>
                )
            }}
            {...(hasRowActions && {
                renderRowActions: (props: any) => (
                    <CustomCenterFull>
                        {rest.renderRowActions?.(props)}
                        {deleteFn && (
                            <CustomActionIconDelete
                                actionIconProps={{
                                    disabled: disableDelete?.(props.row.original),
                                    loading: query.isLoading
                                }}
                                contextData={props.row.original.code}
                                onSubmit={() => deleteFn(props.row.original.id)}
                                {...(customActionIconDeleteProps?.(props.row.original) ?? {})}
                            />
                        )}
                        {safeDeleteFn && (
                            <CustomActionIconSafeDelete
                                actionIconProps={{
                                    disabled: disableDelete?.(props.row.original),
                                    loading: query.isLoading
                                }}
                                contextData={props.row.original.code}
                                onSubmit={() => safeDeleteFn(props.row.original)}
                                {...(customActionIconSafeDeleteProps?.(props.row.original) ?? {})}
                            />
                        )}
                    </CustomCenterFull>
                )
            })}

        />
    )
}
