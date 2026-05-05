import { StudentTracking } from "@/interfaces/ranking";

export interface IFacultyEvaluationCouncilViewModel extends StudentTracking {
    isProcessing?: boolean;
    validationErrors?: Record<string, string>;
}
