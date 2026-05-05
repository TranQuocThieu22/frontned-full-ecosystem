import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMEvaluationTopic } from "./SRMEvaluationTopic";
import { SRMTopic } from "./SRMTopic";

export interface SRMNotificationTopic extends BaseEntity {
    srmProposalNotificationId?: number;
    srmTopicId?: number;
    srmTopic?: SRMTopic;
    srmEvaluationTopic?: SRMEvaluationTopic;
}