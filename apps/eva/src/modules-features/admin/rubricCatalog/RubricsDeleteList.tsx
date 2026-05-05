import { rubricService } from "@/shared/APIs/rubricService";
import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function RubricsDeleteList({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            buttonProps={{
                disabled: values.length === 0
            }}
            contextData={values.map((item: any) => item.code).join(", ")}
            onSubmit={() => rubricService.deleteList(values)}
        />
    )
}
