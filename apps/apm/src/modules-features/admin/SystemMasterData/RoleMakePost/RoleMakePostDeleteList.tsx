import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function RoleMakePostDeleteList({ values }: { values: any }) {

    return (
        <MyButtonDeleteList
            contextData={values.map((item: any) => item.code).join(", ")}
            onSubmit={() => { }}
        />
    )
}
