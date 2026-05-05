import { examService } from '@/shared/APIs/examService';
import { MyActionIconDelete } from 'aq-fe-framework/components';
interface Props {
    id: number,
    code: string,

}
export default function ExamDelete({ code, id }: Props) {
    return (
        <MyActionIconDelete contextData={code} onSubmit={() => examService.delete(id)} />
    )
}
