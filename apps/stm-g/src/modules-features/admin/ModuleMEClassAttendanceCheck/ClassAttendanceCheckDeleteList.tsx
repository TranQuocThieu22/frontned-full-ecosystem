import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function ClassAttendanceCheckDeleteList({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            // disabled={values.length === 0}
            contextData={values.map((item: any) => item.studentId).join(", ")}
            onSubmit={() => { }}
        />
    )
}
