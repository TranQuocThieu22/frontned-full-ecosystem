import { MyActionIconDelete } from "aq-fe-framework/components";

export default function CustomerCareAssignmentDeleteButton({ id, code }: { id: number, code: string }) {
    return (
        <MyActionIconDelete
            contextData={code}
            onSubmit={() => {

            }} />
    )
}