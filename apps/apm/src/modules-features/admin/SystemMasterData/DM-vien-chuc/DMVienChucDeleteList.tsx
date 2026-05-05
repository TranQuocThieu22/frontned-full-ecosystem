import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function DMVienChucDeleteList({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            contextData={values.map((item: any) => item.code).join(", ")}
            onSubmit={() => { }}
        />
    )
}
