import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { IBaseEntity } from "aq-fe-framework/interfaces";


const CONTROLLER = "/eva/codeFormula"

export const codeFormulaService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<ICodeFormula>(CONTROLLER, axiosInstance),
}



export interface ICodeFormula extends IBaseEntity {
    operationType?: number;
    frequency?: number;
    objectType?: number;
    prefix?: string;
    suffix?: string;

    length?: number;
    isNumberZeroUsed?: boolean;
    concurrencyStamp?: string;
}
