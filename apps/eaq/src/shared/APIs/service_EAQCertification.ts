import { ICertification } from "@/shared/interfaces/certification/ICertification";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";


const CONTROLLER = 'EAQ/EAQCertification';

export const service_EAQCertification = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<ICertification>(CONTROLLER, axiosInstance),
};
