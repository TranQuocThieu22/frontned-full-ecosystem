import { MyActionIconDelete } from "aq-fe-framework/components";
interface Props {
    code: string
    id: number;
    ondelete: (id: number) => void
}

export default function RubricsDetailDelete({ code, id, ondelete }: Props) {
    return <MyActionIconDelete contextData={code} onSubmit={() => ondelete(id)} />
}