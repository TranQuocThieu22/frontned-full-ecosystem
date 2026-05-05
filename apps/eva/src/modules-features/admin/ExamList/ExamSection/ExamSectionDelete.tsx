import { MyActionIconDelete } from 'aq-fe-framework/components';
interface Props {
    id: number,
    code: string,
    onDelete: (id: number) => void;
}
export default function ExamSectionDelete({ code, onDelete, id }: Props) {
    return (
        <MyActionIconDelete contextData={code} onSubmit={() => onDelete(id)} />
    )
}
