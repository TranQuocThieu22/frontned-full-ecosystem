import { MyButton, MyButtonModal } from "@/core";
import { IAccount } from "@/interfaces";
import { useDisclosure } from "@mantine/hooks";
import { MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useState } from "react";
import AccountTable from "./AccountTable";

export default function AccountTableSelect({
    values,
    onChange
}: {
    values?: number[]
    onChange?: (values: number[], rows: IAccount[]) => void
}) {
    const rowSelectionState = useState<MRT_RowSelectionState>({})
    const disc = useDisclosure()
    // ✅ Khi nhận props `values`, set giá trị chọn sẵn
    useEffect(() => {
        const initialSelection: MRT_RowSelectionState = {};
        values?.forEach((id) => (initialSelection[id] = true));
        rowSelectionState[1](initialSelection);
    }, [values]);
    return (
        <MyButtonModal
            modalProps={{
                size: "65em"
            }}
            buttonProps={{
                actionType: "create",
                type: "button"
            }}
            disclosure={disc}>
            <AccountTable

                state={{ rowSelection: rowSelectionState[0] }}
                onRowSelectionChange={rowSelectionState[1]}
                renderTopToolbarCustomActions={({ table }) => (
                    <MyButton
                        actionType="select"
                        onClick={() => {
                            const selectedRows = table.getSelectedRowModel().rows.map(r => r.original);
                            onChange?.(selectedRows.map(item => Number(item.id)), selectedRows);
                            disc[1].close();

                        }}
                    />
                )}
                enableRowSelection={(row) => !values?.includes(row.original.id!)}
            />
        </MyButtonModal>
    )
}
