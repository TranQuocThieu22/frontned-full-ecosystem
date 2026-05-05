import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { Accordion, Box, Flex, Group, Text } from "@mantine/core";
import { StatusRow } from "../components/StatusRow";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";

export default function Form04SelfEvaluationRow({
  data,
}: {
  data: ISelfAssessment;
}) {
  return (
    <Accordion.Item value={`${data?.id?.toString() ?? "1"}`}>
      <Accordion.Control>
        <Group gap="md" grow>
          <Text size="sm" fw={500} c={"green"}>
            {data?.name}
          </Text>
          <Text size="sm" fw={500}>
            Ngày cập nhật:{" "}
            {data?.createdWhen == null || data?.createdWhen == undefined
              ? "Chưa được cập nhật"
              : dateUtils.toDateTime(data?.createdWhen ?? "", true)}
          </Text>
          <Text size="sm" fw={500}>
            Người cập nhật:{" "}
            {data?.createdBy == null || data?.createdBy == undefined
              ? "Chưa được cập nhật"
              : data?.createdBy?.toString() ?? ""}
          </Text>
          <Flex gap="xs" fw={500}>
            <Text size="sm" fw={500}>
              Tự đánh giá:
            </Text>
            <StatusRow status={data?.status} />
          </Flex>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Box>
          <Text fw={500}>Tự đánh giá</Text>
          <Flex gap={10}>
            <CustomCheckbox label="Đạt" checked={data?.status == 1} readOnly />
            <CustomCheckbox
              label="Không đạt"
              checked={data?.status == 2}
              readOnly
            />
          </Flex>
        </Box>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
