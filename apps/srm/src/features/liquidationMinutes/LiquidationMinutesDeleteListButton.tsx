import { liquidationMinuteService } from "@/shared/APIs/liquidationMinuteService";
import { SRMLiquidationMinute } from "@/shared/interfaces/SRMLiquidationMinute";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { MRT_TableInstance } from "mantine-react-table";

export default function LiquidationMinutesDeleteListButton({ table }: { table: MRT_TableInstance<SRMLiquidationMinute> }) {
    const selectedRow = table.getSelectedRowModel().rows.map(item => item.original)
    return (
        <CustomButtonDeleteList
            contextData={selectedRow.map(item => item?.minuteNumber).join(", ")}
            onSubmit={() => {
                return liquidationMinuteService.deleteListIds(selectedRow.map(item => item.id!))
            }}
            onSuccess={() => {
                table.resetRowSelection()
            }}
        />
    )
}