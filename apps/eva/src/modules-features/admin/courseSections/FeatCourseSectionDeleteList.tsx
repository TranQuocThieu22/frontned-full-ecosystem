import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function FeatCourseSectionDeleteList({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            contextData={values.map((item: any) => item.subjectCode).join(",")}
            onSubmit={() => {

            }
            }
        />
    )
}
