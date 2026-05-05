import { contractDetailService } from "@/shared/APIs/contractDetailService";
import { SRMContractDetail } from "@/shared/interfaces/SRMContractDetail";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { MRT_TableInstance } from "mantine-react-table";

interface IProps {
    table: MRT_TableInstance<SRMContractDetail>;
    disabled?: boolean;
}

export default function TopicLevelListDeleteListButton({ table, disabled }: IProps) {
    const selectedRow = table.getSelectedRowModel().rows.map(item => item.original)
    return (
        <CustomButtonDeleteList
            contextData={selectedRow.map(item => item.srmContract?.code).join(", ")}
            onSubmit={() => {
                return contractDetailService.deleteListIds(selectedRow.map(item => item.id!))
            }}
            buttonProps={{
                disabled: disabled
            }}
            onSuccess={() => {
                table.resetRowSelection()
            }}
        />
    )
}