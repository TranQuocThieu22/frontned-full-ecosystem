import { MyActionIconDelete } from "aq-fe-framework/components"

export default function FeatSubjectDelete({ values }: { values: any }) {
    return <MyActionIconDelete
        contextData={values.code}
        onSubmit={() => { }}
    />
}
