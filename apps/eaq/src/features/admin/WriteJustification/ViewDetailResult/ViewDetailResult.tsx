import ILimitationDetail from "@/shared/interfaces/limitation/ILimitationDetail";
import { IReport } from "@/shared/interfaces/report/IReport";
import { Accordion, Box, Group, Paper, Stack, Text } from "@mantine/core";
import ViewDetailResultRow from "./ViewDetailResultRow";
import { useMemo } from "react";

export default function ViewDetailResult({ data }: { data?: ILimitationDetail; }) {
  const reportGroups = useMemo(() => {
    return Object.values(data?.eaqReports || {});
  }, [data?.eaqReports])
  return (
    <Paper>
      <Accordion className="border" >
        <Accordion.Item value="3">
          <Accordion.Control>
            <Group ml={1} >
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
                {reportGroups.length === 0 && (
                  <Stack align="center" justify="center" h="100%" mt={10}>
                    <Text>
                      Chưa có kết quả thực hiện đảm bảo chất lượng CTĐT
                    </Text>
                  </Stack>
                )}
                {reportGroups.map((items: IReport[], index: number) => (
                  <ViewDetailResultRow
                    index={index + 1}
                    reports={items}
                    key={items[0]?.id?.toString() ?? index.toString()}
                  />
                )
                )}
              </Accordion>
            </Box>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Paper>
  );
}
