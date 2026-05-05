import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import CLOMatrixSummaryTable from "./app/CLOMatrixSummaryTable";

export default function TabCLOMatrix_Layout({ isActiveTab, gradeSubjectId }: { isActiveTab: boolean, gradeSubjectId?: number }) {
    return (
        <CustomFlexColumn p={'md'}>
            <CLOMatrixSummaryTable
                isActiveTab={isActiveTab}
                gradeSubjectId={gradeSubjectId}
            />
        </CustomFlexColumn>
    )
}
