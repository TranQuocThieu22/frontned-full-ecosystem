"use client"

import { MyActionIconDelete } from "aq-fe-framework/components";

export default function FeatStudentDelete({ values }: { values: any }) {
    console.log("🚀 ~ FeatStudentDelete ~ values:", values.studentCode)

    return (
        <MyActionIconDelete
            contextData={values.studentCode}
            onSubmit={() => {


            }}
        ></MyActionIconDelete>
    );
}