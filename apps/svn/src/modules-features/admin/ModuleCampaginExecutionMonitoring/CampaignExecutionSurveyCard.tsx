import { EnumSurveyType } from "@/enums/EnumSurveyType";
import {
  Badge,
  Box,
  Button,
  Group,
  Paper,
  Radio,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";

export interface ISurveyDetail {
  id: number;
  code: string;
  name: string;
  survayType: EnumSurveyType;
  isStopUsed?: boolean;
  createDate: string;
  updateDate: string;
  questions: I_Question[];
}

export interface I_Question {
  id: number;
  code: string;
  title: string;
  required: true;
  options: I_QuestionOption[];
  type: "single" | "multiple" | null;
}

export interface I_QuestionOption {
  value: number;
  label: string;
}

interface I_SurveyCardProps {
  question: I_Question;
  options: I_QuestionOption[];
  type: "single" | "multiple" | null;
  onAnswer: (questionId: number, answer: string | string[]) => void;
  fontSize?: "small" | "medium" | "large";
}

export const SurveyCard: React.FC<I_SurveyCardProps> = ({
  question,
  options,
  type,
  onAnswer,
  fontSize = "medium",
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[] | string>(
    type === "multiple" ? [] : ""
  );

  const handleSingleChoice = (value: string) => {
    setSelectedAnswers(value);
    onAnswer(question.id, value);
  };

  const handleMultipleChoice = (value: string) => {
    const currentAnswers = selectedAnswers as string[];
    const newAnswers = currentAnswers.includes(value)
      ? currentAnswers.filter((item) => item !== value)
      : [...currentAnswers, value];
    setSelectedAnswers(newAnswers);
    onAnswer(question.id, newAnswers);
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

  // Function to extract CLO code and remaining title
  const parseCLOTitle = (title: string) => {
    const cloMatch = title.match(/^(CLO\d+)\.(.+)$/);
    console.log("Title:", title, "Match:", cloMatch); // Debug log
    if (cloMatch) {
      return {
        cloCode: cloMatch[1],
        remainingTitle: cloMatch[2]?.trim(),
      };
    }
    return {
      cloCode: null,
      remainingTitle: title,
    };
  };

  // Function to get CLO badge color based on CLO number
  const getCLOBadgeColor = (cloCode: string | null) => {
    const defaultColor = "gray";
    console.log("cloCode:", cloCode, "Validating..."); // Debug log
    if (!cloCode || !cloCode.match(/^CLO\d+$/)) {
      console.log("Invalid cloCode, returning:", defaultColor);
      return defaultColor;
    }
    const cloNumber = parseInt(cloCode.replace("CLO", ""));
    if (isNaN(cloNumber) || cloNumber < 1) {
      console.log("Invalid cloNumber, returning:", defaultColor);
      return defaultColor;
    }
    const colors = ["blue", "green", "orange", "red", "pink", "cyan"];
    const color = colors[(cloNumber - 1) % colors.length];
    console.log("cloNumber:", cloNumber, "Color:", color);
    return color;
  };

  const { cloCode, remainingTitle } = parseCLOTitle(question.title);

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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative gradient line */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: cloCode
            ? `linear-gradient(90deg, var(--mantine-color-${getCLOBadgeColor(
              cloCode
            )}-5), var(--mantine-color-${getCLOBadgeColor(cloCode)}-7))`
            : "linear-gradient(90deg, #667eea, #764ba2)",
        }}
      />

      {/* Title with CLO badge */}
      <Box mb="md">
        {cloCode && (
          <Badge
            size="lg"
            color={cloCode === "CLO4" ? "red" : getCLOBadgeColor(cloCode)}
            variant="gradient"
            gradient={{
              from: getCLOBadgeColor(cloCode) || "",
              to: `${getCLOBadgeColor(cloCode)}.7`,
              deg: 45,
            }}
            style={{
              marginBottom: "12px",
              fontSize: "13px",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {cloCode}
          </Badge>
        )}

        <Title
          order={4}
          style={{
            color: "#2c3e50",
            fontSize: getTitleFontSize("medium"),
            fontWeight: 600,
            lineHeight: 1.5,
            marginTop: cloCode ? "8px" : "0",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          }}
        >
          {remainingTitle}
        </Title>
      </Box>

      {type === "multiple" ? (
        <Stack gap="sm">
          {options.map((option) => (
            <Button
              key={option.value}
              variant={
                (selectedAnswers as string[]).includes(option.label)
                  ? "filled"
                  : "outline"
              }
              onClick={() => handleMultipleChoice(option.label)}
              style={{
                justifyContent: "flex-start",
                textAlign: "left",
                fontSize: getFontSizeValue(),
                minHeight:
                  fontSize === "large"
                    ? "48px"
                    : fontSize === "small"
                      ? "36px"
                      : "42px",
                borderRadius: "8px",
                transition: "all 0.2s ease",
              }}
            >
              {option.label}
            </Button>
          ))}
        </Stack>
      ) : (
        <Radio.Group
          value={selectedAnswers as string}
          onChange={handleSingleChoice}
        >
          <Stack gap="sm">
            {options.map((option) => (
              <Paper
                key={option.value}
                p="sm"
                radius="md"
                style={{
                  backgroundColor:
                    selectedAnswers === option.value.toString()
                      ? "rgba(74, 144, 226, 0.1)"
                      : "rgba(255, 255, 255, 0.5)",
                  border:
                    selectedAnswers === option.value.toString()
                      ? "2px solid #4a90e2"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  transform:
                    selectedAnswers === option.value.toString()
                      ? "translateY(-1px)"
                      : "none",
                  boxShadow:
                    selectedAnswers === option.value.toString()
                      ? "0 4px 12px rgba(74, 144, 226, 0.2)"
                      : "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => handleSingleChoice(option.value.toString())}
              >
                <Group gap="xs" align="flex-start">
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
                    color={cloCode ? getCLOBadgeColor(cloCode) : "blue"}
                  />
                  <Text
                    style={{
                      fontSize: getFontSizeValue(),
                      lineHeight: 1.4,
                      cursor: "pointer",
                      color:
                        selectedAnswers === option.value.toString()
                          ? "#2c3e50"
                          : "#555",
                      fontWeight:
                        selectedAnswers === option.value.toString() ? 500 : 400,
                    }}
                  >
                    {option.label}
                  </Text>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Radio.Group>
      )}
    </Paper>
  );
};

export const getTitleFontSize = (fontSize: string) => {
  switch (fontSize) {
    case "small":
      return "16px";
    case "large":
      return "20px";
    default:
      return "18px";
  }
};

export default SurveyCard;
