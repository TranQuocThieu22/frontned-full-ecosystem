import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function SurveyActivityGroupDeleteList({ values }: { values: any }) {

    return (
        <MyButtonDeleteList
            contextData={values.map((item: any) => item.code).join(", ")}
            onSubmit={() => { }}
        />
    )
}
