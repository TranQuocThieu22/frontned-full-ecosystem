import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { Accordion, Card, Flex, Group, Text } from "@mantine/core";
import { StatusRow } from "../components/StatusRow";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";

export default function Form04WeaknessesRow({
  data,
}: {
  data: ISelfAssessment;
}) {
  return (
    <Accordion.Item value={data?.id?.toString() ?? "1"} w={"100%"}>
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
        <Card shadow={"xs"}>
          <CustomHtmlWrapper
            style={{
              height: "200px",
              overflowY: "scroll",
            }}
            html={data?.description ?? ""}
          />
        </Card>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
