import { Event } from '@/interfaces/event';
import { StudentEvent } from '@/interfaces/StudentEvent';

export interface IMandatoryActivitiesEventViewModel extends Event {
    isProcessing?: boolean;
    validationErrors?: Record<string, string>;
}

export interface IMandatoryActivitiesViewModel extends StudentEvent {
    isProcessing?: boolean;
    validationErrors?: Record<string, string>;
}

export interface IMandatoryActivitiesEventInfoViewModel extends Event {
}

export interface IMandatoryActivitiesInfoViewModel extends StudentEvent {
}

export interface IMandatoryActivitiesFileUploadResult {
    fileName: string;
    fileExtension: string;
    fileBase64String: string;
    uploadStatus: 'pending' | 'uploading' | 'success' | 'error';
    errorMessage?: string;
}

export interface IMandatoryActivitiesQRCodeData {
    eventId: number;
    qrTime: string;
    expiresIn: number;
    qrUrl: string;
    isExpired: boolean;
}

export interface IMandatoryActivitiesImportedData {
    studentId: number;
    studentName: string;
    point: number;
    isValid: boolean;
    validationErrors?: string[];
    rowIndex: number;
}

export interface IMandatoryActivitiesTableFilterState {
    standardId?: number;
    hostId?: number;
    isCompleted?: boolean;
    searchText?: string;
    dateRange?: {
        startDate?: Date;
        endDate?: Date;
    };
}

export interface IMandatoryActivitiesImportFormData {
    importedData: IMandatoryActivitiesImportedData[];
    totalRows: number;
    validRows: number;
    invalidRows: number;
    isProcessing: boolean;
}
