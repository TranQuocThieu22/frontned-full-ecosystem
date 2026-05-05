import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

export const generateEventCode = async (): Promise<string | null> => {
    const activityOperationType = 11;
    let res = (await axiosInstance.get(`/CodeFormula/GetCodeFormulaByType?operationType=${activityOperationType}`))
    if (res.data.isSuccess === 1) {
        let code = res.data.data;
        return code
    }
    return '';
}
