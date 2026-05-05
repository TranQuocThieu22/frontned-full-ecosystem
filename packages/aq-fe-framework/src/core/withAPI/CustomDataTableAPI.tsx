import { MyActionIconDelete, MyCenterFull, MyDataTable, MyDataTableProps } from "@/components";
import { useMyReactQuery } from "@/hooks";
import { Group } from "@mantine/core";
import { MRT_RowData } from "mantine-react-table";
import { ReactNode } from "react";
import { MyButtonCreateUpdate, MyButtonCreateUpdateProps } from "../button/MyButtonCreateUpdate/MyButtonCreateUpdate";
import { CustomButtonDeleteListAPI } from "./CustomDeleteListAPI";

export interface CustomDataTableAPIProps<TData extends MRT_RowData, IReq = any, IResQuery = TData[], IResMutation = TData> extends Omit<MyDataTableProps<TData>, "data"> {
    // reactQueryProps: MyReactQueryProps<IResQuery, IReq, TData[]>
    query: ReturnType<typeof useMyReactQuery<IResQuery, IReq, TData[]>>
    deleteFn?: (id: number) => Promise<any> | void
    deleteListFn?: (ids: number[]) => Promise<any> | void

    buttonCreateUpdateProps?: MyButtonCreateUpdateProps<IReq, IResMutation>
    renderCreateUpdateContent?: (isUpdate: boolean) => ReactNode
    getInitValues?: (rowData: TData) => IReq

    enableCreate?: boolean
    enableUpdate?: boolean
}

export function CustomDataTableAPI<TData extends MRT_RowData, IReq = any, IResQuery = TData[], IResMutation = TData>({
    deleteFn,
    deleteListFn,
    buttonCreateUpdateProps,
    // reactQueryProps,
    query,
    renderCreateUpdateContent,
    getInitValues,
    enableCreate,
    enableUpdate,
    ...rest
}: CustomDataTableAPIProps<TData, IReq, IResQuery, IResMutation>) {
    const hasRowActions =
        deleteFn ||
        rest.renderRowActions ||
        (enableUpdate !== false && buttonCreateUpdateProps);
    return (
        <MyDataTable
            isError={query.isError}
            isLoading={query.isLoading}
            data={query.data || []}
            {...rest}
            renderTopToolbarCustomActions={(props) => (
                <Group>
                    {enableCreate !== false && buttonCreateUpdateProps && (
                        <MyButtonCreateUpdate {...buttonCreateUpdateProps}>
                            {renderCreateUpdateContent
                                ? renderCreateUpdateContent(false)
                                : buttonCreateUpdateProps.children}
                        </MyButtonCreateUpdate>
                    )}
                    {rest.renderTopToolbarCustomActions?.(props)}
                    {deleteListFn && <CustomButtonDeleteListAPI deleteListFn={deleteListFn} table={props.table} />}
                </Group>
            )}
            {...(hasRowActions && {
                renderRowActions: (props: any) => (
                    <MyCenterFull>
                        {rest.renderRowActions?.(props)}
                        {enableUpdate !== false && buttonCreateUpdateProps && (
                            <MyButtonCreateUpdate
                                isUpdate
                                initValues={
                                    getInitValues
                                        ? getInitValues(props.row.original)
                                        : (props.row.original as IReq)
                                }
                                {...buttonCreateUpdateProps}
                            >
                                {renderCreateUpdateContent
                                    ? renderCreateUpdateContent(true)
                                    : buttonCreateUpdateProps.children}
                            </MyButtonCreateUpdate>
                        )}
                        {deleteFn && <MyActionIconDelete contextData={props.row.original.code} onSubmit={() => deleteFn(props.row.original.id)} />}
                    </MyCenterFull>
                )
            })}

        />
    )
}
