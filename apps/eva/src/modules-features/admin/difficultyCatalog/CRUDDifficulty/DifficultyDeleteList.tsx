import { IDifficulty, difficultyService } from "@/shared/APIs/difficultyService";
import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function DifficultyDeleteList({ values }: { values: IDifficulty[] }) {
    return (
        <MyButtonDeleteList
            buttonProps={{
                disabled: values.length === 0
            }}
            contextData={values.map(item => item.code).join(", ")}
            onSubmit={() => difficultyService.deleteList(values)}
        />
    )
}
