import { contractSuspendService } from "@/shared/APIs/contractSuspendService";
import { SRMContractSuspend } from "@/shared/interfaces/SRMContractSuspend";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
    values: SRMContractSuspend[],
    table: MRT_TableInstance<SRMContractSuspend>
}

export default function StopRequestDeleteListButton({ values, table }: Props) {
    return (
        <CustomButtonDeleteList
            contextData={values.map((item: any) => item?.srmContract?.code).join(", ")}
            onSubmit={() => { return contractSuspendService.deleteList(values) }}
            onSuccess={() => { table.resetRowSelection() }}
        />
    );
}
