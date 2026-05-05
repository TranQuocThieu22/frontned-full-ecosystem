import { Box, Divider, Flex, Grid, Text } from "@mantine/core";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";

export default function Form04SelfEvaluationContent() {
  return (
    <Flex
      direction={"column"}
      style={{ width: "100%" }}
      title="Nội dung báo cáo hiện tại"
    >
      <Box>
        <Text fw={600}>4.1 Khắc phục điểm tồn tại:</Text>
        <Grid>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <CustomTextArea label="Nội dung" minRows={4} autosize mb={8} />
            <CustomTextInput label="Ghi chú" mb={8} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <CustomTextInput label="Đơn vị/ người thực hiện" mb={8} />
            <CustomTextInput label="Thời gian thực hiện/ hoàn thành" mb={8} />
          </Grid.Col>
        </Grid>
      </Box>
      <Divider />
      <Box>
        <Text fw={600}>4.2 Phát huy điểm mạnh:</Text>
        <Grid>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <CustomTextArea label="Nội dung" minRows={4} autosize mb={8} />
            <CustomTextInput label="Ghi chú" mb={8} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <CustomTextInput label="Đơn vị/ người thực hiện" mb={8} />
            <CustomTextInput label="Thời gian thực hiện/ hoàn thành" mb={8} />
          </Grid.Col>
        </Grid>
      </Box>
    </Flex>
  );
}
