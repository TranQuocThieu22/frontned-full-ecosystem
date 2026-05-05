import { Card, Divider, Grid, Group, Tabs } from "@mantine/core";
import { IconBellSchool, IconBook, IconBooks } from "@tabler/icons-react";
import AvailableServiceTable from "./AvailableServiceTable";
import SelectedServiceTable from "./SelectedServiceTable";

export default function SelectServiceLayout() {
    return (
        <>
            <Grid>
                <Grid.Col span={{ base: 12, lg: 8 }}>
                    <Card
                        h={"64vh"}
                        shadow="sm" py="lg" radius="md" withBorder>
                        <Tabs
                            orientation="vertical"
                            color="cyan" variant="pills" radius="xs" defaultValue="service_1">
                            <Tabs.List>
                                <Tabs.Tab value="service_1" leftSection={<IconBooks />}>
                                    Học và thi
                                </Tabs.Tab>
                                <Tabs.Tab value="service_2" leftSection={<IconBook />}>
                                    Chỉ học
                                </Tabs.Tab>
                                <Tabs.Tab value="service_3" leftSection={<IconBellSchool />}>
                                    Chỉ thi
                                </Tabs.Tab>
                            </Tabs.List>

                            <Divider my="0" orientation="vertical" />

                            <Tabs.Panel value="service_1" w={{ base: "100%", lg: "64%" }}>
                                <Group ml={16} grow>
                                    <AvailableServiceTable serviceType={0} />
                                </Group>
                            </Tabs.Panel>
                            <Tabs.Panel value="service_2" w={{ base: "100%", lg: "64%" }}>
                                <Group ml={16} grow>
                                    <AvailableServiceTable serviceType={1} />
                                </Group>
                            </Tabs.Panel>

                            <Tabs.Panel value="service_3" w={{ base: "100%", lg: "64%" }}>
                                <Group ml={16} grow>
                                    <AvailableServiceTable serviceType={2} />
                                </Group>
                            </Tabs.Panel>
                        </Tabs>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 4 }}>
                    <Card
                        h={"64vh"}
                        shadow="sm" padding="lg" radius="md" withBorder>
                        <SelectedServiceTable
                            step={1}
                        />
                    </Card>
                </Grid.Col>
            </Grid>
        </>
    )
}