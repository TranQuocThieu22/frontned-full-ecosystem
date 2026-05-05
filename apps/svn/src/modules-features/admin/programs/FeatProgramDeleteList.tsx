import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function FeatProgramDeleteList({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            contextData={values.map((item: any) => item.code).join(",")}
            onSubmit={() => {

            }}
        />
    )
}
