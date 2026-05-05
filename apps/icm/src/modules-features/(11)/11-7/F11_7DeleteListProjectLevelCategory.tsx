import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function F11_7DeleteListProjectLevelCategory({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            // disabled={values.length === 0}
            contextData={values.map((item: any) => item.code).join(", ")}
            onSubmit={() => { }}
        />
    )
}
