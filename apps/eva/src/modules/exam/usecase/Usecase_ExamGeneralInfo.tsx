import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { Stack } from "@mantine/core";
import { MyNumberInput } from "aq-fe-framework/components";
import { MyTextInput } from "aq-fe-framework/core";

export interface ExamGeneralInfoDomain {
    examCode?: string,
    examName?: string,
    numberOfQuestion?: number,
    pointSystem?: string | null
}
interface Props {
    value?: ExamGeneralInfoDomain
    onChange: (value: ExamGeneralInfoDomain) => void
}
export default function Usecase_ExamGeneralInfo({
    value,
    onChange
}: Props) {
    return (
        <Stack>
            <MyTextInput
                label="Mã đề chuẩn"
                defaultValue={value?.examCode}
                onBlur={(e) => onChange({ ...value, examCode: e.currentTarget.value })}
            />
            <MyTextInput
                label="Tên đề chuẩn"
                defaultValue={value?.examName || ""}
                onBlur={(e) => onChange({ ...value, examName: e.currentTarget.value })}
            />
            <MyNumberInput
                label="Số lượng câu hỏi"
                defaultValue={value?.numberOfQuestion}
                onBlur={(e) => onChange({ ...value, numberOfQuestion: Number(e) })}
            />
            <CustomSelect
                data={[
                    '4',
                    '10',
                    '20',
                    '100',
                ]}
                label="Hệ điểm"
                defaultValue={value?.pointSystem}
                onChange={(e) => onChange({ ...value, pointSystem: e })}
            />
        </Stack>
    )
}
