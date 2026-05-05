import { MyActionIconDelete } from "aq-fe-framework/components";

export default function CommitteeDelete({code}:{code: string}) {
    return(
        <MyActionIconDelete contextData={code} onSubmit={() => {}}/>
    )
}