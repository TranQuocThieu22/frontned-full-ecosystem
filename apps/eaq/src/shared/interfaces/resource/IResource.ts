import { BaseEntity } from '@aq-fe/core-ui/shared/interfaces/BaseEntity';
import { IStandard } from '../standard/Standard';

export interface IResource extends BaseEntity {
    order?: number | null,
    activity?: string | null,
    resourcesToMobilize?: string | null,
    mobilizationTime?: string | null,
    note?: string | null,
    eaqEvaluationPlanId?: number | null,
    eaqStandardId?: number | null,
    eaqStandard?: IStandard | null
    isOld?: boolean
}
