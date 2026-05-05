import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { IBaseEntity } from "aq-fe-framework/interfaces";

const CONTROLLER = "/eva/Cognition"

export const cognitionService = {
    ...createBaseApi<ICognition>(CONTROLLER, axiosInstance),
};

export interface ICognition extends IBaseEntity {

    note?: string;
}

