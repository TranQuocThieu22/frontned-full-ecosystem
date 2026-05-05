import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";

interface IAssessmentCouncilDecisionStore {
    Id?: number,
}

const useStore = createGenericStore<IAssessmentCouncilDecisionStore>({
    initialState: { Id: undefined },
    storageKey: 'useS_Shared_AssessmentCouncilDecisionId',
});

export default function useS_Shared_AssessmentCouncilDecisionId() {
    const store = useStore();
    return {
        ...store,
    };
}
