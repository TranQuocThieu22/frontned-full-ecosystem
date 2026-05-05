import { ActivityPlan } from "@/interfaces/activityPlan";
import { Event } from "@/interfaces/event";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { Flex, Text, Tooltip } from "@mantine/core";

interface ActivityPlanNameCellProps {
    row: ActivityPlan;
}

export const ActivityPlanNameCell = ({ row }: ActivityPlanNameCellProps) => {
    // Parent row - bold text
    if (row.events) {
        return <Text fw={500}>{row.name}</Text>;
    }

    // Child row - HTML content with optional required indicator
    const event = row as Event;

    return (
        <Flex gap={4} align="center">
            <CustomHtmlWrapper html={row.name || ""} />
            {event.isRequired && (
                <Tooltip label="Hoạt động cố định">
                    <Text c="red" component="span">
                        (*)
                    </Text>
                </Tooltip>
            )}
        </Flex>
    );
};
