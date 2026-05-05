import { Event } from '@/interfaces/event';
import { StudentEvent } from '@/interfaces/StudentEvent';

export interface IYouthUnionParticipationEventViewModel extends Event {
    isProcessing?: boolean;
    validationErrors?: Record<string, string>;
}

export interface IYouthUnionParticipationParticipationViewModel extends StudentEvent {
    isProcessing?: boolean;
    validationErrors?: Record<string, string>;
}

export interface IYouthUnionParticipationEventInfoViewModel extends Event {
}

export interface IYouthUnionParticipationParticipationInfoViewModel extends StudentEvent {
}

export interface IYouthUnionParticipationFileUploadResult {
    fileName: string;
    fileExtension: string;
    fileBase64String: string;
    uploadStatus: 'pending' | 'uploading' | 'success' | 'error';
    errorMessage?: string;
}

export interface IYouthUnionParticipationQRCodeData {
    eventId: number;
    qrTime: string;
    expiresIn: number;
    qrUrl: string;
    isExpired: boolean;
}

export interface IYouthUnionParticipationImportedData {
    studentId: number;
    studentName: string;
    point: number;
    isValid: boolean;
    validationErrors?: string[];
    rowIndex: number;
}

export interface IYouthUnionParticipationTableFilterState {
    standardId?: number;
    hostId?: number;
    isCompleted?: boolean;
    searchText?: string;
    dateRange?: {
        startDate?: Date;
        endDate?: Date;
    };
}

export interface IYouthUnionParticipationImportFormData {
    importedData: IYouthUnionParticipationImportedData[];
    totalRows: number;
    validRows: number;
    invalidRows: number;
    isProcessing: boolean;
}

export interface IYouthUnionParticipationRegistrationData {
    id?: number;
    studentId?: number;
    studentName?: string;
    eventId?: number;
    registrationDate?: Date;
    isActive?: boolean;
}
