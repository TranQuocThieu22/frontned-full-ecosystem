import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Box, Flex, Group, Paper, Progress, Text } from "@mantine/core";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
    startDate?: string;
    endDate?: string;
    curentDate?: string;
    loading?: boolean;
}

export default function SemesterProgressBar({ startDate, endDate, curentDate, loading }: Props) {
    const [displayProgress, setDisplayProgress] = useState(0);
    const [showLabel, setShowLabel] = useState(false);
    const animationRef = useRef<number | null>(null);

    const semesterPercentage = useMemo(
        () => caculationSemesterPercentage(startDate, endDate, curentDate),
        [startDate, endDate, curentDate]
    );

    useEffect(() => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        if (loading) {
            setDisplayProgress(0);
            setShowLabel(false);
            return;
        }

        setShowLabel(false);

        const duration = 400;
        const start = 0;
        const end = semesterPercentage;
        const startTime = performance.now();
        const labelRevealAt = 0.4; // show label after ~40% of the animation

        let labelShown = false;
        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const next = start + (end - start) * eased;
            setDisplayProgress(next);

            if (!labelShown && progress >= labelRevealAt) {
                setShowLabel(true);
                labelShown = true;
            }

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(tick);
            } else {
                setShowLabel(true);
            }
        };

        animationRef.current = requestAnimationFrame(tick);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [loading, semesterPercentage]);

    const formatDateOrPlaceholder = (value?: string) =>
        value ? dateUtils.toDDMMYYYY(value) : "__/__/____";

    return (
        <Paper mt="md" p="24" pos="relative" radius="xl">
            <Flex direction="column" mx="7px">
                <Group gap="xs" align="center">
                    <Text fz={20} fw={700}>Tiến độ học kỳ</Text>
                    {loading && <Mirage size="28" speed="2.5" color="#88bef0" />}
                </Group>
                <Box pos="relative" w="100%" h={48} mt={6}>
                    <Flex
                        direction="column"
                        pos="absolute"
                        left={`${displayProgress}%`}
                        style={{
                            transform: "translateX(-50%)",
                            opacity: showLabel ? 1 : 0,
                            transition: showLabel ? "opacity 0.24s ease 0.25s" : "opacity 0.24s ease 0s",
                            textAlign: "center",
                        }}
                        align="center"
                        gap={0}
                    >
                        <Text pb={4} c="dimmed" fz="md" style={{ whiteSpace: "nowrap", lineHeight: 1.1 }}>
                            Hiện tại
                        </Text>
                        <Text c="dimmed" fw={700} fz="md" style={{ lineHeight: 1.15 }}>
                            {Math.round(displayProgress)}%
                        </Text>
                        <IconCaretDownFilled size={14} color="#1d8cf8" />
                    </Flex>
                </Box>

                <Progress transitionDuration={0} value={displayProgress} mt={14} />

                <Group justify="space-between" mt="sm">
                    <Text fz={16} fw="bold" c="dimmed">
                        {formatDateOrPlaceholder(startDate)}
                    </Text>
                    <Text fz={16} fw="bold" c="dimmed">
                        {formatDateOrPlaceholder(endDate)}
                    </Text>
                </Group>
            </Flex>
        </Paper>
    );
}

function caculationSemesterPercentage(
    startDate?: string,
    endDate?: string,
    currentDate?: string
): number {
    try {
        if (!startDate || !endDate) return 0;

        const s = new Date(startDate).getTime();
        const e = new Date(endDate).getTime();
        const c = currentDate ? new Date(currentDate).getTime() : Date.now();

        if (isNaN(s) || isNaN(e) || isNaN(c)) return 0;
        if (e <= s) return 0;

        if (c <= s) return 0;
        if (c >= e) return 100;

        const percentage = ((c - s) / (e - s)) * 100;
        return Math.round(percentage);
    } catch {
        return 0;
    }
}
