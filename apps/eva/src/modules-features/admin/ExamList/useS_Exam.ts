import { IExamSection } from '@/shared/APIs/examSectionService';
import { IExam } from '@/shared/APIs/examService';
import { createGenericStore } from '@aq-fe/core-ui/shared/libs/createGenericStore';


interface I {
    ExamData?: IExam
    ExamSection?: IExamSection[]
    ExamSectionUpdateView?: IExamSection[]
    deletedSections?: IExamSection[]
}


const useStore = createGenericStore<I>({
    initialState: { ExamData: {}, ExamSection: [] },
});
export default function useS_Exam() {
    const store = useStore();
    return {
        ...store
    }
}