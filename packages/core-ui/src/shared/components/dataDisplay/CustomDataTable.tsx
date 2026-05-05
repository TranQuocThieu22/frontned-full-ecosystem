"use client"
import { CustomHtmlWrapper } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { genderEnum, genderLabel } from '@aq-fe/core-ui/shared/consts/enum/genderEnum';
import { colorsObject } from '@aq-fe/core-ui/shared/consts/object/colorsObject';
import { SafeOmitType } from '@aq-fe/core-ui/shared/types/safeOmitType';
import { currencyUtils } from '@aq-fe/core-ui/shared/utils/currencyUtils';
import { dateUtils } from '@aq-fe/core-ui/shared/utils/dateUtils';
import { Alert, Box, Center, Group, List, Portal, Text, useComputedColorScheme } from '@mantine/core';
import { IconBug, TablerIcon } from '@tabler/icons-react';
import { DeepKeys } from '@tanstack/react-table';
import {
    MantineReactTable,
    MRT_Cell,
    MRT_TableInstance,
    useMantineReactTable,
    type MRT_ColumnDef,
    type MRT_RowData,
    type MRT_TableOptions
} from 'mantine-react-table';
import { MRT_Localization_VI } from "mantine-react-table/locales/vi/index.cjs";
import { ReactNode, useEffect, useMemo } from 'react';
import { utils, writeFile } from 'xlsx';
import { excelUtils } from '../../utils/excelUtils';
import { CustomButton } from '../button/CustomButton/CustomButton';
import { CustomButtonImport, CustomButtonImportProps } from '../button/CustomButtonImport/CustomButtonImport';
import { FieldOption } from '../button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal';
import { CustomButtonViewFileAPI } from '../withAPI/CustomButtonViewFileAPI';
import { CustomEnumBadge } from './CustomEnumBadge/CustomEnumBadge';
import { CustomThemeIconSquareCheck } from './CustomThemeIconSquareCheck';

export interface CustomDataTableInternalProps<TData extends MRT_RowData> extends Omit<CustomDataTableProps<TData>, "columns" | "data"> { }
export interface StatusBadgeProps {
    enumObject: Record<string, string | number>
    enumLabel: Record<number, string>;
    enumColor: Record<number, string>;
    enumIcon?: Record<number, TablerIcon>
}
type PartialFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export interface CustomColumnDef<TData extends MRT_RowData, TImport = TData> extends MRT_ColumnDef<TData> {
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
    | "statusBadge",
    importFieldProps?: SafeOmitType<FieldOption<TImport>, | "fieldName" | "isSelected" | "excelColumKey">,
    isExcluded?: boolean,
    statusBadgeProps?: StatusBadgeProps
}
const getValueByPath = (obj: any, path: string) =>
    path.split('.').reduce((acc, key) => acc?.[key], obj);

/** Tiêu đề cột số thứ tự khi export Excel từ CustomDataTable */
const EXPORT_EXCEL_STT_HEADER = 'STT';

export interface PaginationState {
    pageIndex: number;
    pageSize: number;
}

export interface CustomDataTableProps<TData
    extends MRT_RowData, TImport = TData>
    extends SafeOmitType<MRT_TableOptions<TData>, "renderTopToolbarCustomActions"> {
    columns: CustomColumnDef<TData, TImport>[]; // Table columns
    data: TData[]; // Table data
    rowActionSize?: number; // Row action button size
    setSelectedRow?: (data: TData[]) => void;
    isError?: boolean,
    /** Dùng để loading bảng khi gọi api fetch data */
    isLoading?: boolean,
    pagination?: PaginationState
    idSelectionOne?: string
    setIdSelectionOne?: (value: string) => void
    buttonImportProps?: PartialFields<CustomButtonImportProps<TImport>, "fields">
    pinningRightColumns?: DeepKeys<TData>[]
    hiddenColumns?: DeepKeys<TData>[]
    excludedColumns?: DeepKeys<TData>[]
    exportProps?: {
        fileName?: string
    }
    renderTopToolbarCustomActions?: ((props: {
        table: MRT_TableInstance<TData>;
        exportButton: ReactNode,
        importButton: ReactNode
    }) => ReactNode) | undefined
}
export function CustomDataTable<TData extends MRT_RowData, TImport = TData>(
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
        pinningRightColumns,
        hiddenColumns,
        excludedColumns,
        buttonImportProps,
        exportProps,
        ...rest
    }: CustomDataTableProps<TData, TImport>
) {
    const handleExport = (table: MRT_TableInstance<TData>) => {
        const selectedRows = table.getSelectedRowModel().rows;

        // Nếu không chọn row nào → xuất toàn bộ dữ liệu đang hiển thị (đã filter, sort)
        const exportRows = selectedRows.length > 0
            ? selectedRows
            : table.getPrePaginationRowModel().rows;

        // Chuẩn bị header
        const headers = columns.filter(col => !col.isExcluded).map(col => ({
            header: col.header,
            accessorKey: col.accessorKey,
            accessorFn: col.accessorFn
        }))


        // Lấy giá trị hiển thị (ưu tiên accessorFn); cột STT ở đầu (1…n theo thứ tự dòng export)
        const excelHeaders = [EXPORT_EXCEL_STT_HEADER, ...headers.map(h => h.header)];
        const excelRows = exportRows.map((rowItem, index) => {
            const original = rowItem.original;
            const row: Record<string, unknown> = {
                [EXPORT_EXCEL_STT_HEADER]: index + 1,
            };

            headers.forEach(h => {
                let value: any;

                if (h.accessorFn) {
                    value = h.accessorFn(original);
                } else if (h.accessorKey) {
                    value = getValueByPath(original, h.accessorKey);
                }
                if (Array.isArray(value)) {
                    row[h.header as string] = value.map(v => `• ${v}`).join('\n');
                } else {
                    row[h.header as string] = value;
                }
            });
            return row;
        });

        const worksheet = utils.json_to_sheet(excelRows, {
            header: excelHeaders,
        });

        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Sheet1");

        writeFile(workbook, exportProps?.fileName + ".xlsx" || "export.xlsx");
    };
    const { renderRowActions } = { ...rest }
    const theme = useComputedColorScheme()
    const finalColumns = useMemo<CustomColumnDef<TData, TImport>[]>(() => {
        let filterColumns: CustomColumnDef<TData, TImport>[] = columns
        filterColumns = filterColumns.filter(col => !col.isExcluded);
        if (excludedColumns && excludedColumns.length > 0) {
            filterColumns = filterColumns.filter(col => !excludedColumns.includes(col.accessorKey as any));
        }
        const cleanedColumns = filterColumns
            .filter(col => col.accessorKey !== "modifiedWhen" && col.accessorKey !== "modifiedFullName")
            .map((col) => {
                if (col.Cell) return col; // nếu user custom thì bỏ qua
                switch (col.type) {
                    case 'statusBadge':
                        col.accessorFn = (row) => {
                            return col.statusBadgeProps?.enumLabel[getValueByPath(row, col.accessorKey!)]
                        }
                        col.Cell = ({ row }) => {
                            return (
                                <CustomEnumBadge
                                    value={getValueByPath(row.original, col.accessorKey!)}
                                    enumLabel={col.statusBadgeProps?.enumLabel!}
                                    enumIcon={col.statusBadgeProps?.enumIcon}
                                    enumColor={col.statusBadgeProps?.enumColor}
                                />
                            )
                        }
                        if (!col.size) col.size = 250
                        break
                    case 'currency':
                        col.accessorFn = (row) => {
                            return currencyUtils.formatWithSuffix(getValueByPath(row, col.accessorKey!));
                        }
                        if (!col.size) col.size = 120
                        break;
                    case 'currencyWithSuffix':
                        col.accessorFn = (row) => {
                            return currencyUtils.formatWithSuffix(getValueByPath(row, col.accessorKey!), " VNĐ");
                        }
                        if (!col.size) col.size = 200
                        break;
                    case "ddMMyyyy":
                        col.accessorFn = (row) => {
                            return dateUtils.toDDMMYYYY(getValueByPath(row, col.accessorKey!))
                        };
                        break;
                    case 'MMyyyy':
                        col.accessorFn = (row) => {
                            return dateUtils.toMMYYYY(getValueByPath(row, col.accessorKey!));
                        }
                        if (!col.size) col.size = 120
                        break;
                    case 'squareCheck':
                        col.Cell = ({ cell }: { cell: MRT_Cell<TData, number> }) => {
                            const value = cell.getValue<boolean>();
                            return <CustomCenterFull><CustomThemeIconSquareCheck checked={value} /></CustomCenterFull>
                        };
                        if (!col.size) col.size = 100
                        break;
                    case 'gender':
                        col.accessorFn = (row) => {
                            return genderLabel[getValueByPath(row, col.accessorKey!) as genderEnum]
                        }
                            ;
                        if (!col.size) col.size = 100
                        break;
                    case 'list':
                        col.Cell = ({ cell }: { cell: MRT_Cell<TData, number> }) => {
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
                        col.accessorFn = (row) => {
                            if (!row[col.accessorKey!]) return ""
                            return row[col.accessorKey!].toFixed(2)
                        }
                        col.size = 80
                        break
                    case 'round':
                        col.accessorFn = (row) => {
                            return Math.round(row[col.accessorKey!])
                        }
                        if (!col.size) col.size = 80
                        break
                    case 'viewFile':
                        col.Cell = ({ cell }: { cell: MRT_Cell<TData, number> }) => {
                            const value = cell.getValue<string>();
                            return <CustomButtonViewFileAPI filePath={value} />
                        }
                        if (!col.size) col.size = 80
                        break
                    case 'html':
                        col.Cell = ({ cell }: { cell: MRT_Cell<TData, number> }) => {
                            const value = cell.getValue<string>();
                            return <CustomHtmlWrapper html={value} />
                        }
                        if (!col.size) col.size = 300
                        break

                    default:
                        col.Cell = ({ cell }: { cell: MRT_Cell<TData, number> }) => <span>{cell.getValue<string>() ?? ''}</span>;
                }

                return col;
            });

        cleanedColumns.push(
            {
                accessorKey: "modifiedWhen",
                header: "Ngày cập nhật",
                Cell: ({ cell }: { cell: MRT_Cell<TData, number> }) => {
                    const value = cell.getValue<Date>();
                    return dateUtils.toDateTime(value, true)
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
    }, [columns]);

    const table = useMantineReactTable({
        columns: finalColumns,
        data,
        enableGlobalFilter: false,
        getRowId: (row) => String(row.id),
        manualPagination: pagination ? true : false,
        enableRowNumbers: true,
        enableRowActions: renderRowActions ? true : false,
        positionActionsColumn: "last",
        enableColumnResizing: true,
        renderTopToolbarCustomActions: (props) => {
            const fieldOptions: FieldOption<TImport>[] = columns.filter(col => col.importFieldProps).map(col => ({
                fieldKey: col.accessorKey || "",
                fieldName: col.header,
                ...col.importFieldProps
            }))
            return (
                <Group>
                    {renderTopToolbarCustomActions?.({
                        table: props.table,
                        exportButton: (<CustomButton
                            actionType="export"
                            onClick={() => handleExport(props.table)}
                        />),
                        importButton: (
                            <CustomButtonImport
                                fields={fieldOptions}
                                {...buttonImportProps}
                                onPrepareWorkbook={(workbook) => {
                                    const columnsStatusBadges = columns.filter(item => item.statusBadgeProps)
                                    columnsStatusBadges.map(item => {
                                        excelUtils.addEnumSheet({
                                            enumObject: item.statusBadgeProps?.enumObject!,
                                            sheetName: item.header,
                                            workbook: workbook,
                                            labelMapping: item.statusBadgeProps?.enumLabel
                                        })
                                    })
                                    buttonImportProps?.onPrepareWorkbook?.(workbook)
                                }}
                                buttonProps={{
                                    ...buttonImportProps?.buttonProps
                                }}
                            />
                        )
                    })}
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
                border: `0.05rem solid ${theme == "light" ? "#ccd2d8" : "gray"}`,
                verticalAlign: "middle",
                paddingTop: "2px",
                paddingBottom: "2px",

            },
        },
        mantineTableBodyCellProps: {
            style: {
                border: `0.05rem solid ${theme == "light" ? "#d2d7dd" : "gray"}`,
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
            columnPinning: {
                ...rest.initialState?.columnPinning,
                right: pinningRightColumns
                    ? [...pinningRightColumns, 'mrt-row-actions']
                    : [...rest.initialState?.columnPinning?.right || [], 'mrt-row-actions'],
            },
            columnVisibility: {
                modifiedWhen: false,
                modifiedFullName: false,
                ...(hiddenColumns ? Object.fromEntries(hiddenColumns.map(column => [column, false])) : rest.initialState?.columnVisibility)
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
