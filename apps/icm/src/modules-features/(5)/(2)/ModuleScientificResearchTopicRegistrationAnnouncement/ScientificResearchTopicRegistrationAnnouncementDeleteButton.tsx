import { MyActionIconDelete } from "aq-fe-framework/components";

export default function ScientificResearchTopicRegistrationAnnouncementButtonDelete({ code }: { code: string }) {
    return (
        <MyActionIconDelete
            contextData={code}
            onSubmit={() => {
            }} />
    )
}
