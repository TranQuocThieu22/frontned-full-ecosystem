
import { journalService } from "@/shared/APIs/journalService";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props {
    values: any,
    clearSelection: Function,
    loading?: boolean
}

export default function JournalDeleteListButton({ values, clearSelection, loading }: Props) {
    return (
        <CustomButtonDeleteList
            loading={loading}
            contextData={values.map((item: any) => item.code).join(", ")}
            onSubmit={() => {
                return journalService.deleteList(values)
            }}
            onSuccess={() => {
                clearSelection();
            }}
        />
    )
}