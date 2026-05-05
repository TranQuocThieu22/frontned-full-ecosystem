
import { Button, Flex, Paper, Radio, Text } from "@mantine/core";
import { MyCenterFull } from "aq-fe-framework/components";
import { IconAsteriskSimple } from "@tabler/icons-react";
import { useState } from "react";
import { I_Question } from "./SurveyQuickViewDesign";

export default function SurveyDesignView({ listQuestion }: { listQuestion?: I_Question[] }) {
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const handleChange = (questionCode: string, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionCode]: value,
        }));
    };
    return (<>
        <Paper radius="md" p="xl" mb="xs">
            <Text fw={500} fz="h4" ta="center">
                Bạn vui lòng thực hiện khảo sát tự đánh giá năng lực đạt chuẩn đầu ra môn học mà bạn vừa hoàn thành!
            </Text>
        </Paper>
        {listQuestion?.map((item) => (
            <Paper key={item.code} shadow="xs" p="md" radius="md" withBorder mt="sm">
                <Flex>
                    {item.required && (
                        <IconAsteriskSimple
                            style={{ width: "1.3rem", height: "1.3rem", paddingRight: 3, paddingTop: 3 }}
                            color="red"
                            stroke={3}
                        />
                    )}
                    <Text>
                        <Text fw={500} c="#0F5799" td="underline" pr={4} span>
                            {item.code}
                        </Text>
                        {item.title}
                    </Text>
                </Flex>

                <Radio.Group
                    name={`${item.code}RadioGroup`}
                    value={answers[item.code] || ""}
                    onChange={(value) => handleChange(item.code, value)}
                >
                    {item.questionOptions.map((option) => (
                        <Radio
                            ml="lg"
                            mt="sm"
                            key={`${item.code}-${option.value}`}
                            value={option.value.toString()}
                            label={option.label}
                        />
                    ))}
                </Radio.Group>
            </Paper>
        ))}
        <Paper mt="sm" radius="md" p="xl" mb="xs">
            <Text fw={500} fz="h3" ta="center" mb="md">
                Cảm ơn bạn đã thực hiện khảo sát.
            </Text>
            <MyCenterFull>
                <Button color="green">Hoàn thành</Button>
            </MyCenterFull>
        </Paper>
    </>);
}

