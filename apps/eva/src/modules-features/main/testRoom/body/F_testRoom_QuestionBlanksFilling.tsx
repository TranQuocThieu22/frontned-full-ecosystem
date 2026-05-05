import { Button, Center, Flex, Group, Indicator, Space, Text } from "@mantine/core";
import { useState } from "react";
import MyQuestionContainer, { MyQuestionContainerProps } from "./MyQuestionContainer";

interface Question_BlanksFilling_Props extends MyQuestionContainerProps {
    title?: string;
    options?: { value: string; label: string }[];
}

export default function F_testRoom_QuestionBlanksFilling({
    options = [],
    ...rest
}: Question_BlanksFilling_Props) {
    const [selectedOrder, setSelectedOrder] = useState<string[]>([]);

    const handleSelect = (value: string) => {
        setSelectedOrder((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    const getOrderNumber = (value: string) => {
        const idx = selectedOrder.indexOf(value);
        return idx !== -1 ? idx + 1 : null;
    };

    return (
        <MyQuestionContainer {...rest}>
            <Space />
            <Flex gap="md" align="center">
                <Text fs="italic">Kéo đáp án vào vị trí cần trả lời:</Text>
                <Center>
                    <Group gap={'md'}>
                        {options.map((item, idx) => {
                            const order = getOrderNumber(item.value);
                            return (
                                <Indicator
                                    key={idx}
                                    label={order}
                                    size="lg"
                                    disabled={order === null}
                                    color="red"
                                >
                                    <Button
                                        onClick={() => handleSelect(item.value)}
                                        variant={order ? "filled" : "outline"}
                                    >
                                        {item.label}
                                    </Button>
                                </Indicator>
                            );
                        })}
                    </Group>
                </Center>
            </Flex>
        </MyQuestionContainer>
    );
}