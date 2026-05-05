import type { AcademicYear } from "@/shared/interfaces/AcademicYear";
import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";

export interface AcademicYearState {
    currentAcademicYear?: AcademicYear;
}

export const useAcademicYearStore = createGenericStore<AcademicYearState>({
    initialState: { currentAcademicYear: undefined },
    storageKey: "academic-year-store",
});
