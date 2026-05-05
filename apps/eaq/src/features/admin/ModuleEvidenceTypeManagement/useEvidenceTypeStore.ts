import { IEvidenceType } from "@/shared/interfaces/evidence/IEvidenceType";
import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";

interface EvidenceTypeState {
  searchKey?: string;
  selectedEvidenceType?: IEvidenceType;
  filterRefreshKey: number;
}

export const useEvidenceTypeStore = createGenericStore<EvidenceTypeState>({
  initialState: {
    searchKey: "",
    selectedEvidenceType: undefined,
    filterRefreshKey: 0,
  },
});
