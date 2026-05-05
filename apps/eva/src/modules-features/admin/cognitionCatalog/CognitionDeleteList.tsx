import { cognitionService } from "@/shared/APIs/cognitionService";
import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function CognitionDeleteList({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            buttonProps={{
                disabled: values.length === 0
            }}
            contextData={values.map((item: any) => item.code).join(", ")}
            onSubmit={() => cognitionService.deleteList(values)}
        />
    )
}
