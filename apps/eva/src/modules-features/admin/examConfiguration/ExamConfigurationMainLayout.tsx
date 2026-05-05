'use client';

import ExamFilter from "../ModuleExamOrganizationAndSupervision/ExamSubjectComponents/ExamFilter";
import ExamSubjectTable from "./ExamSubjectTable";

export default function ExamConfigurationMainLayout() {
    return (
        <>
            <ExamFilter />
            <ExamSubjectTable />
        </>
    )
}