"use client"
import { MyCenterFull } from '@/components/CenterFull/MyCenterFull';
import { MyHtmlWrapper } from '@/components/Layouts/HtmlWrapper/MyHtmlWrapper';
import { CustomThemeIconSquareCheck, MyButtonViewFileAPI } from '@/core';
import { colorsObject } from '@/shared/consts/colorsObject';
import { genderEnum, genderLabel } from '@/shared/consts/genderEnum';
import { utils_currency, utils_date, utils_mantineReactTable } from '@/utils-v2';
import { Alert, Box, Center, Group, List, Portal, Text, useComputedColorScheme } from '@mantine/core';
import { IconBug } from '@tabler/icons-react';
import { DeepKeys } from '@tanstack/react-table';
import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef,
    type MRT_RowData,
    type MRT_TableOptions
} from 'mantine-react-table';
import { MRT_Localization_VI } from "mantine-react-table/locales/vi/index.cjs";
import { useEffect, useMemo } from 'react';

export interface MyDataTableInternalProps<TData extends MRT_RowData> extends Omit<MyDataTableProps<TData>, "columns" | "data"> { }
export interface MyColumnDef<TData extends MRT_RowData> extends MRT_ColumnDef<TData> {
    type?:
    'currency'
    | "currencyWithSuffix"
    | 'ddMMyyyy'
    | 'MMyyyy'
    | 'squareCheck'
    | "list"
    | "gender"
    | "roundedTo2"
    | "round"
    | "viewFile"
    | "html"
}
export interface PaginationState {
    pageIndex: number;
    pageSize: number;
}

export interface MyDataTableProps<TData extends MRT_RowData> extends MRT_TableOptions<TData> {
    columns: MyColumnDef<TData>[]; // Table columns
    data: TData[]; // Table data
    rowActionSize?: number; // Row action button size
    setSelectedRow?: (data: TData[]) => void;
    isError?: boolean,
    /** Dùng để loading bảng khi gọi api fetch data */
    isLoading?: boolean,
    exportAble?: boolean
    pagination?: PaginationState
    idSelectionOne?: string
    setIdSelectionOne?: (value: string) => void
    visibleFields?: (({} & string) | DeepKeys<TData>)[]
}

export function MyDataTable<TData extends MRT_RowData>(
    {
        rowActionSize,
        columns,
        data,
        setSelectedRow,
        isError,
        isLoading,
        pagination,
        idSelectionOne,
        setIdSelectionOne,
        renderTopToolbarCustomActions,
        visibleFields,
        ...rest
    }: MyDataTableProps<TData>
) {
    const theme = useComputedColorScheme()
    const { renderRowActions } = { ...rest };

    const defaultRight = ["mrt-row-actions"];
    const externalRight = rest.initialState?.columnPinning?.right ?? [];

    const finalColumns = useMemo<MyColumnDef<TData>[]>(() => {
        let filterColumns = utils_mantineReactTable.filterColumnsByVisibleKeys(columns, visibleFields)
        filterColumns = utils_mantineReactTable.sortColumnsByKeyOrder(filterColumns, visibleFields)

        /* eslint-disable react/display-name */
        const cleanedColumns = filterColumns
            .filter(col => col.accessorKey !== "modifiedWhen" && col.accessorKey !== "modifiedFullName")
            .map((col) => {
                if (col.Cell) return col; // nếu user custom thì bỏ qua
                switch (col.type) {
                    case 'currency':
                        col.Cell = ({ cell }) => {
                            const value = cell.getValue<number>();
                            return utils_currency.formatWithSuffix(value)
                        };
                        if (!col.size) col.size = 120
                        break;
                    case 'currencyWithSuffix':
                        col.Cell = ({ cell }) => {
                            const value = cell.getValue<number>();
                            return utils_currency.formatWithSuffix(value, " VNĐ")
                        };
                        if (!col.size) col.size = 120
                        break;
                    case 'ddMMyyyy':
                        col.Cell = ({ cell }) => {
                            const value = cell.getValue<Date | string>();
                            return utils_date.toDDMMYYYY(value);
                        };
                        break;
                    case 'MMyyyy':
                        col.Cell = ({ cell }) => {
                            const value = cell.getValue<Date | string>();
                            return utils_date.toMMYYYY(value);
                        };
                        if (!col.size) col.size = 120
                        break;
                    case 'squareCheck':
                        col.Cell = ({ cell }) => {
                            const value = cell.getValue<boolean>();
                            return <MyCenterFull><CustomThemeIconSquareCheck checked={value} /></MyCenterFull>
                        };
                        if (!col.size) col.size = 100
                        break;
                    case 'gender':
                        col.Cell = ({ cell }) => {
                            const value = cell.getValue<genderEnum>();
                            return genderLabel[value]
                        };
                        if (!col.size) col.size = 100
                        break;
                    case 'list':
                        col.Cell = ({ cell }) => {
                            const value = cell.getValue<string[]>();
                            if (!value) return
                            if (value.length == 0) return
                            return (
                                <Box p={'md'}>
                                    <List>
                                        {value.map((item, idx) => (
                                            <List.Item key={idx}>{item}</List.Item>
                                        ))}
                                    </List>
                                </Box>
                            )
                        }
                        if (!col.size) col.size = 300;
                        break
                    case 'roundedTo2':
                        col.Cell = ({ cell }) => {
                            const value = cell.getValue<number>();
                            if (!value) return ""
                            return value.toFixed(2)
                        }
                        col.size = 80
                        break
                    case 'round':
                        col.Cell = ({ cell }) => {
                            const value = cell.getValue<number>();
                            return Math.round(value)
                        }
                        if (!col.size) col.size = 80
                        break
                    case 'viewFile':
                        col.Cell = ({ cell }) => {
                            const value = cell.getValue<string>();
                            return <MyButtonViewFileAPI filePath={value} />
                        }
                        if (!col.size) col.size = 80
                        break
                    case 'html':
                        col.Cell = ({ cell }) => {
                            const value = cell.getValue<string>();
                            return <MyHtmlWrapper html={value} />
                        }
                        if (!col.size) col.size = 300
                        break
                    default:
                        col.Cell = ({ cell }) => <span>{cell.getValue<string>() ?? ''}</span>;
                }

                return col;
            });
        /* eslint-enable react/display-name */



        // Tự động thêm cột updatedAt và updatedBy nếu chưa có
        cleanedColumns.push(
            {
                accessorKey: "modifiedWhen",
                header: "Ngày cập nhật",
                Cell: ({ cell }) => {
                    const value = cell.getValue<Date>();
                    return utils_date.toDateTime(value, true)
                },
                size: 180,
            },
            {
                accessorKey: "modifiedFullName",
                header: "Người cập nhật",
                size: 150,
            }
        );

        return cleanedColumns;
    }, [columns, visibleFields]);

    const table = useMantineReactTable({
        columns: finalColumns,
        data,
        enableGlobalFilter: false,
        getRowId: (row) => String(row.id),
        manualPagination: pagination ? true : false,
        enableRowNumbers: true,
        enableEditing: renderRowActions ? true : false,
        positionActionsColumn: "last",
        enableColumnResizing: true,
        renderTopToolbarCustomActions: ({ table }) => {
            return (
                <Group>
                    {renderTopToolbarCustomActions?.({ table: table })}
                </Group>
            );
        },
        layoutMode: "semantic",
        displayColumnDefOptions: {
            "mrt-row-actions": {
                header: "Thao tác",
                size: rowActionSize,
            },
            "mrt-row-numbers": {
                Header: "STT",
                size: 60,
            },
        },
        enableColumnPinning: true,
        mantineTableHeadCellProps: {
            style: {
                border: `0.05rem solid ${theme == "light" ? "#ccd2d8" : "black"}`,
                verticalAlign: "middle",
                paddingTop: "2px",
                paddingBottom: "2px",

            },
        },
        mantineTableBodyCellProps: {
            style: {
                border: `0.05rem solid ${theme == "light" ? "#d2d7dd" : "black"}`,
                paddingTop: "2px",
                paddingBottom: "2px",
            },
        },
        localization: MRT_Localization_VI,
        renderEmptyRowsFallback: () => isError ?
            <Alert icon={<IconBug />} color={'red'} title="Có lỗi xảy ra!" m={'md'} /> :
            <Center p={'md'}> <Text c={'gray'} fw={'600'} size='15px' fs={"italic"}>Không có dữ liệu!</Text></Center>
        ,
        mantineTableContainerProps: { style: { maxHeight: "65vh" } },
        enableStickyHeader: true,
        ...rest,
        mantineTableBodyRowProps: (props) => ({
            ...(setIdSelectionOne && {
                onClick: () => {
                    setIdSelectionOne?.(props.row.original.id)
                },
                style: {
                    cursor: 'pointer',
                    backgroundColor: props.row.original.id == idSelectionOne ?
                        colorsObject.mantineBackgroundTealLight
                        :
                        'transparent',
                },
            }),
            ...(
                typeof rest.mantineTableBodyRowProps === "function"
                    ? rest.mantineTableBodyRowProps(props)
                    : rest.mantineTableBodyRowProps
            ),
        }),
        initialState: {
            density: "md",
            ...(pagination ? {} : { pagination: { pageIndex: 0, pageSize: 30 }, }),
            ...rest.initialState,
            columnPinning: { right: Array.from(new Set([...externalRight, ...defaultRight])) },
            columnVisibility: {
                modifiedWhen: false,
                modifiedFullName: false,
                ...rest.initialState?.columnVisibility
            },
        },
        state: {
            showSkeletons: isLoading,
            ...(pagination ? { pagination } : {}),
            ...rest.state
        },
    });

    useEffect(() => {
        setSelectedRow && setSelectedRow(table.getSelectedRowModel().rows.map((row) => row.original));
    }, [table.getState().rowSelection]);

    return (
        <main style={{ position: "relative", zIndex: 1 }}>
            {table.getState().isFullScreen ? (
                <Portal>
                    <MantineReactTable table={table} />
                </Portal>
            ) : (
                <MantineReactTable table={table} />
            )}
        </main>
    )
}
