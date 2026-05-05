import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Standard } from "@/interfaces/standard";
import {createBaseApi} from "@aq-fe/core-ui/shared/libs/createBaseApi";
const CONTROLLER = 'Standard';

export const service_standard = {
    ...createBaseApi<Standard>(`${CONTROLLER}`, axiosInstance),
}
