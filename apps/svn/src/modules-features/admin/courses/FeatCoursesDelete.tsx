'use client'
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function FeatCoursesDelete({ values }: { values: any }) {
  return <MyActionIconDelete
    contextData={values.code}
    onSubmit={() => {
    }}></MyActionIconDelete>
}