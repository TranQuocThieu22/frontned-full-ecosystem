import { EnumSurveyType } from "@/enums/EnumSurveyType"
import { createGenericStore } from "aq-fe-framework/stores"
interface I {
    couponType?: EnumSurveyType
}

const useStore = createGenericStore<I>({
    initialState: { couponType: 0 }
})

export function useStoreDeploymentCampaign() {
    const store = useStore()
    return {
        ...store
    }
}