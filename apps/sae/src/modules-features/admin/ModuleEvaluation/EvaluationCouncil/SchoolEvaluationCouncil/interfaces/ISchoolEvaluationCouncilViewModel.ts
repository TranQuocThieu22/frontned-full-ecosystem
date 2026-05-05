import { RankingSchoolReport, FacultyReport, RateInfo } from "@/interfaces/ranking";

export interface SchoolEvaluationCouncilViewModel extends RankingSchoolReport {
    isProcessing?: boolean;
    validationErrors?: Record<string, string>;
}

export interface SchoolEvaluationCouncilFacultyInfoViewModel extends FacultyReport {
}

export interface SchoolEvaluationCouncilReportInfoViewModel extends RankingSchoolReport {
}

export interface SchoolEvaluationCouncilChartData {
    rateInfo: RateInfo[];
    totalCount: number;
    chartType: 'pie' | 'bar' | 'line';
    colors?: string[];
}

export interface SchoolEvaluationCouncilTableFilterState {
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

export interface SchoolEvaluationCouncilPrintConfig {
    title: string;
    fields: Array<{
        header: string;
        fieldName: string;
        formatFunction?: (value: any, row: any) => string;
    }>;
    showRowNumbers: boolean;
    orientation?: 'portrait' | 'landscape';
}

export interface SchoolEvaluationCouncilFacultyStatistics {
    facultyName: string;
    totalStudents: number;
    qualifiedStudents: number;
    percentage: number;
    rateDistribution: {
        rateName: string;
        count: number;
        percentage: number;
    }[];
}
