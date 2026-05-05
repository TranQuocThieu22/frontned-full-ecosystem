import { Event } from "@/interfaces/event";
import { StudentEvent } from "@/interfaces/StudentEvent";

export interface IStudentAffairsParticipationEventViewModel extends Event {
    isProcessing?: boolean;
    validationErrors?: Record<string, string>;
}

export interface IStudentAffairsParticipationParticipationViewModel extends StudentEvent {
    isProcessing?: boolean;
    validationErrors?: Record<string, string>;
}

export interface IStudentAffairsParticipationEventInfoViewModel extends Event {
}

export interface IStudentAffairsParticipationParticipationInfoViewModel extends StudentEvent {
}

export interface IStudentAffairsParticipationFileUploadResult {
    fileName: string;
    fileExtension: string;
    fileBase64String: string;
    uploadStatus: 'pending' | 'uploading' | 'success' | 'error';
    errorMessage?: string;
}

export interface IStudentAffairsParticipationQRCodeData {
    eventId: number;
    qrTime: string;
    expiresIn: number;
    qrUrl: string;
    isExpired: boolean;
}

export interface IStudentAffairsParticipationImportedData {
    studentId: number;
    studentName: string;
    point: number;
    isValid: boolean;
    validationErrors?: string[];
    rowIndex: number;
}

export interface IStudentAffairsParticipationTableFilterState {
    standardId?: number;
    hostId?: number;
    isCompleted?: boolean;
    searchText?: string;
    dateRange?: {
        startDate?: Date;
        endDate?: Date;
    };
}

export interface IStudentAffairsParticipationImportFormData {
    importedData: IStudentAffairsParticipationImportedData[];
    totalRows: number;
    validRows: number;
    invalidRows: number;
    isProcessing: boolean;
} 