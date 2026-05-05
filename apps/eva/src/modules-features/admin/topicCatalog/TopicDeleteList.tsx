import { topicService } from "@/shared/APIs/topicService";
import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function TopicDeleteList({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            buttonProps={{
                disabled: values.length === 0
            }}
            contextData={values.map((item: any) => item.code).join(", ")}
            onSubmit={() => topicService.deleteList(values)}
        />
    )
}
