import { titleService } from "@/shared/APIs/titleService";
import { SRMTitle } from "@/shared/interfaces/SRMTitle";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { MRT_TableInstance } from "mantine-react-table";

export default function TopicRoleListDeleteList({ values, table }: {
    values: SRMTitle[],
    table: MRT_TableInstance<SRMTitle>
}) {
    return (
        <CustomButtonDeleteList
            contextData={values.map((item: any) => item.code).join(", ")}
            onSubmit={() => { return titleService.deleteList(values) }}
            onSuccess={() => { table.resetRowSelection() }}
        />
    )
}
