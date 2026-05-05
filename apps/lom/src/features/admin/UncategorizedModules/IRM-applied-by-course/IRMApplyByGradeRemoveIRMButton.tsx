import { service_COEGrade } from "@/api/services/service_COEGrade";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface RemoveIRMProps {
    gradeIds?: number[]
    resetRowSelection: Function
}

export default function IRMApplyByGradeRemoveIRMButton({ gradeIds, resetRowSelection }: RemoveIRMProps) {

    return <CustomButtonDeleteList
        contextData={`Thang đo IRM của ${gradeIds?.length} Khoá`}
        buttonProps={{
            disabled: gradeIds?.length === 0
        }}
        onSubmit={() => service_COEGrade.removeIRM(gradeIds)}
        onSuccess={() => {
            resetRowSelection();
        }}
    />
}