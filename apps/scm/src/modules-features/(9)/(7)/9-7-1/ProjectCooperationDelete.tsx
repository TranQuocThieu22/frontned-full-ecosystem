import { MyActionIconDelete } from "aq-fe-framework/components";

export default function ProjectCooperationDelete({ codeProject }: { codeProject: string }) {
    return (
        <MyActionIconDelete
            contextData={codeProject}
            onSubmit={() => {
            }} />
    )
}