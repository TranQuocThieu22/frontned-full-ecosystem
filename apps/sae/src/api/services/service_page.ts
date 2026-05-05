import { Page } from "@/interfaces/page";
import {createBaseApi} from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

const CONTROLLLER = "/Page"

export const service_page = {
  ...createBaseApi<Page>(CONTROLLLER, axiosInstance),
}
