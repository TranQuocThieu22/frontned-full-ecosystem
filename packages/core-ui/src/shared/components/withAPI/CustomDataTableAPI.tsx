import { CustomColumnDef, CustomDataTable, CustomDataTableProps } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group } from "@mantine/core";
import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { SafeOmitType } from "../../types/safeOmitType";
import { CustomActionIconDelete, CustomActionIconDeleteProps } from "../button/CustomActionIconDelete";
import CustomButtonModalSync, { CustomButtonModalSyncProps } from "./CustomButtonModalSync";
import { CustomButtonDeleteListAPI } from "./CustomDeleteListAPI";
export interface CustomDataTableAPIProps<TData extends MRT_RowData, IReq = any, IResQuery = TData[], TImport = TData>
    extends SafeOmitType<CustomDataTableProps<TData, TImport>, "data" | "columns"> {
    query: ReturnType<typeof useCustomReactQuery<IResQuery, IReq, TData[]>>
    deleteFn?: (id: number) => Promise<any> | void
    disableDelete?: (row: TData) => boolean | undefined
    syncButtonProps?: CustomButtonModalSyncProps<any>
    deleteListFn?: (ids: number[]) => Promise<any> | void
    customActionIconDeleteProps?: (row: TData) => SafeOmitType<CustomActionIconDeleteProps<TData>, "onSubmit">
    columns: CustomColumnDef<TData, TImport>[]
    getInitValues?: (rowData: TData) => IReq
}

export function CustomDataTableAPI<TData extends MRT_RowData, IReq = any, IResQuery = TData[], TImport = TData>({
    deleteFn,
    disableDelete,
    deleteListFn,
    buttonImportProps,
    query,
    syncButtonProps,
    getInitValues,
    exportProps,
    columns,
    customActionIconDeleteProps,
    ...rest
}: CustomDataTableAPIProps<TData, IReq, IResQuery, TImport>) {
    const hasRowActions =
        deleteFn ||
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
                    </CustomCenterFull>
                )
            })}

        />
    )
}
