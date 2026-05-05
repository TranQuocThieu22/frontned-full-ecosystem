import { MyActionIconDelete } from "aq-fe-framework/components";

export default function AdvisoryCouncilEstablishmentButtonDelete({ code }: { code: string }) {
    return (
        <MyActionIconDelete
            contextData={code}
            onSubmit={() => {
            }} />
    )
}
