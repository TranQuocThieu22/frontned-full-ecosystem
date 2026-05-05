import usePushToEditScientificProfilePage from "@/app/admin/(3)/3-2/hooks/pushToEditScienceProfileHook";
import { ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

export default function F3_2ButtonUpdateScientificProfile(
    { scientificProfileId }: { scientificProfileId: number }
) {
    const PushRouterTao = usePushToEditScientificProfilePage({ scientificProfileId });
    return (
        <>
            <ActionIcon
                color="yellow"
                onClick={PushRouterTao}>
                <IconEdit />
            </ActionIcon>
        </>
    )
}