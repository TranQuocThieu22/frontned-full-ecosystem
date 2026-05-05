import {Text} from "@mantine/core";

export const DisplaySelfAssessmentStatusInAccordion = ({ status }: { status?: number }) => {
    switch (status) {
        case 1:
            return (
                <Text size="sm" fw={500} color={"green"}>
                    Đạt
                </Text>
            );
        case 2:
            return (
                <Text size="sm" fw={500} color={"red"}>
                    Không đạt
                </Text>
            );
        default:
            return (
                <Text size="sm" fw={500} color={"gray"}>
                    Chưa đánh giá
                </Text>
            );
    }
}