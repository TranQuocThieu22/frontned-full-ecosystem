import { IDifficultyDetail, difficultyDetailService } from "@/shared/APIs/difficultyDetailService";
import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function DifficultyDetailDeleteList({ values }: { values: IDifficultyDetail[] }) {
    return (
        <MyButtonDeleteList
            buttonProps={{
                disabled: values.length === 0
            }}
            contextData={values.map(item => item.code).join(", ")}
            onSubmit={() => difficultyDetailService.deleteList(values)}
        />
    )
}
