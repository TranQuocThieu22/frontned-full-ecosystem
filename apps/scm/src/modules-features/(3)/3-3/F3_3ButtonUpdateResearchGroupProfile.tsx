import usePushToEditResearchGroupProfilePage from "@/app/admin/(3)/3-3/hooks/pushToEditResearchGroupProfileHook";
import { ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

export default function F3_3ButtonUpdateResearchGroupProfile(
    { researchGroupProfileId }: { researchGroupProfileId: number }
) {
    const PushToEditPage = usePushToEditResearchGroupProfilePage({ researchGroupProfileId });
    return (
        <>
            <ActionIcon
                color="yellow"
                onClick={PushToEditPage}>
                <IconEdit />
            </ActionIcon>
        </>
    )
}