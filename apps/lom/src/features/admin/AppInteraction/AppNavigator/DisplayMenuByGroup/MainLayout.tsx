'use client'

import { Anchor, Card, Group, SimpleGrid, Text } from "@mantine/core";

export default function MainLayout() {
    return (
        <>
            <Card
                radius="sm"
                bg={"#FFFFFF"}
            >
                <Card
                    withBorder
                    radius="md"
                    bg={"#F8F9FA"}
                >
                    <Group justify="space-between">
                        <Text fw={600} size="lg" >Menu hệ thống</Text>
                        <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
                            + 21 other services
                        </Anchor>
                    </Group>
                    <SimpleGrid cols={3} mt="md">
                        Icon
                    </SimpleGrid>
                </Card>
            </Card>
        </>
    );
}