import { Paper,  Radio,  Stack,  Title,  Group,  Text,  Flex,} from "@mantine/core";
import { IconAsteriskSimple } from "@tabler/icons-react";
import { useState } from "react";
import { I_Question, I_QuestionOption } from "../../layout/SurveyQuickViewDesign";

interface I_SurveyCardProps {
  question: I_Question;
  options: I_QuestionOption[];
  onAnswer: (questionId: number, answer: string | string[]) => void;
  fontSize?: "small" | "medium" | "large";
}

export const SurveyCard: React.FC<I_SurveyCardProps> = ({
  question,
  options,
  onAnswer,
  fontSize = "medium",
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[] | string>(  );

  const handleSingleChoice = (value: string) => {
    setSelectedAnswers(value);
    onAnswer(question.id, value);
  };

  const getFontSizeValue = () => {
    switch (fontSize) {
      case "small":
        return "12px";
      case "large":
        return "16px";
      default: // medium
        return "14px";
    }
  };

  const getTitleFontSize = () => {
    switch (fontSize) {
      case "small":
        return "16px";
      case "large":
        return "20px";
      default: // medium
        return "18px";
    }
  };

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Flex>
        {question.required && (
          <IconAsteriskSimple

            style={{
              width: "20px",
              height: "20px",
              paddingRight: 3,
              paddingTop: 3,
            }}
            color="red"
            stroke={3}
          />
        )}
        <Title
          order={4}
          mb="md"
          style={{
            color: "#333",
            fontSize: getTitleFontSize(),
            fontWeight: 600,
          }}
        >
          &nbsp;
          <Text
            fw={600}
            c="#0F5799"
            td="underline"
            pr={4}
            style={{ fontSize: getTitleFontSize() }}
            span
          >
            {question.code}
          </Text>
          :&nbsp;{question.title}
        </Title>
      </Flex>

        <Radio.Group
          value={selectedAnswers as string}
          onChange={handleSingleChoice}
        >
          <Stack gap="sm">
            {options.map((option) => (
              <Group
                key={option.value}
                gap="xs"
                align="flex-end"
                justify="flex-start"
              >
                <Radio
                  value={option.value.toString()}
                  size={
                    fontSize === "large"
                      ? "md"
                      : fontSize === "small"
                      ? "xs"
                      : "sm"
                  }
                  mt={2}
                />
                <Text
                  style={{
                    fontSize: getFontSizeValue(),
                    cursor: "pointer",
                  }}
                  onClick={() => handleSingleChoice(option.value.toString())}
                >
                  {option.label}
                </Text>
              </Group>
            ))}
          </Stack>
        </Radio.Group>
    </Paper>
  );
};

export default SurveyCard;
