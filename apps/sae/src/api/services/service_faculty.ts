import { Faculty } from "@/interfaces/faculty";
import {createBaseApi} from "@aq-fe/core-ui/shared/libs/createBaseApi";import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

const CONTROLLLER = "/Faculty"

export const service_faculty = {
  ...createBaseApi<Faculty>(CONTROLLLER, axiosInstance),
}
