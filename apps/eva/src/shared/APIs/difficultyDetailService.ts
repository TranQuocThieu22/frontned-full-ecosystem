import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/eva/difficultyDetail"

export const difficultyDetailService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IDifficultyDetail>(CONTROLLER, axiosInstance),
    GetDificultyDetailsByDifficultyId: ({ difficultyId }: { difficultyId: number }) => {
        return axiosInstance.get<CustomApiResponse<IDifficultyDetail[]>>(CONTROLLER + `/GetDificultyDetailsByDifficultyId?difficultyId=${difficultyId}`)
    },

}



export interface IDifficultyDetail extends BaseEntity {
    note?: string;
    evaDifficultyId?: number;
}
