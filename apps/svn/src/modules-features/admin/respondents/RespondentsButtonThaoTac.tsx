import { Button, Flex, Paper, Radio, Text, Grid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAsteriskSimple } from "@tabler/icons-react";
import { MyButtonModal, MyCenterFull } from "aq-fe-framework/components";
import { useState } from "react";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { mockDataSurveyDetail } from "./mockData";

export default function RespondentsButtonThaoTac() {
  const disclosure = useDisclosure();
  const [answers, setAnswers] = useState<Record<string, string>>({});
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
  const handleChange = (questionCode: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionCode]: value,
    }));
  };
  return (
    <MyButtonModal
      disclosure={disclosure}
      label="Thao tác"
      variant="transparent"
      c="blue"
      fullScreen
    >
      <Paper p="md" pl="20%" pr="20%">
        <Text
          fw={700}
          fz={{ base: 20, md: 28 }}
          ta="center"
          c="blue"
          mb={{ base: 8, md: "md" }}
        >
          Thông tin đáp viên
        </Text>
        <Grid gutter={{ base: 8, md: "md" }}>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Text fw={500} fz={{ base: 14, md: 16 }}>
              Họ và tên:{" "}
              <Text span fw={400}>
                Tô Ngọc Lanh
              </Text>
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Text fw={500} fz={{ base: 14, md: 16 }}>
              Giới tính:{" "}
              <Text span fw={400}>
                Nam
              </Text>
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Text fw={500} fz={{ base: 14, md: 16 }}>
              Ngày sinh:{" "}
              <Text span fw={400}>
                20/10/2000
              </Text>
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Text fw={500} fz={{ base: 14, md: 16 }}>
              Lớp:{" "}
              <Text span fw={400}>
                IT240101
              </Text>
            </Text>
          </Grid.Col>
        </Grid>
      </Paper>
      <Paper
        p="lg"
        pl={"20%"}
        pr={"20%"}
      >
        <Paper radius="md" p="xl" mb="xs">
          <Text fw={500} fz="h4" ta="center">
            Bạn vui lòng thực hiện khảo sát tự đánh giá năng lực đạt chuẩn đầu
            ra môn học mà bạn vừa hoàn thành!
          </Text>
        </Paper>
        {survayDetailQuery.data?.questions?.map((item) => (
          <Paper
            key={item.code}
            shadow="xs"
            p="md"
            radius="md"
            withBorder
            mt="sm"
          >
            <Flex>
              {item.required && (
                <IconAsteriskSimple
                  style={{
                    width: "1.3rem",
                    height: "1.3rem",
                    paddingRight: 3,
                    paddingTop: 3,
                  }}
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
      </Paper>
    </MyButtonModal>
  );
}
