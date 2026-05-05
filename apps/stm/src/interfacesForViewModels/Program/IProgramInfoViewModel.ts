import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { ICertificateViewModel } from "../Certificate/ICertificateViewModel";
import { IProgramTypeViewModel } from "../ProgramType/IProgramTypeViewModel";
import { IScoreConfigViewModel } from "../ScoreConfig/IScoreConfig";
import { ISkillCenterViewModel } from "../SkillCenter/ISkillCenterViewModel";
import { ISubjectInfoViewModel } from "../Subject/ISubjectInfoViewModel";
import { IProgramSubjectViewModel } from "./IProgramSubjectViewModel";

export interface IProgramInfoViewModel extends ISimpleViewModel {
    skillCenterId?: number | null;
    programTypeId?: number | null;
    totalClassPeriodNumber?: number | null;
    totalHours?: number | null;
    isTesting?: boolean | null;
    certificateId?: number | null;
    isCancel?: boolean | null;
    note?: string | null;
    price?: number | null;
    scoreSystem?: number | null;
    scoreFormula?: number | null;
    scorePass?: number | null;
    testScoreSystem?: number | null;
    testScoreFormula?: number | null;
    testScorePass?: number | null;
    certificate?: ICertificateViewModel | null;
    skillCenter?: ISkillCenterViewModel | null;
    subjects?: ISubjectInfoViewModel[] | null;
    programType?: IProgramTypeViewModel | null;
    programSubjects?: IProgramSubjectViewModel[] | null;
    scoreConfigs?: IScoreConfigViewModel[] | null;
}