import { EnumSurveyType } from "@/enums/EnumSurveyType";
import {
  ActionIcon,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { MyFieldset } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import {
  IconAdjustmentsHorizontal,
  IconArrowLeft,
  IconArrowRight,
  IconDotsVertical,
  IconHome,
  IconReload,
  IconUserCircle,
} from "@tabler/icons-react";
import SurveyDesignView from "./SurveyDesignView";
import SurveyDesignButtonModal from "../design/SurveyDesignButtonModal";

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
  questionOptions: I_QuestionOption[];
}

export interface I_QuestionOption {
  value: number;
  label: string;
}

export default function SurveyQuickViewDesign() {
  const survayDetailQuery = useMyReactQuery({
    queryKey: ["survayDetail"],
    axiosFn: () =>
      Promise.resolve({
        data: { data: mockDataSurveyDetail, message: "", success: true },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      } as import("axios").AxiosResponse),
    mockData: mockDataSurveyDetail,
  });

  return (
    <>
      <MyFieldset title={"Xem trước"}>
        <Paper shadow="xs" p="md">
          <Group justify="space-between" align="flex-end">
            <Stack gap="xs">
              <Text fw="500">
                Tên phiếu: <Text span>{survayDetailQuery.data?.name}</Text>
              </Text>
              <Text fw="500">
                Ngày tạo:{" "}
                <Text span>
                  {utils_date_dateToDDMMYYYString(
                    survayDetailQuery.data?.createDate
                  )}{" "}
                  {survayDetailQuery.data?.createDate?.split("T")[1]}
                </Text>
              </Text>
              <Text fw="500">
                Ngày cập nhật:{" "}
                <Text span>
                  {utils_date_dateToDDMMYYYString(
                    survayDetailQuery.data?.updateDate
                  )}{" "}
                  {survayDetailQuery.data?.createDate?.split("T")[1]}
                </Text>
              </Text>
            </Stack>
            <Stack>
              <Switch
                labelPosition="left"
                defaultChecked={survayDetailQuery.data?.isStopUsed}
                label="Ngừng sử dụng"
              />
              <SurveyDesignButtonModal />
            </Stack>
          </Group>
        </Paper>
        <Paper px="xs" mt="xs">
          <Paper
            py="xs"
            shadow="xs"
            mt="sm"
            bg="var(--mrt-row-hover-background-color)"
          >
            <Group px="3%" wrap="nowrap" w="100%">
              <IconArrowLeft />
              <IconArrowRight />
              <IconReload />
              <IconHome />
              <TextInput
                defaultValue="https://aqedu.vn"
                radius="xl"
                readOnly
                leftSection={
                  <ActionIcon radius="xl">
                    <IconAdjustmentsHorizontal />
                  </ActionIcon>
                }
                style={{ flexGrow: 1 }}
              />
              <IconUserCircle />
              <IconDotsVertical />
            </Group>
          </Paper>
          <ScrollArea h="90vh" mt="xs">
            <SurveyDesignView
              listQuestion={survayDetailQuery.data?.questions}
            />
          </ScrollArea>
        </Paper>
      </MyFieldset>
    </>
  );
}

// Dữ liệu câu hỏi khảo sát mẫu
export const mockDataSurveyDetail: ISurveyDetail = {
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
        "Sau khi học môn này, bạn tự đánh giá khả năng vận dụng kiến thức lập trình để xây dựng ứng dụng mobile đơn giản ở mức độ nào?",
      required: true,
      questionOptions: [
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
        "Bạn tự tin như thế nào khi sử dụng các công cụ và framework.  ví dụ: React Native, Flutter, Android SDK) để phát triển ứng dụng mobile?",
      required: true,
      questionOptions: [
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
        "Bạn có thể áp dụng các nguyên tắc thiết kế UI/UX để tạo ra ứng dụng mobile hấp dẫn và dễ sử dụng ở mức độ nào?",
      required: true,
      questionOptions: [
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
        "Mức độ đóng góp của môn học này vào khả năng làm việc nhóm trong dự án phát triển ứng dụng mobile của bạn là gì?",
      required: true,
      questionOptions: [
        { value: 1, label: "1.  Không đóng góp" },
        { value: 2, label: "2.  Đóng góp ít" },
        { value: 3, label: "3.  Đóng góp trung bình" },
        { value: 4, label: "4.  Đóng góp nhiều" },
        { value: 5, label: "5.  Đóng góp rất nhiều" },
      ],
    },
  ],
};
