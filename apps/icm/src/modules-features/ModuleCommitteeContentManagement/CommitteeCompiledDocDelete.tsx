import { MyActionIconDelete } from "aq-fe-framework/components";

export default function CommitteeCompiledDocDelete({ id }: { id: string }) {
    return (
        <MyActionIconDelete onSubmit={() => { }} contextData={id}></MyActionIconDelete>
    )
}