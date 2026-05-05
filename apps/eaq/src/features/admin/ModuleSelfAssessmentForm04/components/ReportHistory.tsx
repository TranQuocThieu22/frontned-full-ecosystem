import { ISelfAssessment } from '@/shared/interfaces/selfAssessment/ISelfAssessment'
import { Accordion, Box, Group, Text } from '@mantine/core'
import React from 'react'

interface ReportHistoryProps {
    data: ISelfAssessment[] | undefined;
    title?: string;
    // Nhận vào một function để render item tùy ý
    renderItem: (item: ISelfAssessment) => React.ReactNode;
}

export default function ReportHistory({
    data,
    title = 'Lịch sử báo cáo',
    renderItem
}: ReportHistoryProps) {
    return (
        <Accordion className="border">
            <Accordion.Item value="history">
                <Accordion.Control>
                    <Group className="ml-1 border-l-4 border-l-[var(--mantine-color-blue-4)] px-2 w-fit bg-[var(--mantine-color-blue-1)]">
                        <Text fw={600} c="var(--mantine-color-blue-9)">
                            {title}
                        </Text>
                    </Group>
                </Accordion.Control>
                <Accordion.Panel>
                    <Box
                        mah={500} // mah là viết tắt của maxHeight trong Mantine
                        style={{ overflowY: "auto", overflowX: "hidden" }}
                    >
                        <Accordion
                            defaultValue="1"
                            chevronPosition="right"
                            variant="contained"
                            radius="md"
                        >
                            {data?.map((item) => (
                                <React.Fragment key={item.id}>
                                    {renderItem(item)}
                                </React.Fragment>
                            ))}
                        </Accordion>
                    </Box>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    )
}
