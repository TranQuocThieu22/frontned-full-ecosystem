"use client";
import { useState } from "react";
import {
  ISurveyDetail,
  SurveyCard
} from "./CampaignExecutionSurveyCard";

import { EnumSurveyType } from "@/enums/EnumSurveyType";
import { Box, Button, Paper, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MyButtonModal, MyCenterFull } from "aq-fe-framework/components";
import { utils_notification_show } from "aq-fe-framework/utils";

export default function CampaginExecutionInputButton() {
  const [activeTab, setActiveTab] = useState("custom");
  const [surveyAnswers, setSurveyAnswers] = useState<{
    [key: number]: string | string[];
  }>({});
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    "medium"
  );
  const dis = useDisclosure();

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
    if (activeTab === "custom") {
      return {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("/imgs/sunset.jpg")`,
        backgroundColor: "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      };
    }
  };

  return (
    <MyCenterFull>
      <MyButtonModal
        onSubmit={() => { }}
        label="Xem"
        disclosure={dis}
        modalSize={"xl"}
      >
        <Box
          style={{
            // display: "flex",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <Box
            style={{
              ...getCurrentBackgroundStyle(),
            }}
          >
            <Box
              style={{
                padding: "20px",

              }}
            >
              <Box style={{ maxWidth: "800px", margin: "0 auto" }}>
                <Paper
                  shadow="md"
                  p="xl"
                  mb="xl"
                  radius="md"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Title
                    order={2}
                    style={{
                      color: "white",
                      textAlign: "center",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    Bạn vui lòng thưc hiện khảo sát tự đánh giá năng lực đạt
                    chuẩn đầu ra môn học mà bạn vừa hoàn thành!
                  </Title>
                </Paper>

                <Stack gap="xl">
                  {mockDataSurveyDetail.questions.map((question) => (
                    <SurveyCard
                      key={question.id}
                      question={question}
                      options={question.options}
                      type={question.type}
                      onAnswer={handleSurveyAnswer}
                    />
                  ))}
                </Stack>

                <Paper
                  shadow="md"
                  p="xl"
                  mt="xl"
                  radius="md"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Title
                    order={2}
                    style={{
                      color: "white",
                      textAlign: "center",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    Cảm ơn bạn đã hoàn thành khảo sát!
                  </Title>
                  <Box style={{ textAlign: "center", marginTop: "2rem" }}>
                    <Button
                      size="lg"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        color: "green",
                        backdropFilter: "blur(10px)",
                      }}
                      onClick={() => {
                        utils_notification_show({
                          crudType: "create",
                          message: "Cảm ơn bạn đã tham gia khảo sát!",
                        });
                      }}
                    >
                      Hoàn thành
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      </MyButtonModal>
    </MyCenterFull>
  );
}

const mockDataSurveyDetail: ISurveyDetail = {
  id: 1,
  code: "KHAOSAT01",
  name: "Khảo sát 1",
  survayType: EnumSurveyType.StudentEvaluateLecturerSubject,
  isStopUsed: false,
  createDate: "2025-02-15T12:12:03",
  updateDate: "2025-02-18T12:11:03",
  questions: [
    {
      id: 1,
      code: "CLO1",
      title:
        "CLO1. Sau khi học môn này, bạn tự đánh giá khả năng vận dụng kiến thức lập trình để xây dựng ứng dụng mobile đơn giản ở mức độ nào?",
      required: true,
      type: "single",
      options: [
        { value: 1, label: "1.  Rất kém" },
        { value: 2, label: "2.  Kém" },
        { value: 3, label: "3.  Trung bình" },
        { value: 4, label: "4.  Khá" },
        { value: 5, label: "5.  Tốt" },
      ],
    },
    {
      id: 2,
      code: "CLO2",
      title:
        "CLO2. Bạn tự tin như thế nào khi sử dụng các công cụ và framework.  ví dụ: React Native, Flutter, Android SDK) để phát triển ứng dụng mobile?",
      required: true,
      type: "single",
      options: [
        { value: 1, label: "1.  Không tự tin" },
        { value: 2, label: "2.  Tôi nghĩ là mình có thể làm được" },
        { value: 3, label: "3.  Có thể làm được" },
        { value: 4, label: "4.  Tôi làm được" },
        { value: 5, label: "5.  Rất tự tin" },
      ],
    },
    {
      id: 3,
      code: "CLO3",
      title:
        "CLO3. Bạn có thể áp dụng các nguyên tắc thiết kế UI/UX để tạo ra ứng dụng mobile hấp dẫn và dễ sử dụng ở mức độ nào?",
      required: true,
      type: "single",
      options: [
        { value: 1, label: "1.  Không thể" },
        { value: 2, label: "2.  Có thể với hướng dẫn" },
        { value: 3, label: "3.  Có thể độc lập" },
        { value: 4, label: "4.  Có thể hướng dẫn người khác" },
        { value: 5, label: "5.  Có thể sáng tạo và cải tiến" },
      ],
    },
    {
      id: 4,
      code: "CLO4",
      title:
        "CLO4. Mức độ đóng góp của môn học này vào khả năng làm việc nhóm trong dự án phát triển ứng dụng mobile của bạn là gì?",
      required: true,
      type: "single",
      options: [
        { value: 1, label: "1.  Không đóng góp" },
        { value: 2, label: "2.  Đóng góp ít" },
        { value: 3, label: "3.  Đóng góp trung bình" },
        { value: 4, label: "4.  Đóng góp nhiều" },
        { value: 5, label: "5.  Đóng góp rất nhiều" },
      ],
    },
  ],
};
