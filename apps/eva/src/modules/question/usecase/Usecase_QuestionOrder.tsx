import { Flex, Select, Stack, Text } from "@mantine/core";
import Usecase_QuestionWrapper, { Usecase_QuestionWrapperProps } from "./Usecase_QuestionWrapper";

interface IQuestionOrderAnswer {
    value: string;
    label: string;
}

interface UseCase_QuestionOrderProps extends Usecase_QuestionWrapperProps {
    data: IQuestionOrderAnswer[];
    value: string[]; // Mỗi ô dropdown là một giá trị
    onChange: (values: string[]) => void;
}

export default function Usecase_QuestionOrder({
    data = [],
    value,
    onChange,
    questionIndex,
    title,
}: UseCase_QuestionOrderProps) {
    const handleSelectChange = (selectedValue: string | null, index: number) => {
        if (selectedValue === null) return;
        const newValues = [...value];
        newValues[index] = selectedValue;
        onChange(newValues);
    };

    return (
        <Usecase_QuestionWrapper questionIndex={questionIndex} title={title}>
            <Stack>
                {data.map((_, idx) => (
                    <Flex key={idx} direction={"row"} align={'center'} gap={"xs"}>
                        <Text>{idx + 1}. </Text>
                        <Select
                            key={idx}
                            value={value[idx] || ""}
                            onChange={(val) => handleSelectChange(val, idx)}
                            data={data}
                            placeholder={`Chọn đáp án ${idx + 1}`}
                        />
                    </Flex>
                ))}
            </Stack>
        </Usecase_QuestionWrapper>
    );
}
