export interface QuestionCatalogEssayRubricViewModel {
    code: string;
    name: string;
}

export interface QuestionCatalogEssayRubricCriterionInfoViewModel {
    id: number;
    code: string; // mã tiêu chí 
    name: string; // tên tiêu chí
    density: number;  // tỉ trọng
    excellent: string; // xuất sắc
    good: string; // tốt
    average: string; // khá
    bad: string; // yếu
    veryBad: string; // kém
}

export interface QuestionCatalogEssayRubricInfoViewModel {
    id: number;
    code: string;
    name: string;
    codeCourse: string;
    nameCourse: string;
    note: string;
    codeScale: string;
}

export interface QuestionCatalogEssaySuggestViewModel {
    id: number;
    name: string;
    weight: number;
}
