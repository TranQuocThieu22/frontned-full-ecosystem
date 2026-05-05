"use client";

import { CustomSmartDataTableDeleteList } from "@/shared/components/dataDisplay/CustomSmartDataTableDeleteList";
import { CustomSmartDataTableDeleteRow } from "@/shared/components/dataDisplay/CustomSmartDataTableDeleteRow";
import { CustomAPIResponse } from "@/shared/interfaces/CustomAPIResponse";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import {
	ActionIcon,
	Alert, Badge,
	Box,
	Button,
	Checkbox,
	Divider,
	Group,
	List,
	Modal,
	Pagination,
	Popover,
	Select,
	Skeleton,
	Stack,
	Switch,
	Table,
	Text,
	TextInput,
	Tooltip,
	useComputedColorScheme
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBug, IconColumns, IconFileExport, IconFilter, IconFilterOff, IconMaximize } from "@tabler/icons-react";
import type { UseQueryResult } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import {
	type ColumnDef,
	type ColumnPinningState,
	type ColumnSizingState,
	getCoreRowModel,
	getSortedRowModel,
	type PaginationState,
	type RowSelectionState,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import type { AxiosResponse } from "axios";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { utils, writeFile } from "xlsx";

// ─── Helpers ───────────────────────────────────────────────────────────────────

const getValueByPath = (obj: any, path: string): unknown =>
	path.split(".").reduce((acc, key) => acc?.[key], obj);

// ─── Column Types ───────────────────────────────────────────────────────────────

export type ColumnType =
	| "text"
	| "currency"
	| "currencyWithSuffix"
	| "ddMMyyyy"
	| "MMyyyy"
	| "dateTime"
	| "squareCheck"
	| "gender"
	| "list"
	| "roundedTo2"
	| "round"
	| "statusBadge"
	| "custom";

export interface StatusBadgeConfig<T extends string | number = number> {
	enumObject: Record<string, T>;
	enumLabel: Record<T, string>;
	enumColor?: Record<T, string>;
}

export type ColumnFilterType = "text" | "select" | "date" | "number";

export interface ColumnFilterConfig<TData = unknown> {
	type?: ColumnFilterType;
	placeholder?: string;
	/** Options cho select filter (value, label) */
	options?: { value: string; label: string }[];
	/** Custom filter function: return true = keep row */
	filterFn?: (rowValue: unknown, filterValue: TData) => boolean;
}

export interface SmartColumnDef<TData> {
	accessorKey?: string;
	header: string;
	type?: ColumnType;
	cell?: (row: TData) => ReactNode;
	statusBadgeProps?: StatusBadgeConfig;
	size?: number;
	minSize?: number;
	maxSize?: number;
	enableSorting?: boolean;
	enableResizing?: boolean;
	enableColumnPinning?: boolean;
	pinned?: "left" | "right" | false;
	isExcluded?: boolean;
	/** Cấu hình filter cho cột này */
	columnFilter?: ColumnFilterConfig;
}

// ─── Pagination ─────────────────────────────────────────────────────────────────

export interface SmartPagination {
	pageIndex: number;
	pageSize: number;
	totalCount?: number;
	onPaginationChange?: (pagination: PaginationState) => void;
}

// ─── Formatters ────────────────────────────────────────────────────────────────

const { toDDMMYYYY, toMMYYYY, toDateTime } = dateUtils;

function formatCurrency(amount?: number, suffix = ""): string {
	if (amount == null || isNaN(amount)) return "";
	return new Intl.NumberFormat("vi-VN").format(amount).replace(/\./g, ",") + suffix;
}

const GENDER_LABELS: Record<number, string> = { 1: "Nam", 2: "Nữ" };

// ─── Cell Renderer ─────────────────────────────────────────────────────────────

function renderCell<TData>(
	col: SmartColumnDef<TData>,
	row: TData,
	resolveValue: (r: TData, c: SmartColumnDef<TData>) => unknown,
) {
	const value = resolveValue(row, col);

	switch (col.type) {
		case "currency":
			return <Text size="sm">{formatCurrency(value as number)}</Text>;
		case "currencyWithSuffix":
			return <Text size="sm">{formatCurrency(value as number, " VNĐ")}</Text>;
		case "ddMMyyyy":
			return <Text size="sm">{toDDMMYYYY(value as Date | string)}</Text>;
		case "MMyyyy":
			return <Text size="sm">{toMMYYYY(value as Date | string)}</Text>;
		case "dateTime":
			return <Text size="sm">{toDateTime(value as Date | string)}</Text>;
		case "squareCheck": {
			const checked = !!value;
			return (
				<Box style={{ display: "flex", justifyContent: "center" }}>
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
						<rect x="1.5" y="1.5" width="15" height="15" rx="2"
							stroke={checked ? "#228be6" : "#868e96"}
							strokeWidth="1.5"
							fill={checked ? "#228be6" : "none"}
						/>
						{checked && (
							<path d="M4.5 9L7.5 12L13.5 6" stroke="white" strokeWidth="1.5"
								strokeLinecap="round" strokeLinejoin="round"
							/>
						)}
					</svg>
				</Box>
			);
		}
		case "gender":
			return <Text size="sm">{GENDER_LABELS[value as number] ?? ""}</Text>;
		case "list": {
			const arr = value as string[];
			if (!arr?.length) return null;
			return (
				<Box p="xs">
					<List size="xs">
						{arr.map((item, idx) => <List.Item key={idx}>{item}</List.Item>)}
					</List>
				</Box>
			);
		}
		case "roundedTo2":
			return <Text size="sm">{value != null ? (value as number).toFixed(2) : ""}</Text>;
		case "round":
			return <Text size="sm">{value != null ? Math.round(value as number) : ""}</Text>;
		case "statusBadge": {
			const v = value as number;
			const label = col.statusBadgeProps?.enumLabel?.[v];
			const color = col.statusBadgeProps?.enumColor?.[v];
			return (
				<Badge variant="light" color={color} radius="lg" style={{ width: "100%" }}>
					{label ?? ""}
				</Badge>
			);
		}
		case "custom":
			return <>{col.cell?.(row) as ReactNode}</>;
		case "text":
		default:
			return <Text size="sm">{value as string}</Text>;
	}
}

// ─── Props ─────────────────────────────────────────────────────────────────────

// ─── Column Filter State ────────────────────────────────────────────────────────

export type ColumnFilterState = Record<string, string>;

export interface SmartDataTableProps<TData extends { id?: string }> {
	// ── Data source ──────────────────────────────────────────────────────────
	/** Query result từ useCustomReactQuery hoặc useQuery — component chỉ hiển thị */
	query: UseQueryResult<TData[]>;

	// ── Columns ───────────────────────────────────────────────────────────────
	columns: SmartColumnDef<TData>[];

	// ── Pagination ───────────────────────────────────────────────────────────
	pagination?: SmartPagination;

	// ── Row selection ─────────────────────────────────────────────────────────
	rowSelection?: RowSelectionState;
	onRowSelectionChange?: (selection: RowSelectionState) => void;

	// ── Row click & highlight ───────────────────────────────────────────────────
	onRowClick?: (row: TData) => void;
	selectedRowId?: number | string;

	// ── Table appearance ───────────────────────────────────────────────────────
	stickyHeader?: boolean;
	maxBodyHeight?: string;
	hiddenColumns?: string[];
	emptyMessage?: string;

	// ── Export ────────────────────────────────────────────────────────────────
	exportProps?: { fileName?: string };

	// ── Toolbar actions ────────────────────────────────────────────────────────
	renderTopToolbarCustomActions?: (props: { selectedRows: TData[] }) => ReactNode;

	// ── Row actions ───────────────────────────────────────────────────────────
	/** Render custom action buttons per row */
	customRowActions?: (row: TData) => ReactNode;
	/** Xóa 1 row (hiển thị nút xóa trong mỗi dòng) */
	deleteFn?: (id: string) => Promise<AxiosResponse<CustomAPIResponse<void>>> | void;
	/** Vô hiệu hóa nút xóa cho row cụ thể */
	disableDelete?: (row: TData) => boolean;
	/** Xóa hàng loạt (hiển thị nút xóa đã chọn trên toolbar) */
	deleteListFn?: (ids: string[]) => Promise<AxiosResponse<CustomAPIResponse<void>>> | void;

	// ── Column filters ─────────────────────────────────────────────────────────
	/** Controlled column filter state */
	columnFilters?: ColumnFilterState;
	/** Callback khi filter thay đổi */
	onColumnFiltersChange?: (filters: ColumnFilterState) => void;
	/** Bật/tắt hàng filter (mặc định: true) */
	enableColumnFilter?: boolean;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function CustomSmartDataTable<TData extends { id?: string }>({
	// Data
	query,
	// Columns
	columns,
	// Pagination
	pagination,
	// Selection
	rowSelection = {},
	onRowSelectionChange,
	// Row
	onRowClick,
	selectedRowId,
	// Appearance
	stickyHeader = true,
	maxBodyHeight = "65vh",
	hiddenColumns = [],
	emptyMessage = "Không có dữ liệu!",
	// Export
	exportProps,
	// Toolbar
	renderTopToolbarCustomActions,
	// Row actions
	customRowActions,
	deleteFn,
	disableDelete,
	deleteListFn,
	// Column filters
	columnFilters: controlledFilters,
	onColumnFiltersChange,
	enableColumnFilter = true,
}: SmartDataTableProps<TData>) {
	const queryClient = useQueryClient();
	const [isZoomed, { toggle: toggleZoom, close: closeZoom }] = useDisclosure(false);
	const [showFilterRow, { toggle: toggleFilterRow }] = useDisclosure(false);

	// ─── Data ────────────────────────────────────────────────────────────────
	const data: TData[] = query.data ?? [];

	// ─── Delete helpers ─────────────────────────────────────────────────────
	const resolveSelectedIds = useCallback((): string[] => {
		return data
			.filter((row) => rowSelection[String(row.id ?? "")])
			.map((row) => row.id as string);
	}, [rowSelection, data]);

	const resolveSelectedRows = useCallback((): TData[] => {
		return data.filter((row) => rowSelection[String(row.id ?? "")]);
	}, [rowSelection, data]);

	const internalRenderRowActions = useCallback(
		(row: TData) => (
			<Group gap="xs" align="center" wrap="nowrap">
				{customRowActions?.(row)}
				{deleteFn && (
					<CustomSmartDataTableDeleteRow
						row={row}
						deleteFn={deleteFn}
						disableDelete={disableDelete}
						isLoading={query.isLoading}
						queryClient={queryClient}
					/>
				)}
			</Group>
		),
		[customRowActions, deleteFn, disableDelete, query.isLoading, queryClient],
	);

	const hasRowActions = !!(customRowActions || deleteFn);

	// ─── Toolbar ───────────────────────────────────────────────────────────
	// Left: main actions
	const toolbarLeft = useCallback(
		() => (
			<Group gap="xs" align="center">
				{renderTopToolbarCustomActions?.({ selectedRows: resolveSelectedRows() })}
				{deleteListFn && (
					<CustomSmartDataTableDeleteList
						count={resolveSelectedRows().length}
						onSubmit={async () => {
							const ids = resolveSelectedIds();
							const result = deleteListFn(ids);
							if (result !== undefined) await result;
							queryClient.invalidateQueries();
						}}
					/>
				)}
			</Group>
		),
		[renderTopToolbarCustomActions, resolveSelectedRows, exportProps, deleteListFn, resolveSelectedIds, queryClient],
	);


	// ─── State ─────────────────────────────────────────────────────────────
	const colorScheme = useComputedColorScheme();
	const [internalSorting, setInternalSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({});
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
	const [internalColumnFilters, setInternalColumnFilters] = useState<ColumnFilterState>({});

	// ─── Derived filter state (controlled vs uncontrolled) ─────────────────
	const columnFilters = controlledFilters ?? internalColumnFilters;

	const handleColumnFilterChange = useCallback(
		(key: string, value: string) => {
			const next = { ...columnFilters, [key]: value };
			if (controlledFilters !== undefined) {
				onColumnFiltersChange?.(next);
			} else {
				setInternalColumnFilters(next);
			}
		},
		[columnFilters, controlledFilters, onColumnFiltersChange],
	);

	const clearColumnFilters = useCallback(() => {
		if (controlledFilters !== undefined) {
			onColumnFiltersChange?.({});
		} else {
			setInternalColumnFilters({});
		}
	}, [controlledFilters, onColumnFiltersChange]);

	// ─── Resolve value ──────────────────────────────────────────────────────
	const resolveValue = useCallback(
		(row: TData, col: SmartColumnDef<TData>) => {
			if (!col.accessorKey) return undefined;
			return getValueByPath(row, col.accessorKey);
		},
		[],
	);

	// ─── TanStack column defs (static filter only — no table dependency) ──
	const tanstackColumns = useMemo<ColumnDef<TData>[]>(() => {
		return columns
			.filter((col) => !col.isExcluded && !hiddenColumns.includes(col.accessorKey ?? ""))
			.map((col) => ({
				id: col.accessorKey,
				header: col.header,
				enableSorting: col.enableSorting ?? true,
				enableResizing: col.enableResizing ?? true,
				enableColumnPinning: col.enableColumnPinning ?? false,
				size: col.size,
				minSize: col.minSize ?? 40,
				maxSize: col.maxSize ?? 2000,
			}));
	}, [columns, hiddenColumns]);

	// ─── TanStack Table ────────────────────────────────────────────────────
	const table = useReactTable({
		data: data,
		columns: tanstackColumns,
		state: {
			rowSelection,
			sorting: internalSorting,
			columnVisibility,
			columnPinning,
			columnSizing,
		},
		onRowSelectionChange: (updater) => {
			const next = typeof updater === "function" ? updater(rowSelection) : updater;
			onRowSelectionChange?.(next);
		},
		onSortingChange: setInternalSorting,
		onColumnVisibilityChange: setColumnVisibility,
		onColumnPinningChange: setColumnPinning,
		onColumnSizingChange: setColumnSizing,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		manualPagination: !!pagination,
		enableColumnResizing: true,
		columnResizeMode: "onChange" as const,
		enableColumnPinning: true,
	});

	// ─── Visible columns (driven by TanStack visibility state) ────────────
	// This mirrors the header group so body cells stay in sync with headers
	const visibleColumns = useMemo(
		() =>
			table
				.getHeaderGroups()[0]
				?.headers.filter((h) => h.id !== "actions" && h.id !== "_check" && h.column.getIsVisible())
				.map((h) => {
					const orig = columns.find((c) => c.accessorKey === h.id);
					return orig!;
				})
				.filter(Boolean) ?? [],
		[table, columns, columnVisibility],
	);

	// ─── Sorted + filtered + paginated data ─────────────────────────────
	const sortedData = useMemo(() => {
		// 1) Sort
		let result = data;
		if (internalSorting.length) {
			result = [...data].sort((a, b) => {
				for (const s of internalSorting) {
					const valA = getValueByPath(a, s.id);
					const valB = getValueByPath(b, s.id);
					if (valA == null && valB == null) continue;
					if (valA == null) return s.desc ? 1 : -1;
					if (valB == null) return s.desc ? -1 : 1;
					const cmp = String(valA).localeCompare(String(valB));
					if (cmp !== 0) return s.desc ? -cmp : cmp;
				}
				return 0;
			});
		}

		// 2) Column filters
		const activeFilters = Object.entries(columnFilters).filter(([, v]) => v !== "" && v !== undefined);
		if (activeFilters.length) {
			result = result.filter((row) => {
				return activeFilters.every(([colKey, filterValue]) => {
					const col = columns.find((c) => c.accessorKey === colKey);
					if (!col) return true;

					// Custom filter function
					if (col.columnFilter?.filterFn) {
						return col.columnFilter.filterFn(getValueByPath(row, colKey), filterValue);
					}

					// Default: case-insensitive contains
					const rowValue = getValueByPath(row, colKey);
					if (rowValue == null) return false;
					return String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase());
				});
			});
		}

		return result;
	}, [data, internalSorting, columnFilters, columns]);

	const totalCount = pagination?.totalCount ?? data.length;
	const pageCount =
		pagination && pagination.pageSize > 0
			? Math.ceil(totalCount / pagination.pageSize)
			: 1;
	const currentPage = (pagination?.pageIndex ?? 0) + 1;

	const paginatedData = useMemo(() => {
		if (!pagination) return sortedData;
		const start = pagination.pageIndex * pagination.pageSize;
		return sortedData.slice(start, start + pagination.pageSize);
	}, [sortedData, pagination]);

	// ─── Selection helpers ─────────────────────────────────────────────────
	const allIds = data.map((r) => String(r.id ?? ""));
	const selectedIds = Object.keys(rowSelection);
	const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));
	const someSelected = selectedIds.some((id) => allIds.includes(id)) && !allSelected;

	const toggleAll = (checked: boolean) => {
		const next: RowSelectionState = {};
		if (checked) {
			data.forEach((r) => {
				next[String(r.id ?? "")] = true;
			});
		}
		onRowSelectionChange?.(next);
	};

	const toggleRow = (rowId: string, checked: boolean) => {
		const next = { ...rowSelection };
		if (checked) {
			next[rowId] = true;
		} else {
			delete next[rowId];
		}
		onRowSelectionChange?.(next);
	};

	// ─── Export ───────────────────────────────────────────────────────────
	const handleExport = () => {
		const exportCols = columns.filter(
			(col) =>
				!col.isExcluded &&
				col.accessorKey !== "modifiedWhen" &&
				col.accessorKey !== "modifiedFullName",
		);
		const rowsToExport =
			selectedIds.length > 0
				? data.filter((row) => rowSelection[String(row.id ?? "")])
				: data;

		const excelRows = rowsToExport.map((row) => {
			const r: Record<string, unknown> = {};
			exportCols.forEach((col) => {
				const val = getValueByPath(row, col.accessorKey ?? "");
				r[col.header] = Array.isArray(val)
					? val.map((v) => `• ${v}`).join("\n")
					: val;
			});
			return r;
		});

		const worksheet = utils.json_to_sheet(excelRows, {
			header: exportCols.map((c) => c.header),
		});
		const workbook = utils.book_new();
		utils.book_append_sheet(workbook, worksheet, "Sheet1");
		writeFile(workbook, `${exportProps?.fileName ?? "export"}.xlsx`);
	};

	// ─── Render ────────────────────────────────────────────────────────────

	// Notion colors
	const notionBg = colorScheme === "light" ? "#ffffff" : "#191919";
	const notionHeaderBg = colorScheme === "light" ? "#f7f6f5" : "#1f1f1f";
	const notionSelected = colorScheme === "light" ? "#e8f0fe" : "#1e3a5f";
	const notionBorder = colorScheme === "light" ? "#e8e8e8" : "#333333";
	const notionTextHeader = colorScheme === "light" ? "#757575" : "#888888";
	const notionTextBody = colorScheme === "light" ? "#37352f" : "#e6e6e6";

	// Right: utility actions (zoom, column visibility)
	const [visOpen, { toggle: toggleVis, close: closeVis }] = useDisclosure(false);

	const toolbarRight = useCallback(
		() => (
			<Group gap="xs" align="center">
				{exportProps && (
					<Tooltip label="Export Excel" position="bottom">
						<ActionIcon
							variant="light"
							color="violet"
							size="md"
							onClick={handleExport}
						>
							<IconFileExport size={18} />
						</ActionIcon>
					</Tooltip>
				)}

				<Popover
					opened={visOpen}
					onClose={closeVis}
					position="bottom-end"
					withArrow
					shadow="md"
					width={200}
				>
					<Popover.Target>
						<Tooltip label="Hiển thị cột" position="bottom">
							<ActionIcon
								variant="light"
								size="md"
								onClick={toggleVis}
							>
								<IconColumns size={18} />
							</ActionIcon>
						</Tooltip>
					</Popover.Target>
					<Popover.Dropdown>
						<Text size="xs" fw={600} c={notionTextHeader} mb={6}>
							Hiển thị &amp; Cố định cột
						</Text>
						<Divider mb={8} />
						<Stack gap={6}>
							{table.getAllLeafColumns()
								.filter((col) => col.id !== "actions" && col.id !== "_check")
								.map((col) => {
									const isPinned = col.getIsPinned();
									return (
										<Box key={col.id}>
											<Group justify="space-between" wrap="nowrap" mb={2}>
												<Text size="xs" style={{ flex: 1 }}>
													{String(col.columnDef.header)}
												</Text>
												<Switch
													size="xs"
													checked={col.getIsVisible()}
													onChange={col.getToggleVisibilityHandler()}
												/>
											</Group>
											<Group gap={2} justify="flex-end">
												<ActionIcon
													variant={isPinned === "left" ? "filled" : "subtle"}
													color={isPinned === "left" ? "violet" : "gray"}
													size="xs"
													title="Cố định trái"
													onClick={() => {
														if (isPinned === "left") {
															col.pin(false);
														} else {
															col.pin("left");
														}
													}}
												>
													<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
														<path d="M2 1v8M2 5H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
													</svg>
												</ActionIcon>
												<ActionIcon
													variant={isPinned === "right" ? "filled" : "subtle"}
													color={isPinned === "right" ? "violet" : "gray"}
													size="xs"
													title="Cố định phải"
													onClick={() => {
														if (isPinned === "right") {
															col.pin(false);
														} else {
															col.pin("right");
														}
													}}
												>
													<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
														<path d="M8 1v8M8 5H3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
													</svg>
												</ActionIcon>
												{(isPinned === "left" || isPinned === "right") && (
													<ActionIcon
														variant="subtle"
														color="gray"
														size="xs"
														title="Bỏ cố định"
														onClick={() => col.pin(false)}
													>
														<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
															<path d="M3 5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
														</svg>
													</ActionIcon>
												)}
											</Group>
										</Box>
									);
								})}
						</Stack>
					</Popover.Dropdown>
				</Popover>

				<Tooltip label={showFilterRow ? "Ẩn hàng lọc" : "Hiện hàng lọc"} position="bottom">
					<ActionIcon
						variant="light"
						size="md"
						onClick={toggleFilterRow}
					>
						{showFilterRow ? <IconFilter size={18} /> : <IconFilterOff size={18} />}
					</ActionIcon>
				</Tooltip>

				<Tooltip label="Phóng to" position="bottom">
					<ActionIcon variant="light" size="md" onClick={toggleZoom}>
						<IconMaximize size={18} />
					</ActionIcon>
				</Tooltip>
			</Group>
		),
		[toggleZoom, visOpen, toggleVis, closeVis, showFilterRow, toggleFilterRow, exportProps, handleExport, table, notionTextHeader],
	);

	const colCount = visibleColumns.length + (hasRowActions ? 1 : 0);

	// ─── Pagination footer — must be declared before return() and renderTableContent ─
	const renderPaginationFooter = () => {
		if (!pagination) return null;
		return (
			<Box
				style={{
					background: notionBg,
					border: `1px solid ${notionBorder}`,
					borderTop: "none",
					borderRadius: "0 0 8px 8px",
					overflow: "hidden",
				}}
			>
				<Box
					style={{
						padding: "8px 12px",
						borderTop: `1px solid ${notionBorder}`,
						background: notionHeaderBg,
					}}
				>
					<Group justify="space-between" align="center" wrap="wrap" gap={4}>
						<Group gap={4}>
							<Text size="xs" c={notionTextHeader}>
								{totalCount.toLocaleString("vi-VN")} bản ghi
							</Text>
							<Text size="xs" c={notionTextHeader}>·</Text>
							<Select
								size="xs"
								data={["10", "20", "50", "100"]}
								value={String(pagination.pageSize)}
								onChange={(val) => {
									if (!val) return;
									pagination.onPaginationChange?.({ pageIndex: 0, pageSize: Number(val) });
								}}
								w={60}
								styles={{
									input: {
										padding: "2px 6px",
										height: 26,
										fontSize: 12,
										color: notionTextBody,
									},
								}}
							/>
						</Group>

						{pageCount > 1 ? (
							<Pagination
								value={currentPage}
								onChange={(page) =>
									pagination.onPaginationChange?.({
										pageIndex: page - 1,
										pageSize: pagination.pageSize,
									})
								}
								total={pageCount}
								size="xs"
								siblings={1}
								boundaries={1}
							/>
						) : (
							<Text size="xs" c={notionTextHeader}>
								Trang {(pagination.pageIndex ?? 0) + 1} / {pageCount}
							</Text>
						)}
					</Group>
				</Box>
			</Box>
		);
	};

	// ─── Table scroll container ───────────────────────────────────────────
	const renderTableContent = () => (
		<Box
			style={{
				background: notionBg,
				border: `1px solid ${notionBorder}`,
				borderBottom: "none",
				borderRadius: "8px 8px 0 0",
				overflowX: "auto",
				overflowY: "auto",
				maxHeight: isZoomed ? "calc(100vh - 200px)" : maxBodyHeight,
			}}
		>
			<Box style={{ maxHeight: "100%" }}>
				<Table
					style={{
						tableLayout: "fixed",
						width: "100%",
						position: "relative",
					}}
				>
					<Table.Thead
						style={{
							position: stickyHeader ? "sticky" : undefined,
							top: stickyHeader ? 0 : undefined,
							zIndex: stickyHeader ? 6 : undefined,
							background: notionHeaderBg,
						}}
					>
						<Table.Tr>
							{/* Checkbox column — always pinned left */}
							<Table.Th
								style={{
									width: 44,
									minWidth: 44,
									maxWidth: 44,
									padding: "8px 10px",
									borderBottom: `1px solid ${notionBorder}`,
									background: notionHeaderBg,
									position: "sticky",
									left: 0,
									zIndex: 4,
								}}
							>
								<Checkbox
									size="xs"
									checked={allSelected}
									indeterminate={someSelected}
									onChange={(e) => toggleAll(e.currentTarget.checked)}
									styles={{
										input: { cursor: "pointer" },
										label: { cursor: "pointer" },
									}}
								/>
							</Table.Th>

							{/* Data columns */}
							{(() => {
								let leftPinnedOffset = 44; // checkbox width
								let rightPinnedOffset = hasRowActions ? 100 : 0; // actions column width
								const headers = table
									.getHeaderGroups()[0]
									?.headers.filter((h) => h.id !== "actions" && h.id !== "_check") ?? [];

								headers.forEach((header) => {
									if (header.column.getIsPinned() === "right") {
										rightPinnedOffset += header.getSize();
									}
								});

								return headers.map((header) => {
									const colWidth = header.getSize();
									const pinned = header.column.getIsPinned();
									const pinnedStyle: React.CSSProperties =
										pinned === "left"
											? { position: "sticky", left: leftPinnedOffset, zIndex: 5 }
											: pinned === "right"
												? { position: "sticky", right: rightPinnedOffset, zIndex: 5 }
												: {};

									if (pinned === "left") leftPinnedOffset += colWidth;
									if (pinned === "right") rightPinnedOffset -= colWidth;

									return (
										<Table.Th
											key={header.id}
											style={{
												...pinnedStyle,
												width: colWidth,
												minWidth: colWidth,
												maxWidth: colWidth,
												padding: "8px 10px",
												borderBottom: `1px solid ${notionBorder}`,
												background: notionHeaderBg,
												color: notionTextHeader,
												fontWeight: 500,
												fontSize: 12,
												whiteSpace: "nowrap",
											}}
										>
											<Text
												size="xs"
												fw={500}
												c={notionTextHeader}
												style={{ textTransform: "none", letterSpacing: 0 }}
											>
												{header.column.columnDef.header as string}
											</Text>
											{header.column.getCanResize() && (
												<div
													onMouseDown={header.getResizeHandler()}
													onTouchStart={header.getResizeHandler()}
													style={{
														position: "absolute",
														right: 0,
														top: 0,
														bottom: 0,
														width: 6,
														cursor: "col-resize",
														zIndex: 10,
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													<div
														style={{
															width: 1,
															height: "60%",
															backgroundColor: notionBorder,
															borderRadius: 1,
														}}
													/>
												</div>
											)}
										</Table.Th>
									);
								});
							})()}

							{/* Actions column — always pinned right */}
							{hasRowActions && (
								<Table.Th
									style={{
										width: 100,
										minWidth: 100,
										maxWidth: 100,
										padding: "8px 10px",
										borderBottom: `1px solid ${notionBorder}`,
										background: notionHeaderBg,
										position: "sticky",
										right: 0,
										zIndex: 4,
									}}
								>
									<Text size="xs" fw={500} c={notionTextHeader}>
										Thao tác
									</Text>
								</Table.Th>
							)}
						</Table.Tr>

						{/* ── Filter Row ───────────────────────────────────────────────── */}
						{enableColumnFilter && showFilterRow && (
							<Table.Tr
								style={{
									background: notionHeaderBg,
									borderBottom: `1px solid ${notionBorder}`,
								}}
							>
								{/* Empty cell for checkbox column */}
								<Table.Td
									style={{
										width: 44,
										minWidth: 44,
										maxWidth: 44,
										padding: "4px 10px",
										background: notionHeaderBg,
										position: "sticky",
										left: 0,
										zIndex: 4,
									}}
								/>

								{/* Filter cells */}
								{visibleColumns.map((col) => {
									const tsCol = table.getColumn(col.accessorKey ?? "");
									const colWidth = tsCol?.getSize() ?? col.size ?? 150;
									const filterConfig = col.columnFilter;
									const filterValue = columnFilters[col.accessorKey ?? ""] ?? "";
									const hasActiveFilter = filterValue !== "";

									if (!filterConfig && col.type === "custom") {
										// Custom columns without filter config — render empty cell
										return (
											<Table.Td
												key={col.accessorKey}
												style={{
													width: colWidth,
													minWidth: colWidth,
													maxWidth: colWidth,
													padding: "4px 10px",
													background: notionHeaderBg,
												}}
											/>
										);
									}

									return (
										<Table.Td
											key={col.accessorKey}
											style={{
												width: colWidth,
												minWidth: colWidth,
												maxWidth: colWidth,
												padding: "4px 8px",
												background: notionHeaderBg,
											}}
										>
											{filterConfig?.type === "select" ? (
												<Select
													placeholder={filterConfig.placeholder ?? `Lọc ${col.header}…`}
													data={filterConfig.options ?? []}
													value={filterValue}
													onChange={(val) =>
														handleColumnFilterChange(col.accessorKey ?? "", val ?? "")
													}
													clearable
													size="xs"
													comboboxProps={{ withinPortal: false }}
													styles={{
														input: {
															height: 28,
															fontSize: 12,
															background: hasActiveFilter ? "#e8f0fe" : notionBg,
															borderColor: hasActiveFilter ? "#228be6" : notionBorder,
															color: notionTextBody,
														},
													}}
												/>
											) : (
												<TextInput
													placeholder={filterConfig?.placeholder ?? `Lọc kết quả theo ${col.header}…`}
													value={filterValue}
													onChange={(e) =>
														handleColumnFilterChange(
															col.accessorKey ?? "",
															e.currentTarget.value,
														)
													}
													size="xs"
													styles={{
														input: {
															height: 28,
															fontSize: 12,
															background: hasActiveFilter ? "#e8f0fe" : notionBg,
															borderColor: hasActiveFilter ? "#228be6" : notionBorder,
															color: notionTextBody,
														},
													}}
												/>
											)}
										</Table.Td>
									);
								})}

								{/* Empty cell for actions column */}
								{hasRowActions && (
									<Table.Td
										style={{
											width: 100,
											minWidth: 100,
											maxWidth: 100,
											padding: "4px 10px",
											background: notionHeaderBg,
											position: "sticky",
											right: 0,
											zIndex: 4,
										}}
									/>
								)}
							</Table.Tr>
						)}
					</Table.Thead>

					<Table.Tbody>
						{query.isLoading ? (
							Array.from({ length: 5 }).map((_, i) => (
								<Table.Tr key={i} bg={i % 2 === 0 ? notionBg : notionHeaderBg}>
									<Table.Td style={{ padding: "10px" }}>
										<Skeleton height={14} width={14} radius="sm" />
									</Table.Td>
									{visibleColumns.map((_, j) => (
										<Table.Td key={j} style={{ padding: "10px" }}>
											<Skeleton height={14} radius="sm" />
										</Table.Td>
									))}
									{hasRowActions && <Table.Td style={{ padding: "10px" }}><Skeleton height={14} width={40} radius="sm" /></Table.Td>}
								</Table.Tr>
							))
						) : query.isError ? (
							<Table.Tr>
								<Table.Td colSpan={colCount + 1} style={{ padding: 32 }}>
									<Alert icon={<IconBug />} color="red" title="Có lỗi xảy ra!">
										Không thể tải dữ liệu.
									</Alert>
								</Table.Td>
							</Table.Tr>
						) : paginatedData.length === 0 ? (
							<Table.Tr>
								<Table.Td colSpan={colCount + 1} style={{ padding: "40px 16px" }}>
									<Text size="sm" c="dimmed" ta="center">
										{emptyMessage}
									</Text>
								</Table.Td>
							</Table.Tr>
						) : (
							paginatedData.map((row) => {
								const rowId = String(row.id ?? "");
								const isHighlighted = selectedRowId !== undefined && String(row.id) === String(selectedRowId);
								const isRowSelected = !!rowSelection[rowId];

								return (
									<Table.Tr
										key={rowId}
										onClick={() => onRowClick?.(row)}
										style={{ cursor: onRowClick ? "pointer" : "default" }}
									>
										{/* Checkbox cell — pinned left */}
										<Table.Td
											style={{
												padding: "6px 10px",
												borderBottom: `1px solid ${notionBorder}`,
												background: isHighlighted || isRowSelected ? notionSelected : notionBg,
												position: "sticky",
												left: 0,
												zIndex: 4,
											}}
										>
											<Checkbox
												size="xs"
												checked={isRowSelected}
												onChange={(e) => {
													e.stopPropagation();
													toggleRow(rowId, e.currentTarget.checked);
												}}
											/>
										</Table.Td>

										{/* Data cells — with pinning offset */}
										{(() => {
											let leftPinnedOffset = 44; // checkbox width
											let rightPinnedOffset = hasRowActions ? 100 : 0; // actions column width
											const allCols = table.getVisibleLeafColumns();
											for (const col of allCols) {
												if (col.id === "actions" || col.id === "_check") continue;
												if (col.getIsPinned() === "right") {
													rightPinnedOffset += col.getSize();
												}
											}
											return visibleColumns.map((col) => {
												const tsCol = table.getColumn(col.accessorKey ?? "");
												const colWidth = tsCol?.getSize() ?? col.size ?? 150;
												const pinned = tsCol?.getIsPinned() ?? false;
												const pinnedStyle: React.CSSProperties =
													pinned === "left"
														? { position: "sticky", left: leftPinnedOffset, zIndex: 3 }
														: pinned === "right"
															? { position: "sticky", right: rightPinnedOffset, zIndex: 3 }
															: {};
												if (pinned === "left") leftPinnedOffset += colWidth;
												if (pinned === "right") rightPinnedOffset -= colWidth;
												return (
													<Table.Td
														key={col.accessorKey}
														style={{
															...pinnedStyle,
															width: colWidth,
															minWidth: colWidth,
															maxWidth: colWidth,
															padding: "6px 10px",
															borderBottom: `1px solid ${notionBorder}`,
															color: notionTextBody,
															background: isHighlighted || isRowSelected ? notionSelected : notionBg,
															overflow: "hidden",
															textOverflow: "ellipsis",
														}}
													>
														{renderCell(col, row, resolveValue)}
													</Table.Td>
												);
											});
										})()}

										{/* Actions cell — pinned right */}
										{hasRowActions && (
											<Table.Td
												style={{
													padding: "6px 10px",
													borderBottom: `1px solid ${notionBorder}`,
													background: isHighlighted || isRowSelected ? notionSelected : notionBg,
													position: "sticky",
													right: 0,
													zIndex: 4,
												}}
											>
												{internalRenderRowActions(row)}
											</Table.Td>
										)}
									</Table.Tr>
								);
							})
						)}
					</Table.Tbody>
				</Table>
			</Box>
		</Box>
	);

	return (
		<Box pos="relative" style={{ zIndex: 1 }}>
			{/* Toolbar */}
			<Group justify="space-between" align="center" mb={10}>
				{/* Left: main actions */}
				{toolbarLeft()}
				{/* Right: utility actions */}
				{toolbarRight()}
			</Group>

			{/* Outer width-constraint wrapper — aligns toolbar + table + footer */}
			<Box >
				{/* Normal view */}
				{!isZoomed && (
					<>
						{renderTableContent()}
						{renderPaginationFooter()}
					</>
				)}
			</Box>

			{/* Zoom fullscreen modal */}
			<Modal
				opened={isZoomed}
				onClose={closeZoom}
				fullScreen
				title={
					<Text fw={600} size="sm" c={notionTextBody}>
						{exportProps?.fileName ?? "Dữ liệu"}
					</Text>
				}
				withCloseButton
				styles={{ body: { padding: 0 }, content: { background: notionBg } }}
			>
				<Box p="md">
					{renderTableContent()}
					{renderPaginationFooter()}
				</Box>
			</Modal>
		</Box>
	);
}
