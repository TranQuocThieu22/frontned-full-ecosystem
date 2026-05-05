import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { TimeClusterDetails } from "./timeClusterDetails";
import { TimeType } from "./timeType";

export interface TimeCluster extends BaseEntity {
    timeTypeId?: number;
    timeType?: TimeType;
    timeClusterDetails?: TimeClusterDetails[];
}
