import { ActionIcon, SimpleGrid, Text } from "@mantine/core";

interface ListChoiceBoxProps {
    listBox: { value: string; isDone?: boolean; isFocus?: boolean }[];
}

export default function F_testRoom_ListChoiceBox({ listBox }: ListChoiceBoxProps) {
    return (
        <SimpleGrid cols={5} spacing="md">
            {listBox.map((item, idx) => (
                <ActionIcon
                    key={idx}
                    size={"xl"}
                    variant={item.isDone ? "filled" : "light"}
                    color={item.isDone ? "green" : "gray"}
                    style={{
                        border: item.isFocus ? "4px solid black" : undefined,
                        borderRadius: "12px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Text size="20" fw={600}>
                        {item.value}
                    </Text>
                </ActionIcon>
            ))}
        </SimpleGrid>
    );
}