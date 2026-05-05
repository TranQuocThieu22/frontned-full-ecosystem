import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

export default async function useQ_COESubjectMethod_Delete(id: number) {
  const response = await baseAxios.post("/COESubjectMethod/Delete", {
    id: id,
    isEnabled: false
  });

  return response;
}