import { CRUD_TYPES } from "@/data/constants/types";
import { CRUDType } from "@/types/types";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { IGSAssessment } from "../Interfaces";


export const useGSAssessmentCRUDController = (initialGradeSubjectId: number) => {
    const [opened, handler] = useDisclosure(false);
    const [CRUDType, setCRUDType] = useState<CRUDType>(CRUD_TYPES.Create);

    const getDefaultFormValues = (gradeSubjectId: number): IGSAssessment => ({
        id: 0,
        code: null,
        name: "",
        concurrencyStamp: 'string',
        isEnabled: true,
        coeGradeSubjectId: gradeSubjectId,
        coeSubjectFormulaId: null,
        content: '',
        assessmentWhen: '',
        questionType: null,
        coeSubjectMethods: [],
        assessmentDuration: '',
        assessmentTool: null,
    });

    const [initialFormValue, setInitialFormValue] = useState<IGSAssessment>(getDefaultFormValues(initialGradeSubjectId));

    const openCreateForm = (gradeSubjectId: number) => {
        setCRUDType(CRUD_TYPES.Create);
        setInitialFormValue(getDefaultFormValues(gradeSubjectId));
        handler.open();
    };

    const openUpdateForm = (gsAssessment: IGSAssessment) => {
        setCRUDType(CRUD_TYPES.Update);
        setInitialFormValue(gsAssessment);
        handler.open();
    };

    const openDeletePrompt = (gsAssessment: IGSAssessment) => {
        setCRUDType(CRUD_TYPES.Delete);
        setInitialFormValue(gsAssessment);
        handler.open();
    };

    return {
        opened,
        handler,
        openCreateForm,
        openUpdateForm,
        openDeletePrompt,
        close: handler.close,
        CRUDType,
        getDefaultFormValues,
        initialFormValue,
        setInitialFormValue
    };
};