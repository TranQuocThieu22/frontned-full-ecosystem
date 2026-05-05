import { AcademicYear } from "./AcademicYear";
import { BaseEntity } from "./BaseEntity";
import { Semester } from "./Semester";
import { ScoreFrameworkVersionStateEnum } from "@/shared/consts/enum/ScoreFrameworkVersionStateEnum";
import type { Criterion } from "@/shared/interfaces/criterion";

export interface ScoreFrameworkVersion extends BaseEntity {
    numberSemester?: number;
    semesters?: Semester[];
    state?: ScoreFrameworkVersionStateEnum;
    publishedAt?: string | null;
    totalMaxScore?: number;
    academicYears?: AcademicYear[];
}

export interface ScoreFrameworkVersionDetail extends BaseEntity {
    state?: ScoreFrameworkVersionStateEnum;
    publishedAt?: string | null;
    totalMaxScore?: number;
    academicYears?: AcademicYear[] | null;
    criterias?: Criterion[];
    /** Computed tree structure — set by the hook after mapping */
    criteria?: Criterion[];
}







