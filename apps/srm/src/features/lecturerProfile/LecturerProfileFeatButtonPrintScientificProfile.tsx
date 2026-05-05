import { ActionIcon } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";

export default function LecturerProfileFeatButtonPrintScientificProfile(
    { scientificProfileId }: { scientificProfileId: number }
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