import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { ICriteria } from "../criteria/Criteria";
import { IStandard } from "../standard/Standard";

export interface IExternalAssessment extends BaseEntity {
    standard?: IStandard;
    criteria?: ICriteria;
    groupContent?: string;
    mentionContent?: string;
    comment?: string;
}
