import baseAxios from '../baseAxios'
import { IBaseEntity } from "aq-fe-framework/interfaces";

export interface IBody_COECourseSectionStudent_CreateOrUpdateList extends IBaseEntity {
    userId?: number,
    coeCourseSectionId?: number
}

export default function API_COECourseSectionStudent_CreateOrUpdateList(body: IBody_COECourseSectionStudent_CreateOrUpdateList[]) {
    return baseAxios.post("/COECourseSectionStudent/CreateOrUpdateList", body)
}
