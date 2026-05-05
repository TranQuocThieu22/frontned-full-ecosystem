import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

export default async function useQ_COETrainingProgram_DeleteById({ Id }: { Id: number }) {
    const handleDelete = await baseAxios.post(`/COEGrade/delete`, { id: Id })
    return handleDelete;
}
