import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { IBaseEntity } from "aq-fe-framework/interfaces";
import { IDifficultyDetail } from "./difficultyDetailService";

const CONTROLLER = "/eva/difficulty"

export const difficultyService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IDifficulty>(CONTROLLER, axiosInstance),
}



export interface IDifficulty extends IBaseEntity {
    note?: string;

    difficultyDetails?: IDifficultyDetail[];

}
