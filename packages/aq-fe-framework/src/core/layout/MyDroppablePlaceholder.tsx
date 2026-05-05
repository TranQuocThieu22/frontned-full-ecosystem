import { useDroppable } from "@dnd-kit/core";
import { Card, Text } from "@mantine/core";

export function DroppablePlaceholder({ id }: { id: string }) {
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <Card
            ref={setNodeRef}
            withBorder
            radius="md"
            p="sm"
            style={{ opacity: 0.5, minHeight: 40 }}
        >
            <Text size="sm" c="dimmed" ta="center">
                Kéo item vào đây
            </Text>
        </Card>
    );
}
