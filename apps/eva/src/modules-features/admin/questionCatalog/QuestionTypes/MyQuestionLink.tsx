import {
    ActionIcon,
    Button,
    Group,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { MyNumberInput } from "aq-fe-framework/components";
import React from "react";

export interface IMyQuestionLinkAnswer {
    index?: number
    content?: string;
    explain?: string;
    density?: number;
}

interface MyQuestionLinkProps {
    value?: IMyQuestionLinkAnswer[];
    onChange?: (value: IMyQuestionLinkAnswer[]) => void;
}

export default function MyQuestionLink(props: MyQuestionLinkProps) {
    const { value = [], onChange } = props;

    const handleAddAnswer = () => {
        const newValue = [
            ...value,
            { index: value.length + 1, content: "", explain: "", density: 0 }
        ];
        onChange?.(newValue);
    };

    return (
        <Paper p={"md"}>
            <Stack>
                <Title order={4}>Cặp nối từ</Title>
                <SimpleGrid cols={3} spacing="md" verticalSpacing="xs">
                    <Text>Lựa chọn</Text>
                    <Text>Giá trị tương ứng</Text>
                    <Text>Tỷ trọng</Text>
                    {value.map((item, idx) => (
                        <React.Fragment key={idx}>
                            <TextInput
                                placeholder={`Nhập lựa chọn ${idx + 1}`}
                                value={item.content}
                                onChange={(e) => {
                                    const newValue = [...value];
                                    newValue[idx] = {
                                        ...newValue[idx],
                                        content: e.currentTarget.value,
                                    };
                                    onChange?.(newValue);
                                }}
                            />
                            <TextInput
                                placeholder={`Nhập giá trị tương ứng ${idx + 1}`}
                                value={item.explain}
                                onChange={(e) => {
                                    const newValue = [...value];
                                    newValue[idx] = {
                                        ...newValue[idx],
                                        explain: e.currentTarget.value,
                                    };
                                    onChange?.(newValue);
                                }}
                            />
                            <Group>
                                <MyNumberInput
                                    flex={1}
                                    value={item.density}
                                    suffix=" %"
                                    onChange={(e) => {
                                        const newValue = [...value];
                                        newValue[idx] = {
                                            ...newValue[idx],
                                            density: Number(e),
                                        };
                                        onChange?.(newValue);
                                    }}
                                />
                                <ActionIcon
                                    color="red"
                                    onClick={() => {
                                        const newValue = value.filter((_, i) => i !== idx)
                                            .map((item, i) => ({ ...item, index: i + 1 }));
                                        onChange?.(newValue);
                                    }}
                                    size={"lg"}
                                >
                                    <IconX />
                                </ActionIcon>
                            </Group>

                        </React.Fragment>
                    ))}
                </SimpleGrid>
                <Button variant="outline" onClick={handleAddAnswer}>
                    Thêm cặp nối từ
                </Button>
            </Stack>
        </Paper>
    );
}
