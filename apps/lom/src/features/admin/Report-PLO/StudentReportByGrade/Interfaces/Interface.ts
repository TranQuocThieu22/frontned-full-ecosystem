
export interface IStudentReportViewModel {
    studentId?: number | null;
    studentName?: string | null;
    subjectName?: string | null;
    subjectCode?: string | null;
    semesterName?: string | null;
    gradeSubjectPointResult?: number | null;
    studentPoints?: IStudentPointsViewModel[];
    studentCLOResults?: IStudentCLOResultViewModel[];
    studentPLOResults?: IStudentPLOResultViewModel[];
}

export interface IStudentPointsViewModel {
    cloId?: number | null;
    cloName?: string | null;
    cloCode?: string | null;
    cloDescription?: string | null;
    cloPassedDensity?: number | null;
    medthodMaxPoint?: number | null;
    densityMethodCLO?: number | null;
    point?: number | null;
    assessmentName?: string | null;
    assessmentId?: number | null;
    point10?: number | null;
    formulaType?: number | null;
}

export interface IStudentCLOResultViewModel {
    cloName?: string | null;
    cloCode?: string | null;
    cloDescription?: string | null;
    cloPassedDensity?: number | null;
    cloId?: number | null;
    point?: number | null;
    isPassed?: boolean | null;
}

export interface IStudentPLOResultViewModel {
    ploId?: number | null;
    ploName?: null | string;
    ploCode?: string | null;
    ploDescription?: string | null;
    ploPassedDensity?: number | null;
    ploDensity?: number | null;
    ploResult?: number | null;
    isPassed?: boolean | null;
}


export interface IPLOByGradeViewModel {
    order?: number | null;
    description?: string | null;
    densityPLO?: number | null;
    passedDensity?: number | null;
    coeGradeId?: number | null;
    proficiency?: number | null;
    coeGrade?: any | null;
    coepIs?: IPIViewModel[];
    id?: number | null;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean | null;
    modifiedWhen?: string | null;
    modifiedBy?: number | null;
    modifiedFullName?: string | null;
}


interface IPIViewModel {
    order?: number | null;
    description?: string | null;
    densityPI?: number | null;
    coeploId?: number | null;
    id?: number | null;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean | null;
    modifiedWhen?: string | null;
    modifiedBy?: number | null;
    modifiedFullName?: string | null;
}


