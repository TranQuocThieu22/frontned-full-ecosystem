import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { ISubjectInfoViewModel } from "../Subject/ISubjectInfoViewModel";

export interface IProgramSubjectViewModel extends ISimpleViewModel {
    programId?: number | null;
    subjectId?: number | null;
    subject?: ISubjectInfoViewModel | null;
}