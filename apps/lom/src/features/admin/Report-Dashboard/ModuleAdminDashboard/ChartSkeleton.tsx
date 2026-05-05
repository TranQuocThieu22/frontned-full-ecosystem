import { Box, Card, Grid, Group, Paper, ScrollArea, Skeleton, Stack } from "@mantine/core";

// Skeleton Components
export const NumberCardsSkeleton = () => (
    <Box p="xl">
        <Grid>
            {[1, 2, 3, 4].map((i) => (
                <Grid.Col key={i} span={{ base: 12, sm: 6, lg: 3 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group justify="space-between" align="flex-start" mb="md">
                            <Box>
                                <Skeleton height={12} width="80%" mb="xs" />
                                <Skeleton height={28} width="60%" />
                            </Box>
                            <Skeleton height={48} width={48} radius="md" />
                        </Group>
                        <Skeleton height={4} width="100%" radius="sm" />
                    </Card>
                </Grid.Col>
            ))}
        </Grid>
    </Box>
);


export const HorizontalBarChartSkeleton = () => (
    <Paper mt="md" p="24">
        <ScrollArea style={{ height: 400 }}>
            <Stack gap="md">
                {/* Chart title skeleton */}
                <Skeleton height={16} width="50%" />

                {/* Horizontal bar chart skeleton */}
                <Stack gap="sm" style={{ marginTop: '20px' }}>
                    {[70, 85, 45, 90, 60, 75, 35].map((width, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Skeleton height={12} width="25%" />
                            <div style={{ flex: 1, position: 'relative' }}>
                                <Skeleton height={24} width={`${width}%`} radius="sm" />
                            </div>
                        </div>
                    ))}
                </Stack>

                {/* Chart legend/axis labels */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <Skeleton height={10} width="15%" />
                    <Skeleton height={10} width="15%" />
                </div>
            </Stack>
        </ScrollArea>
    </Paper>
);

export const PieChartSkeleton = () => (
    <Paper mt="md" p="24">
        <Stack gap="md" align="center">
            {/* Chart title skeleton */}
            <Skeleton height={16} width="60%" />

            {/* Pie chart skeleton with segments */}
            <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                <Skeleton height={200} width={200} circle />
                {/* Small circle in center to make it look more like a donut/pie chart */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px'
                }} />
            </div>

            {/* Legend skeleton */}
            <Stack gap="xs" style={{ width: '100%' }}>
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                        <Skeleton height={12} width={12} radius="sm" />
                        <Skeleton height={12} width="30%" />
                        <Skeleton height={12} width="15%" />
                    </div>
                ))}
            </Stack>
        </Stack>
    </Paper>
);