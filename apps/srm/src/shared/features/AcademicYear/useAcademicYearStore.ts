import { AcademicYear } from "@aq-fe/core-ui/shared/interfaces/AcademicYear";
import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";

interface I {
  academicYear?: AcademicYear;
}

const useStore = createGenericStore<I>({
  initialState: { academicYear: undefined },
  storageKey: 'useShared_AcademicYear',
});

export default function useAcademicYearStore() {
  const store = useStore();
  return store;
}
