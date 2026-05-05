import { EventGroup } from "@/interfaces/eventGroup";
import {createBaseApi} from "@aq-fe/core-ui/shared/libs/createBaseApi";import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

const CONTROLLLER = "/EventGroup"

export const service_eventGroup = {
  ...createBaseApi<EventGroup>(CONTROLLLER, axiosInstance),
}
