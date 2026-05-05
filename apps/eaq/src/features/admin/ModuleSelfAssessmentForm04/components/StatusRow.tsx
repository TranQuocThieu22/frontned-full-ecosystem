import { Text } from "@mantine/core";


export const StatusRow = ({ status }: { status?: number; }) => {
    switch (status) {
        case 1:
            return (
                <Text size="sm" fw={500} c={"green"}>
                    Đạt
                </Text>
            );
        case 2:
            return (
                <Text size="sm" fw={500} c={"red"}>
                    Không đạt
                </Text>
            );
        default:
            return (
                <Text size="sm" fw={500} c={"gray"}>
                    Chưa đánh giá
                </Text>
            );
    }
};
