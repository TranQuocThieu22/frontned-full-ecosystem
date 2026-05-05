import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMContract } from "./SRMContract";
import { SRMLecturer } from "./SRMLecturer";
import { SRMTitle } from "./SRMTitle";
import { SRMTopic } from "./SRMTopic";

export interface SRMTopicMember extends BaseEntity {
    srmTitle?: SRMTitle
    srmTitleId?: number
    user?: SRMLecturer
    userId?: number
    srmContract?: SRMContract
    srmContractId?: number
    srmTopic?: SRMTopic
    srmTopicId?: number
    /** Phân bổ thời gian */
    timeAllocation?: number
}