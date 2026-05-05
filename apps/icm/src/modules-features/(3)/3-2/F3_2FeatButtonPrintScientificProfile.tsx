import { ActionIcon } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";

export default function F3_2ButtonPrintScientificProfile(
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