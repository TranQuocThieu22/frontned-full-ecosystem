import {Accordion, Box, Group, Text} from "@mantine/core";
import CycleImprovementReportViewDetailResultRow from "./ViewDetailResultRow";
import ILimitationDetail from "@/shared/interfaces/limitation/ILimitationDetail";

interface IProps {
  data: ILimitationDetail;
}

export default function ViewDetailResult({ data }: IProps) {
  return (
    <>
      <Accordion className="border">
        <Accordion.Item value="3">
          <Accordion.Control>
            <Group
              className={`ml-1 border-l-4 border-l-[var(--mantine-color-blue-4)] px-2 w-fit bg-[var(--mantine-color-blue-1)]`}
            >
              <Text fw={600} color="var(--mantine-color-blue-9)">
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
                {data.eaqReports && Object.entries(data.eaqReports).map(([key, reports]) => (
                  <CycleImprovementReportViewDetailResultRow
                    data={reports}
                    reportKey={key}
                    key={key}
                  />
                ))}
              </Accordion>
            </Box>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
