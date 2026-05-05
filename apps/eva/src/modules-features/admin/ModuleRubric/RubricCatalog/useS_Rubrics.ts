import { IRubrics } from '@/shared/APIs/rubricService';
import { createGenericStore } from '@aq-fe/core-ui/shared/libs/createGenericStore';


interface I {
    rubrics?: IRubrics;
    editedRubrics?: any[]
    editedRubricsDetail?: any[]
    deletedItems?: any[]
    deletedSingleItem?: number
}


const useStore = createGenericStore<I>({
    initialState: { rubrics: {}, editedRubrics: [] },
});
export default function useS_Rubrics() {
    const store = useStore();
    return {
        ...store
    }
}