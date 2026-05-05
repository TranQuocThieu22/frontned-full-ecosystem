import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function FeatStudentDeleteList({ values }: { values: any }) {
    return (
        <MyButtonDeleteList
            contextData={values.map((item: any) => item.studentCode).join(",")}
            onSubmit={() => {

            }
            }
        />
    )
}
