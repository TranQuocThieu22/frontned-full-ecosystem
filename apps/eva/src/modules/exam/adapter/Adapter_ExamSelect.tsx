import { examService } from "@/shared/APIs/examService";
import { MySelectFromAPI } from "aq-fe-framework/core";

interface Adapter_ExamSelectProps {
    value?: string | null,
    onChange: (value: string | null) => void
}

export default function Adapter_ExamSelect({
    ...rest
}: Adapter_ExamSelectProps) {
    return (
        <MySelectFromAPI
            label="Kỳ thi"
            axiosFn={examService.getAll}
            {...rest}
        />
    )
}
