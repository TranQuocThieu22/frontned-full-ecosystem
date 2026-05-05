import { MyActionIconDelete } from "aq-fe-framework/components";

export default function ContentAppraisalCouncilEstablishmentButtonDelete({ councilCode }: { councilCode: string }) {
    return (
        <MyActionIconDelete
            contextData={councilCode}
            onSubmit={() => {
            }} />
    )
}
