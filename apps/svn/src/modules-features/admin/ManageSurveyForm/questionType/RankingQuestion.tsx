import React, { useState, useEffect } from "react";
import {
    Button,
    Modal,
    Group,
    Text,
    Stack,
    TextInput,
    Image,
    Box,
    Select,
    Rating,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyFileInput, MyTextArea } from "aq-fe-framework/components";
import { QuestionPaperBox } from "./QuestionPaperBox";
import { IRankingQuestionViewModel } from "./interfaces/IRankingQuestionInfoViewModel";

const defaultData: IRankingQuestionViewModel = {
    groupTitle: "Nhập nội dung mô tả cho nhóm câu hỏi",
    guide: "Nhập nội dung hướng dẫn trả lời cho nhóm câu hỏi",
    image: null,
    options: ["Tuỳ chọn 1", "Tuỳ chọn 2"],
    questions: [],
    maxStars: 5,
};

export default function RankingQuestionBlock({
    setting,
    data,
    onChange,
}: {
    readonly setting: { isAnswerRequired: boolean; isHasImage?: boolean };
    readonly data?: IRankingQuestionViewModel;
    readonly onChange?: (data: IRankingQuestionViewModel) => void;
}) {
    const [opened, { open, close }] = useDisclosure(false);
    const [displayData, setDisplayData] = useState<IRankingQuestionViewModel>(
        data ?? defaultData
    );
    const [value, setValue] = useState<number | undefined>(0);

    useEffect(() => {
        if (data) setDisplayData(data);
    }, [data]);

    const form = useForm<IRankingQuestionViewModel & { clo?: string; plo?: string }>({
        initialValues: {
            groupTitle: "",
            guide: "",
            image: null,
            options: [],
            questions: [],
            maxStars: 5,
            clo: undefined,
            plo: undefined,
        },
        validate: {
            groupTitle: (value) => (value ? null : "Vui lòng nhập mô tả"),
            guide: (value) => (value ? null : "Vui lòng nhập hướng dẫn"),
        },
    });

    const isMock =
        displayData.groupTitle === defaultData.groupTitle &&
        displayData.guide === defaultData.guide;

    const handleOpen = () => {
        if (isMock) {
            form.setValues({
                groupTitle: "",
                guide: "",
                image: null,
                options: ["Tuỳ chọn 1", "Tuỳ chọn 2"],
                questions: [],
                clo: "1",
                plo: "1",
                maxStars: 5,
            });
        } else {
            form.setValues({
                ...displayData,
                clo: "1",
                plo: "1",
            });
        }
        open();
    };

    return (
        <>
            <QuestionPaperBox onClick={handleOpen} isAnswerRequired={setting.isAnswerRequired}>
                <Text size="sm" c="black" fw={500}>
                    {displayData.groupTitle}
                </Text>
                <Text size="sm" mt={4} c="black">
                    {displayData.guide}
                </Text>
                {setting.isHasImage && displayData.image && (
                    <img
                        src={
                            typeof displayData.image === "string"
                                ? displayData.image
                                : URL.createObjectURL(displayData.image)
                        }
                        alt="survey"
                        style={{
                            display: "block",
                            margin: "8px auto",
                            maxWidth: 120,
                            maxHeight: 120,
                        }}
                    />
                )}


                <Box mt="md" style={{ display: "flex", justifyContent: "center" }}>
                    <Rating
                        defaultValue={value}
                        size="xl"
                        count={5}
                        readOnly
                        onChange={(value) => {
                            if (value !== null) {
                                setValue(value);
                            }
                        }}
                    />
                </Box>
            </QuestionPaperBox>

            <Modal
                opened={opened}
                onClose={close}
                title="Chỉnh sửa thông tin mô tả nhóm câu hỏi"
                centered
                size="xl"
            >

                <form
                    onSubmit={form.onSubmit((values) => {
                        const { clo, plo, ...rest } = values;
                        setDisplayData(rest);
                        onChange?.(rest);
                        close();
                    })}
                >
                    <Stack>
                        <MyTextArea
                            minRows={4}
                            label="Mô tả nhóm câu hỏi"
                            {...form.getInputProps("groupTitle")}
                            withAsterisk
                        />
                        <MyTextArea
                            minRows={4}
                            label="Hướng dẫn trả lời"
                            {...form.getInputProps("guide")}
                            withAsterisk
                        />

                        <MyFileInput
                            label="Ảnh minh họa"
                            onChange={(file) => {
                                form.setFieldValue("image", file);
                            }}
                            accept="image/*"
                        />

                        {form.values.image && (
                            <Box mx="auto" my="xs">
                                <Image
                                    src={URL.createObjectURL(form.values.image)}
                                    width={150}
                                    radius="md"
                                />
                            </Box>
                        )}

                        <Box style={{ display: "flex", justifyContent: "center" }}>
                            <Rating
                                defaultValue={value}
                                size="xl"
                                count={5}
                                readOnly
                                onChange={(value) => {
                                    if (value !== null) {
                                        setValue(value);
                                    }
                                }}
                            />
                        </Box>

                        <Select
                            label="Đóng góp CLO"
                            data={["1", "2", "Bất kỳ"]}
                            {...form.getInputProps("clo")}
                        />

                        <Select
                            label="Đóng góp PLO"
                            data={["1", "2", "Bất kỳ"]}
                            {...form.getInputProps("plo")}
                        />

                        <Group mt="md" justify="flex-end">
                            <Button type="submit">Lưu</Button>
                        </Group>
                    </Stack>
                </form>
            </Modal>
        </>
    );
}