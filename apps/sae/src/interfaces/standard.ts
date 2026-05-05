import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";import { Event } from "./event";

export interface Standard extends BaseEntity {
    minPoint: number;
    maxPoint: number;
    note: string;
    orderBy: number | null;
    events: Event[];
}
