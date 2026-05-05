import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function F11_8DeleteListProjectTypeCategory({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            //disabled={values.length === 0}
            contextData={values.map((item: any) => item.topicTypeCode).join(", ")}
            onSubmit={() => { }}
        />
    )
}
