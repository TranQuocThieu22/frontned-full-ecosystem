import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { Box, Group, Paper, Stack, Text } from "@mantine/core";
import { Mirage } from "ldrs/react";
import 'ldrs/react/Mirage.css';
import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
    title: string;
    value: string;
    description?: string;
    icon: ReactNode;
    loading?: boolean;
}

export default function AQStatCard({ title, value, icon, loading }: Props) {
    const [animatedValue, setAnimatedValue] = useState<number>(0);
    const [isBumping, setIsBumping] = useState(false);
    const lastValueRef = useRef<number>(0);
    const animationRef = useRef<number | null>(null);

    const parsedTarget = Number.isFinite(Number(value)) ? Number(value) : 0;

    useEffect(() => {
        let bumpTimeout: ReturnType<typeof setTimeout> | null = null;

        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        if (loading) {
            lastValueRef.current = 0;
            setAnimatedValue(0);
            return;
        }

        const start = lastValueRef.current;
        const end = parsedTarget;
        const duration = 600;
        const startTime = performance.now();

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const nextValue = start + (end - start) * eased;
            setAnimatedValue(nextValue);

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(tick);
            } else {
                lastValueRef.current = end;
                setIsBumping(true);
                bumpTimeout = setTimeout(() => setIsBumping(false), 220);
            }
        };

        animationRef.current = requestAnimationFrame(tick);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (bumpTimeout) clearTimeout(bumpTimeout);
        };
    }, [loading, parsedTarget]);

    return (
        <Paper
            withBorder
            radius="xl"
            p="lg"
            shadow="md"
            style={{
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
            }
        >
            <Stack mx="7px">
                <Group justify="space-between" align="flex-start">
                    <Box>
                        <CustomFlexRow gap={6} align={"end"}>
                            <Text
                                size="sm"
                                fw={700}
                                fz={16}
                                tt="uppercase"
                                variant="gradient"
                                gradient={{ from: "indigo.5", to: "cyan.5", deg: 45 }}
                            >
                                {title}
                            </Text>
                        </CustomFlexRow>
                    </Box>
                    <Group gap="xs" align="center">
                        {loading && (
                            <Mirage size="42" speed="2.5" color="#88bef0" />
                        )}
                        <Box>{icon}</Box>
                    </Group>
                </Group>

                <Group align="flex-end" gap="xs">
                    <Text
                        fz={35}
                        fw={699}
                        style={{
                            letterSpacing: "-1px",
                            transform: isBumping ? "translateY(-2px) scale(1.04)" : "translateY(0) scale(1)",
                            transition: "transform 0.4s ease, color 0.4s",
                        }}
                    >
                        {Math.round(animatedValue)}
                    </Text>
                </Group>
            </Stack>
        </Paper>
    );
}
