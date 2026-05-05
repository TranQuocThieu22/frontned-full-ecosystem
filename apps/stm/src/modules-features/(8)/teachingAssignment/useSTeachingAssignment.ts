import { createGenericStore } from "@/stores/CreateGenericStore";
interface CourseSectionLecturer {
  userId: number;
  courseId: number | null;
  user: any | null; // Consider using a specific type instead of 'any' if possible
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface I {
  courseSectionLecturers: CourseSectionLecturer[];
}

const useStore = createGenericStore<I>({
  initialState: { courseSectionLecturers: [] },
  storageKey: "S8-2"
});
export default function useSTeachingAssignment() {
  const store = useStore();
  return {
    ...store
  }
}