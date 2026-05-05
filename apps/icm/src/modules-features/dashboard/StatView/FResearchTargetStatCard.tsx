import { Progress, Text } from '@mantine/core';

export function FResearchTargetStatCard(
    { title, targetValue, progressValue, unitPrefix, unitSubfix }:
        { title: string, targetValue: number, progressValue: number, unitPrefix?: string, unitSubfix?: string }
) {
    return (
        <>
            {/* <Paper withBorder radius="md" bg="var(--mantine-color-body)"> */}
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                {title}
            </Text>
            <Text fz="lg" fw={500}>
                {unitPrefix}{progressValue} / {unitPrefix}{targetValue}{unitSubfix} - (Đã đạt {((progressValue / targetValue) * 100).toFixed(2)}%)
            </Text>
            <Progress
                value={((progressValue / targetValue) * 100)}
                color="teal"
                // striped animated
                mt="md" size="lg" radius="xl" />
            {/* </Paper> */}
        </>
    );
}