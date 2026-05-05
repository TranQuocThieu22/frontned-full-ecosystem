"use client";
import { useState } from "react";
import { SurveyCard } from "./components/SurveyCard";

import { Box, Stack, Title } from "@mantine/core";
import { MyButton } from "aq-fe-framework/components";
import { utils_notification_show } from "aq-fe-framework/utils";
import { mockDataSurveyDetail } from "../layout/SurveyQuickViewDesign";
import DecorationSideBar from "./DecorationSideBar";
import { themes } from "./ThemeData";

export default function DecorationView() {
  const [activeTab, setActiveTab] = useState("themes");
  const [selectedTheme, setSelectedTheme] = useState("ocean");
  const [customColor, setCustomColor] = useState("#4DABF7");
  const [surveyAnswers, setSurveyAnswers] = useState<{
    [key: number]: string | string[];
  }>({});
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    "small"
  );
  const [customImage, setCustomImage] = useState<{
    file: File | null;
    preview: string | null;
    name: string;
  }>({
    file: null,
    preview: null,
    name: "",
  });
  const [isBlurred, setIsBlurred] = useState(false);

  const handleSurveyAnswer = (
    questionId: number,
    answer: string | string[]
  ) => {
    setSurveyAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const getCurrentBackgroundStyle = () => {
    const blurStyle = isBlurred ? "blur(8px)" : "none";

    // Nếu có ảnh custom
    if (customImage.preview) {
      return {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${customImage.preview})`,
        backgroundColor: "transparent",
        backgroundBlendMode: "overlay",
        filter: blurStyle, // Áp dụng blur nếu có ảnh
      };
    }

    // Nếu đang chọn tab custom màu nền
    if (activeTab === "custom") {
      return {
        backgroundColor: customColor,
        backgroundImage: "none",
        backgroundBlendMode: "normal",
        filter: "none", // Không blur màu thuần
      };
    }

    // Chủ đề có ảnh
    const theme = themes.find((t) => t.id === selectedTheme);
    const selectedThemeData = theme || themes[0];

    return {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${selectedThemeData?.imagePath})`,
      backgroundColor: "transparent",
      backgroundBlendMode: "overlay",
      filter: blurStyle, // Áp dụng blur nếu có ảnh
    };
  };

  // Font size cho title chính
  const getTitleFontSize = () => {
    switch (fontSize) {
      case "small":
        return "24px";
      case "large":
        return "32px";
      default: // medium
        return "28px";
    }
  };

  // Font size cho button submit
  const getButtonFontSize = () => {
    switch (fontSize) {
      case "small":
        return "14px";
      case "large":
        return "18px";
      default: // medium
        return "16px";
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Side Menu */}
      <DecorationSideBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        customColor={customColor}
        setCustomColor={setCustomColor}
        themes={themes}
        fontSize={fontSize}
        setFontSize={setFontSize}
        customImage={customImage}
        setCustomImage={setCustomImage}
        isBlurred={isBlurred}
        setIsBlurred={setIsBlurred}
      />

      {/* Main Content */}
      <Box
        style={{
          position: "relative",
          flex: 1,
          overflow: "hidden",
          marginLeft: 30,
        }}
      >
        {/* Layer nền ảnh - blur*/}
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            backgroundColor: getCurrentBackgroundStyle().backgroundColor,
            backgroundImage: getCurrentBackgroundStyle().backgroundImage,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode:
              getCurrentBackgroundStyle().backgroundBlendMode,
            filter: isBlurred ? "blur(8px)" : "none", // Blur ảnh
            transition: "filter 0.3s ease",
          }}
        />

        {/* Nội dung */}
        <Box
          style={{
            position: "relative",
            zIndex: 2,
            padding: "20px",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Box style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Title
              order={2}
              mb="xl"
              style={{
                color: "white",
                textAlign: "center",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                fontSize: getTitleFontSize(),
              }}
            >
              Khảo sát ý kiến
            </Title>

            <Stack gap="xl">
              {mockDataSurveyDetail.questions.map((question) => (
                <SurveyCard
                  key={question.id}
                  question={question}
                  options={question.questionOptions}
                  onAnswer={handleSurveyAnswer}
                  fontSize={fontSize}
                />
              ))}
            </Stack>

            <Box style={{ textAlign: "center", marginTop: "2rem" }}>
              <MyButton
                size={
                  fontSize === "large"
                    ? "xl"
                    : fontSize === "small"
                      ? "md"
                      : "lg"
                }
                type="submit"
                style={{
                  backdropFilter: "blur(10px)",
                  fontSize: getButtonFontSize(),
                  minHeight:
                    fontSize === "large"
                      ? "52px"
                      : fontSize === "small"
                        ? "40px"
                        : "46px",
                }}
                onClick={() => {
                  utils_notification_show({
                    crudType: "create",
                    message: "Cảm ơn bạn đã tham gia khảo sát!",
                  });
                }}
              >
                Gửi khảo sát
              </MyButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
