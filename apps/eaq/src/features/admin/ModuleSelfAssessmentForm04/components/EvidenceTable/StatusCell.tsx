import { Badge } from "@mantine/core";
import { IconClockCheck, IconClockX } from "@tabler/icons-react";

interface StatusCellProps {
    expiredDate?: string;
}

export default function StatusCell({ expiredDate }: StatusCellProps) {
    const currentDate = new Date();
    const toDate = expiredDate ? new Date(expiredDate) : null;
    const isExpired = !toDate || currentDate > toDate;

    return (
        <Badge
            w="100%"
            h={25}
            leftSection={
                isExpired ? <IconClockX size={16} /> : <IconClockCheck size={16} />
            }
            variant="light"
            color={isExpired ? "red" : "green"}
            radius="md"
            fw={700}
        >
            {isExpired ? "Hết hạn" : "Còn hiệu lực"}
        </Badge>
    );
}
