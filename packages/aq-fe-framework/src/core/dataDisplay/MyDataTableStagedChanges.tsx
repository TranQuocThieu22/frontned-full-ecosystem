import { MyCenterFull } from "@/components/CenterFull/MyCenterFull";
import { MyActionIcon, MyButton, MyButtonModal } from "@/core";
import { Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_RowData, MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useState } from "react";
import { MyDataTable, MyDataTableProps } from "../../components/DataDisplay/DataTable/MyDataTable";

export interface StagedChange {
    deletedIds: number[];
    addedIds: number[];
    currentIds: number[];
}

export interface MyDataTableStagedChangesProps<T extends MRT_RowData>
    extends MyDataTableProps<T> {
    initIds?: number[];
    childrenDataTableProps?: Partial<MyDataTableProps<T>>
    onStagedChange?: (changes: StagedChange) => void;
    readOnly?: boolean
}

export function MyDataTableStagedChanges<T extends MRT_RowData>({
    data,
    columns,
    initIds = [],
    onStagedChange,
    childrenDataTableProps,
    readOnly,
    ...rest
}: MyDataTableStagedChangesProps<T>) {
    const disc = useDisclosure();
    const [currentIds, setCurrentIds] = useState<number[]>(initIds);
    const rowSelectionState = useState<MRT_RowSelectionState>({});

    const triggerChange = (nextIds: number[]) => {
        const deletedIds = initIds.filter((id) => !nextIds.includes(id));
        const addedIds = nextIds.filter((id) => !initIds.includes(id));
        onStagedChange?.({
            deletedIds,
            addedIds,
            currentIds: nextIds,
        });
    };

    const handleSelect = () => {
        const selectedIds = Object.keys(rowSelectionState[0])
            .filter((k) => rowSelectionState[0][k])
            .map(Number);

        const nextIds = Array.from(new Set([...selectedIds]));
        setCurrentIds(nextIds);
        triggerChange(nextIds);
        disc[1].close();
    };

    const handleDelete = (ids: number[] | number) => {
        const nextIds = currentIds.filter((x) =>
            Array.isArray(ids) ? !ids.includes(x) : x !== ids
        );
        setCurrentIds(nextIds);
        triggerChange(nextIds);
    };

    const displayData = data.filter((row) =>
        currentIds.includes(row.id as number)
    );

    useEffect(() => {
        if (disc[0]) {
            const initSelection: Record<string, boolean> = {};
            data.forEach((row) => {
                if (currentIds.includes(row.id as number)) {
                    initSelection[String(row.id)] = true;
                }
            });
            rowSelectionState[1](initSelection);
        }
    }, [disc[0], data, currentIds]);

    return (
        <MyDataTable
            enableRowSelection={readOnly ? false : true}

            // 👇 đưa nút delete ra bảng cha
            renderRowActions={({ row }) => {
                if (readOnly) return
                return (
                    <MyCenterFull>
                        <MyActionIcon
                            actionType="tempDelete"
                            onClick={() => handleDelete(row.original.id)}
                        />

                    </MyCenterFull>
                )
            }}
            columns={columns}
            data={displayData}
            {...rest}

            renderTopToolbarCustomActions={({ table }) => {
                if (readOnly) return
                return (
                    <Group>

                        <MyButtonModal
                            buttonProps={{ actionType: "create", type: "button" }}
                            disclosure={disc}
                            modalProps={{ size: "70rem", title: "Thêm đối tượng" }}
                        >
                            <MyDataTable
                                renderTopToolbarCustomActions={() => (
                                    <Stack>
                                        <MyButton actionType="select" onClick={handleSelect} />
                                    </Stack>
                                )}
                                enableRowSelection
                                columns={columns}
                                data={data}
                                onRowSelectionChange={rowSelectionState[1]}
                                state={{
                                    rowSelection: rowSelectionState[0]
                                }}
                                {...childrenDataTableProps}
                            />
                        </MyButtonModal>
                        <MyButton actionType="delete" onClick={() => {
                            handleDelete(table.getSelectedRowModel().rows.map(item => item.original.id))
                        }} />
                        {rest.renderTopToolbarCustomActions?.({ table: table })}
                    </Group>
                )
            }}
        />
    );
}
