import { MyActionIconDelete } from "aq-fe-framework/components";
interface Props {
    id: number,
    code?: string
}
export default function F11_8DeleteProjectTypeCategory({ id, code }: Props) {
    return (
        <MyActionIconDelete
            contextData={code}
            onSubmit={() => {
            }} />
    )
}
