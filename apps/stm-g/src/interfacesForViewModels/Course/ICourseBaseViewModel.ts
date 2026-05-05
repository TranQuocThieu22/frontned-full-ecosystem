import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";

export interface ICourseBaseViewModel extends ISimpleViewModel {
    Status?: number | null;
    ProgramId?: number | null;
    StartDateRegistration?: Date | null;
    EndDateRegistration?: Date | null;
    TestDate?: Date | null;
    StudyDate?: Date | null;
    EndDate?: Date | null;
    Price?: number | null;
    BranchId?: number | null;
    SkillCenterId?: number | null;
}