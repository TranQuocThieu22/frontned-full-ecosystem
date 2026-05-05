import { ActionIcon } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";

export default function F3_3ButtonPrintResearchGroupProfile(
    { researchGroupProfileId }: { researchGroupProfileId: number }
) {
    return (
        <>
            <ActionIcon
                color="indigo"
                variant="light">
                <IconPrinter />
            </ActionIcon>
        </>
    )
}