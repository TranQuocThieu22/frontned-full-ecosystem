
import { service_COEProgram } from "@/api/services/service_COEProgram";
import { COEProgram } from "@/interfaces/shared-interfaces/COEProgram";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { MRT_TableInstance } from "mantine-react-table";
import { SetStateAction } from "react";

interface ProgramDelegateDeleteListButtonProps {
    table: MRT_TableInstance<COEProgram>;
    loading?: boolean;
    setPendingChanges: (value: SetStateAction<Record<string, Account | null>>) => void
};

export default function ProgramDelegateDeleteListButton({ table, loading, setPendingChanges }: ProgramDelegateDeleteListButtonProps) {
    const selectedRows = table.getSelectedRowModel().flatRows.flatMap((row) => row.original);

    return ( <CustomButtonDeleteList
        buttonProps={{
            isCheckPermission: false
        }}
        loading={loading}
        count={selectedRows.length}
        onSuccess={() => {
            table.resetRowSelection();
            setPendingChanges({});
        }}
        onSubmit={async () => {
            return service_COEProgram.removeDelegations(selectedRows.filter(row => row.userId != undefined).map(row => row.id!));
        }}
    />)
}
