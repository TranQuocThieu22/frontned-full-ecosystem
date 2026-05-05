import { ICOESubjectMethods } from "../Interfaces";

export const handleUpdateSelectedCLO = (subjectAssessmentId: number, CLOIdList: (string | number)[], GSMethods: ICOESubjectMethods[]) => {
    const parsedCLOIdList = CLOIdList.map(id => Number(id)).filter(id => !isNaN(id));

    // Create a map of existing CLO methods
    const existingCLOMap = GSMethods.reduce((map, method) => {
        if (method.coecloId) {
            map[method.coecloId] = method;
        }
        return map;
    }, {} as Record<number, ICOESubjectMethods>);

    const updatedMethods = [];

    // Handle remained or deselected methods
    for (const existingMethod of GSMethods) {
        if (existingMethod.coecloId) {
            const isStillSelected = parsedCLOIdList.includes(existingMethod.coecloId);
            updatedMethods.push({
                ...existingMethod,
                isEnabled: isStillSelected
            });
        }
    }

    // Add new CLO methods
    for (const cloId of parsedCLOIdList) {
        if (!existingCLOMap[cloId]) {
            updatedMethods.push({
                id: 0,
                code: null,
                name: null,
                concurrencyStamp: 'string',
                isEnabled: true,
                coeSubjectAssessmentId: subjectAssessmentId,
                coecloId: cloId,
                questionQuantity: 0,
                desity: 0,
                maxPoint: 0,
            });
        }
    }

    return updatedMethods;
}
