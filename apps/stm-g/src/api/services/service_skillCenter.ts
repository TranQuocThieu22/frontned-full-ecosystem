import { ISkillCenter } from "@/interfaces/skillCenter";
import { createBaseApi } from "aq-fe-framework/shared";
import baseAxios from "../config/baseAxios";

const CONTROLLER = "/SkillCenter"

export const service_skillCenter = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<ISkillCenter>(CONTROLLER, baseAxios),
}
