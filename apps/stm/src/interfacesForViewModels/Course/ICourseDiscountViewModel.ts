import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { ICourseViewModel } from "./ICourseViewModel";

export interface ICourseDiscountViewModel extends ISimpleViewModel {
    discountId?: number | null;
    courseId?: number | null;
    course?: ICourseViewModel | null;
}