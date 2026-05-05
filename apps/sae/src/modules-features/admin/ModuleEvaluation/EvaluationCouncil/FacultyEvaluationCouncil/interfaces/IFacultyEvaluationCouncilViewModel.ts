import { StudentTracking, FacultyReportDetail, RateInfo } from "@/interfaces/ranking";

export interface FacultyEvaluationCouncilViewModel extends StudentTracking {
    isProcessing?: boolean;
    validationErrors?: Record<string, string>;
}

export interface FacultyEvaluationCouncilReportInfoViewModel extends FacultyReportDetail {
}

export interface FacultyEvaluationCouncilTrackingInfoViewModel extends StudentTracking {
}

export interface FacultyEvaluationCouncilChartData {
    rateInfo: RateInfo[];
    totalCount: number;
    chartType: 'pie' | 'bar' | 'line';
    colors?: string[];
}

export interface FacultyEvaluationCouncilTableFilterState {
    facultyId?: number;
    rateId?: number;
    searchText?: string;
    pointRange?: {
        minPoint?: number;
        maxPoint?: number;
    };
    dateRange?: {
        startDate?: Date;
        endDate?: Date;
    };
}

export interface FacultyEvaluationCouncilPrintConfig {
    title: string;
    fields: Array<{
        header: string;
        fieldName: string;
        formatFunction?: (value: any, row: any) => string;
    }>;
    showRowNumbers: boolean;
    orientation?: 'portrait' | 'landscape';
}
