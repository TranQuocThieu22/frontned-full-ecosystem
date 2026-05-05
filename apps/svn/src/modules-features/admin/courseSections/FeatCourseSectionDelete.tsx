"use client"
import { MyActionIconDelete } from 'aq-fe-framework/components';

export default function FeatCourseSectionDelete({ values }: { values: any }) {
    console.log("🚀 ~ FeatStudentDelete ~ values:", values.subjectCode)

    return (
        <MyActionIconDelete
            contextData={values.subjectCode}
            onSubmit={() => {


            }}
        ></MyActionIconDelete>
    );
}