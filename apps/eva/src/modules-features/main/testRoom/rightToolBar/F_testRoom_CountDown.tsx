"use client";
import { Box, Flex, Paper, Text } from "@mantine/core";
import Countdown from "react-countdown";

export default function F_testRoom_CountDown() {
    return (
        <Countdown
            date={Date.now() + 400000}
            intervalDelay={0}
            precision={3}
            renderer={({ hours, minutes, seconds }) => (
                <Flex justify="center" align="center" gap={10}>
                    <TimeUnit value={hours} label="Giờ" />
                    <TimeUnit value={minutes} label="Phút" />
                    <TimeUnit value={seconds} label="Giây" />
                </Flex>
            )}
        />
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <Paper shadow="md" radius="md" p="sm" withBorder>
            <Box ta="center">
                <Text fz="xl" fw={700} >
                    {String(value).padStart(2, "0")}
                </Text>
                <Text fz="sm" fw={500}>
                    {label}
                </Text>
            </Box>
        </Paper>
    );
}

function Separator() {
    return <Text fz="xl" fw={600}>:</Text>;
}
