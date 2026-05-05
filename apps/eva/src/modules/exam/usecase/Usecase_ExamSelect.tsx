import { MySelect, MySelectProps } from "aq-fe-framework/core";


interface Usecase_ExamSelectProps extends MySelectProps { }

export default function Usecase_ExamSelect({
    ...rest
}: Usecase_ExamSelectProps) {
    return (
        <MySelect
            label="Kỳ thi"
            {...rest}
        />
    )
}
