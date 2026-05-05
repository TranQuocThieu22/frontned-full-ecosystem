import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { ISkillCenterViewModel } from "../SkillCenter/ISkillCenterViewModel";

export interface ICertificateViewModel extends ISimpleViewModel {
    type?: number | null;
    link?: string | null;
    note?: string | null;
    skillCenterId?: number | null;
    skillCenter?: ISkillCenterViewModel | null;
}