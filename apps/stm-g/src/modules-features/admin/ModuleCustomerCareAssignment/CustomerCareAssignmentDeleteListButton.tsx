import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function CustomerCareAssignmentDeleteListButton({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            actionIconProps={{ disabled: values.length === 0}}
            contextData={values.map((item: any) => item.requestId).join(", ")}
            onSubmit={() => { }}
        />
    )
}