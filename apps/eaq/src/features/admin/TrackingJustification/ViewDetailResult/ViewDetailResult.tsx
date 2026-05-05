import IRequirementDetail from "@/shared/interfaces/requirement/IRequirementDetail";
import { Accordion, Box, Group, Paper, Stack, Text } from "@mantine/core";
import ViewDetailResultRow from "./ViewDetailResultRow";

interface IProps {
  data: IRequirementDetail;
}

export default function ViewDetailResult({ data }: IProps) {
  return (
    <Paper>
      <Accordion className="border">
        <Accordion.Item value="3">
          <Accordion.Control>
            <Group ml={1}>
              <Text fw={600} c="var(--mantine-color-blue-9)">
                Danh sách kết quả thực hiện đảm bảo chất lượng CTĐT
              </Text>
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <Box
              h={"400px"}
              style={{
                maxHeight: "400px",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              <Accordion variant="contained">
                {Object.values(data?.eaqReports || {}).length === 0 && (
                  <Stack align="center" justify="center" h="100%" mt={10}>
                    <Text>Chưa có kết quả thực hiện đảm bảo chất lượng CTĐT</Text>
                  </Stack>
                )}
                {data.eaqReports &&
                  Object.entries(data.eaqReports).map(([key, reports]) => (
                    <ViewDetailResultRow data={reports} reportKey={key} key={key} />
                  ))}
              </Accordion>
            </Box>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Paper>
  );
}
