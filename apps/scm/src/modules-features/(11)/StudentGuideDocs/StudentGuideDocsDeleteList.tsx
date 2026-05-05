import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function StudentGuideDocsDeleteList({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            actionIconProps={{
                disabled: values.length === 0
            }}
            contextData={values.map((item: any) => item.code).join(", ")}
            onSubmit={() => { }}
        />
    )
}
