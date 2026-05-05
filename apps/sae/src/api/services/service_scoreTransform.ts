import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { ScoreTransform } from "@/interfaces/scoreTransform";
import {createBaseApi} from "@aq-fe/core-ui/shared/libs/createBaseApi";
const CONTROLLER = 'ScoreTransform';

export const service_scoreTransform = {
    ...createBaseApi<ScoreTransform>(`${CONTROLLER}`, axiosInstance),
}
