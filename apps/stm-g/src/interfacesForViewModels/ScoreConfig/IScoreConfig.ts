import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";

export interface IScoreConfigViewModel extends ISimpleViewModel {
    programId?: number | null;
    scoreType?: number | null;
    percentScore?: number | null;
    scoreMax?: number | null;
    scoreMin?: number | null;
}