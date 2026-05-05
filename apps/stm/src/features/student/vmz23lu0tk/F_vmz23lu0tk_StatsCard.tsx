import {
    ActionIcon,
    Box,
    Card,
    Flex,
    Group,
    Text
} from "@mantine/core";
import { IconArrowNarrowRightDashed } from "@tabler/icons-react";
import Link from "next/link";
import { ReactNode } from "react";
import classes from "./style/StatsCard.module.css";

interface Props {
    value: number
    label: string
    icon: ReactNode
    link: string
    color: string
    borderColor: string
}

export default function StatsCard({
    value,
    label,
    icon,
    link,
    color,
    borderColor,
}: Props) {
    return (
        <Card>
            <Card.Section p={14}>
                <Group align="center" gap={14}>
                    <Box
                        className={classes.iconWrapper}
                        style={{
                            background: color,
                            borderColor,
                            color: 'white'
                        }}
                    >
                        {icon}
                    </Box>
                    <Flex direction="column" gap={2} align="start">
                        <Text className={classes.label} lts={-0.4} fw={500} fz={16}>
                            {label}
                        </Text>
                        <Text className={classes.value} fw={700} lh={1} fz={18}>
                            {value.toLocaleString()}
                        </Text>

                    </Flex>
                </Group>
            </Card.Section>
            {/* <Divider variant="dashed" w="100%" /> */}
            <Card.Section px={14} py={10}>
                <Group align="center" w="100%" justify="space-between">
                    <Link href={""} >
                        <Text c="blue" lts={-0.4} fw={500} fz={12}>
                            Xem chi tiết
                        </Text>
                    </Link>
                    <ActionIcon variant="subtle" radius="sm">
                        <IconArrowNarrowRightDashed stroke={2} size={16} />
                    </ActionIcon>
                </Group>
            </Card.Section>
        </Card>
    )
}
