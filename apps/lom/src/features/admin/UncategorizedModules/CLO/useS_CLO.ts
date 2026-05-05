import { createGenericStore } from "@/stores/S0GenericStore"

interface I {
  programId?: number
  programCode?: string
  gradeId?: number
  gradeCode?: string
  noData?: boolean
}

const useStore = createGenericStore<I>({
  initialState: { programId: 0, programCode: "", gradeId: 0, gradeCode: "" },
})

export default function useS_CLO() {
  const store = useStore()
  return {
    ...store,
  }
}
