import { IRequirement } from '@/shared/interfaces/requirement/Requirement'
import { Group, Paper, Text } from '@mantine/core'
import { IconFileText } from '@tabler/icons-react'
import React from 'react'

export default function ViewOrUpdateRequirementLayout(
    { data }: { data: IRequirement | undefined }) {
    return (
        <Paper withBorder p="md" radius="md">
            <Group gap="xs" align="center">
                <div style={{ flex: 1 }}>
                    <Group>
                        <IconFileText size={20} />
                        <Text size="sm" c="dimmed" fw={500}>
                            YÊU CẦU
                        </Text>
                    </Group>
                    <Text fw={600} size="md" mt={4}>
                        {data?.name}
                    </Text>
                </div>
            </Group>
        </Paper>
    )
}
