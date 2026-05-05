export interface IGSMethod {
    id: number;
    code: string | null;
    name: string | null;
    concurrencyStamp: string;
    isEnabled: boolean;
    coeSubjectAssessmentId: number;
    coecloId: number;
    questionQuantity: number;
    density: number;
    evaluation: string | null;
    maxPoint: number;
    coeSubjectAssessment?: ICoeSubjectAssessment;
    coeclo?: ICoeCLO;
}

export interface ICoeSubjectAssessment {
    id: number;
    code: string | null;
    name: string | null;
    concurrencyStamp: string;
    isEnabled: boolean;
    coeSubjectFormulaId: number;
    content: string;
    assessmentWhen: string;
    assessmentDuration: string;
    assessmentTool: number;
    questionType: number;
    totalQuestion: number;
    coeGradeSubjectId: number;
    coeSubjectMethods: IGSMethod[];
    coeSubjectFormula: any | null;
}

export interface ICoeCLO {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    order: number;
    coecgId: number;
    description: string;
    densityCLO: number;
    coecg: any | null;
    coeclopi: any[];
}

export interface IGSMethodUpdateModel {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    coeSubjectAssessmentId?: number;
    coecloId?: number | null;
    questionQuantity?: number | null;
    evaluation?: string | null;
    density?: number | null;
    maxPoint?: number | null;
}