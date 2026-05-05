import { MyActionIconDelete } from "aq-fe-framework/components";

export default function PartnerDeleteRow({ codeInteraction }: { codeInteraction: string }) {
    return (
        <MyActionIconDelete
            contextData={codeInteraction}
            onSubmit={() => {
            }} />
    )
}
